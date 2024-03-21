import { StyleSheet, Text, View,TouchableOpacity,Image,FlatList } from 'react-native'
import React,{useContext,useState} from 'react'
import { styles } from './Style'
import { ThemeContext } from '../../../Theme/ThemeContext'
import { lightTheme, darkTheme } from '../../../Theme/Color'
import HeaderButton from '../../../Component/Header Button'
import FooterButton from '../../../Component/Footer Button/Index'
const Index = () => {
    const themeContext = useContext(ThemeContext);
    const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
    const [selectedItem, setSelectedItem] = useState(null);
    const handletoggletheme = themeContext?.toggleTheme;
    const handleSignUp = () => {
        // Logic for handling sign-up
        console.log('Signing up...');
      };
        // Add more properties as needed
       

const myArray = [
  {
    title: 'Via Email',
    imageSource: require('../../../Assets/Auth/FillProfile/Circle.png'), // replace with actual image source
    text: 'priscilla.frank26@gmail.com',
  
  },
  {
    title: 'Via SMS',
    imageSource: require('../../../Assets/Auth/FillProfile/Circle.png'), // replace with actual image source 
    text: '( +1 ) 480-894-5529',
    // Add more properties as needed
  },
];
// ... (previous code)

const renderItem = ({ item, index }) => {
    const isSelected = index === selectedItem;
  
    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          {
            backgroundColor: isSelected ? theme.input_Background : theme.input_Background,
            borderWidth: isSelected ? 1 : 0,
            borderColor: isSelected ? theme.tertaryText : 'transparent',
          },
        ]}
        onPress={() => setSelectedItem(index)}
      >
        <Image source={item.imageSource} style={styles.image} />
        <View>
          <Text style={[styles.title, { color: theme.PrimarylightText }]}>{item.title}</Text>
          <Text style={[styles.text, { color: theme.primaryText }]}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  // ... (rest of the code)
  

  return (
    <View style={[styles.container,{backgroundColor:theme.primaryBackground}]}>
    <HeaderButton text='Forgot Password'/>

    <View style={styles.body_container}>
      <TouchableOpacity onPress={handletoggletheme}>   
<Text style={[styles.select_sentence,{color:theme.PrimarylightText}]}>Select which contact details should we use to Reset Your Password</Text>
</TouchableOpacity>

<View> 
<FlatList
      data={myArray}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
     </View>
    </View>
    <FooterButton text='Continue' handleSubmit={handleSignUp} />
    </View>
  )
}

export default Index
