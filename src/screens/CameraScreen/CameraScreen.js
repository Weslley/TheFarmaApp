import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, TouchableHighlight, Image, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';

import { connect } from "react-redux";
import { setPhoto } from "../../actions/clients"

import { Icon } from "../../components/Icon";

const windowSize = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    preview: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: windowSize,
        width: windowSize
    },
    previewFoto: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: windowSize,
        width: windowSize
    },
    capture: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 5,
        backgroundColor: 'transparent',
        borderColor: '#FFF',
        marginTop: 15,
    },
    backButton: {
        position: "absolute",
        top: 0,
        flex: 0.3,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flipButton: {
        position: "absolute",
        right: 0,
        bottom: 0,
        flex: 0.3,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewFoto: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    flipText: {
        color: 'white',
        fontSize: 15,
    },
});

class CameraScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: null,
            base64: null,
            type: 'back'
        };
    }

    static navigationOptions = ({ navigation }) => {
        return { header: null };
    };

    /* Private */
    onBack() {
        this.props.navigation.goBack(null);
    }

    savePhoto() {
        let params = { path: this.state.path, base64: this.state.base64 }
        this.props.dispatch(setPhoto(params));

        this.props.navigation.goBack(null);
        /*
        CameraRoll.saveToCameraRoll(this.state.path, 'photo').then((result) => {
            let params = { path: result }
            this.props.dispatch(setPhoto(params));
            this.onBack();
            return;
        }).then((error) => {
            console.log(error);
        }) 
        */
        //this.props.navigation.navigate({ key: 'perfiledit1', routeName: 'PerfilEdit', params: { photo: this.state.path } });
    }

    toggleFacing() {
        this.setState({ type: this.state.type === 'back' ? 'front' : 'back' });
    }

    takePicture = async function () {
        if (this.camera) {
            const options = { quality: 1, width: 1000, height: 1000, fixOrientation: true, base64: true };
            this.camera.takePictureAsync(options).then(data => {
                console.log('data: ', data);
                this.setState({ path: data.uri, base64: data.base64 });
            }).catch((error) => {
                console.log(error)
            });

        }
    };

    renderCamera() {
        return (
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View>
                    <RNCamera
                        fixOrientation={false}
                        ref={(cam) => { this.camera = cam; }}
                        style={styles.preview}
                        type={this.state.type}
                    />

                    <TouchableOpacity style={styles.flipButton} onPress={() => { this.toggleFacing() }}>
                        <Icon name="ios-reverse-camera-outline" size={35} color={"#FFF"} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.backButton} onPress={() => { this.onBack() }}>
                        <Icon name="arrow-long-left" size={24} color={"#FFF"} />
                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: 'center', marginBottom: 24, }}>
                    <TouchableHighlight underlayColor="rgba(255, 255, 255, 0.5)" style={styles.capture} onPress={() => { this.takePicture() }}>
                        <View />
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    renderImage() {
        return (
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View>
                    <Image source={{ uri: this.state.path }} style={styles.previewFoto} />
                    <TouchableOpacity
                        style={{ position: "absolute", right: 0, top: 0, padding: 16, }}
                        onPress={() => { this.setState({ path: null }) }}>
                        <Icon name="close" size={35} color={"#F0166D"} />
                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: 'center', marginBottom: 24, }}>
                    <TouchableOpacity style={{ padding: 16, }} onPress={() => { this.savePhoto() }}>
                        <Icon name="check" size={35} color={"#7ED321"} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.path ? this.renderImage() : this.renderCamera()}
            </View>
        );
    }
};

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(CameraScreen);