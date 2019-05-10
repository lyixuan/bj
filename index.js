/**
 * @format
 */
import {AppRegistry} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {AppStackNavigator} from './AppNavigators';
import {name as appName} from './app.json';

require('./src/util/storage');

const AppStackNavigatorContainer = createAppContainer(AppStackNavigator);
AppRegistry.registerComponent(appName, () => AppStackNavigatorContainer);
