function filterByAge(users, ageLimit) {
    return users.filter(user => user.age > ageLimit);
}

// Example usage:
const users = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 22 },
    { name: "Charlie", age: 27 },
    { name: "David", age: 19 }
];

const filteredUsers = filterByAge(users, 20);
console.log(filteredUsers);