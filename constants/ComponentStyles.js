import { 
  Platform,
  StyleSheet,
} from 'react-native';
import Styles from './Styles';
import Colors from './Colors';

const ComponentStyles = StyleSheet.create({

  buttonContainer: {
    borderRadius: Styles.cornerRadii.standard,
    padding: Styles.margins.standard,
  },

  buttonText: {
    color: Colors.white,
    fontSize: Styles.fontSizes.normal,
    fontWeight: Styles.fontWeights.bold,
  },

  title: {
    fontWeight: (Platform.OS === 'ios') ? Styles.fontWeights.bold : Styles.fontWeights.normal,
  }

});

export default ComponentStyles;
