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
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  header_image:{
    width:18,
    height:18
  },
  header_heading:{
    fontSize:FONTSIZE.size_24,
    fontFamily:FONTFAMILY.Jost_SemiBold,
    marginBottom:SPACING.space_4
  },
  header_subheading:{
fontSize:FONTSIZE.size_14,
fontFamily:FONTFAMILY.Mulish_Bold,

  },
  header_right:{
    borderWidth:1,
    borderColor:'#167F71',
    justifyContent:'center',
    alignItems:'center',
    width:40,
    height:40,
    borderRadius:40
  },
  search_container:{
    width:'100%',
    paddingHorizontal:SPACING.space_15,
    paddingVertical:SPACING.space_4,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:"center",
    gap:5,
    borderRadius:BORDERRADIUS.radius_15,
    elevation: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
marginTop:SPACING.space_15
  },
  input:{
    flex:1
  },
  Filter_image:{
    width:38,
    height:38
  },
  search_image:{
    width:20,
    height:20
  },
  menuItem:{
    width:'50%'
  },
  menuItemImage:{
    width:63,
    height:55,
  },
  menuItemTitle:{
    fontSize:FONTSIZE.size_14,
fontFamily:FONTFAMILY.Mulish_Bold,
marginTop:SPACING.space_4,
  },
  menuItem_container:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  }

})