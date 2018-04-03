export default class Usuario {
  static schema = {
    name: "Usuario",
    primaryKey: "id",
    properties: {
      id: "int",
      nome: "string",
      sobrenome: "string",
      email: "string",
      token: "string",
      password: "string"
    }
  };
}
