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
    fontWeight: (Platform.OS === 'ios') ? Styles.fontWeights.bold : Styles.fontWeights.normal,
  },

  title: {
    fontWeight: (Platform.OS === 'ios') ? Styles.fontWeights.bold : Styles.fontWeights.thin,
  }

});

export default ComponentStyles;
