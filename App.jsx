import React from 'react'
import { Provider } from 'react-redux'
import { store } from './Src/App/Store'
import { Theme } from './Src/Theme/ThemeContext'
import Route from './Src/Navigation/Route'
import { ThemeProvider, createTheme } from '@rneui/themed';
const App = () => {

 
  return (
    <Provider store={store}>
      <ThemeProvider>   
      <Theme>   

<Route/> 
      </Theme>
    </ThemeProvider>
    </Provider>
  )
}

export default App