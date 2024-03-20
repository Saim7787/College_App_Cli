import React, { useContext, useState } from 'react';
import { View, Text, Image,Dimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { ThemeContext } from '../../../Theme/ThemeContext';
import { lightTheme, darkTheme } from '../../../Theme/Color';
import { styles } from './Styles';
import AcademicHistory from './AcademicHistory';
import StudentProfile from './StudentProfile';
import { FONTSIZE } from '../../../Theme/FontSize';
import { FONTFAMILY } from '../../../Theme/FontFamily';


const renderScene = ({ route }) => {
  switch (route.key) {
    case 'Student Profile':
      return <StudentProfile />;
    case 'Academic History':
      return <AcademicHistory />;
    default:
      return null;
  }
};

const renderTabBar = (props) => {
    const themeContext = useContext(ThemeContext);
    const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;
  
    return (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'white' }} // Customize the indicator color
        style={{ backgroundColor:'#0961F5',elevation:2,marginBottom:15 }} // Customize the tab bar background color
        labelStyle={{fontSize:FONTSIZE.size_16,fontFamily:FONTFAMILY.Jost_SemiBold,textAlign:'center',}} // Customize the tab label color
      />
    );
  };

const Index = () => {
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

        {/* TabView */}
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{ width: Dimensions.get('window').width }}
        />
    
    </View>
  );
};

export default Index;
