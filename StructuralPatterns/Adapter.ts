/*
Adapter Pattern in Backend Development (TypeScript Example)
Use Case: Integrating an External Logging Service
The Adapter Pattern allows incompatible interfaces to work together by wrapping an existing class with 
an expected interface.

In backend development, this is useful for integrating third-party APIs, databases, 
or services without modifying existing code.

1. Define the Target Interface
This is the interface that the client expects to use.
*/

// Expected logging interface in our application
interface Logger {
    log(message: string): void;
}

// 2. Implement the Adaptee (External Logging Service)
// This represents an external system that has a different interface.
// External logging service with a different method signature
class ExternalLoggingService {
    writeLog(content: string): void {
        console.log(`[External Log]: ${content}`);
    }
}

// 3. Create the Adapter
// The Adapter allows the external service to be used through our application's expected Logger interface.
// Adapter: Converts the ExternalLoggingService to the expected Logger interface
class LoggingAdapter implements Logger {
    private externalLogger: ExternalLoggingService;

    constructor(externalLogger: ExternalLoggingService) {
        this.externalLogger = externalLogger;
    }

    log(message: string): void {
        this.externalLogger.writeLog(message); // Adapts method calls
    }
}

// 4. Client Code (Using the Adapter)
// Now, the client can use LoggingAdapter without worrying about the differences in method names.
function main2() {
    // Using our adapter to work with the external logging service
    const externalLogger = new ExternalLoggingService();
    const logger: Logger = new LoggingAdapter(externalLogger);

    // Logging through the adapted interface
    logger.log("This is an adapted log message!");
}

// Execute
main2();
