import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, Platform } from "react-native";

import { Components } from "../../helpers";
import styles from "./styles";

class Header extends Component {
  static defaultProps = {
    style: {},
    separator: true,
    footerStyle: {},
    titleStyle: { letterSpacing: -1 },
    actionsStyle: { backgroundColor: "transparent" },
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>

        <View style={[styles.actions, this.props.actionsStyle]}>
          <View style={styles.menuLeft}>{this.props.menuLeft}</View>
          <View style={styles.menuRight}>{this.props.menuRight}</View>
        </View>

        {Components.renderIf(this.props.image,
          <Image style={[styles.image]} resizeMode="contain" source={this.props.image} />
        )}

        <TouchableOpacity style={[styles.profileContainer, { alignItems: 'center' }]} onPress={this.props.onPressProfile}>
          <View>
            {Components.renderIf(this.props.title,
              <Text style={[styles.title, this.props.titleStyle]}>{this.props.title}</Text>
            )}

            {Components.renderIf(
              this.props.subtitle,
              <Text style={styles.subtitle}>{this.props.subtitle}</Text>
            )}
          </View>

          {Components.renderIf(this.props.avatar,
            <View style={styles.avatarContainer}>
              <Image style={styles.avatar} resizeMode="contain" source={this.props.avatar} />
            </View>
          )}
        </TouchableOpacity>

        {Components.renderIf(this.props.footer,
          <View style={this.props.footerStyle}>{this.props.footer}</View>
        )}

        {Components.renderIf(this.props.separator, <View style={styles.separator} /> )}
      </View>
    );
  }
}

export default Header;