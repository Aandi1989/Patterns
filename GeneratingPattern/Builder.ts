/*
Builder Pattern in Backend (TypeScript Example)
Use Case: Building Complex SQL Queries
The Builder Pattern is useful when constructing complex objects step by step. In a backend context, we often need to build complex SQL queries dynamically based on different conditions.

1. Define the Product (SQL Query)
This represents the final complex object we are building.
*/

// The final product: SQL Query
class SQLQuery {
    private query: string = "";

    setQuery(query: string) {
        this.query = query;
    }

    getQuery(): string {
        return this.query;
    }
}


//
//
// Builder interface
interface QueryBuilder {
    select(fields: string[]): QueryBuilder;
    from(table: string): QueryBuilder;
    where(condition: string): QueryBuilder;
    orderBy(field: string, order: "ASC" | "DESC"): QueryBuilder;
    build(): SQLQuery;
}


// 3. Implement Concrete Builder
// The concrete builder follows the QueryBuilder interface to construct the query step by step.
// Concrete Builder for SQL Queries
class SQLQueryBuilder implements QueryBuilder {
    private queryParts: string[] = [];

    select(fields: string[]): QueryBuilder {
        this.queryParts.push(`SELECT ${fields.join(", ")}`);
        return this;
    }

    from(table: string): QueryBuilder {
        this.queryParts.push(`FROM ${table}`);
        return this;
    }

    where(condition: string): QueryBuilder {
        this.queryParts.push(`WHERE ${condition}`);
        return this;
    }

    orderBy(field: string, order: "ASC" | "DESC"): QueryBuilder {
        this.queryParts.push(`ORDER BY ${field} ${order}`);
        return this;
    }

    build(): SQLQuery {
        const finalQuery = new SQLQuery();
        finalQuery.setQuery(this.queryParts.join(" "));
        return finalQuery;
    }
}

// 4. Implement the Director (Optional)
// A Director defines a specific query-building process.
// Director class (Optional)
class QueryDirector {
    static buildUserQuery(): SQLQuery {
        return new SQLQueryBuilder()
            .select(["id", "name", "email"])
            .from("users")
            .where("is_active = 1")
            .orderBy("name", "ASC")
            .build();
    }
}

// 5. Client Code
// Using the builder pattern to construct queries dynamically.

/*
Key Takeaways
Step-by-Step Construction – Useful for building complex objects where different configurations are needed.
Fluent Interface – The builder allows chaining methods for better readability.
Separation of Concerns – The logic for building an object is separate from the object's representation.
This pattern is great for dynamically generating SQL queries, constructing API request payloads, 
or assembling complex data objects in backend services. 🚀

Would you like another example, perhaps for building HTTP request bodies or something else?
*/