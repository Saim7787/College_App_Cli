import React, { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { store } from './Src/App/Store'
import { Theme } from './Src/Theme/ThemeContext'
import Route from './Src/Navigation/Route'
import { ThemeProvider, createTheme } from '@rneui/themed';
import Toast from 'react-native-toast-message'

import {enableLatestRenderer} from 'react-native-maps';
import { NavigationContainer } from '@react-navigation/native'
import { SocketProvider } from './Src/Theme/Socket'

enableLatestRenderer();
const App = () => {
 
 
  return (
    <>    
    <Provider store={store}>
      <ThemeProvider>   
      <Theme>   
        <SocketProvider>    
      <NavigationContainer>

        <Route/>

    </NavigationContainer>
    </SocketProvider>
      </Theme>

      
    </ThemeProvider>
    <Toast
position='top'
bottomOffset={20}
/>
    </Provider>


</>
  )
}

export default App