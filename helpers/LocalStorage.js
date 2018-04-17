import { AsyncStorage } from 'react-native';
import StorageKeys from '../constants/StorageKeys';

class LocalStorage {

  static storeUser(user_json) {
    AsyncStorage.setItem(StorageKeys.user, JSON.stringify(user_json));
  }

  static async getUser() {
    try {
      var user_json = await AsyncStorage.getItem(StorageKeys.user);
      if (user_json !== null) {
        return Promise.resolve(JSON.parse(user_json));
      } else {
        return Promise.reject(new Error("No stored user"));
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static clearUser() {
    AsyncStorage.removeItem(StorageKeys.user);
  }

  static storeUserHasClaimed(claimed_json) {
    AsyncStorage.setItem(StorageKeys.userHasClaimed, JSON.stringify(claimed_json));
  }

  static async userHasClaimed() {
    try {
      var claimed_json = await AsyncStorage.getItem(StorageKeys.userHasClaimed);
      if (claimed_json !== null) {
        return Promise.resolve(true);
      } else {
        return Promise.reject(new Error("No stored claim value"));
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static clearUserHasClaimed() {
    AsyncStorage.removeItem(StorageKeys.userHasClaimed);
  }

}

export default LocalStorage;
