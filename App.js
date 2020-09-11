import * as React from 'react';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {Provider as AuthProvider} from './src/context/AuthContext';
import {setNavigator} from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import AccountScreen from './src/screens/AccountScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SplashScreen from './src/screens/SplashScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';

const HomeStack=createStackNavigator({
  Home:HomeScreen
});

const AccountStack=createStackNavigator({
  Account:AccountScreen,
  Profile:ProfileScreen
});

const switchNavigator=createSwitchNavigator({
  ResolveAuth:ResolveAuthScreen,
  loginFlow:createStackNavigator({
    Splash:SplashScreen,
    Signin:SigninScreen,
    Signup:SignupScreen
  }),
  mainFlow:createMaterialBottomTabNavigator({
    HomeTab: {
      screen: HomeStack,
      navigationOptions:{
        title:'Glucose',
        tabBarIcon:({tintColor})=>{
          return (
            <Entypo
              name="line-graph"
              size={25}
              color={tintColor}
            />
          );
        }
      }
    },
    AccountTab: {
      screen: AccountStack,
      navigationOptions:{
        title:'Account',
        tabBarIcon:({tintColor})=>{
          return (
            <MaterialIcons 
              name="person" 
              size={25}
              color={tintColor}
            />
          );
        }
      } 
    }
  },{
    initialRouteName: 'HomeTab',
    activeColor: '#fff',
    inactiveColor: '#282c2e',
    barStyle: { backgroundColor: '#004da3' },
  })
});

const App=createAppContainer(switchNavigator);

export default()=>{
  return (
    <AuthProvider>
      <App ref={(navigator)=>{setNavigator(navigator);}}/>
    </AuthProvider>
  );
};
