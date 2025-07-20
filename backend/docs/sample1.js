function Shape() {}
Shape.prototype.draw = function () {
  console.log("Drawing shape");
};

function Circle() {}
Circle.prototype = Object.create(Shape.prototype); // Inherit from Shape
Circle.prototype.constructor = Circle; // Fix constructor reference

let c = new Circle();
c.draw(); // 🔥 Output: Drawing shape
console.log(c.constructor); // 🔥 Output: [Function: Circle]
