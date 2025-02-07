/*
Chain of Responsibility Pattern in Backend Development (TypeScript Example)
Use Case: Middleware in an Express-like Backend (Authentication, Logging, and Request Validation)
The Chain of Responsibility Pattern is used to pass a request along a chain of handlers, where each handler decides whether to process the request or pass it to the next handler.

In backend development, this is commonly used for middleware processing, such as logging, authentication, validation, and rate limiting.

1. Define the Handler Interface
This interface ensures that each handler can process a request or pass it to the next handler in the chain.
*/

// Handler Interface
abstract class Middleware {
    protected next: Middleware | null = null;

    setNext(handler: Middleware): Middleware {
        this.next = handler;
        return handler; // Enables chaining
    }

    handle(request: any): void {
        if (this.next) {
            this.next.handle(request);
        }
    }
}

// 2. Implement Concrete Middleware Handlers
// Each handler processes the request and decides whether to pass it further.
// Logging Middleware: Logs request details
class LoggingMiddleware extends Middleware {
    handle(request: any): void {
        console.log(`[Logging] Request received: ${request.url}`);
        super.handle(request);
    }
}

// Authentication Middleware: Checks user authentication
class AuthMiddleware extends Middleware {
    handle(request: any): void {
        if (!request.user) {
            console.log(`[Auth] Unauthorized request.`);
            return; // Stop chain if authentication fails
        }
        console.log(`[Auth] User authenticated: ${request.user}`);
        super.handle(request);
    }
}

// Validation Middleware: Ensures required fields are present
class ValidationMiddleware extends Middleware {
    handle(request: any): void {
        if (!request.body || !request.body.data) {
            console.log(`[Validation] Missing data in request.`);
            return; // Stop chain if validation fails
        }
        console.log(`[Validation] Request data is valid.`);
        super.handle(request);
    }
}

// Final Handler: Process request
class RequestHandler extends Middleware {
    handle(request: any): void {
        console.log(`[Handler] Processing request: ${request.url}`);
    }
}

// 3. Client Code (Setting Up the Middleware Chain)
// Now we chain the middleware together and process requests.
function main() {
    // Create middleware chain
    const logger = new LoggingMiddleware();
    const auth = new AuthMiddleware();
    const validator = new ValidationMiddleware();
    const handler = new RequestHandler();

    // Set up chain: Logger → Auth → Validation → Handler
    logger.setNext(auth).setNext(validator).setNext(handler);

    console.log("\n--- Request 1: Unauthorized User ---");
    const request1 = { url: "/api/data", body: { data: "123" } };
    logger.handle(request1); // Should stop at AuthMiddleware

    console.log("\n--- Request 2: Authenticated but Missing Data ---");
    const request2 = { url: "/api/data", user: "admin", body: {} };
    logger.handle(request2); // Should stop at ValidationMiddleware

    console.log("\n--- Request 3: Fully Valid Request ---");
    const request3 = { url: "/api/data", user: "admin", body: { data: "123" } };
    logger.handle(request3); // Should go through all handlers
}

// Execute
main();
