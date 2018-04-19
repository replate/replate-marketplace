import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import Modal from "react-native-modal";

import RegionsRequester from '../../requesters/RegionsRequester';

import Border from '../common/Border';
import LoadingView from '../common/LoadingView';
import ListRow from '../common/ListRow';
import LoadingButton from '../common/LoadingButton';

import styles from './styles';
import Colors from '../../constants/Colors';
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
    this.state.initialState = {
      selected_region: this.props.region,
    }
  }

  componentDidMount() {
    this._getRegions();
  }

  _toggleModal = () => {
    this.props.toggleModal();
  }

  _cancelAction = () => {
    this.setState(this.state.initialState);
    this._toggleModal();
  }

  _doneAction = () => {
    this.props.onSelectRegion(this.state.selected_region)
    this.setState({initialState : {selected_region: this.state.selected_region}})
    this._toggleModal();
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
          onBackdropPress={this._toggleModal}
          onSwipe={this._toggleModal}
          swipeDirection='left'
          style={styles.modal}>
          <LoadingView
            style={{ flex: 1 }}
            isLoading={this.state.isLoading}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={this._cancelAction}>
                <Text style={[styles.buttonText, {'flex': 1}]}>Cancel</Text>
              </TouchableOpacity>
              <Text style={[styles.modalText, {'flex': 2}]}>Marketplaces</Text>
              <TouchableOpacity onPress={this._doneAction}>
                <Text style={[styles.buttonText, {'flex': 1}]}>Done</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={this.state.regions}
              keyExtractor={this._keyExtractor}
              renderItem={ ({item}) =>
                <ListRow onPress={() => this._onPressItem(item)}>
                  <View style={styles.itemContainer} >
                    <Text style={
                      item.id === this.state.selected_region.id
                      ? styles.selectedModalItem
                      : styles.normalModalItem
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

export default RegionModal;
