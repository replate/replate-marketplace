class APIConstants {

  static get BASE_URL() {
    return 'http://localhost:3000/api/marketplace';
  } 

  static get login() {
    return {
      signIn: this.BASE_URL + '/marketplace_users/sign_in',
      changePassword: this.BASE_URL + '/marketplace_users/passwords/update',
    }
  }
}

export default APIConstants;
