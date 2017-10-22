import { AsyncStorage } from 'react-native';
import StorageKeys from '../constants/StorageKeys';

class LocalStorage {

  static storeUser(user_json) {
    AsyncStorage.setItem(StorageKeys.user, JSON.stringify(user_json));
  }

  static getUser(callback) {
    AsyncStorage.getItem(StorageKeys.user).then((result) => {
      user = JSON.parse(result);
      callback(user);
    }).catch((err) => {
      callback(null);
    });
  }

  static clearUser() {
    AsyncStorage.removeItem(StorageKeys.user);
  }
}

export default LocalStorage;
