/*
Memento Pattern in Backend Development (TypeScript Example)
Use Case: Undo Feature for a Text Editor
The Memento Pattern allows us to save and restore an object's state without exposing its internal details.

In backend development, it's useful for undo/redo functionality, snapshots in databases, version control, and state recovery.

1. Define the Memento (Snapshot)
This stores a saved state of the originator (the main object being modified).
*/

// Memento: Stores a snapshot of the editor state
class Memento {
    private state: string;

    constructor(state: string) {
        this.state = state;
    }

    getState(): string {
        return this.state;
    }
}

// 2. Implement the Originator (The Object Being Modified)
// The TextEditor allows editing text and creating snapshots of its state.
// Originator: The object whose state we want to save/restore
class TextEditor {
    private content: string = "";

    write(text: string): void {
        this.content += text;
    }

    getContent(): string {
        return this.content;
    }

    save(): Memento {
        console.log(`Saving state: "${this.content}"`);
        return new Memento(this.content);
    }

    restore(memento: Memento): void {
        this.content = memento.getState();
        console.log(`Restored state: "${this.content}"`);
    }
}

// 3. Implement the Caretaker (History Manager)
// The HistoryManager keeps a stack of mementos for undo operations.
// Caretaker: Manages saved states (undo history)
class HistoryManager {
    private history: Memento[] = [];

    saveState(editor: TextEditor): void {
        this.history.push(editor.save());
    }

    undo(editor: TextEditor): void {
        if (this.history.length === 0) {
            console.log("No states to restore.");
            return;
        }
        const lastState = this.history.pop()!;
        editor.restore(lastState);
    }
}

// 4. Client Code (Using the Memento Pattern)
// Now we create a text editor, modify its content, save snapshots, and undo changes.
function main() {
    const editor = new TextEditor();
    const history = new HistoryManager();

    console.log("\n--- Writing Text ---");
    editor.write("Hello");
    history.saveState(editor); // Save state

    editor.write(", World!");
    history.saveState(editor); // Save state

    console.log(`Current content: "${editor.getContent()}"`);

    console.log("\n--- Undoing Last Change ---");
    history.undo(editor); // Undo
    console.log(`After undo: "${editor.getContent()}"`);

    console.log("\n--- Undoing Another Change ---");
    history.undo(editor); // Undo
    console.log(`After undo: "${editor.getContent()}"`);

    console.log("\n--- Trying to Undo When No More States Exist ---");
    history.undo(editor); // No states left
}

// Execute
main();
