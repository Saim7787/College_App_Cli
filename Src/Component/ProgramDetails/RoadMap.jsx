import { StyleSheet, Text, View } from 'react-native'
import React,{useContext} from 'react'
import { ThemeContext } from '../../Theme/ThemeContext'
import { lightTheme, darkTheme } from '../../Theme/Color'

const RoadMap = () => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  return (
    <View style={[styles.container,{backgroundColor:theme.primaryBackground}]}>
      <Text style={{color:theme.primaryText}}>RoadMap</Text>
    </View>
  )
}

export default RoadMap

const styles = StyleSheet.create({
   
    container: {
      flex: 1,
     paddingHorizontal:20
    }
})