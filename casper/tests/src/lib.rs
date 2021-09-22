#[cfg(test)]
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
}
