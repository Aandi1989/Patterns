/*
Flyweight Pattern in Backend Development (TypeScript Example)
Use Case: Optimizing User Session Management
The Flyweight Pattern is used to minimize memory usage by sharing objects instead of creating new ones.

In backend systems, it’s useful for caching, session management, and storing frequently used 
immutable objects like user roles, configurations, or database connections.

1. Define the Flyweight Interface
This interface represents shared objects.
*/

// Flyweight Interface
interface UserSession {
    getUserInfo(): string;
}

// 2. Implement Concrete Flyweight (Shared Object)
// This class stores immutable shared data.
// Concrete Flyweight (Shared User Session)
class SharedUserSession implements UserSession {
    private readonly userId: number;
    private readonly role: string;

    constructor(userId: number, role: string) {
        this.userId = userId;
        this.role = role;
    }

    getUserInfo(): string {
        return `User ID: ${this.userId}, Role: ${this.role}`;
    }
}

// 3. Create the Flyweight Factory
// The factory reuses existing objects instead of creating new ones.
// Flyweight Factory: Manages shared user sessions
class SessionFactory {
    private static sessions: Map<string, SharedUserSession> = new Map();

    static getSession(userId: number, role: string): SharedUserSession {
        const key = `${userId}-${role}`;

        if (!this.sessions.has(key)) {
            console.log(`Creating new session for ${key}`);
            this.sessions.set(key, new SharedUserSession(userId, role));
        } else {
            console.log(`Reusing existing session for ${key}`);
        }

        return this.sessions.get(key)!;
    }
}

// 4. Client Code (Using the Flyweight)
// The client requests sessions, and the factory ensures reusability.
function main() {
    // Requesting sessions (Some should be reused)
    const session1 = SessionFactory.getSession(1, "Admin");
    const session2 = SessionFactory.getSession(2, "User");
    const session3 = SessionFactory.getSession(1, "Admin"); // Should reuse session1
    const session4 = SessionFactory.getSession(3, "User");
    const session5 = SessionFactory.getSession(2, "User"); // Should reuse session2

    console.log("\nSession Info:");
    console.log(session1.getUserInfo());
    console.log(session2.getUserInfo());
    console.log(session3.getUserInfo());
    console.log(session4.getUserInfo());
    console.log(session5.getUserInfo());
}

// Execute
main();
