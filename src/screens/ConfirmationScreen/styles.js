import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  title: {
    paddingTop: 24,
    marginBottom: 16,
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    color: "rgba(0,0,0,0.80)"
  },
  footerOrder: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  footerOrderTitle: {
    flex: 2,
    textAlign: "right",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "rgba(0,0,0,0.32)"
  },
  footerOrderText: {
    flex: 1,
    textAlign: "right",
    fontFamily: "Roboto-Regular",
    fontSize: 18,
    color: "rgba(0,0,0,0.80)"
  },
  containerParcel: { flexDirection: "row", justifyContent: "space-between", marginTop: 24 },
  parcelTitle: { fontFamily: "Roboto-Bold", fontSize: 16, color: "rgba(0,0,0,0.80)" },
  parcelText: { fontFamily: "Roboto-Medium", fontSize: 18, color: "rgba(0,0,0,0.87)" }
});
