import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    height: 24,
    width: 24,
    color: '$iconDefaultColor'
  },
  focusedIcon: {
      color: '$black'
  },
  badge: {
      marginTop: -10,
      backgroundColor: '$primaryColor'
  }
});
