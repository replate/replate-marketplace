import BaseRequester from './BaseRequester'
import APIConstants from './APIConstants'

class RegionsRequester extends BaseRequester {

  static getRegions() {
    return BaseRequester.get(APIConstants.regions.all);
  }
}

export default RegionsRequester;
