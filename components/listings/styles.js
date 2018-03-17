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
    height: 17,
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
    color: Colors.green,
    fontSize: 17,
    fontWeight: '500',
  },

  button: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
