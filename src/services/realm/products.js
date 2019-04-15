import realm from './realm';

export const save = async obj => {
    let cache = realm.objects('ProductHistory').filtered('nome=$0', obj.nome);
    if (cache.length == 0) {
        realm.write(() => realm.create('ProductHistory', obj));
    } else {
        realm.write(() => realm.create('ProductHistory', obj, true));
    }
}

export const list = (query, params) => {
    let result = realm.objects('ProductHistory');
    if (query) result = result.filtered(query);
    if (params.sort) result = result.sorted(...params.sort)
    if (params.limit) result = result.slice(0, params.limit);
    return result;
}

export const remove = (obj) => {
    realm.write(() => {
        realm.delete(obj);
        return obj;
    });
}
