import { StyleSheet, Platform } from "react-native";
import { FONTFAMILY } from "../../../Theme/FontFamily";
import { FONTSIZE } from "../../../Theme/FontSize";
import { SPACING } from "../../../Theme/Spacing";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.space_24,
    paddingVertical:SPACING.space_10

  },
  notificationContainer: {
    padding: 18,
    borderWidth: 2,
    borderColor: 'rgba(180, 189, 196, 0.20)',
    marginBottom:12,
    borderRadius:18,

  },
  title: {
    fontSize: 18,
 fontFamily:FONTFAMILY.Jost_SemiBold,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    fontFamily:FONTFAMILY.Mulish_Bold,
    
  },

})