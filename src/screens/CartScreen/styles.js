import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  tabIcon: {
    width: 24,
    height: 24
  },
  listItem: {
    marginTop: 0,
    paddingTop: 0,
    marginLeft: 16,
    marginBottom: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingVertical: 0,
    marginRight: 0
  },
  containerDelivery: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  titleDialog: {
    fontFamily: "Roboto-Bold",
    fontSize: 22,
    color: "rgba(0,0,0,0.87)",
    marginBottom: 24
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  footer: {
    backgroundColor: "$background",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderColor: "#F3F3F3",
    borderTopWidth: 0.7,
  }
});
