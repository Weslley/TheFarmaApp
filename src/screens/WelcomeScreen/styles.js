import EStyleSheet from "react-native-extended-stylesheet";
export default EStyleSheet.create({
  icon: {
    width: 24,
    height: 24
  },
  background: {
    flex: 1,
    width: null,
    height: null,
    position: "absolute",
    //opacity: 0.7,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  searchBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12
  },
  searchBarText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: 'rgba(0,0,0,0.32)',
  },
  avatarContainer: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#ccc",
    overflow: 'hidden'
  },
  avatar: { width: 24, height: 24, },
  title: {
    fontFamily: 'Roboto-Black',
    fontSize: 30,
    color: '#FFFFFF',
  },
  subtitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#FFF'
  }
});
