import LinkedList from './linkedList.js';

export default class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = Array(this.capacity);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  resizeArray() {
    let tmp = this.buckets.slice();
    this.capacity *= 2;
    this.buckets = Array(this.capacity);
    let keyValuePairs = [];

    tmp.forEach((element) => {
      keyValuePairs.push(...element.getKeyValuePairs());

      keyValuePairs.forEach((element) => {
        this.set(element[0], element[1]);
      });
    });
  }

  set(key, value) {
    const hashCode = this.hash(key);
    const location = this.buckets[hashCode];
    const loadLimit = this.length() >= this.capacity * this.loadFactor;

    if (location) {
      if (location.containsKey(key)) {
        location.updateValue(key, value);
        return;
      }
      location.append(key, value);
      if (loadLimit) this.resizeArray();
      return;
    }

    this.buckets[hashCode] = new LinkedList();
    this.buckets[hashCode].append(key, value);
    if (loadLimit) this.resizeArray();
  }

  get(key) {
    const hashCode = this.hash(key);
    const location = this.buckets[hashCode];

    if (!location.containsKey(key)) return null;

    return location.getValueOfKey(key);
  }

  has(key) {
    const hashCode = this.hash(key);
    const location = this.buckets[hashCode];

    return location.containsKey(key);
  }

  remove(key) {
    const hashCode = this.hash(key);
    const location = this.buckets[hashCode];

    return location.removeKey(key);
  }

  length() {
    let size = 0;
    this.buckets.forEach((element) => {
      size += element.size();
    });

    return size;
  }

  clear() {
    this.capacity = 16;
    this.buckets = Array(this.capacity);
  }

  keys() {
    let keys = [];
    this.buckets.forEach((element) => {
      keys.push(...element.getKeysOrValues('key'));
    });
    return keys;
  }

  values() {
    let keys = [];
    this.buckets.forEach((element) => {
      keys.push(...element.getKeysOrValues('value'));
    });
    return keys;
  }

  entries() {
    let entries = [];
    this.buckets.forEach((element) => {
      entries.push(...element.getKeyValuePairs());
    });
    return entries;
  }
}
