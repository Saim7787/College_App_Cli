import React, { useContext, useState } from 'react';
import { View, Text, Image,Dimensions } from 'react-native';
import { ThemeContext } from '../../../Theme/ThemeContext';
import { lightTheme, darkTheme } from '../../../Theme/Color';
import { styles } from './Styles';
import StudentProfile from './StudentProfile';
import { FONTSIZE } from '../../../Theme/FontSize';
import { FONTFAMILY } from '../../../Theme/FontFamily';



const AdminProfile = () => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  const handletoggletheme = themeContext?.toggleTheme
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'Student Profile', title: 'Student Profile' },
    { key: 'Academic History', title: 'Academic History' },
  ]);


  
 
  return (
    <View style={[styles.container,{backgroundColor:theme.primaryBackground}]}>
     
        <View style={styles.profile_image}>
          <Image source={require('../../../Assets/Dashboard/profile/Image.png')} style={styles.image} />
        </View>
        <Text style={[styles.profile_name, { color: theme.primaryText }]}>James S. Hernandez</Text>
        <Text style={[styles.profile_mail, { color: theme.PrimarylightText }]}>hernandex.redial@gmail.ac.in</Text>
        <StudentProfile />
    </View>
  );
};

export default AdminProfile;
