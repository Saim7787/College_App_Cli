import { StyleSheet, Platform } from "react-native";
import { FONTFAMILY } from "../../../Theme/FontFamily";
import { FONTSIZE } from "../../../Theme/FontSize";
import { SPACING } from "../../../Theme/Spacing";
import { BORDERRADIUS } from "../../../Theme/BorderRadius";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.space_24,
    paddingVertical:SPACING.space_10
  },
 
  profile_image:{
   
    alignSelf:'center',
    marginTop:SPACING.space_15,
    
    
  },
  image:{
    width:100,
    height:100,
    borderRadius:100,
    borderColor:'#167F71',
    borderWidth:4,
  },
  profile_name:{
    fontSize:FONTSIZE.size_24,
    fontFamily:FONTFAMILY.Jost_SemiBold,
    textAlign:'center'
  },
  profile_mail:{
    fontSize:FONTSIZE.size_12,
    fontFamily:FONTFAMILY.Mulish_Bold,
    textAlign:'center',
    marginBottom:SPACING.space_20

},
scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab_view:{
    marginTop:SPACING.space_16
  },
  label_tab:{
    fontSize:FONTSIZE.size_18,
    fontFamily:FONTFAMILY.Jost_SemiBold,
    textAlign:'center'
  },

  scene: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#fff',
  },
  tabIndicator: {
    backgroundColor: '#00cc00',
  },
  tabLabel: {
    color: '#fff',
  },
  button_Text:{
    fontFamily:FONTFAMILY.Jost_SemiBold,
color:"#fff"
  },
  input: {
    width: '100%',
    fontFamily: FONTFAMILY.Mulish_Bold,
    fontSize: FONTSIZE.size_14,
    paddingHorizontal: SPACING.space_18,
    paddingVertical: SPACING.space_2,
  borderRadius: BORDERRADIUS.radius_12,
  ...Platform.select({
    ios: {
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
    },
    android: {
      elevation: 0.5,
    },
  }),
  },
})