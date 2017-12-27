import { Platform } from 'react-native';

class APIConstants {

  static get BASE_URL() {
    host = 'replate-testing.herokuapp.com'
    return 'https://' + host + '/api/marketplace';
  }

  static get login() {
    return {
      signIn: this.BASE_URL + '/marketplace_users/sign_in',
      changePassword: (user_id) => this.BASE_URL + `/marketplace_users/${user_id}/update_password`,
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

  static get npos() {
    return {
      all: this.BASE_URL + '/npos',
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
