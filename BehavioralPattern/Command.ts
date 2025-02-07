/*
Command Pattern in Backend Development (TypeScript Example)
Use Case: Task Execution System (Undoable Commands)
The Command Pattern encapsulates a request as an object, allowing parameterization, queuing, and undoing operations.

This is useful in task execution systems, job scheduling, event-driven architectures, and undoable operations (like database transactions).

1. Define the Command Interface
Each command encapsulates an action and provides an execute() method.
*/

// Command Interface
interface Command {
    execute(): void;
    undo(): void;
}

// 2. Implement Concrete Commands
// Each Concrete Command performs an operation and supports undo functionality.
// Receiver: The actual object that performs operations
class Database {
    insert(record: string): void {
        console.log(`Inserted record: ${record}`);
    }

    delete(record: string): void {
        console.log(`Deleted record: ${record}`);
    }
}

// Concrete Command: Insert Operation
class InsertCommand implements Command {
    private database: Database;
    private record: string;

    constructor(database: Database, record: string) {
        this.database = database;
        this.record = record;
    }

    execute(): void {
        this.database.insert(this.record);
    }

    undo(): void {
        this.database.delete(this.record);
    }
}

// Concrete Command: Delete Operation
class DeleteCommand implements Command {
    private database: Database;
    private record: string;

    constructor(database: Database, record: string) {
        this.database = database;
        this.record = record;
    }

    execute(): void {
        this.database.delete(this.record);
    }

    undo(): void {
        this.database.insert(this.record);
    }
}

// 3. Implement the Invoker
// The Invoker holds and executes commands, supporting undo operations.
// Invoker: Executes and stores commands for undo
class CommandInvoker {
    private history: Command[] = [];

    executeCommand(command: Command): void {
        command.execute();
        this.history.push(command); // Store for undo
    }

    undoLastCommand(): void {
        if (this.history.length === 0) {
            console.log("No commands to undo.");
            return;
        }
        const lastCommand = this.history.pop()!;
        lastCommand.undo();
    }
}

// 4. Client Code (Using the Command Pattern)
// Now we create commands, execute them through the Invoker, and support undo functionality.
function main() {
    const database = new Database();
    const invoker = new CommandInvoker();

    console.log("\n--- Executing Commands ---");
    const insertCmd = new InsertCommand(database, "User_123");
    invoker.executeCommand(insertCmd);

    const deleteCmd = new DeleteCommand(database, "User_456");
    invoker.executeCommand(deleteCmd);

    console.log("\n--- Undoing Last Command ---");
    invoker.undoLastCommand(); // Undo delete (re-inserts record)

    console.log("\n--- Undoing Another Command ---");
    invoker.undoLastCommand(); // Undo insert (deletes record)
}

// Execute
main();
