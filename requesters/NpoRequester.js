import BaseRequester from './BaseRequester'
import APIConstants from './APIConstants'

class NposRequester extends BaseRequester {

  static getNpos() {
    return BaseRequester.get(APIConstants.npos.all);
  }

}

export default NposRequester;
