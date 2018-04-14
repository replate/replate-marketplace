import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Modal from "react-native-modal";
import Button from 'apsl-react-native-button';

import NpoRequester from '../../requesters/NpoRequester';

import Border from '../common/Border';
import LoadingView from '../common/LoadingView';
import ListRow from '../common/ListRow';
import LoadingButton from '../common/LoadingButton';

import styles from './styles';
import Colors from '../../constants/Colors';
import UIConstants from '../../constants/UIConstants';
import Icon from 'react-native-vector-icons/MaterialIcons';

const iconSize = 17;

class NpoModal extends React.Component {

  static propTypes = {
    isModalVisible: PropTypes.bool,
    toggleModal: PropTypes.func,
    onSaveNpo: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      selected_npo: null,
      npos: [],
      isLoading: true,
      isRefreshing: false,
      isUpdating: false,
      searchInput: "",
    }
  }

  componentDidMount() {
    this._getNpos();
  }

  _getNpos = () => {
    const other = [{ id: null, org_name: "Other" }];
    NpoRequester.getNpos().then((npos) =>  {
      this.setState({
        selected_npo: npos[0],
        npos: npos.concat(other),
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

  _onPressItem = (npo) => {
    this.setState({
      selected_npo: npo,
    });
  }

  _onSaveNpo = () => {
    this.props._toggleModal();
    this.props.onSaveNpo(this.state.npo);
  }

  _refresh = () => {
    this.setState({isRefreshing: true}, () => {
      this._getNpos();
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

  _searchIcon = () => {
    return (
      <Icon
        name='search'
        size={iconSize}
        color={Colors.lightGray}
        style={styles.checkIcon}
      />
    )
  }

  onSearchChange(value) {
    this.setState({ searchInput: value });
  }

  loadFilteredNpos() {
    if (!this.state.searchInput) {
      return this.state.npos;
    } else {
      var reg = new RegExp(this.state.searchInput, "i");
      return this.state.npos.filter(npo => reg.test(npo.org_name));
    }
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
            style={styles.container}
            isLoading={this.state.isLoading}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.text, {'flex': 2}]}>Destination</Text>
              <TouchableOpacity onPress={this._onSaveNpo}>
                <Text style={[styles.button_text, {'flex': 1}]}>Done</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.itemContainer}>
              { this._searchIcon() }
              <TextInput
                style={styles.input}
                placeholder="Search for NPO"
                onChangeText={(value) => this.onSearchChange(value)}
                value={this.state.searchInput}
                underlineColorAndroid="transparent"
                autoCorrect={false}
              />
            </View>
            <FlatList
              data={this.loadFilteredNpos()}
              keyExtractor={this._keyExtractor}
              renderItem={ ({item}) =>
                <ListRow onPress={() => this._onPressItem(item)}>
                  <View style={styles.itemContainer} >
                    <Text style={
                      item.id === this.state.selected_npo.id
                      ? styles.selectedRegion
                      : styles.normalRegion
                    }>
                      {item.org_name}
                    </Text>
                    {
                      item.id === this.state.selected_npo.id
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

export default NpoModal;
