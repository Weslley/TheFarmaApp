import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  title: {
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
    fontFamily: "Roboto-Medium",
    fontSize: 18,
    color: "rgba(0,0,0,0.80)"
  },
  containerParcel: {
    width: "100%",
    marginTop: 24,
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
  buttonText: {
    textAlign: 'center',
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    color: "#FFFFFF"
  }
});
