import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  text: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    color: "$textColorPrimary"
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
