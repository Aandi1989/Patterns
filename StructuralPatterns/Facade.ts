/*
Facade Pattern in Backend Development (TypeScript Example)
Use Case: Simplifying Database Operations
The Facade Pattern provides a simplified interface to a complex system of classes, making it easier for clients to use.

In backend development, this is useful when dealing with complex subsystems like databases, authentication, or third-party APIs.

1. Subsystem Components (Database Operations)
These classes represent the complex system that the Facade will simplify.
*/

// Database connection
class DatabaseConnection {
    connect(): void {
        console.log("Connected to the database.");
    }

    disconnect(): void {
        console.log("Disconnected from the database.");
    }
}

// User repository (handling user-related queries)
class UserRepository {
    getUserById(userId: number): string {
        console.log(`Fetching user with ID: ${userId}`);
        return `User_${userId}`;
    }
}

// Logging service (for database actions)
class Logger {
    log(message: string): void {
        console.log(`[LOG]: ${message}`);
    }
}

// 2. Implement the Facade
// The Facade simplifies interactions with the database subsystem.
// Facade: Provides a simple interface to interact with the database
class DatabaseFacade {
    private dbConnection: DatabaseConnection;
    private userRepository: UserRepository;
    private logger: Logger;

    constructor() {
        this.dbConnection = new DatabaseConnection();
        this.userRepository = new UserRepository();
        this.logger = new Logger();
    }

    getUserData(userId: number): string {
        this.dbConnection.connect();
        this.logger.log(`Requesting user data for ID: ${userId}`);

        const user = this.userRepository.getUserById(userId);

        this.logger.log(`User data retrieved: ${user}`);
        this.dbConnection.disconnect();

        return user;
    }
}

// 3. Client Code (Using the Facade)
// Instead of interacting with multiple classes, the client only calls the Facade.
function main() {
    const databaseFacade = new DatabaseFacade();

    // Fetch user data via Facade (simplified interface)
    const user = databaseFacade.getUserData(42);

    console.log(`Final user data: ${user}`);
}

// Execute
main();
