import { createDrawerNavigator } from '@react-navigation/drawer';
import Messages from '../Messages/Messages';
import Call from '../CallLogs/Call';
import UserHome from '../UserHome/UserHome';
import { Text } from 'react-native';
import { FONTFAMILY } from '../../../Theme/FontFamily';
import { darkTheme, lightTheme } from '../../../Theme/Color';
import { styles } from './Style';
import { ThemeContext } from '../../../Theme/ThemeContext';
import { useContext } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Drawer = createDrawerNavigator();

function MyDrawer({route, navigation}) {
  const themeContext = useContext(ThemeContext);
    const theme = themeContext?.isDarkTheme ? darkTheme : lightTheme;

   
  return (
    <Drawer.Navigator screenOptions={{
      headerTitleAlign: 'center',
      headerTitle: props => (
        <Text style={{ fontFamily: FONTFAMILY.Poppins_SemiBold, fontSize: 16,color:theme.primaryText }}>{props.children}</Text>
      ),
      headerStyle: { backgroundColor: '#0961F5' },
     
      drawerContentContainerStyle: {
        backgroundColor: theme.primaryBackground,
        height:hp("100%")

      },
      drawerLabelStyle: {
        fontFamily: FONTFAMILY.Poppins_SemiBold,
        fontSize: 14,
        color:theme.primaryText
      },
      drawerActiveBackgroundColor:'#0961F5',
      drawerActiveTintColor:"#fff",
      
      
    }}>
      <Drawer.Screen name="Home" component={UserHome} />
      <Drawer.Screen name="Messages" component={Messages} />
      <Drawer.Screen name="Call" component={Call} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
