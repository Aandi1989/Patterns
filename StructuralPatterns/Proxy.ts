/*
Proxy Pattern in Backend Development (TypeScript Example)
Use Case: Lazy Loading & Access Control for Database Requests
The Proxy Pattern acts as a stand-in for another object to control access, add security, or manage expensive operations (like database queries or API calls).

This is useful in backend systems for lazy loading, access control, caching, and logging.

1. Define the Subject Interface
This interface represents both the real object and its proxy.
*/

// Subject Interface (Defines the common interface for both Real and Proxy objects)
interface Database {
    query(sql: string): string;
}

// 2. Implement the Real Subject
// This is the actual Database class that handles expensive operations.
// Real Database: Executes real queries
class RealDatabase implements Database {
    query(sql: string): string {
        console.log(`Executing SQL Query: ${sql}`);
        return `Result of '${sql}'`;
    }
}

// 3. Implement the Proxy Class
// The Proxy controls access to the RealDatabase, adding caching and authentication.
// Proxy Database: Controls access to the real database (adds caching & security)
class DatabaseProxy implements Database {
    private realDatabase: RealDatabase | null = null;
    private cache: Map<string, string> = new Map();
    private authorizedUsers: Set<string> = new Set(["admin", "manager"]);

    query(sql: string, userRole: string): string {
        // Authorization check
        if (!this.authorizedUsers.has(userRole)) {
            console.log(`Access Denied: ${userRole} is not authorized to query the database.`);
            return "Unauthorized Access";
        }

        // Cache check
        if (this.cache.has(sql)) {
            console.log(`Cache Hit: Returning cached result for '${sql}'`);
            return this.cache.get(sql)!;
        }

        // Lazy Initialization (real database is created only when needed)
        if (!this.realDatabase) {
            console.log("Initializing Real Database...");
            this.realDatabase = new RealDatabase();
        }

        // Query Execution
        const result = this.realDatabase.query(sql);
        this.cache.set(sql, result); // Store result in cache
        return result;
    }
}

// 4. Client Code (Using the Proxy)
// The client interacts with the proxy, which controls access and caching.
function main() {
    const databaseProxy = new DatabaseProxy();

    console.log("\nUser: Admin");
    console.log(databaseProxy.query("SELECT * FROM users", "admin")); // Executes & caches
    console.log(databaseProxy.query("SELECT * FROM users", "admin")); // Cache hit

    console.log("\nUser: Guest");
    console.log(databaseProxy.query("SELECT * FROM users", "guest")); // Unauthorized

    console.log("\nUser: Manager");
    console.log(databaseProxy.query("SELECT * FROM products", "manager")); // Executes & caches
    console.log(databaseProxy.query("SELECT * FROM products", "manager")); // Cache hit
}

// Execute
main();
