/*
State Pattern in Backend Development (TypeScript Example)
Use Case: Order Processing System (State Transitions)
The State Pattern allows an object to change its behavior when its internal state changes, 
making it appear as if it's switching between different classes dynamically.

In backend development, it's useful for workflow management, order processing, stateful systems, 
and finite state machines (FSMs).

1. Define the State Interface
This interface ensures that all states handle the context consistently.
*/

// State Interface: Defines behavior for different states
interface OrderState {
    processOrder(): void;
    shipOrder(): void;
    deliverOrder(): void;
}

// 2. Implement Concrete States
// Each Concrete State defines specific behavior for a particular stage in the order lifecycle.

// Concrete State: Order Placed
class OrderPlacedState implements OrderState {
    private context: OrderContext;

    constructor(context: OrderContext) {
        this.context = context;
    }

    processOrder(): void {
        console.log("[OrderPlaced] Processing order...");
        this.context.setState(new OrderShippedState(this.context));
    }

    shipOrder(): void {
        console.log("[OrderPlaced] Order cannot be shipped before processing.");
    }

    deliverOrder(): void {
        console.log("[OrderPlaced] Order cannot be delivered before shipping.");
    }
}

// Concrete State: Order Shipped
class OrderShippedState implements OrderState {
    private context: OrderContext;

    constructor(context: OrderContext) {
        this.context = context;
    }

    processOrder(): void {
        console.log("[OrderShipped] Order has already been processed.");
    }

    shipOrder(): void {
        console.log("[OrderShipped] Shipping order...");
        this.context.setState(new OrderDeliveredState(this.context));
    }

    deliverOrder(): void {
        console.log("[OrderShipped] Order cannot be delivered before shipping.");
    }
}

// Concrete State: Order Delivered
class OrderDeliveredState implements OrderState {
    private context: OrderContext;

    constructor(context: OrderContext) {
        this.context = context;
    }

    processOrder(): void {
        console.log("[OrderDelivered] Order has already been delivered.");
    }

    shipOrder(): void {
        console.log("[OrderDelivered] Order has already been shipped.");
    }

    deliverOrder(): void {
        console.log("[OrderDelivered] Delivering order...");
        console.log("[OrderDelivered] Order is now complete.");
    }
}

// 3. Implement the Context
// The OrderContext manages the current state and delegates behavior accordingly.
// Context: Maintains current state and delegates behavior
class OrderContext {
    private state: OrderState;

    constructor() {
        this.state = new OrderPlacedState(this);
    }

    setState(state: OrderState): void {
        this.state = state;
    }

    processOrder(): void {
        this.state.processOrder();
    }

    shipOrder(): void {
        this.state.shipOrder();
    }

    deliverOrder(): void {
        this.state.deliverOrder();
    }
}

// 4. Client Code (Using the State Pattern)
// Now we simulate an order lifecycle, transitioning through states.
function main() {
    const order = new OrderContext();

    console.log("\n--- Processing Order ---");
    order.processOrder(); // Moves to OrderShippedState

    console.log("\n--- Shipping Order ---");
    order.shipOrder(); // Moves to OrderDeliveredState

    console.log("\n--- Delivering Order ---");
    order.deliverOrder(); // Completes order

    console.log("\n--- Trying to Process a Delivered Order ---");
    order.processOrder(); // Invalid operation
}

// Execute
main();


