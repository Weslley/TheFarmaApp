export default class Post {
  static schema = {
    name: "Post",
    primaryKey: "id",
    properties: {
      id: "int",
      titulo: "string",
      conteudo: "string",
      url_image_perfil: "string",
      url_image_content: "string",
      url_video_content: "string",
      url_referencia: "string",
      like: "bool",
      usuario_post: "UsuarioPost",
      curtidas: "int",
      data: "int",
      data_atualizacao: "int",
      tipo: "int"
    }
  };
}
