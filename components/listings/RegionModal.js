import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';

import Modal from "react-native-modal";

import RegionsRequester from '../../requesters/RegionsRequester';

import Border from '../common/Border';
import LoadingView from '../common/LoadingView';
import ListRow from '../common/ListRow';
import LoadingButton from '../common/LoadingButton';

import Colors from '../../constants/Colors';
import UIConstants from '../../constants/UIConstants';
import Icon from 'react-native-vector-icons/MaterialIcons';

const iconSize = 17;

class RegionModal extends React.Component {

  static propTypes = {
    isModalVisible: PropTypes.bool,
    toggleModal: PropTypes.func,
    onSelectRegion: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      selected_region: this.props.region,
      regions: [],
      isLoading: true,
      isRefreshing: false,
      isUpdating: false,
    }
  }

  componentDidMount() {
    this._getRegions();
  }

  _toggleModal = () => {
    this.props.toggleModal();
  }

  _selectRegion = (region) => {
    this.props.onSelectRegion(region);
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
    this._toggleModal();
    this._selectRegion(region);
  }

  _refresh = () => {
    this.setState({isRefreshing: true}, () => {
      this._getRegions();
    });
  }

  _keyExtractor = (item, index) => {
    return item.id;
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal 
          isVisible={this.props.isModalVisible}
          backdropColor='black'
          onBackdropPress={this._toggleModal}
          onSwipe={this._toggleModal}
          swipeDirection='left'>
          <LoadingView
            style={styles.container}
            isLoading={this.state.isLoading}>
            <Text style={[styles.text]}>Marketplaces</Text>
            <FlatList
              data={this.state.regions}
              keyExtractor={this._keyExtractor}
              renderItem={ ({item}) =>
                <ListRow onPress={() => this._onPressItem(item)}>
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
        </Modal>
      </View>
    );
  }

}

const styles = StyleSheet.create({

  text: {
    margin: 10,
    textAlign: 'center',
    fontWeight: UIConstants.fontWeights.bold,
    fontSize: UIConstants.fontSizes.title,
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 150,
    marginBottom: 150,
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

export default RegionModal;