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
  container1: {
    flex: 2
  },
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
    marginBottom: 9
  },
  Price: {
    fontFamily: "Roboto-Medium",
    fontSize: 18,
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
    height: 24
  },
  Button: {
    alignItems: "center",
    alignSelf: "center"
  },
  Icon: {
    width: 24,
    height: 24,
    color: "#000000",
    textAlign: "center"
  },
  Quantity: {
    fontFamily: "Roboto-Medium",
    fontSize: 20,
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
  TagTextImcomplete: { fontSize: 11, color: "#E91E63" }
});
