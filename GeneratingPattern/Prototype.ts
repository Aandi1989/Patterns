/*
Prototype Pattern in Backend Development (TypeScript Example)
Use Case: Cloning Database Records
The Prototype Pattern is used when we need to create new objects by copying existing ones rather than instantiating new ones from scratch. This is useful when object creation is expensive or complex.

1. Define the Prototype Interface
This ensures all objects that support cloning implement a clone() method.
*/

// Abstract prototype interface
interface Cloneable {
    clone(): this;
}

// 2. Implement Concrete Prototypes
// Each concrete class implements the clone() method to duplicate itself.
// Concrete Prototype: Database Record
class UserRecord implements Cloneable {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public role: string
    ) { }

    clone(): this {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
}

// 3. Client Code (Using the Prototype)
// We create an object and then clone it instead of creating a new instance manually.
function main1() {
    // Original user record
    const originalUser = new UserRecord(1, "Alice", "alice@example.com", "Admin");
    console.log("Original User:", originalUser);

    // Cloning the user record
    const clonedUser = originalUser.clone();
    clonedUser.id = 2; // Modify ID for the cloned object
    clonedUser.name = "Bob";

    console.log("Cloned User:", clonedUser);
}

// Execute the function
main1();

