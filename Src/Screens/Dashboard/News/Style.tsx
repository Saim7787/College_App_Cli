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
    newsItem: {
      flexDirection: 'row',
      marginBottom: 16,
      backgroundColor: 'white',
      borderRadius: 8,
      overflow: 'hidden',
    },
    newsImage: {
      width: 100,
      height: 100,
      resizeMode: 'cover',
    },
    newsDetails: {
      flex: 1,
      padding: 12,
    },
    newsTitle: {
      fontSize: FONTSIZE.size_17,

      fontFamily: FONTFAMILY.Jost_SemiBold,
      marginBottom: 2,
    },
    newsDate: {
      fontSize: FONTSIZE.size_14,

      fontFamily: FONTFAMILY.Mulish_Bold,
      marginBottom: 2,

    },
    newsDescription: {
        fontSize: FONTSIZE.size_13,

        fontFamily: FONTFAMILY.Mulish_Bold,
    },

 
})