import React, { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { getData } from '../Utility/Storage/Storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import navgiationStrings from '../Constant/navgiationStrings';
import { ForgotPassword, Login, NewPassword, Register, Slider, VerifyPassword } from '../Screens/index';
import Navigator from './Tab Navigation/Navigator';
import { useDispatch, useSelector } from 'react-redux';
import AdminNavigator from './Tab Navigation/AdminNavigator';
import MyDrawer from '../Admin/Screens/Drawer/UserDrawer';
import { persistUserSession } from '../Features/authSlice';

const Route = () => {
  const Stack = createNativeStackNavigator();
  const userData = useSelector((state) => state?.Auth?.User);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigation = useNavigation(); 
console.log('userdata',userData)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(persistUserSession());
  }, [dispatch]);

  useEffect(() => {
    if (userData && userData.user) {
      setLoggedIn(true);
      if (userData.user.role === 'admin' || userData.user.role === 'superAdmin') {
        setIsAdmin(true);
      }
    } else {
      setLoggedIn(false);

    }
  }, [userData, navigation]); 
  

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={loggedIn ? 'Navigator' : 'Login'}>
      {loggedIn ? (
        <>
          {isAdmin ? (
            <Stack.Group>    
              <Stack.Screen name={'AdminNavigator'} component={AdminNavigator} />
              <Stack.Screen name={'Drawer'} component={MyDrawer} />
            </Stack.Group>
          ) : (
            <Stack.Screen name={'Navigator'} component={Navigator} />
          )}
        </>
      ) : (
        <Stack.Group>
          <Stack.Screen name={'Login'} component={Login} />
          <Stack.Screen name={navgiationStrings.Slider} component={Slider} />
          <Stack.Screen name={navgiationStrings.Register} component={Register} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default Route;
