/*
Strategy Pattern in Backend Development (TypeScript Example)
Use Case: Payment Processing System
The Strategy Pattern allows selecting an algorithm or behavior at runtime by encapsulating different strategies behind a common interface.

In backend development, it's useful for payment processing, sorting algorithms, authentication methods, and dynamic business rules.

1. Define the Strategy Interface
Each payment method will implement this interface.
*/

// Strategy Interface: Defines how a payment should be processed
interface PaymentStrategy {
    pay(amount: number): void;
}

// 2. Implement Concrete Strategies
// Each Concrete Strategy implements a different payment method.
// Concrete Strategy: PayPal Payment
class PayPalPayment implements PaymentStrategy {
    private email: string;

    constructor(email: string) {
        this.email = email;
    }

    pay(amount: number): void {
        console.log(`[PayPal] Processing payment of $${amount} from ${this.email}`);
    }
}

// Concrete Strategy: Credit Card Payment
class CreditCardPayment implements PaymentStrategy {
    private cardNumber: string;

    constructor(cardNumber: string) {
        this.cardNumber = cardNumber;
    }

    pay(amount: number): void {
        console.log(`[CreditCard] Processing payment of $${amount} with card ${this.cardNumber}`);
    }
}

// Concrete Strategy: Cryptocurrency Payment
class CryptoPayment implements PaymentStrategy {
    private walletAddress: string;

    constructor(walletAddress: string) {
        this.walletAddress = walletAddress;
    }

    pay(amount: number): void {
        console.log(`[Crypto] Processing payment of $${amount} from wallet ${this.walletAddress}`);
    }
}

// 3. Implement the Context
// The PaymentProcessor dynamically selects a payment strategy.
// Context: Uses a payment strategy
class PaymentProcessor {
    private strategy: PaymentStrategy;

    constructor(strategy: PaymentStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: PaymentStrategy): void {
        this.strategy = strategy;
    }

    processPayment(amount: number): void {
        this.strategy.pay(amount);
    }
}

// 4. Client Code (Using the Strategy Pattern)
// Now we dynamically switch payment methods at runtime.
function main() {
    // Create payment processor with an initial strategy
    const paymentProcessor = new PaymentProcessor(new PayPalPayment("alice@example.com"));

    console.log("\n--- Paying with PayPal ---");
    paymentProcessor.processPayment(100);

    console.log("\n--- Switching to Credit Card ---");
    paymentProcessor.setStrategy(new CreditCardPayment("1234-5678-9012-3456"));
    paymentProcessor.processPayment(200);

    console.log("\n--- Switching to Cryptocurrency ---");
    paymentProcessor.setStrategy(new CryptoPayment("0xA1B2C3D4E5F6"));
    paymentProcessor.processPayment(300);
}

// Execute
main();
