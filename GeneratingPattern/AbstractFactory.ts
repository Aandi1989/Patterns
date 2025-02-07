/*
Abstract Factory Pattern in Backend (TypeScript Example)
Use Case: Database Connection Factory
Imagine a backend system where you might need to connect to different types of databases (e.g., PostgreSQL, MongoDB). 
Instead of hardcoding the database implementation, we use the Abstract Factory pattern to create database 
connections dynamically.

1. Define Abstract Product Interfaces
These interfaces define the contract for database connections.
*/
// Abstract product for Database Connection
interface DatabaseConnection {
    connect(): void;
    disconnect(): void;
}

/*
2. Implement Concrete Products
Each concrete implementation represents a specific type of database.
*/
// Concrete product for PostgreSQL connection
class PostgresConnection implements DatabaseConnection {
    connect(): void {
        console.log("Connected to PostgreSQL database.");
    }

    disconnect(): void {
        console.log("Disconnected from PostgreSQL database.");
    }
}

// Concrete product for MongoDB connection
class MongoDBConnection implements DatabaseConnection {
    connect(): void {
        console.log("Connected to MongoDB database.");
    }

    disconnect(): void {
        console.log("Disconnected from MongoDB database.");
    }
}

// 3. Create an Abstract Factory Interface
// This ensures all factories produce database connections.
// Abstract factory for creating database connections
interface DatabaseFactory {
    createConnection(): DatabaseConnection;
}

// 4. Implement Concrete Factories
// Each factory produces a specific type of database connection.
// Concrete factory for PostgreSQL
class PostgresFactory implements DatabaseFactory {
    createConnection(): DatabaseConnection {
        return new PostgresConnection();
    }
}

// Concrete factory for MongoDB
class MongoDBFactory implements DatabaseFactory {
    createConnection(): DatabaseConnection {
        return new MongoDBConnection();
    }
}

// 5. Client Code
// The client code works with the abstract factory and does not depend on concrete implementations.
// Function that receives a factory and works with the created database connection
function connectToDatabase(factory: DatabaseFactory) {
    const connection = factory.createConnection();
    connection.connect();
    // Perform database operations...
    connection.disconnect();
}

// Example usage
const postgresFactory = new PostgresFactory();
connectToDatabase(postgresFactory);

const mongoFactory = new MongoDBFactory();
connectToDatabase(mongoFactory);

/*
Key Takeaways
Encapsulation of Object Creation – The client does not instantiate objects directly but delegates it to the factory.
Flexibility – New database types can be added without modifying existing client code.
Dependency Inversion – The client depends on abstractions (DatabaseFactory and DatabaseConnection) 
rather than concrete classes.
*/