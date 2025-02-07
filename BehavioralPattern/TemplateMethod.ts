/*
Template Method Pattern in Backend Development (TypeScript Example)
Use Case: Generating Reports (CSV, JSON, XML)
The Template Method Pattern defines the skeleton of an algorithm in a base class, 
allowing subclasses to override specific steps without modifying the overall structure.

In backend development, it's useful for report generation, data processing pipelines, 
request handling workflows, and validation rules.

1. Define the Abstract Class (Template)
This class defines the step-by-step algorithm and allows subclasses to customize specific steps.
*/

// Abstract class: Defines the template method and structure
abstract class ReportGenerator {
    // Template method: Defines the workflow
    generateReport(data: any): void {
        this.fetchData();
        this.processData(data);
        this.formatReport();
        this.saveReport();
    }

    protected abstract fetchData(): void;
    protected abstract processData(data: any): void;
    protected abstract formatReport(): void;

    // Concrete method (Common for all subclasses)
    protected saveReport(): void {
        console.log("[Report] Report saved successfully.");
    }
}

// 2. Implement Concrete Subclasses
// Each Concrete Report Generator customizes specific steps.
// Concrete class: Generates a CSV report
class CSVReportGenerator extends ReportGenerator {
    protected fetchData(): void {
        console.log("[CSV] Fetching data from database...");
    }

    protected processData(data: any): void {
        console.log(`[CSV] Processing data: ${JSON.stringify(data)}`);
    }

    protected formatReport(): void {
        console.log("[CSV] Formatting report as CSV...");
    }
}

// Concrete class: Generates a JSON report
class JSONReportGenerator extends ReportGenerator {
    protected fetchData(): void {
        console.log("[JSON] Fetching data from API...");
    }

    protected processData(data: any): void {
        console.log(`[JSON] Processing data: ${JSON.stringify(data)}`);
    }

    protected formatReport(): void {
        console.log("[JSON] Formatting report as JSON...");
    }
}

// Concrete class: Generates an XML report
class XMLReportGenerator extends ReportGenerator {
    protected fetchData(): void {
        console.log("[XML] Fetching data from cache...");
    }

    protected processData(data: any): void {
        console.log(`[XML] Processing data: ${JSON.stringify(data)}`);
    }

    protected formatReport(): void {
        console.log("[XML] Formatting report as XML...");
    }
}

// 3. Client Code (Using the Template Method)
// Now we use different report generators while maintaining a consistent workflow.
function main() {
    const data = { id: 1, name: "Alice", purchases: 5 };

    console.log("\n--- Generating CSV Report ---");
    const csvReport = new CSVReportGenerator();
    csvReport.generateReport(data);

    console.log("\n--- Generating JSON Report ---");
    const jsonReport = new JSONReportGenerator();
    jsonReport.generateReport(data);

    console.log("\n--- Generating XML Report ---");
    const xmlReport = new XMLReportGenerator();
    xmlReport.generateReport(data);
}

// Execute
main();
