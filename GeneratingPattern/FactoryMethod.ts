/*
Use Case: API Response Handling
In backend applications, we often return different types of responses depending on the API request. Instead of directly instantiating response objects everywhere, we can use the Factory Method pattern to centralize and manage response creation.

1. Define the Product Interface
This represents the common structure for all API responses.
*/

// Abstract product: API Response
interface ApiResponse {
    status: number;
    message: string;
    data?: any;
}


// 2. Implement Concrete Products
// Each concrete class represents a specific type of API response.
// Concrete products: Different types of API responses

class SuccessResponse implements ApiResponse {
    status: number;
    message: string;
    data?: any;

    constructor(data?: any) {
        this.status = 200;
        this.message = "Success";
        this.data = data;
    }
}

class ErrorResponse implements ApiResponse {
    status: number;
    message: string;
    data?: any;

    constructor(message: string, status = 400) {
        this.status = status;
        this.message = message;
    }
}

class NotFoundResponse implements ApiResponse {
    status: number;
    message: string;

    constructor(resource: string) {
        this.status = 404;
        this.message = `${resource} not found`;
    }
}

// 3. Define the Factory Interface
// This interface declares the method to create responses.
// Abstract factory (Creator)
abstract class ResponseFactory {
    abstract createResponse(...args: any[]): ApiResponse;
}

// 4. Implement Concrete Factories
// Each factory returns a specific type of response.
// Concrete factories: Each factory creates a specific response type

class SuccessResponseFactory extends ResponseFactory {
    createResponse(data?: any): ApiResponse {
        return new SuccessResponse(data);
    }
}

class ErrorResponseFactory extends ResponseFactory {
    createResponse(message: string, status = 400): ApiResponse {
        return new ErrorResponse(message, status);
    }
}

class NotFoundResponseFactory extends ResponseFactory {
    createResponse(resource: string): ApiResponse {
        return new NotFoundResponse(resource);
    }
}

// 5. Client Code (Using the Factory Method)
// Instead of directly creating response objects, we use factories.
// Function that generates API responses dynamically
function handleApiResponse(factory: ResponseFactory, ...args: any[]) {
    const response = factory.createResponse(...args);
    console.log("API Response:", response);
    return response;
}

// Example Usage
const successFactory = new SuccessResponseFactory();
handleApiResponse(successFactory, { id: 1, name: "John Doe" });

const errorFactory = new ErrorResponseFactory();
handleApiResponse(errorFactory, "Invalid input", 422);

const notFoundFactory = new NotFoundResponseFactory();
handleApiResponse(notFoundFactory, "User");
