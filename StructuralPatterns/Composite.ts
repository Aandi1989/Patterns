/*
Composite Pattern in Backend Development (TypeScript Example)
Use Case: Handling Nested Hierarchies (File System Representation)
The Composite Pattern is used to treat individual objects and compositions of objects uniformly. It’s particularly useful when dealing with tree structures such as files & folders, hierarchical menus, or organizational structures.

1. Define the Component Interface
This represents both individual objects (files) and composite objects (folders).
*/

// Component interface (Common interface for both files and folders)
interface FileSystemItem {
    getName(): string;
    getSize(): number;
    display(indent?: string): void;
}

// 2. Implement the Leaf Node (File)
// A file is a leaf in the composite structure (it has no children).
// Leaf: Represents individual files
class File implements FileSystemItem {
    constructor(private name: string, private size: number) { }

    getName(): string {
        return this.name;
    }

    getSize(): number {
        return this.size;
    }

    display(indent: string = ""): void {
        console.log(`${indent}- ${this.getName()} (${this.getSize()} KB)`);
    }
}

// 3. Implement the Composite Node (Folder)
// A folder is a composite in the structure—it can contain files or other folders.
// Composite: Represents folders that can contain files or other folders
class Folder implements FileSystemItem {
    private items: FileSystemItem[] = [];

    constructor(private name: string) { }

    getName(): string {
        return this.name;
    }

    getSize(): number {
        return this.items.reduce((total, item) => total + item.getSize(), 0);
    }

    addItem(item: FileSystemItem): void {
        this.items.push(item);
    }

    display(indent: string = ""): void {
        console.log(`${indent}+ ${this.getName()} (Folder)`);
        this.items.forEach(item => item.display(indent + "  "));
    }
}

// 4. Client Code (Using the Composite Pattern)
// Now we can construct a nested file system structure using the Composite Pattern.
function main() {
    // Create individual files
    const file1 = new File("Document.txt", 15);
    const file2 = new File("Photo.jpg", 120);
    const file3 = new File("Video.mp4", 5000);

    // Create folders and add files to them
    const documentsFolder = new Folder("Documents");
    documentsFolder.addItem(file1);

    const mediaFolder = new Folder("Media");
    mediaFolder.addItem(file2);
    mediaFolder.addItem(file3);

    // Create root folder and add subfolders
    const rootFolder = new Folder("Root");
    rootFolder.addItem(documentsFolder);
    rootFolder.addItem(mediaFolder);

    // Display file system structure
    rootFolder.display();
}

// Execute
main();
