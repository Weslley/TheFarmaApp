import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  title: {
    marginBottom: 16,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "rgba(0,0,0,0.80)"
  },
  footerOrderTitle: {
    width: '50%',
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "rgba(0,0,0,0.32)",
    textAlign: 'right',
  },
  footerOrderText: {
    fontFamily: "Roboto-Medium",
    fontSize: 18,
    color: "rgba(0,0,0,0.80)",
    textAlign: 'right',
  },
  containerParcel: {
    width: "100%",
    marginTop: 24
  },
  row: {
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "space-between"
  },
  parcelTitle: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    color: "rgba(0,0,0,0.80)"
  },
  parcelText: {
    fontFamily: "Roboto-Medium",
    fontSize: 18,
    color: "rgba(0,0,0,0.87)"
  },
  nbItem: {
    paddingLeft: 16
  },
  nbTextItem: {
    width: '95%',
    fontFamily: "Roboto-Bold",
    color: "rgba(0,0,0,0.80)",
    fontSize: 16,
    paddingHorizontal: 0,
    paddingLeft: 0
  },
});
