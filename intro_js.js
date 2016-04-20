// Different ways to send messages:

// 1) Pop-up dialog
// alert('Hello World');

// 2) Send to JavaScript console
//    (Useful for debugging.)
// console.log('Hello World again');

// 3) Use variables
var msgstring = 'Hello console';
console.log(msgstring);
var meaning = 42;
console.log(meaning);

// Note that all lines must end with a semicolon in JavaScript.

// 4) Functions
function con_function(con_arg1, con_arg2){
  // Arguments go inside brackets.
  // Code goes inside braces.
  console.log(con_arg1, con_arg2);
  console.log(con_arg1 + con_arg2);
}
// Functions may be declared anywhere; order is irrelevant.

con_function('Console via function.', 43);

// Exercise
function fibonacci(start1, start2) {
  var item3, item4, item5;
  item3 = start1 + start2;
  item4 = start2 + item3;
  item5 = item3 + item4;
  console.log("Sequence is: " + start1, start2, item3, item4, item5);
}

fibonacci(2, 5);



// Basic steps for adding interactivity to a web page using JavaScript:
// i) Get element into a JavaScript variable
// ii) Add an Event Listener
// iii) On trigger, manipulate the element

// Grab element
// Use unique ID tag assigned to IMG tag
var cat_picture = document.getElementById("cat");

// Add event listener
cat_picture.addEventListener("click", function(){alert('Meow');});
// Note the inline, anonymous function. Could also create the function elsewhere and enter the function name.


// Exercise
var cat_button = document.getElementById("cbutton")
cat_button.addEventListener("click", feedcat);

// Manipulate the element
function feedcat() {
  // Directly retrieve and set picture height. This is ignored if the height is set in the style definition.
  var cat_height = cat_picture.height;
  cat_picture.height = 500;
  // Restore original height after 1000ms delay.
  setTimeout(function(){cat_picture.height = cat_height;}, 1000);
  
  // Increase width using .clientWidth and style.
  // Note that clientWidth is numeric but style.width is text with units.
  var current_width = cat_picture.clientWidth;
  cat_picture.style.width = (current_width + 30) + "px";
  // If the height were not specified (either by function here or by style), the expanding cat would retain its aspect ratio.
}

// Exercise
var thincat_button = document.getElementById("sbutton");
thincat_button.addEventListener("click", starvecat);
function starvecat() {
  var cat_width = cat_picture.clientWidth;
  cat_picture.style.width = Math.max((cat_width - 50), 10) + "px";
}



// Variable containers.
// Two types, each containing multiple other variables.
// Array
var simple_array = [1, 2, 3];
// Array indices are 0-based.
console.log(simple_array, simple_array[2]);

// Add element to end of array.
simple_array.push(42);
console.log(simple_array);


// Object
// A named hash.
var object1 = {'first':33, 'second':48, 'weird': -1};
console.log(object1, object1.second);
object1.third = "fred";
console.log(object1);


// Nesting
// Containers can contain other containers.
var cat1 = {
  name: 'Fluffy',
  age: 8,
  weight: 7
};

var cat2 = {
  name: "Cat Fred",
  age: 1,
  weight: 4
};

console.log(cat1, cat2);

var catalogue = [cat1, cat2];
console.log(catalogue);


// Exercise
var cat = ["Mephisto", 15];
var dog = ["Fetch", 2, "deceased"];
var fish = ["Backflip", "flushed"];
var shark = ["Predator"];
var waterborne = {fish1: fish, fish2: shark};
var allpets = [waterborne, cat, dog];
console.log(allpets);
console.log(allpets[0].fish2[0]);


// Console displays the "final" value, which may not be the same as the value at that point of execution. (Indicated by i box.)
catalogue.push(cat2);
catalogue[0].happiness = 0.2;
console.log(catalogue);


// Namespace
var old_array = [1,2,3];
var new_array = old_array;
console.log(old_array, new_array);
old_array.push(42);
console.log(old_array, new_array);
// ie: array assignment is by reference only.
// slice() will create a clone, but it will only clone the top level; so sub-containers will not be cloned, ...  OR:
clone_array = old_array.map(function(array_elt){
  return array_elt;
});
old_array.push(42);
console.log(old_array, clone_array);
// Map() -- takes old array and generates new array by looping over each element in the old array and applying the parameter function to generate the value stored in the new array.
// Same limitation as slice(), but the mapping function can be complex.


// Exercise
var calc_array = old_array.map(function(array_elt){
  return array_elt * (array_elt + 2) + "px";
});
console.log(calc_array);

// Can use map() to extract one attribute from an array of elements, all with the same attributes.

// Can use filter() instead of map() to conditionally return values.
var young_cats = catalogue.filter(function(cat){
  return cat.age < 3;
});
var cat_ages = young_cats.map(function(cat){
  return cat.age;
});
console.log(young_cats, cat_ages);


