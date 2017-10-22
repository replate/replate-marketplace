import React from 'react';
import { 
  BackHandler,
  View,
  Button,
} from 'react-native';

import NavigationStyles from '../../constants/NavigationStyles';


class ListingsScreen extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Listings',
  });

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackButton);
  }

  _handleBackButton() {
    return true;
  }

  render() {
    return (
      <View>
        <View style={{paddingTop: 100}}>
          <Button
            onPress={()=>{}}
            title="Listings"/>
        </View>
      </View>
    );
  }
}

export default ListingsScreen;
