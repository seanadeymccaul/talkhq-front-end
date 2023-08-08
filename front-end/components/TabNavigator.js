import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreens/LoginScreen';
import ForgotPassword from '../screens/LoginScreens/ForgotPasswordScreen';

import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';

import { COLOURS } from '../styles/colours';
import ResourcesInfo from '../screens/ResourcesInfo';
import HomeScreen from '../screens/HomeScreen';
import ResourcesScreen from '../screens/ResourcesScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import ProfileScreen from '../screens/ProfileScreens/ProfileScreen';
import BlogsScreen from '../screens/ContentScreens/BlogsScreen';
import VlogsScreen from '../screens/ContentScreens/VlogsScreen';
import OthersScreen from '../screens/ContentScreens/OthersScreen';
import AboutScreen from '../screens/ProfileScreens/AboutScreen';
import AccountScreen from '../screens/ProfileScreens/AccountScreen';
import GetinTouchScreen from '../screens/ProfileScreens/GetinTouchScreen';
import CreateAccountScreen from '../screens/LoginScreens/CreateAccountScreen';
import FavouriteButton from './FavouriteButton';
import PolicyScreen from '../screens/AboutUsScreens/PolicyScreen';

import GetSupportScreen from '../screens/HelpScreens/GetSupportScreen';
import ManageResourcesScreen from '../screens/adminScreens/ManageResourcesScreen';
import AdminUserEdit from '../screens/adminScreens/AdminUserEdit';
import AdminUserDelete from '../screens/adminScreens/AdminUserDelete';
import PrivacyPage from '../screens/adminScreens/PrivacyPage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  //Load quicksand font from package
  const[loaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });
  
  //make sure that non-system fonts have loaded before loading
  if (!loaded) {
    return null;
  }

  
  return (
    <Stack.Navigator
    /*screenOptions={{
      tabBarInactiveBackgroundColor: COLOURS.purple,
      tabBarActiveBackgroundColor: COLOURS.purple,
      tabBarActiveTintColor: COLOURS.aqua,
      tabBarInactiveTintColor: 'white',
      tabBarStyle: {flex: 0.06},
      tabBarHideOnKeyboard: true,
    }}*/
    >
      <Stack.Screen
        options={{
          headerShown:false,
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:COLOURS.purple,
          },
          headerTitleStyle:{fontFamily:"Quicksand_600SemiBold",color:"white"},
        }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
          options={{
          headerShown:true,
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:COLOURS.purple,
          },
          headerTitleStyle:{fontFamily:"Quicksand_600SemiBold",color:"white"},
        }}
        name="Create Account"
        component={CreateAccountScreen}
      />
      <Stack.Screen
          options={{
          headerShown:true,
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:COLOURS.purple,
          },
          headerTitleStyle:{fontFamily:"Quicksand_600SemiBold",color:"white"},
        }}
        name="Forgot Password"
        component={ForgotPassword}
      />
      <Stack.Screen
        name="LandingPage"
        component={LandingPage}
        options={{
          headerShown:false
        }}
      />

      <Stack.Screen
        name="AdminLandingPage"
        component={AdminLandingPage}
        options={{
          headerShown:false
        }}
      />

    </Stack.Navigator>
  )
      }  


  const AdminLandingPage = () => {
    return(
      <Stack.Navigator>
        <Stack.Screen 
          options={{
            headerShown:false,
          }}
          name="AdminHomeTabs"
          component={AdminHomeTabs}
        />
        <Stack.Screen 
          options={{
            headerShown:true,
            headerTitleAlign:'center',
            headerStyle:{
              backgroundColor:COLOURS.purple,
            },
            headerTitleStyle:{fontFamily:"Quicksand_600SemiBold",color:"white"},
          }}
          name="Details"
          component={ResourcesInfo}
        />
  

      </Stack.Navigator>
    )

  }
  
  
   
  const LandingPage = () => {
    return (
      <Stack.Navigator
        // screenOptions={{
        //   tabBarInactiveBackgroundColor: COLOURS.purple,
        //   tabBarActiveBackgroundColor: COLOURS.purple,
        //   tabBarActiveTintColor: COLOURS.aqua,
        //   tabBarInactiveTintColor: 'white',
        //   tabBarStyle: {flex: 0.06},
        //   tabBarHideOnKeyboard: true,
        // }}
      >
        <Stack.Screen
          options={{
            headerShown:false,
          }}
          name="HomeTabs"
          component={HomeTabs}
        />
        <Stack.Screen 
          options={{
            headerShown:true,
            headerTitleAlign:'center',
            headerRight: () => (
              <FavouriteButton/>
            ),
            headerStyle:{
              backgroundColor:COLOURS.purple,
            },
            headerTitleStyle:{fontFamily:"Quicksand_600SemiBold",color:"white"},
          }}
          name="Details"
          component={ResourcesInfo}
        />

        {/* profile Stack */}
        <Stack.Screen 
          options={{
            headerShown:true,
            headerTitleAlign:'center',
            headerStyle:{
              backgroundColor:COLOURS.purple,
            },
            headerTitleStyle:{fontFamily:"Quicksand_600SemiBold",color:"white"},
          }}
          name="About Us"
          component={AboutScreen}
        />
        <Stack.Screen 
          options={{
            headerShown:true,
            headerTitleAlign:'center',
            headerStyle:{
              backgroundColor:COLOURS.purple,
            },
            headerTitleStyle:{fontFamily:"Quicksand_600SemiBold",color:"white"},
          }}
          name="Get in Touch"
          component={GetinTouchScreen}
        />
        
        {/* <Stack.Screen 
          options={{
            headerShown:true,
            headerTitleAlign:'center',
            headerStyle:{
              backgroundColor:COLOURS.purple,
            },
            headerTitleStyle:{fontFamily:"Quicksand_600SemiBold",color:"white"},
          }}
          name="Settings"
          component={SettingsScreen}
        /> */}
        <Stack.Screen 
          options={{
            headerShown:true,
            headerTitleAlign:'center',
            headerStyle:{
              backgroundColor:COLOURS.purple,
            },
            headerTitleStyle:{fontFamily:"Quicksand_600SemiBold",color:"white"},
          }}
          name="Account"
          component={AccountScreen}
        />

        {/* About Stack */}
        <Stack.Screen 
          options={{
            headerShown: true,
            headerTitleAlign:'center',
            headerStyle:{
              backgroundColor:COLOURS.purple,
            },
            headerTitleStyle:{fontFamily:"Quicksand_600SemiBold",color:"white"},
          }}
          name="Privacy Policy"
          component={PolicyScreen}
        />

        {/* Help Stack */}
        <Stack.Screen 
          options={{
            headerShown: true,
            headerTitleAlign:'center',
            headerStyle:{
              backgroundColor:COLOURS.purple,
            },
            headerTitleStyle:{fontFamily:"Quicksand_600SemiBold",color:"white"},
          }}
          name="Get Support"
          component={GetSupportScreen}
        />
        {/* <Stack.Screen 
          options={{
            headerShown: true,
            headerTitleAlign:'center',
            headerStyle:{
              backgroundColor:COLOURS.purple,
            },
            headerTitleStyle:{fontFamily:"Quicksand_600SemiBold",color:"white"},
          }}
          name="Leave Feedback"
          component={LeaveFeedbackScreen}
        />
        <Stack.Screen 
          options={{
            headerShown: true,
            headerTitleAlign:'center',
            headerStyle:{
              backgroundColor:COLOURS.purple,
            },
            headerTitleStyle:{fontFamily:"Quicksand_600SemiBold",color:"white"},
          }}
          name="Booking"
          component={BookingScreen}
        /> */}

        
      </Stack.Navigator>
  );
}

