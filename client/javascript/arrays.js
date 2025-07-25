// Create an array of 5 fruits
let fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry'];

/*
// Iterate over the array using a for loop
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}
*/

/*
// Iterate over the array using a while loop
let j = 0;
while (j < fruits.length) {
    console.log(fruits[j]);
    j++;
}
*/

/*
let k = 0;
do {
console.log(fruits[k]);
k++;
} while (k < fruits.length);
*/

/*
// Iterate over the array using a for...of loop
for (let fruit of fruits) {
    console.log(fruit);
}
*/

/*
// Iterate over the array using the forEach method
fruits.forEach(fruit => console.log(fruit));
*/

// Iterate over the array using the map method
let upperCaseFruits = fruits.map(fruit => fruit.toUpperCase());
console.log(upperCaseFruits);



