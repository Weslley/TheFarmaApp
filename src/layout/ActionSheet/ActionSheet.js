import React, { Component } from "react";
import {
  View,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ActionSheetIOS,
  TouchableOpacity,
  Dimensions,
  StatusBar
} from "react-native";

import { Text } from "native-base";
import { Components } from "../../helpers";

import styles from "./styles";

const { width, height } = Dimensions.get("screen");

class ActionSheet extends Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: true };
  }

  static actionsheetInstance;

  static setView(view) {
    this.actionsheetInstance._root.setState({
      content: view
    });
  }
  static show(config, callback) {
    this.actionsheetInstance._root.showActionSheet(config, callback);
    StatusBar.setHidden(true);
  }

  showActionSheet(config, callback) {
    if (Platform.OS === "ios") {
      if (typeof config.options[0] == "object") {
        let options = config.options;
        let filtered = options.map(item => {
          return item.text;
        });
        config.options = filtered;
        ActionSheetIOS.showActionSheetWithOptions(config, callback);
      } else {
        ActionSheetIOS.showActionSheetWithOptions(config, callback);
      }
    } else {
      this.setState({
        items: config.options,
        title: config.title,
        message: config.message,
        destructiveButtonIndex: config.destructiveButtonIndex,
        cancelButtonIndex: config.cancelButtonIndex,
        modalVisible: true,
        callback: callback
      });
    }
  }
  componentDidMount() {
    StatusBar.setHidden(true);

    if (this.props.callback) {
      this.setState({ callback: this.props.callback });
    }

    if (!this.props.autoHide && this.props.duration) {
      console.warn(`It's not recommended to set autoHide false with duration`);
    }
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
  }


  render() {
    StatusBar.setHidden(true);
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.state.callback(this.state.cancelButtonIndex);
          this.setState({ modalVisible: false });
          StatusBar.setHidden(false);
        }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : null}
          enabled
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: "rgba(0,0,0,0.4)",
              flex: 1,
              justifyContent: "flex-end"
            }}
            onPress={() => {
              this.state.callback(this.state.cancelButtonIndex);
              this.setState({ modalVisible: false });
            }}
          >
            <TouchableOpacity activeOpacity={1} style={{ elevation: 4 }}>
              {this.props.content}
            </TouchableOpacity>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

export default ActionSheet;
