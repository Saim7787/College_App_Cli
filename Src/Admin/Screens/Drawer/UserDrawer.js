import { createDrawerNavigator } from '@react-navigation/drawer';
import Messages from '../Messages/Messages';
import Call from '../CallLogs/Call';
import UserHome from '../UserHome/UserHome';
import { Text } from 'react-native';
import { FONTFAMILY } from '../../../Theme/FontFamily';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator screenOptions={{
      headerTitleAlign: 'center',
      headerTitle: props => (
        <Text style={{ fontFamily: FONTFAMILY.Poppins_SemiBold, fontSize: 16 }}>{props.children}</Text>
      ),
      drawerLabelStyle: {
        fontFamily: FONTFAMILY.Poppins_SemiBold,
        fontSize: 14
      }
    }}>
      <Drawer.Screen name="Home" component={UserHome} />
      <Drawer.Screen name="Messages" component={Messages} />
      <Drawer.Screen name="Call" component={Call} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