const ResourceStack = () => {
  return(
    <Stack.Navigator>   
      <Stack.Screen
        name="Resources"
        component={ResourceTabs}
        options={{
          headerShown:true,
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:COLOURS.purple,
          },
          headerTitleStyle:{fontFamily:"Quicksand_600SemiBold",color:"white"},
          }}
          
      />
    </Stack.Navigator>
  )
}

const AdminHomeTabs = () => {
  return(
    <Tab.Navigator
    screenOptions={{
      tabBarLabelPosition: "below-icon",
    tabBarLabelStyle: {
      fontSize: 12
    }, tabBarIconStyle: { display: "none" }}}>
      <Tab.Screen 
        options={{
          headerShown:true,
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:COLOURS.purple,
          },
          headerTitleStyle:{fontFamily:"Quicksand_600SemiBold",color:"white"},
        }}
        name="Add Resource"
        component={ManageResourcesScreen}
      />
      <Tab.Screen
        options={{
          headerShown:false,
        }}
          name="Browse" 
          component={ResourceStack}
        />
      <Tab.Screen 
        options={{
          headerShown:true,
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:COLOURS.purple,
          },
          headerTitleStyle:{fontFamily:"Quicksand_600SemiBold",color:"white"},
        }}
        name="Edit User"
        component={AdminUserEdit}
      />
      <Tab.Screen 
        options={{
          headerShown:true,
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:COLOURS.darkGrey,
          },
          headerTitleStyle:{fontFamily:"Quicksand_600SemiBold",color:"red"},
        }}
        name="Delete User"
        component={AdminUserDelete}
      />
      <Tab.Screen 
        options={{
          headerShown:true,
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:COLOURS.purple,
          },
          headerTitleStyle:{fontFamily:"Quicksand_600SemiBold",color:"white"},
        }}
        name="Privacy"
        component={PrivacyPage}
      />
    </Tab.Navigator>
  )
}

