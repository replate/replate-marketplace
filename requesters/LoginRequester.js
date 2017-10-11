import BaseRequester from './BaseRequester'
import APIConstants from './APIConstants'

class LoginRequester extends BaseRequester {

  signIn = (email, password) => {

    this.post(APIConstants.login.signIn)
  }

  changePassword(new_password) => {
    this.patch(APIConstants.login.changePassword);
  }
}

export default LoginRequester;
