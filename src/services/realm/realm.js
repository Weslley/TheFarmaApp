import Realm from 'realm';

/*
class Cliente extends Realm.Object { }
Cliente.schema = {
    name: "Cliente",
    primaryKey: "id",
    properties: {
        id: "int",
        nome: { type: 'string', optional: false },
        email: { type: 'string', optional: false },
        cpf: { type: 'string', optional: true },
        data_nascimento: { type: 'string', optional: true },
        celular: { type: 'string', optional: true },
        foto: { type: 'string', optional: true },
        sexo: { type: 'string', optional: true },
        facebook_id: { type: 'string', optional: true },
        token: { type: 'string', optional: true }
    }
};

class ProductHistory extends Realm.Object { }
Cliente.schema = {
    name: 'ProductHistory',
    primaryKey: 'nome',
    properties: {
        nome: { type: 'string', optional: false },
        ids: { type: 'int[]', optional: false },
        time: { type: 'date', optional: false },
    }
}
*/

class Cliente {
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

class ProductHistory {
    static schema  = {
        name: 'ProductHistory',        
        primaryKey: 'nome',
        properties: {
            nome: 'string',
            ids: 'int[]',
            time: 'date'
        }
    }
}

export default new Realm({ schema: [Cliente, ProductHistory] });

