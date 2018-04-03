export default class Cliente {
  static schema = {
    name: "Cliente",
    primaryKey: "id",
    properties: {
      id: "int",
      nome: {type : 'string', optional: false},
      email: {type : 'string', optional: false},
      cpf: {type : 'string', optional: true},
      data_nascimento: {type : 'string', optional: true},
      celular: {type : 'string', optional: true},
      foto: {type : 'string', optional: true},
      sexo: {type : 'string', optional: true},
      facebook_id: {type : 'string', optional: true},
      token: {type : 'string', optional: true}
    }
  };
}
