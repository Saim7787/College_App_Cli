import { StyleSheet, Platform } from "react-native";
import { FONTFAMILY } from "../../../Theme/FontFamily";
import { FONTSIZE } from "../../../Theme/FontSize";
import { SPACING } from "../../../Theme/Spacing";
import { BORDERRADIUS } from "../../../Theme/BorderRadius";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.space_24,
    paddingVertical:SPACING.space_30
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
  }
})