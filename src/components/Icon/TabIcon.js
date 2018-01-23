import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Badge, Icon, Text } from 'native-base';

import styles from './styles';

const TabIcon = ({ name, size, focus = false }) => {
  const iconStyles = [styles.icon];
  if (focus) {
    iconStyles.push(styles.focusedIcon);
  }
  return (
    <View>
      <Icon name={name} style={iconStyles} />
      {size >= 1 ? (
        <Badge style={styles.badge}>
          <Text>{size}</Text>
        </Badge>
      ) : null}
    </View>
  );
};

TabIcon.props = {
  name: PropTypes.string,
  size: PropTypes.number,
  focus: PropTypes.bool
};

export default TabIcon;
