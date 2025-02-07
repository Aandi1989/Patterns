/*
Visitor Pattern in Backend Development (TypeScript Example)
Use Case: Processing Different Types of Database Records
The Visitor Pattern allows adding new operations to objects without modifying their structure, by defining a separate visitor class that handles operations.

In backend development, it's useful for processing different types of database records, performing operations on ASTs (Abstract Syntax Trees), report generation, or handling complex object structures like file systems or APIs.

1. Define the Visitor Interface
The visitor provides methods for handling each type of element.
*/

// Visitor Interface: Defines operations for each type of record
interface RecordVisitor {
    visitUser(user: UserRecord): void;
    visitOrder(order: OrderRecord): void;
}

// 2. Define the Element Interface
// Each record type will accept a visitor.

// Element Interface: Accepts a visitor
interface DatabaseRecord {
    accept(visitor: RecordVisitor): void;
}

// 3. Implement Concrete Elements (Database Records)
// Each record implements the accept method to allow visitor access.

// Concrete Element: User Record
class UserRecord implements DatabaseRecord {
    constructor(public id: number, public name: string) { }

    accept(visitor: RecordVisitor): void {
        visitor.visitUser(this);
    }
}

// Concrete Element: Order Record
class OrderRecord implements DatabaseRecord {
    constructor(public orderId: number, public amount: number) { }

    accept(visitor: RecordVisitor): void {
        visitor.visitOrder(this);
    }
}

// 4. Implement Concrete Visitors
// Each visitor implements operations for different records.

// Concrete Visitor: Generates a JSON Report
class JSONReportGenerator implements RecordVisitor {
    visitUser(user: UserRecord): void {
        console.log(`[JSON] Exporting User: ${JSON.stringify(user)}`);
    }

    visitOrder(order: OrderRecord): void {
        console.log(`[JSON] Exporting Order: ${JSON.stringify(order)}`);
    }
}

// Concrete Visitor: Logs Record Data
class LoggerVisitor implements RecordVisitor {
    visitUser(user: UserRecord): void {
        console.log(`[Logger] User ID: ${user.id}, Name: ${user.name}`);
    }

    visitOrder(order: OrderRecord): void {
        console.log(`[Logger] Order ID: ${order.orderId}, Amount: $${order.amount}`);
    }
}

// 5. Client Code (Using the Visitor Pattern)
// Now we apply visitors to different database records.
function main() {
    const records: DatabaseRecord[] = [
        new UserRecord(1, "Alice"),
        new OrderRecord(101, 250),
        new UserRecord(2, "Bob"),
        new OrderRecord(102, 500),
    ];

    const jsonExporter = new JSONReportGenerator();
    const logger = new LoggerVisitor();

    console.log("\n--- Generating JSON Reports ---");
    for (const record of records) {
        record.accept(jsonExporter);
    }

    console.log("\n--- Logging Records ---");
    for (const record of records) {
        record.accept(logger);
    }
}

// Execute
main();
