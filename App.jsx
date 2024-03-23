import React from 'react'
import { Provider } from 'react-redux'
import { store } from './Src/App/Store'
import { Theme } from './Src/Theme/ThemeContext'
import Route from './Src/Navigation/Route'
import { ThemeProvider, createTheme } from '@rneui/themed';
import Toast from 'react-native-toast-message'
const App = () => {

 
  return (
    <>    
    <Provider store={store}>
      <ThemeProvider>   
      <Theme>   

<Route/> 
      </Theme>

      
    </ThemeProvider>
    </Provider>

<Toast
position='top'
bottomOffset={20}
/>
</>
  )
}

export default App