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
    marginBottom: 8,
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    color: "rgba(0,0,0,0.80)"
  },
  subtitle:{
    fontFamily: "Roboto-Light",
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
    fontFamily: "Roboto-Bold",
    fontSize: 18,
    color: "rgba(0,0,0,0.80)",
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
  },
  tag: {
    backgroundColor: 'rgba(56,191,192,0.16);',
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 7,
    alignItems: "center"
  },
  tagText: {
    fontSize: 11,
    color: "#009688",
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
  tagDanger: {
    backgroundColor: 'rgba(240,22,109,0.16);'
  },
  tagDangerText: {
    color: '#F0166D',
  },
  tagWarning: {
    backgroundColor: 'rgba(245,166,35,0.16);'
  },
  tagWarningText: {
    color: '#F57223',
  },
});
