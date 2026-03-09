import React, { useState, useContext } from "react";
import {
  ChevronRight,
  ChevronDown,
  Plus,
  Folder,
  File,
  Trash2
} from "lucide-react";
import { EditorContext } from "../../context/EditorContext";

function FileExplorer() {

  const { openFile } = useContext(EditorContext);

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

  const [newItem, setNewItem] = useState(null);
  const [inputValue, setInputValue] = useState("");

  // Toggle folder open/close
  const toggleFolder = (folder) => {
    folder.open = !folder.open;
    setTree([...tree]);
  };

  // Add file/folder input
  const addItem = (type) => {
    setNewItem(type);
  };

  // Create file/folder
  const createItem = () => {

    if (!inputValue.trim()) return;

    const newNode = {
      name: inputValue,
      type: newItem,
      ...(newItem === "file" && { code: "// new file" }),
      ...(newItem === "folder" && { children: [], open: false })
    };

    const updatedTree = [...tree];
    updatedTree[0].children.push(newNode);

    setTree(updatedTree);
    setInputValue("");
    setNewItem(null);
  };

  // Delete file/folder
  const deleteNode = (nodes, index) => {
    nodes.splice(index, 1);
    setTree([...tree]);
  };

  // Render Tree
  const renderTree = (nodes, level = 0) =>
    nodes.map((node, index) => (
      <div key={index} style={{ paddingLeft: level * 12 }}>

        {/* FOLDER */}
        {node.type === "folder" ? (
          <>
            <div className="flex items-center justify-between group px-1 py-1 hover:bg-slate-800 rounded cursor-pointer">

              <div
                onClick={() => toggleFolder(node)}
                className="flex items-center gap-1"
              >
                {node.open ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}

                <Folder size={16} className="text-yellow-400" />
                {node.name}
              </div>

              <Trash2
                size={14}
                onClick={() => deleteNode(nodes, index)}
                className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 cursor-pointer"
              />

            </div>

            {node.open && node.children && (
              <div>{renderTree(node.children, level + 1)}</div>
            )}
          </>
        ) : (

          /* FILE */
          <div className="flex items-center justify-between group px-1 py-1 hover:bg-slate-800 rounded cursor-pointer">

            <div
              onClick={() => openFile(node)}
              className="flex items-center gap-2"
            >
              <File size={14} className="text-indigo-400" />
              {node.name}
            </div>

            <Trash2
              size={14}
              onClick={() => deleteNode(nodes, index)}
              className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 cursor-pointer"
            />

          </div>
        )}

      </div>
    ));

  return (
    <div className="h-full text-sm text-slate-300 bg-[#020617] flex flex-col">

      {/* HEADER */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800">
        <span className="text-xs text-slate-400 tracking-wide">
          EXPLORER
        </span>

        <div className="flex gap-2">

          <Plus
            size={16}
            onClick={() => addItem("file")}
            className="cursor-pointer text-slate-400 hover:text-white"
            title="New File"
          />

          <Folder
            size={16}
            onClick={() => addItem("folder")}
            className="cursor-pointer text-slate-400 hover:text-white"
            title="New Folder"
          />

        </div>
      </div>

      {/* CREATE INPUT */}
      {newItem && (
        <div className="px-3 py-2">
          <input
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={createItem}
            onKeyDown={(e) => e.key === "Enter" && createItem()}
            placeholder={`Enter ${newItem} name`}
            className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs outline-none"
          />
        </div>
      )}

      {/* FILE TREE */}
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {renderTree(tree)}
      </div>

    </div>
  );
}

export default FileExplorer;