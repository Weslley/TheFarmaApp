import Realm from "realm";
import { Cliente, ProductHistory } from '../../models';

export const first = () => {
  return Realm.open({ schema: [Cliente, ProductHistory], deleteRealmIfMigrationNeeded: true }).then(realm => {
    return realm.objects(Cliente.name)[0];
  });
}

export const find = id => {
  return Realm.open({ schema: [Cliente, ProductHistory], deleteRealmIfMigrationNeeded: true }).then(realm => {
    let result = realm.objects(Cliente.name).filtered("id=$0", id);
    return result;
  });
}

export const save = async obj => {
  const realm = await Realm.open({ schema: [Cliente, ProductHistory] , deleteRealmIfMigrationNeeded: true });
  let cache = await realm.objects(Cliente.name).filtered("id=$0", obj.id);
  if (cache.length == 0) {
    realm.write(() => realm.create(Cliente.name, obj));
  } else {
    realm.write(() => realm.create(Cliente.name, obj, true));
  }
  realm.close();
};

export const remove = obj => {
  return Realm.open({ schema: [Cliente, ProductHistory], deleteRealmIfMigrationNeeded: true }).then(realm => {
    realm.delete(obj);
    return obj;
  });
};

export const removeAll = () => {
  return Realm.open({ schema: [Cliente, ProductHistory], deleteRealmIfMigrationNeeded: true }).then(realm => {
    let all = realm.objects(Cliente.name);
    realm.delete(all);
  });
};
