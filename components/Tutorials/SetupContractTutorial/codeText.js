export const codeTextContract = `#![no_main]
#![allow(unused_imports)]
#![allow(unused_parens)]
#![allow(non_snake_case)]

extern crate alloc;
use alloc::{collections::BTreeSet, string::String};
use std::{collections::BTreeMap, convert::TryInto};

use contract::{
    contract_api::{runtime, storage},
    unwrap_or_revert::UnwrapOrRevert,
};

use types::{
    account::AccountHash,
    bytesrepr::{FromBytes, ToBytes},
    contracts::{EntryPoint, EntryPointAccess, EntryPointType, EntryPoints},
    runtime_args, CLType, CLTyped, Group, Key, Parameter, PublicKey, RuntimeArgs, URef, U128, U256,
    U512,
};

#[no_mangle]
pub extern "C" fn store_bool() {
    read_and_store::<bool>();
}

#[no_mangle]
pub extern "C" fn store_i64() {
    read_and_store::<i64>();
}

#[no_mangle]
pub extern "C" fn store_string() {
    read_and_store::<String>();
}

#[no_mangle]
pub extern "C" fn call() {
    let (contract_package_hash, _) = storage::create_contract_package_at_hash();
    let mut entry_points = EntryPoints::new();

    entry_points.add_entry_point(endpoint("store_bool", CLType::Bool));
    entry_points.add_entry_point(endpoint("store_i64", CLType::I64));
    entry_points.add_entry_point(endpoint("store_string", CLType::String));

    let (contract_hash, _) =
    storage::add_contract_version(contract_package_hash, entry_points, Default::default());
    runtime::put_key("kvstorage_contract", contract_hash.into());
    let contract_hash_pack = storage::new_uref(contract_hash);
    runtime::put_key("kvstorage_contract_hash", contract_hash_pack.into())
}

fn read_and_store<T: CLTyped + FromBytes + ToBytes>() {
    let name: String = runtime::get_named_arg("name");
    let value: T = runtime::get_named_arg("value");
    set_key(name.as_str(), value);
}

fn endpoint(name: &str, value_type: CLType) -> EntryPoint {
    EntryPoint::new(
        String::from(name),
        vec![
            Parameter::new("name", CLType::String),
            Parameter::new("value", value_type),
        ],
        CLType::Unit,
        EntryPointAccess::Public,
        EntryPointType::Contract,
    )
}

fn set_key<T: ToBytes + CLTyped>(name: &str, value: T) {
    match runtime::get_key(name) {
        Some(key) => {
            let key_ref = key.try_into().unwrap_or_revert();
            storage::write(key_ref, value);
        }
        None => {
            let key = storage::new_uref(value).into();
            runtime::put_key(name, key);
        }
    }
}`;

export const codeTextSetupTests = `use casper_engine_test_support::{Code, Hash, SessionBuilder, TestContext, TestContextBuilder};
use casper_types::{
    account::AccountHash,
    bytesrepr::{FromBytes, ToBytes},
    runtime_args, AsymmetricType, CLTyped, PublicKey, RuntimeArgs, U512,
};

pub const KV_STORAGE: &str = "kvstorage_contract";
pub const KV_STORAGE_HASH: &str = "kvstorage_contract_hash";

pub struct KVstorageContract {
    pub context: TestContext,
    pub kvstorage_hash: Hash,
    pub account: AccountHash,
}

impl KVstorageContract {
    pub fn deploy() -> Self {
        let account = PublicKey::ed25519_from_bytes([3u8; 32]).unwrap();
        let account_hash = account.to_account_hash();
        let mut context = TestContextBuilder::new()
            .with_public_key(account, U512::from(500_000_000_000_000_000u64))
            .build();
        let session_code = Code::from("contract.wasm");
        let session = SessionBuilder::new(session_code, runtime_args! {})
            .with_address(account_hash)
            .with_authorization_keys(&[account_hash])
            .build();
        context.run(session);
        let kvstorage_hash = context
            .query(account_hash, &[KV_STORAGE_HASH.to_string()])
            .unwrap()
            .into_t()
            .unwrap();

        Self {
            context,
            kvstorage_hash,
            account: account_hash,
        }
    }

    pub fn call_store_value<T: CLTyped + ToBytes>(
        &mut self,
        fn_name: &str,
        key_name: &str,
        value: T,
    ) {
        self.call(
            fn_name,
            runtime_args! {
                "name" => key_name,
                "value" => value
            },
        );
    }

    fn call(&mut self, method: &str, args: RuntimeArgs) {
        let code = Code::Hash(self.kvstorage_hash, method.to_string());
        let session = SessionBuilder::new(code, args)
            .with_address(self.account)
            .with_authorization_keys(&[self.account])
            .build();
        self.context.run(session);
    }

    pub fn query_contract<T: CLTyped + FromBytes>(&self, name: &str) -> Option<T> {
        match self
            .context
            .query(self.account, &[KV_STORAGE.to_string(), name.to_string()])
        {
            Err(_) => None,
            Ok(maybe_value) => {
                let value = maybe_value
                    .into_t()
                    .unwrap_or_else(|_| panic!("{} is not expected type.", name));
                Some(value)
            }
        }
    }
}`;

export const codeTextUnitTests = `#[cfg(test)]
mod kv_storage;

#[cfg(test)]
mod tests {
    use super::kv_storage;
    use casper_types::{
        bytesrepr::{FromBytes, ToBytes},
        CLTyped,
    };
    use kv_storage::KVstorageContract;

    fn generic_test<T: CLTyped + FromBytes + ToBytes>(
        fn_name: &str,
        key_name: &str,
        value1: T,
        value2: T,
    ) -> (T, T) {
        let mut kv_storage = KVstorageContract::deploy();
        kv_storage.call_store_value(fn_name, key_name, value1);
        let check1: T = kv_storage.query_contract(key_name).unwrap();
        kv_storage.call_store_value(fn_name, key_name, value2);
        let check2: T = kv_storage.query_contract(key_name).unwrap();
        (check1, check2)
    }

    #[test]
    fn should_store_bool() {
        let (value1, value2): (bool, bool) = (true, false);
        let (ret1, ret2) = generic_test::<bool>("store_bool", "test_bool", value1, value2);
        assert_eq!(value1, ret1);
        assert_eq!(value2, ret2);
    }

    #[test]
    fn should_store_i64() {
        let (value1, value2): (i64, i64) = (3i64, 5i64);
        let (ret1, ret2) = generic_test::<i64>("store_i64", "test_i64", value1, value2);
        assert_eq!(value1, ret1);
        assert_eq!(value2, ret2);
    }

    #[test]
    fn should_store_string() {
        let (value1, value2) = (String::from("hello"), String::from("world"));
        let (ret1, ret2) = generic_test::<String>(
            "store_string",
            "test_string",
            value1.clone(),
            value2.clone(),
        );
        assert_eq!(value1, ret1);
        assert_eq!(value2, ret2);
    }
}`;

export const codeTextRunTests = `cargo test -p tests`;
