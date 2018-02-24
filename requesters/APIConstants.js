import { Platform } from 'react-native';

class APIConstants {

  static get BASE_URL() {
    host = '10.0.3.2';
    if (Platform.OS === 'ios') {
      host = 'localhost';
    }
    return 'http://' + host + ':3000/api/marketplace';
  }

  static get login() {
    return {
      signIn: this.BASE_URL + '/marketplace_users/sign_in',
      changePassword: (user_id) => this.BASE_URL + `/marketplace_users/${user_id}/update_password`,
      forgotPassword: this.BASE_URL + '/marketplace_users/forgot_password',
    }
  }

  static get listings() {
    return {
      all: this.BASE_URL + '/marketplace_listings',
      listing: (listing_id) => this.BASE_URL + `/marketplace_listings/${listing_id}`,
      claim: (listing_id) => this.BASE_URL + `/marketplace_listings/${listing_id}/claim`,
      cancel: (listing_id) => this.BASE_URL + `/marketplace_listings/${listing_id}/cancel`,
    }
  }

  static get regions() {
    return {
      all: this.BASE_URL + '/marketplace_regions',
    }
  }

  static get profile() {
    return {
      user: (user_id) => this.BASE_URL + `/marketplace_users/${user_id}`
    }
  }

  static get users() {
    return {
      user: (user_id) => this.BASE_URL + `/marketplace_users/${user_id}`,
    }
  }

}

export default APIConstants;
