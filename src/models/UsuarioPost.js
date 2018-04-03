export default class UsuarioPost {
  static schema = {
    name: "UsuarioPost",
    primaryKey: "id",
    properties: {
      id: "int",
      nome: "string",
      email: "string",
      foto: "string"
    }
  };
}
