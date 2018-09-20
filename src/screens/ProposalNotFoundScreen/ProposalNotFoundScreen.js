import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Button, Text } from "native-base";
import styles from "./styles";

class ProposalNotFoundScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 32, paddingTop: 64, backgroundColor: "#FFF" }}>
                <Image style={styles.background} source={require("./images/bg.jpg")} resizeMode="contain" />

                <View>
                    <Text style={styles.title}>{"Desculpe-nos, não há farmácias, por enquanto, próximas de você cadastradas no TheFarma!"}</Text>
                    <Text style={styles.text}>{"Se você gostou dessa ideia, ajude-nos, compartilhando o TheFarma com as   farmácias e amigos próximos de você."}</Text>
                </View>

                <View>
                    <Button style={[styles.button, { alignItems: "center", justifyContent: 'center' }]} bordered dark onPress={this.props.onPress}>
                        <Text uppercase={false} style={[styles.buttonText, { alignSelf: 'center', }]}>{"Okay"}</Text>
                    </Button>
                </View>
            </View>
        )
    }
}

export default ProposalNotFoundScreen