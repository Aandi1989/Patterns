/*
Interpreter Pattern in Backend Development (TypeScript Example)
Use Case: Custom Expression Evaluation (Math Expressions)
The Interpreter Pattern is used to define a language and interpret expressions written in that language.

In backend development, it's useful for parsing custom scripts, evaluating mathematical expressions, processing domain-specific languages (DSLs), or executing query filters.

1. Define the Expression Interface
This interface represents all expressions that can be interpreted.
*/

// Expression Interface (Abstract class)
abstract class Expression {
    abstract interpret(): number;
}

// 2. Implement Concrete Expressions
// Each Concrete Expression represents a number or an operation.
// Terminal Expression: Represents a Number
class NumberExpression extends Expression {
    private value: number;

    constructor(value: number) {
        super();
        this.value = value;
    }

    interpret(): number {
        return this.value;
    }
}

// Non-Terminal Expression: Addition
class AddExpression extends Expression {
    private left: Expression;
    private right: Expression;

    constructor(left: Expression, right: Expression) {
        super();
        this.left = left;
        this.right = right;
    }

    interpret(): number {
        return this.left.interpret() + this.right.interpret();
    }
}

// Non-Terminal Expression: Subtraction
class SubtractExpression extends Expression {
    private left: Expression;
    private right: Expression;

    constructor(left: Expression, right: Expression) {
        super();
        this.left = left;
        this.right = right;
    }

    interpret(): number {
        return this.left.interpret() - this.right.interpret();
    }
}

// Non-Terminal Expression: Multiplication
class MultiplyExpression extends Expression {
    private left: Expression;
    private right: Expression;

    constructor(left: Expression, right: Expression) {
        super();
        this.left = left;
        this.right = right;
    }

    interpret(): number {
        return this.left.interpret() * this.right.interpret();
    }
}

// Non-Terminal Expression: Division
class DivideExpression extends Expression {
    private left: Expression;
    private right: Expression;

    constructor(left: Expression, right: Expression) {
        super();
        this.left = left;
        this.right = right;
    }

    interpret(): number {
        const denominator = this.right.interpret();
        if (denominator === 0) {
            throw new Error("Division by zero is not allowed.");
        }
        return this.left.interpret() / denominator;
    }
}

// 3. Client Code (Using the Interpreter)
// Now we can build and interpret math expressions dynamically.
function main() {
    // (5 + 3) * (10 - 2) → Expected output: 64
    const expression = new MultiplyExpression(
        new AddExpression(new NumberExpression(5), new NumberExpression(3)),
        new SubtractExpression(new NumberExpression(10), new NumberExpression(2))
    );

    console.log("Result:", expression.interpret());

    // (20 / 5) + (4 * 3) → Expected output: 14
    const expression2 = new AddExpression(
        new DivideExpression(new NumberExpression(20), new NumberExpression(5)),
        new MultiplyExpression(new NumberExpression(4), new NumberExpression(3))
    );

    console.log("Result:", expression2.interpret());
}

// Execute
main();
