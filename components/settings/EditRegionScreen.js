import React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Border from '../common/Border';
import LoadingView from '../common/LoadingView';
import ListRow from '../common/ListRow';
import LoadingButton from '../common/LoadingButton';

import RegionsRequester from '../../requesters/RegionsRequester';
import UserRequester from '../../requesters/UserRequester';

import Colors from '../../constants/Colors';
import ComponentStyles from '../../constants/ComponentStyles';
import Events from '../../constants/Events';
import UIConstants from '../../constants/UIConstants';

const iconSize = 17;

let doneIcon = (navigation) => {
  params = navigation.state.params;
  return (
    <LoadingButton
      title='Done'
      containerStyle={ComponentStyles.navButtonContainer}
      style={ComponentStyles.navButtonText}
      onPress={params.updateRegion}
      isLoading={params.isUpdating}
    />
  )
};

class EditRegionScreen extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Edit Region',
    headerRight: doneIcon(navigation)
  })

  static propTypes = {
    user: PropTypes.object,
    onUserUpdate: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      selected_region: this.props.user.marketplace_region,
      regions: [],
      isLoading: true,
      isRefreshing: false,
      isUpdating: false,
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({
      updateRegion: this._updateRegion,
      isUpdating: false,
    });
  }

  componentDidMount() {
    this._getRegions();
  }

  _updateRegion = () => {
    success = (user) => {
      window.EventBus.trigger(Events.userUpdated, user);
      window.EventBus.trigger(Events.regionUpdated, user.marketplace_region);
      this.props.onUserUpdate(user);
      this.setState({
        isUpdating: false,
      });
      this.props.navigation.setParams({
        isUpdating: false,
      });
      this.props.navigation.goBack();
    };

    failure = (error) => {
      this.setState({
        isUpdating: false,
      });
      this.props.navigation.setParams({
        isUpdating: false,
      });
    }

    this.setState({
      isUpdating: true,
    });
    this.props.navigation.setParams({
      isUpdating: true,
    });

    UserRequester.updateRegion(this.props.user.id, this.state.selected_region).then(success).catch(failure);
  }

  _getRegions = () => {
    RegionsRequester.getRegions().then((regions) =>  {
      this.setState({
        regions: regions,
        isRefreshing: false,
        isLoading: false,
      });
    }).catch((error) => {
      this.setState({
        isRefreshing: false,
        isLoading: false,
      });
    });
  }

  _onPressItem = (region) => {
    this.setState({
      selected_region: region,
    });
  }

  _checkIcon = () => {
    return (
      <Icon
        name='done'
        size={iconSize}
        color={Colors.main}
        style={styles.checkIcon}
      />
    )
  }

  _refresh = () => {
    this.setState({isRefreshing: true}, () => {
      this._getRegions();
    });
  }

  _keyExtractor = (item, index) => {
    return item.id;
  }

  render() {
    return (
      <LoadingView
        style={styles.container}
        isLoading={this.state.isLoading}>
        <FlatList
            data={this.state.regions}
            keyExtractor={this._keyExtractor}
            renderItem={ ({item}) =>
              <ListRow
                onPress={() => this._onPressItem(item)}
              >
                <View style={styles.itemContainer} >
                  <Text style={
                    item.id === this.state.selected_region.id
                    ? styles.selectedRegion
                    : styles.normalRegion
                  }>
                    {item.region}
                  </Text>
                  {
                    item.id === this.state.selected_region.id
                    ? this._checkIcon()
                    : null
                  }
                </View>
              </ListRow>
            }
            refreshing={this.state.isRefreshing}
            onRefresh={this._refresh}
            ItemSeparatorComponent={() => <Border />}
          />
      </LoadingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkIcon: {
    marginLeft: UIConstants.margins.standard,
    height: iconSize,
  },

  normalRegion: {
    fontSize: UIConstants.fontSizes.normal,
    fontWeight: UIConstants.fontWeights.nomal,
    height: iconSize,
    flex: 1,
  },

  selectedRegion: {
    fontSize: UIConstants.fontSizes.normal,
    fontWeight: UIConstants.fontWeights.bold,
    height: iconSize,
    flex: 1,
  }
})

export default EditRegionScreen;
