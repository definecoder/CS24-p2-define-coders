interface myObj {
  name: string;
  sayHello: () => void;
}

const obj: myObj = {
  name: "John",
  sayHello() {
    console.log(`Hello ${this.name}`);
  },
};

obj.sayHello();
