import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import UIConstants from '../../constants/UIConstants';

export default StyleSheet.create({
  text: {
    margin: 10,
    textAlign: 'center',
    fontWeight: UIConstants.fontWeights.bold,
    fontSize: UIConstants.fontSizes.title,
  },

  modalText: {
    margin: 15,
    marginBottom: 10,
    textAlign: 'center',
    alignSelf: 'flex-end',
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

  modal : {
    margin: 0,
    backgroundColor: Colors.white,
  },

  checkIcon: {
    marginLeft: UIConstants.margins.standard,
    height: UIConstants.iconSizes.check,
  },

  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    color: Colors.primaryText,
  },

  clearButtonSmall: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
    width: 160,
    height: 40,
    marginRight: 8,
    marginBottom: 8,
  },

  buttonText: {
    margin: 10,
    marginTop: 20,
    textAlign: 'center',
    alignSelf: 'flex-end',
    fontSize: UIConstants.fontSizes.normal,
    color: Colors.blue,
  },

  button: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  normalModalItem: {
    fontSize: UIConstants.fontSizes.normal,
    fontWeight: UIConstants.fontWeights.nomal,
    height: UIConstants.iconSizes.check,
    flex: 1,
  },

  selectedModalItem: {
    fontSize: UIConstants.fontSizes.normal,
    fontWeight: UIConstants.fontWeights.bold,
    height: UIConstants.iconSizes.check,
    flex: 1,
  }
});
