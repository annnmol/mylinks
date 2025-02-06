// linking.ts
import * as Linking from 'expo-linking';
import productConfig from './product';

// Define your linking configuration
const linking = {
  prefixes: [Linking.createURL('/'), `${productConfig.identifier}://`],  // Include your custom scheme
  config: {
    screens: {
      'change-password': 'change-password/:token',
      // Define other screens here
    },
  },
};

export default linking;