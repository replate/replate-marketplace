static BASE_URL = 'http://localhost:3000/api/marketplace'

class APIConstants {

  get login() {
    return {
      signIn: 'marketplace_users/sign_in',
      changePassword: 'marketplace_users/passwords/update',
    }
  }
}

export default APIConstants;
