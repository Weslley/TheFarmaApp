import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
  form: {
    marginLeft: 0,
    paddingLeft: 0,
    marginBottom: 24
  },
  formitem: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    color: "rgba(0,0,0,0.80)"
  },
  input: {
    width: '100%',
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    color: "#000000"
  },
  inputError: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: '#E91E63'
  },
  example: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: 'rgba(0,0,0,0.48)'
  },
  nbItem: {
    paddingLeft: 16
  },
  nbTextItem: {
    width: '95%',
    fontFamily: "Roboto-Bold",
    color: "$textColorPrimary",
    fontSize: 16,
    paddingHorizontal: 0, 
    paddingLeft: 0
  },
});
