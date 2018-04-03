import Realm from 'realm';
import schema from "./index.js";
import { Cliente, ProductHistory } from '../../models';

export const save = async obj => {
    const realm = await Realm.open({ schema: [Cliente, ProductHistory], deleteRealmIfMigrationNeeded: true });    
    let cache = await realm.objects(ProductHistory.name).filtered('nome=$0', obj.nome);
    if(cache.length == 0) {
        realm.write(() => realm.create(ProductHistory.name, obj));
    } else {
        realm.write(() => realm.create(ProductHistory.name, obj, true));
    }
}

export const list = (query, params) => {
    return Realm.open({ schema: [Cliente, ProductHistory], deleteRealmIfMigrationNeeded: true })
        .then(realm => {
            let result = realm.objects(ProductHistory.name);
            if(query) result = result.filtered(query);
            if(params.sort) result = result.sorted(...params.sort)
            if(params.limit) result = result.slice(0, params.limit);
            return result;
        })
}

export const remove = (obj) => {
    return Realm.open({ schema: [Cliente, ProductHistory], deleteRealmIfMigrationNeeded: true })
        .then(realm => {
            realm.delete(obj);
            return obj;
        })
}
