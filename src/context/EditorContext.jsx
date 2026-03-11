import { createContext, useState, useCallback } from "react";

export const EditorContext = createContext();

export function EditorProvider({ children }) {

  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [tree, setTree] = useState([
    {
      name: "src",
      type: "folder",
      open: true,
      children: [
        {
          name: "components",
          type: "folder",
          open: true,
          children: [
            {
              name: "Auth.tsx",
              type: "file",
              code: `export default function Auth(){
  return <div>Auth Component</div>
}`
            },
            {
              name: "Dashboard.tsx",
              type: "file",
              code: `export default function Dashboard(){
  return <div>Dashboard Page</div>
}`
            },
            {
              name: "Header.tsx",
              type: "file",
              code: `export default function Header(){
  return <header>Header Component</header>
}`
            }
          ]
        },
        {
          name: "App.tsx",
          type: "file",
          code: `function App(){
  return <h1>Hello World</h1>
}

export default App`
        },
        {
          name: "index.ts",
          type: "file",
          code: `console.log("Application started");`
        }
      ]
    }
  ]);

  const openFile = useCallback((file) => {
    setTabs((prev) => {
      const exists = prev.find((t) => t.name === file.name);
      if (!exists) {
        return [...prev, file];
      }
      return prev;
    });
    setActiveTab(file);
  }, []);

  const updateCode = useCallback((fileName, code) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.name === fileName ? { ...tab, code } : tab
      )
    );

    setActiveTab((prev) => {
      if (prev?.name === fileName) {
        return { ...prev, code };
      }
      return prev;
    });
  }, []);

  const toggleFolder = useCallback((folderName) => {
    const updateTree = (nodes) => {
        return nodes.map(node => {
            if (node.type === "folder" && node.name === folderName) {
                return { ...node, open: !node.open };
            }
            if (node.children) {
                return { ...node, children: updateTree(node.children) };
            }
            return node;
        });
    };
    setTree(prevTree => updateTree(prevTree));
  }, []);

  const addItemToTree = useCallback((type, name, parentName = "src") => {
    const newItem = {
        name,
        type,
        ...(type === "file" && { code: "// new file" }),
        ...(type === "folder" && { children: [], open: false })
    };

    const updateTree = (nodes) => {
        return nodes.map(node => {
            if (node.type === "folder" && node.name === parentName) {
                return { ...node, children: [...node.children, newItem] };
            }
            if (node.children) {
                return { ...node, children: updateTree(node.children) };
            }
            return node;
        });
    };
    setTree(prevTree => updateTree(prevTree));
  }, []);

  const deleteFromTree = useCallback((name) => {
    const updateTree = (nodes) => {
        return nodes.filter(node => node.name !== name).map(node => {
            if (node.children) {
                return { ...node, children: updateTree(node.children) };
            }
            return node;
        });
    };
    setTree(prevTree => updateTree(prevTree));
    
    // Also remove from tabs if it's a file
    setTabs(prev => prev.filter(t => t.name !== name));
    setActiveTab((prev) => (prev?.name === name ? null : prev));
  }, []);

  return (
    <EditorContext.Provider
      value={{
        tabs,
        setTabs,
        activeTab,
        setActiveTab,
        openFile,
        updateCode,
        tree,
        setTree,
        toggleFolder,
        addItemToTree,
        deleteFromTree
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}