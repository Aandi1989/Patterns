/*
Observer Pattern in Backend Development (TypeScript Example)
Use Case: Event-Based Notification System (User Registration)
The Observer Pattern allows multiple objects (observers) to be notified when a subject's state changes.

In backend development, it's useful for event-driven architectures, messaging systems, real-time notifications, and WebSocket connections.

1. Define the Observer Interface
Each Observer will implement this interface to receive notifications.
*/

// Observer Interface (Defines how observers receive updates)
interface Observer {
    update(eventType: string, data: any): void;
}

// 2. Implement the Subject (Event Emitter)
// The Subject maintains a list of observers and notifies them of events.
// Subject: Manages observers and notifies them of events
class UserRegistrationNotifier {
    private observers: Observer[] = [];

    subscribe(observer: Observer): void {
        this.observers.push(observer);
    }

    unsubscribe(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(eventType: string, data: any): void {
        console.log(`\n[Notifier] Event: ${eventType}`);
        for (const observer of this.observers) {
            observer.update(eventType, data);
        }
    }

    // Simulating a user registration event
    registerUser(username: string, email: string): void {
        console.log(`\n[System] Registering user: ${username} (${email})`);
        this.notify("UserRegistered", { username, email });
    }
}

// 3. Implement Concrete Observers
// Each Observer listens for events and performs actions.
// Concrete Observer: Sends a welcome email
class EmailService implements Observer {
    update(eventType: string, data: any): void {
        if (eventType === "UserRegistered") {
            console.log(`[EmailService] Sending welcome email to ${data.email}`);
        }
    }
}

// Concrete Observer: Logs user registration
class LoggerService implements Observer {
    update(eventType: string, data: any): void {
        if (eventType === "UserRegistered") {
            console.log(`[LoggerService] Logging user registration: ${data.username}`);
        }
    }
}

// Concrete Observer: Sends a discount coupon
class DiscountService implements Observer {
    update(eventType: string, data: any): void {
        if (eventType === "UserRegistered") {
            console.log(`[DiscountService] Sending discount coupon to ${data.username}`);
        }
    }
}

// 4. Client Code (Using the Observer Pattern)
// Now we create observers, subscribe them to the notifier, and simulate a user registration event.
function main() {
    const notifier = new UserRegistrationNotifier();

    const emailService = new EmailService();
    const loggerService = new LoggerService();
    const discountService = new DiscountService();

    // Subscribing observers to the notifier
    notifier.subscribe(emailService);
    notifier.subscribe(loggerService);
    notifier.subscribe(discountService);

    console.log("\n--- Registering a new user ---");
    notifier.registerUser("Alice", "alice@example.com");

    console.log("\n--- Unsubscribing DiscountService ---");
    notifier.unsubscribe(discountService);

    console.log("\n--- Registering another user ---");
    notifier.registerUser("Bob", "bob@example.com");
}

// Execute
main();
