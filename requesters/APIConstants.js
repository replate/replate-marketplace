import {Platform} from 'react-native';

class APIConstants {

  static get BASE_URL() {
    host = '10.0.3.2';
    if (Platform.OS === 'ios') {
      host = 'localhost';
    }
    console.log(host);
    return 'http://' + host + ':3000/api/marketplace';
  } 

  static get login() {
    return {
      signIn: this.BASE_URL + '/marketplace_users/sign_in',
      changePassword: this.BASE_URL + '/marketplace_users/passwords/update',
    }
  }
}

export default APIConstants;