const HomeTabs = () => {
  return(
    <Tab.Navigator>
      <Tab.Screen
        name="Home" 
        component={HomeScreen}
        options={{
          headerShown:false,
          tabBarLabel:"Home",
          headerTitleStyle:{fontFamily:"Quicksand_600SemiBold"},
          tabBarIcon: ({focused}) => {
            const iconimg = focused ? require('../assets/home-icon.png') : require('../assets/home-icon.png')
            return(
                    <Image 
            source={iconimg}
            style={{height:30,width:30}}
            />
            )
            
          }
        }}
      />
      <Tab.Screen
        name="Resource" 
        component={ResourceStack}
        options={{
          headerShown:false,
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:COLOURS.aqua,
          },
          tabBarLabel:"Resources",
          headerTitleStyle:{fontFamily:"Quicksand_600SemiBold"},
          tabBarIcon: ({focused}) => {
            const iconimg = focused ? require('../assets/resources-icon.png') : require('../assets/resources-icon.png')
            return(
                    <Image 
            source={iconimg}
            style={{height:38,width:38}}
            />
            )
            
          }
        }}
      />
      <Tab.Screen
        name="Favourites" 
        component={FavouritesScreen}
        options={{
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:COLOURS.purple,
          },
          tabBarLabel:"Favourites",
          headerTitleStyle:{fontFamily:"Quicksand_600SemiBold",color:"white"},
          tabBarIcon: ({focused}) => {
            const iconimg = focused ? require('../assets/favourites-icon.png') : require('../assets/favourites-icon.png')
            return(
                    <Image 
            source={iconimg}
            style={{height:35,width:35}}
            />
            )
            
          }
        }}
      />
      <Tab.Screen
        name="Profile" 
        component={ProfileScreen}
        options={{
          headerShown:true,
          tabBarLabel:"Profile",
          headerTitleStyle:{fontFamily:"Quicksand_600SemiBold"},
          headerTitleAlign:'center',
          tabBarIcon: ({focused}) => {
            const iconimg = focused ? require('../assets/profile-icon.png') : require('../assets/profile-icon.png')
            return(
                    <Image 
            source={iconimg}
            style={{height:40,width:40}}
            />
            )
          }
        }}
      />
    </Tab.Navigator>
  )
}


const ResourceTabs = () => {
  const Tab = createMaterialTopTabNavigator();
  return(
    <Tab.Navigator 
      // screenOptions={{
      // }}
    >
      <Tab.Screen
        name="All" 
        component={ResourcesScreen}
      />
      <Tab.Screen
        name="Blogs" 
        component={BlogsScreen}
      />
      <Tab.Screen
        name="Vlogs" 
        component={VlogsScreen}
      />
      <Tab.Screen
        name="Others" 
        component={OthersScreen}
      />
    </Tab.Navigator>
  )
}


export default TabNavigator;




const scrollstyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshMessage:{
    width:380,
    height:30,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop:0
  },
  image: {
    marginTop:0,
    marginBottom:0,
    resizeMode: 'contain',
    alignSelf: 'center',
    width:40,
    height:40,
    zIndex:1,
    marginTop: -65,
    marginLeft:630
  },
  resources: {
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop:10,
    marginBottom:10,
    width:320,
    height:320
  },
  scroller: {
    width:360
  },
  favbutton: {
    height: 40,
    width: 40,
  }
})