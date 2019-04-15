import realm from './realm';

export const first = () => {
  let first = realm.objects('Cliente')[0];
  return first ? first : null;  
}

export const find = id => {
  return realm.objects('Cliente').filtered("id=$0", id);
}

export const save = async obj => {
  let cache = realm.objects('Cliente').filtered("id=$0", obj.id);
  if (cache.length == 0) {
    realm.write(() => realm.create('Cliente', obj));
  } else {
    realm.write(() => realm.create('Cliente', obj, true));
  }
};

export const remove = obj => {
  realm.write(() => {
    realm.delete(obj);
    return obj;
  });
};

export const removeAll = () => {
  realm.write(() => {
    let all = realm.objects('Cliente');
    realm.delete(all);
  });
};
