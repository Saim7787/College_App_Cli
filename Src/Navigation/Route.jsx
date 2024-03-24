import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
    }
  }, [userData]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={loggedIn ? 'Navigator' : 'Login'}>
        {loggedIn ? (
          <>
            {isAdmin ? (

              <>    
              <Stack.Screen name={'AdminNavigator'} component={AdminNavigator} />
              <Stack.Screen name={'Drawer'} component={MyDrawer} />

              </>

            ) : (
              <Stack.Screen name={'Navigator'} component={Navigator} />
            )}
        
          </>
        ) : (
          <>
            <Stack.Screen name={navgiationStrings.Slider} component={Slider} />
            <Stack.Screen name={navgiationStrings.Login} component={Login} />
            <Stack.Screen name={navgiationStrings.Register} component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
