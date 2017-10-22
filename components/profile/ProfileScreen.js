import React from 'react';
import { 
  BackHandler,
  View, 
  Button, 
  StatusBar 
} from 'react-native';

class ProfileScreen extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Profile',
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
        <View>
          <Button
            onPress={()=>{}}
            title="Profile"/>
        </View>
      </View>
    );
  }
}

export default ProfileScreen;
