/*
Bridge Pattern in Backend Development (TypeScript Example)
Use Case: Decoupling Logging Implementations
The Bridge Pattern is a structural design pattern that decouples an abstraction from its implementation, 
allowing them to evolve independently.

In backend development, this is useful when we need multiple variations of a feature 
without modifying the core logic.

1. Define the Implementation Interface
This defines the operations that concrete implementations will provide.
*/

// Logging implementation interface
interface LoggerImplementation {
    logMessage(level: string, message: string): void;
}

// 2. Create Concrete Implementations
// These are different implementations of the LoggerImplementation interface.
// Console-based logging implementation
class ConsoleLogger implements LoggerImplementation {
    logMessage(level: string, message: string): void {
        console.log(`[${level.toUpperCase()}]: ${message}`);
    }
}

// File-based logging implementation (Simulated)
class FileLogger implements LoggerImplementation {
    logMessage(level: string, message: string): void {
        console.log(`[FileLogger]: Writing to log file - ${level.toUpperCase()}: ${message}`);
    }
}


// 3. Define the Abstraction
// The abstraction is what the client interacts with, delegating work to an implementation.
// Abstract logger class
abstract class Logger {
    protected implementation: LoggerImplementation;

    constructor(implementation: LoggerImplementation) {
        this.implementation = implementation;
    }

    abstract log(message: string): void;
}


// 4. Create Refined Abstractions
// These extend the base Logger abstraction and add variations.
// InfoLogger: Specialized logger for info messages
class InfoLogger extends Logger {
    log(message: string): void {
        this.implementation.logMessage("info", message);
    }
}

// ErrorLogger: Specialized logger for error messages
class ErrorLogger extends Logger {
    log(message: string): void {
        this.implementation.logMessage("error", message);
    }
}

// 5. Client Code (Using the Bridge)
// The client can now switch between different implementations (Console/File) and abstractions
// (Info/Error) without modifying existing code.
function main3() {
    // Using console logger
    const consoleLogger = new ConsoleLogger();
    const infoConsoleLogger = new InfoLogger(consoleLogger);
    const errorConsoleLogger = new ErrorLogger(consoleLogger);

    infoConsoleLogger.log("System is running smoothly.");
    errorConsoleLogger.log("An error occurred in the application.");

    // Using file logger
    const fileLogger = new FileLogger();
    const infoFileLogger = new InfoLogger(fileLogger);
    const errorFileLogger = new ErrorLogger(fileLogger);

    infoFileLogger.log("File logging started.");
    errorFileLogger.log("Critical failure in service.");
}

// Execute
main3();
