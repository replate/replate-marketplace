import BaseRequester from './BaseRequester'
import APIConstants from './APIConstants'
import LocalStorage from '../helpers/LocalStorage'
import ModelConstants from '../constants/ModelConstants'

class ListingsRequester extends BaseRequester {

  static getListings(region=null) {
    params = {};
    params.state = ModelConstants.listing.state.OPEN;
    if (region !== null) {
      params.marketplace_region_id = region.id;
    }
    return BaseRequester.get(APIConstants.listings.all, params);
  }

  static async getActiveListings() {
    params = {};
    params.state = ModelConstants.listing.state.CLAIMED;
    try {
      user = await LocalStorage.getUser();
      params.marketplace_user_id = user.id;
      return BaseRequester.get(APIConstants.listings.all, params);
    } catch (error) {
      return Promise.reject('User not found');
    }
  }

  static getListing(listing) {
    return BaseRequester.get(APIConstants.listings.listing(listing.id));
  }

  static claimListing(listing, npo) {
    return BaseRequester.post(APIConstants.listings.claim(listing.id), {npo_id: npo.id});
  }

  static cancelClaim(listing) {
    return BaseRequester.post(APIConstants.listings.cancel(listing.id));
  }
}

export default ListingsRequester;
