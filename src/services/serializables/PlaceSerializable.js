export const serialize = (obj) => {
    let address = {}
    try {

        if (obj.id) address["id"] = obj.id;
        if (obj.primaryText) address["name"] = obj.primaryText;
        if (obj.secondaryText) address["address"] = obj.secondaryText;
        if (obj.placeID) address["place_id"] = obj.placeID;

    } catch (e) {
        console.log("Erro ao serializar endereço!");
    }
    return address;
}
