import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
  Container: { paddingVertical: 16 },
  Header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8
  },
  PharmaName: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    color: "rgba(0,0,0,0.80)",
    marginBottom: 4
  },
  TagContainer: {
    backgroundColor: 'rgba(56,191,192,0.16)',
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 7,
    alignItems: "center"
  },
  TagText: {
    fontSize: 11,
    color: "#009688",
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
  TagContainerImcomplete: {
    backgroundColor: 'rgba(240,22,109,0.16);'
  },
  TagTextImcomplete: {
    color: '#F0166D',
  },
  Price: {
    fontFamily: "Roboto-Bold",
    fontSize: 18,
    color: "#38BFC0",
    textAlign: 'right',
  },
  Frete: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: 'rgba(0,0,0,0.48)',
    textAlign: 'right'
  },
  InfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16
  },
  InfoTextBold: {
    fontFamily: "Roboto-Medium",
    fontSize: 14,
    color: "rgba(0,0,0,0.80)"
  },
  InfoText: {
    fontSize: 14,
    color: "rgba(0,0,0,0.80)",
    fontFamily: "Roboto-Light"
  },
  InfoIcon: {
    width: 16,
    height: 16,
    marginRight: 8
  },
  view: {
    fontFamily: 'Roboto-Black',
    fontSize: 10,
    color: '#000000',
    textAlign: 'right'
  }
});
