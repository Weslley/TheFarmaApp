import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  Container: { paddingTop: 16, paddingBottom: 16 },
  Header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8
  },
  PharmaName: {
    width: "100%",
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    color: "rgba(0,0,0,0.80)",
    marginBottom: 4
  },
  TagContainer: {
    borderColor: "#009688",
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 7,
    alignItems: "center"
  },
  TagText: { fontSize: 11, color: "#009688" },
  TagContainerImcomplete: {
    borderColor: "#E91E63",
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 7,
    alignItems: "center"
  },
  TagTextImcomplete: { fontSize: 11, color: "#E91E63" },
  Price: { fontFamily: "Roboto-Bold", fontSize: 18, color: "rgba(0,0,0,0.80)" },
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
  InfoIcon: { width: 16, height: 16, marginRight: 8 }
});
