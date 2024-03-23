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
  userItem: {

    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    fontSize: 16,
    fontFamily:FONTFAMILY.Poppins_SemiBold,

  },
  userEmail: {
    fontSize: 14,
    fontFamily:FONTFAMILY.Poppins_SemiBold,

    color: '#666',
  },
  approveButton: {
    padding: 8,
    backgroundColor: '#0961F5',
    borderRadius: 5,
    fontFamily:FONTFAMILY.Jost_SemiBold,
    color: '#fff',

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
  }
})