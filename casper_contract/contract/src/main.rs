#![no_main]
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

// CONTRACT FUNCTIONS
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

// SETUP CONTRACT
#[no_mangle]
pub extern "C" fn call() {
    let (contract_package_hash, _) = storage::create_contract_package_at_hash();

    //@ Setup entry points to contract
    let mut entry_points = EntryPoints::new();

    //@ Boolean
    entry_points.add_entry_point(endpoint("store_bool", CLType::Bool));

    //@ Signed 64 bit number
    entry_points.add_entry_point(endpoint("store_i64", CLType::I64));

    //@ String
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
}