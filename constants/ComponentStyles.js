import { 
  Platform,
  StyleSheet,
} from 'react-native';
import UIConstants from './UIConstants';
import Colors from './Colors';

const ComponentStyles = StyleSheet.create({

  buttonContainer: {
    borderRadius: UIConstants.cornerRadii.standard,
    padding: UIConstants.margins.standard,
  },

  buttonText: {
    color: Colors.white,
    fontSize: UIConstants.fontSizes.normal,
    fontWeight: UIConstants.fontWeights.bold,
  },

  title: {
    fontWeight: (Platform.OS === 'ios') ? UIConstants.fontWeights.bold : UIConstants.fontWeights.normal,
  },
});

export default ComponentStyles;
