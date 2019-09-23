import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingRight: 0,
    backgroundColor: "$background"
  },
  ImageContainer: {
    marginRight: 16
  },
  Image: {},
  container1: { flex: 2 },
  ProductName: {
    width: "100%",
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    color: "rgba(0,0,0,0.80)",
    marginBottom: 4
  },
  ApresentationName: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    marginBottom: 8,
    width: "100%"
  },
  Maker: {
    fontFamily: "Roboto-Bold",
    fontSize: 10,
    width: "100%",
    marginBottom: 4,
    color: "rgba(0,0,0,0.40)",
  },
  Price: {
    fontFamily: "Roboto-Medium",
    fontSize: 20,
    color: "#00C7BD"
  },
  Footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  Actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 24,
  },
  Button: {
    alignItems: "center",
    alignSelf: "center"
  },
  Icon: {
    width: 24,
    height: 24,
    textAlign: "center"
  },
  Quantity: {
    fontFamily: "Roboto-Medium",
    fontSize: 18,
    textAlign: "center",
    width: 24,
    height: 24,
    marginRight: 8
  },
  TagContainerImcomplete: {
    borderColor: "#E91E63",
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 7,
    alignItems: "center"
  },
  TagTextImcomplete: { 
    fontSize: 11, color: "#E91E63" 
  },
  dosage: {
    fontSize: 10,
    width: "100%",
    marginBottom: 4,
    color: 'rgba(0,0,0,0.40)',
    fontFamily: "Roboto-Regular",
  },
  txtDisable:{
    color: 'rgba(0,0,0,0.40)',
    textDecorationLine: 'line-through'
  },
  priceV2: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: 'rgba(0,0,0,0.87)'
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
  tagDisable: {
    backgroundColor: 'rgba(0,0,0,0.04);'
  },
  tagDisableText: {
    color: 'rgba(0,0,0,0.40);'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
