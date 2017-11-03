import BaseRequester from './BaseRequester'
import APIConstants from './APIConstants'

class ListingsRequester extends BaseRequester {

  static getListings(region=null) {
    params = {};
    params.state = "open";
    if (region !== null) {
      params.marketplace_region_id = region.id;
    }
    return BaseRequester.get(APIConstants.listings.all, params);
  }

  static getListing(listing) {
    return BaseRequester.get(APIConstants.listings.listing(listing.id));
  }
}

export default ListingsRequester;
