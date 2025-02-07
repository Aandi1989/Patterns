/*
Singleton Pattern in Backend Development (TypeScript Example)
Use Case: Database Connection Pool (Ensuring a Single Instance)
The Singleton Pattern ensures that a class has only one instance and provides a global point of access to it. 
This is useful for managing shared resources like database connections, logging services, 
or configuration settings.

1. Implement the Singleton Class
We use a private constructor and a static method to ensure a single instance.
*/
class Database {
    private static instance: Database | null = null;

    private constructor() {
        console.log("New Database Connection Created!");
    }

    static getInstance(): Database {
        if (!this.instance) {
            this.instance = new Database();
        }
        return this.instance;
    }

    query(sql: string): void {
        console.log(`Executing query: ${sql}`);
    }
}

// 2. Client Code (Using the Singleton)
// Multiple calls to getInstance() return the same object.
function main() {
    // Get database instances
    const db1 = Database.getInstance();
    db1.query("SELECT * FROM users");

    const db2 = Database.getInstance();
    db2.query("SELECT * FROM products");

    // Checking if both instances are the same
    console.log("db1 === db2:", db1 === db2); // true
}

// Execute
main();

