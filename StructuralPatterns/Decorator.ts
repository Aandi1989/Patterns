/*
Decorator Pattern in Backend Development (TypeScript Example)
Use Case: Extending Logging Functionality
The Decorator Pattern is used to dynamically add behavior to an object without modifying its existing code.

This is useful when you want to enhance existing functionality at runtime—for example, adding timestamps, log levels, or file persistence to a logging system.

1. Define the Base Component Interface
This represents the core functionality that can be extended.
*/

// Base interface for logging
interface Logger {
    log(message: string): void;
}

// 2. Implement the Concrete Component
// This is the basic Logger that will be decorated.
// Concrete component: Basic console logger
class SimpleLogger implements Logger {
    log(message: string): void {
        console.log(message);
    }
}

// 3. Create the Base Decorator Class
// The Decorator implements the same interface and wraps an existing logger.
// Base Decorator: Implements Logger and wraps another Logger instance
abstract class LoggerDecorator implements Logger {
    protected logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    log(message: string): void {
        this.logger.log(message); // Delegates to the wrapped logger
    }
}

// 4. Implement Concrete Decorators
// Each decorator adds new behavior while preserving the original functionality.
// Concrete Decorator: Adds timestamps to log messages
class TimestampLogger extends LoggerDecorator {
    log(message: string): void {
        const timestamp = new Date().toISOString();
        super.log(`[${timestamp}] ${message}`);
    }
}

// Concrete Decorator: Adds log levels (INFO, ERROR, etc.)
class LevelLogger extends LoggerDecorator {
    private level: string;

    constructor(logger: Logger, level: string) {
        super(logger);
        this.level = level.toUpperCase();
    }

    log(message: string): void {
        super.log(`[${this.level}] ${message}`);
    }
}

// Concrete Decorator: Logs messages to a file (simulated)
class FileLogger extends LoggerDecorator {
    log(message: string): void {
        console.log(`[FileLogger]: Writing to file - ${message}`);
        super.log(message);
    }
}

// 5. Client Code (Using the Decorators)
// We can now dynamically add features to our logger without modifying the core implementation.
function main() {
    // Simple Logger
    const simpleLogger = new SimpleLogger();
    console.log("Basic Logger:");
    simpleLogger.log("This is a simple log message.");

    // Logger with Timestamp
    const timestampLogger = new TimestampLogger(simpleLogger);
    console.log("\nLogger with Timestamp:");
    timestampLogger.log("This message has a timestamp.");

    // Logger with Timestamp + Log Level
    const levelLogger = new LevelLogger(timestampLogger, "info");
    console.log("\nLogger with Timestamp & Level:");
    levelLogger.log("This message has a level and a timestamp.");

    // Logger with File Writing + Timestamp + Level
    const fileLogger = new FileLogger(levelLogger);
    console.log("\nLogger with File, Timestamp & Level:");
    fileLogger.log("This message is logged in multiple ways.");
}

// Execute
main();
