import { MaskService } from "react-native-masked-text";

export const toMoney = (value) => {
    try {
        let valor = (parseFloat(value)).toFixed(2);
        return MaskService.toMask('money', valor);
    } catch (error) {
        console.log(error);
        return "R$ 0,00"
    }
}

export const toReal = (value) => {
    return parseFloat(`${value}`.replace(/\D/g, "")) / 100
}
