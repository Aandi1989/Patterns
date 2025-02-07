/*
Mediator Pattern in Backend Development (TypeScript Example)
Use Case: Chat Room Communication System
The Mediator Pattern is used to manage communication between multiple objects without them directly referencing each other. Instead, a central mediator handles interactions, reducing dependencies between objects.

In backend development, this is useful for chat systems, event-driven systems, microservices coordination, and UI components.

1. Define the Mediator Interface
This ensures that all components communicate via the mediator.
*/

// Mediator Interface
interface ChatMediator {
    sendMessage(message: string, sender: User): void;
    addUser(user: User): void;
}

// 2. Implement the Concrete Mediator
// The ChatRoom acts as a central hub, managing message flow between users.
// Concrete Mediator: Manages communication between users
class ChatRoom implements ChatMediator {
    private users: User[] = [];

    addUser(user: User): void {
        this.users.push(user);
    }

    sendMessage(message: string, sender: User): void {
        console.log(`\n[ChatRoom] ${sender.getName()} says: ${message}`);

        for (const user of this.users) {
            if (user !== sender) {
                user.receiveMessage(message, sender);
            }
        }
    }
}

// 3. Define the Colleague (User)
// Each User interacts with others only via the Mediator.
// Colleague: User
class User {
    private name: string;
    private mediator: ChatMediator;

    constructor(name: string, mediator: ChatMediator) {
        this.name = name;
        this.mediator = mediator;
        this.mediator.addUser(this);
    }

    getName(): string {
        return this.name;
    }

    sendMessage(message: string): void {
        console.log(`[${this.name}] Sending message: ${message}`);
        this.mediator.sendMessage(message, this);
    }

    receiveMessage(message: string, sender: User): void {
        console.log(`[${this.name}] Received message from ${sender.getName()}: ${message}`);
    }
}

// 4. Client Code (Using the Mediator)
// Now we create users and let them communicate through the mediator.
function main() {
    const chatRoom = new ChatRoom();

    // Creating users and registering them with the mediator
    const alice = new User("Alice", chatRoom);
    const bob = new User("Bob", chatRoom);
    const charlie = new User("Charlie", chatRoom);

    console.log("\n--- Chat Communication ---");
    alice.sendMessage("Hello, everyone!");
    bob.sendMessage("Hey Alice!");
    charlie.sendMessage("Hello, Bob and Alice!");
}

// Execute
main();
