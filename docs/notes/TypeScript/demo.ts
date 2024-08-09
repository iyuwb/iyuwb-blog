type Person = {
    name: string;
}

const person: Person = {
    name: "Alice"
};


person.name = "female"; //  正确
console.log(person.age) // 错误
delete person.name // 错误  