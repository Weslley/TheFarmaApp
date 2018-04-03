export const serialize = (obj) => {
    let client = {}
    try {
        client["id"] = obj.id;
        if(obj.usuario.nome) client["nome"] = obj.usuario.nome;
        if(obj.usuario.email) client["email"] = obj.usuario.email;
        if(obj.usuario.token) client["token"] = obj.usuario.token;
        if(obj.cpf) client["cpf"] = obj.cpf;
        if(obj.data_nascimento) client["data_nascimento"] = obj.data_nascimento;
        if(obj.celular) client["celular"] = obj.celular;
        if(obj.foto) client["foto"] = obj.foto;
        if(obj.sexo) client["sexo"] = obj.sexo;
        if(obj.facebook_id) client["facebook_id"] = obj.facebook_id;

    } catch (e) {
        console.log("Erro ao serializar cliente");
    }
    return client;
}