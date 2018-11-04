import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Button, Text } from "native-base";
import { Components } from "../../helpers";
import styles from "./styles";
class ProposalNotFoundScreen extends Component {
    static defaultProps = {
        timeout: false
    }

    constructor(props) {
        super(props);
    }

    static navigationOptions = ({ navigation }) => {
        return { header: null };
    };

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 32, paddingTop: 64, backgroundColor: "#FFF" }}>
                <Image style={styles.background} source={require("./images/bg.jpg")} resizeMode="contain" />

                {Components.renderIfElse(this.props.timeout,
                    <View>
                        <Text style={[styles.title, { textAlign: 'center', marginBottom: 100, }]}>{"Nenhuma farmácia próxima a você visualizou a sua proposta."}</Text>
                    </View>,
                    <View>
                        <Text style={styles.title}>{"Desculpe, Por enquanto não há farmácias cadastradas no TheFarma próximas de você!"}</Text>
                        <Text style={styles.text}>{"Se você gostou dessa ideia, ajude-nos, compartilhando o TheFarma com as farmácias e amigos próximos de você."}</Text>
                    </View>,
                )}

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