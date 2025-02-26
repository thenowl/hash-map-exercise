import HashMap from './index.js';

const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('moon', 'silver');

console.log(test.entries());
console.log(test.length());
console.log(test.get('grape'));
test.set('grape', 'green');
console.log(test.get('grape'));
console.log(test.has('moon'));
console.log(test.keys());
console.log(test.values());
console.log(test.remove('lion'));
console.log(test.remove('ice cream'));
console.log(test.entries());
console.log(test.length());
test.clear();
console.log(test.length());
console.log(test.entries());
