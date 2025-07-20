# 🧠 Understanding the Magic of the Prototype Chain

## 📌 Definitions

### 1. **The prototype of an object** (`__proto__` or `[[Prototype]]`)

- Every JavaScript object has an internal link to another object, called its **prototype**.
- This prototype is accessible (non-standardly) as `__proto__` and standardly through `Object.getPrototypeOf(obj)`.
- If the prototype has a property the object doesn't have, JavaScript will look "up the chain" to the prototype.

### 2. **The `.prototype` property of a constructor**

- Every **function in JavaScript has a `.prototype` property**, which is used when you do `new Constructor()`.
- The **newly created object’s `__proto__` is set to the constructor's `.prototype`.**

---

### 🎯 Code Breakdown Again (in this context)

```js
AuthQueries.prototype = Object.create(MyQueryBuilder.prototype);
```

### 🔍 What does this really do?

- `Object.create(MyQueryBuilder.prototype)` creates a new object whose `__proto__` is `MyQueryBuilder.prototype`.

- This means:

  ```js
  Object.getPrototypeOf(AuthQueries.prototype) === MyQueryBuilder.prototype; // true
  ```

- You're **not assigning `MyQueryBuilder.prototype` directly** to avoid unwanted side effects (like shared reference bugs).

- This makes `AuthQueries.prototype` inherit all methods defined on `MyQueryBuilder.prototype`.

---

### 🧪 Visual Example of the Chain

```js
function MyQueryBuilder(table) {
  this.table = table;
}
MyQueryBuilder.prototype.find = function () {
  return "finding from " + this.table;
};

function AuthQueries() {
  MyQueryBuilder.call(this, "users");
}

AuthQueries.prototype = Object.create(MyQueryBuilder.prototype);
AuthQueries.prototype.constructor = AuthQueries;

const auth = new AuthQueries();

console.log(auth.table); // 'users'
console.log(auth.find()); // 'finding from users'
console.log(Object.getPrototypeOf(auth) === AuthQueries.prototype); // true
console.log(
  Object.getPrototypeOf(AuthQueries.prototype) === MyQueryBuilder.prototype
); // true
```

---

### 🏁 Summary

| Term                    | Refers To                                                           |
| ----------------------- | ------------------------------------------------------------------- |
| `object.__proto__`      | The **actual prototype** of an instance (what it inherits from)     |
| `Constructor.prototype` | The **object used as the prototype** when you instantiate via `new` |
| `Object.create(obj)`    | Creates a **new object whose prototype** is `obj`                   |

### 🧠 JavaScript mein `.prototype` aur `__proto__` kya hota hai?

- **Har function** JavaScript mein ek special property lekar aata hai — `.prototype`.
- Jab aap **`new` keyword** se koi object create karte ho using a constructor function (jaise `new Circle()`), tab:

  - Us **newly created object ka `__proto__`** set ho jaata hai constructor ke `.prototype` se.

---

### 🤯 Ab samjho yeh do important lines

```js
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;
```

#### 🔹 Line 1: `Circle.prototype = Object.create(Shape.prototype);`

- Iska matlab: hum **`Circle` function ka prototype** set kar rahe hain to **ek naya object** jo `Shape.prototype` ko inherit karta hai.
- **Simpler language:** Jab hum `new Circle()` banayenge, wo object `Shape` ke methods bhi access kar paayega — **inheritance** ho gaya.

> ⚠️ `Object.create(Shape.prototype)` ek **naya object** banata hai jiska `__proto__` set hota hai `Shape.prototype`.

---

#### 🔹 Line 2: `Circle.prototype.constructor = Circle;`

- Jab hum pehle line mein `Circle.prototype` ko overwrite karte hain, tab uska default `constructor` bhi chala jaata hai.
- Toh ye second line us `constructor` ko dobara **`Circle`** par set karti hai.
- Ye helpful hota hai jab aap kisi object ka constructor dekhna chahein (jaise `object.constructor.name` etc).

---

### 🧪 Final Summary (Hinglish mein)

- Har object ke paas ek **`__proto__`** hota hai (jo inherit karta hai).
- Har function ke paas ek **`.prototype`** hota hai (jisse `__proto__` banta hai).
- `Object.create()` se hum ek object bana sakte hain jo kisi aur object se inherit kare.
- `constructor` manually set karna ek achha practice hai jab hum `.prototype` ko overwrite karte hain — taaki cheezein predictable rahein.

---

Bilkul! Prototype ka concept JavaScript mein pehli baar samajhna thoda confusing lag sakta hai, par main aapko **bilkul easy aur hinglish mein** samjhata hoon, **step-by-step example ke saath**:

---

## 🔷 Step 1: Normal Object Banate Hain

```js
let person = {
  greet: function () {
    console.log("Hello!");
  },
};
```

Yeh ek normal object hai jisme ek method `greet()` hai.

---

## 🔷 Step 2: Naya Object Banate Hain Inherit Karne ke liye

```js
let student = Object.create(person);
```

Yeh line kya karti hai?

- `student` ek naya object banata hai jiska prototype `person` hota hai.
- Ab agar aap `student.greet()` call karoge, aur student ke paas `greet()` function nahi hai, toh JS `person` mein dhundhega, kyunki woh uska prototype hai.

```js
student.greet(); // Output: Hello!
```

---

## 🤔 Prototype kya hai?

JavaScript mein har object ke paas ek **hidden property hoti hai** jise hum `__proto__` bolte hain. Iske andar **uske parent object ka reference** hota hai jisse woh properties inherit karta hai.

```js
console.log(student.__proto__ === person); // true
```

---

## 🔷 Function aur `.prototype` kya hota hai?

Agar aap function bana rahe ho constructor jaisa:

```js
function Animal(name) {
  this.name = name;
}
```

Aap agar `new` keyword use karke object banao:

```js
let dog = new Animal("Tommy");
```

Ab har constructor function ke paas ek `.prototype` object hota hai jisme aap shared methods define kar sakte ho:

```js
Animal.prototype.speak = function () {
  console.log(this.name + " barks!");
};

dog.speak(); // Tommy barks!
```

**Important**:

- `Animal.prototype` ek normal object hai.
- `dog.__proto__ === Animal.prototype` hoga.

---

## 🔁 Toh `Circle.prototype = Object.create(Shape.prototype);` ka matlab?

```js
function Shape() {}
Shape.prototype.area = function () {
  console.log("Area");
};

function Circle() {
  Shape.call(this); // constructor chaining
}

Circle.prototype = Object.create(Shape.prototype); // yeh line magic hai
Circle.prototype.constructor = Circle; // original constructor restore

let c = new Circle();
c.area(); // Shape se inherited
```

🧠 Matlab: Circle ka prototype Shape ka object hai, toh Circle ko Shape ke saare method mil jaate hain.

---

## 💡 Aap yeh sab direct object mein kyon nahi karte?

Kyuki agar aap directly object mein saari properties daal doge, toh aapko har object ke liye bar bar same function copy karna padega. `.prototype` se yeh problem solve hoti hai – ek hi function sab object share kar sakte hain.

---
