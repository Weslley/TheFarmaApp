export default class ProductHistory {
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
