import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronRight,
  ChevronDown,
  Plus,
  Folder,
  File,
  Trash2,
  Copy,
  LogOut
} from "lucide-react";
import toast from "react-hot-toast";
import { EditorContext } from "../../context/EditorContext";
import { useSocket } from "../../context/SocketContext";

function FileExplorer() {
  const { 
    openFile, 
    tree, 
    toggleFolder, 
    addItemToTree, 
    deleteFromTree 
  } = useContext(EditorContext);
  
  const socket = useSocket();
  const { roomId } = useParams();

  const [newItem, setNewItem] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleToggleFolder = (folderName) => {
    toggleFolder(folderName);
    if (socket) {
        socket.emit("file-system-update", { 
            roomId, 
            type: "folder-toggle", 
            data: { folderName } 
        });
    }
  };

  const handleAddItem = (type) => {
    setNewItem(type);
  };

  const handleCreateItem = () => {
    if (!inputValue.trim()) return;
    addItemToTree(newItem, inputValue);
    if (socket) {
        socket.emit("file-system-update", { 
            roomId, 
            type: "item-create", 
            data: { type: newItem, name: inputValue } 
        });
    }
    setInputValue("");
    setNewItem(null);
  };

  const handleDeleteItem = (name) => {
    deleteFromTree(name);
    if (socket) {
        socket.emit("file-system-update", { 
            roomId, 
            type: "item-delete", 
            data: { name } 
        });
    }
  };

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID copied to clipboard!", {
        style: { borderRadius: "8px", background: "#334155", color: "#fff" },
      });
    } catch (err) {
      toast.error("Could not copy room ID");
    }
  };

  const renderTree = (nodes, level = 0) =>
    nodes.map((node, index) => (
      <div key={index} style={{ paddingLeft: level * 12 }}>
        {node.type === "folder" ? (
          <>
            <div className="flex items-center justify-between group px-1 py-1 hover:bg-slate-800 rounded cursor-pointer">
              <div
                onClick={() => handleToggleFolder(node.name)}
                className="flex items-center gap-1"
              >
                {node.open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                <Folder size={16} className="text-yellow-400" />
                {node.name}
              </div>
              <Trash2
                size={14}
                onClick={() => handleDeleteItem(node.name)}
                className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 cursor-pointer"
              />
            </div>
            {node.open && node.children && (
              <div>{renderTree(node.children, level + 1)}</div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-between group px-1 py-1 hover:bg-slate-800 rounded cursor-pointer">
            <div
              onClick={() => {
                openFile(node);
                if (socket) {
                    socket.emit("file-system-update", { 
                        roomId, 
                        type: "file-open", 
                        data: { node } 
                    });
                }
              }}
              className="flex items-center gap-2"
            >
              <File size={14} className="text-indigo-400" />
              {node.name}
            </div>
            <Trash2
              size={14}
              onClick={() => handleDeleteItem(node.name)}
              className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 cursor-pointer"
            />
          </div>
        )}
      </div>
    ));

  return (
    <div className="h-full text-sm text-slate-300 bg-[#020617] flex flex-col">
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800">
        <span className="text-xs text-slate-400 tracking-wide">EXPLORER</span>
        <div className="flex gap-2">
          <Plus
            size={16}
            onClick={() => handleAddItem("file")}
            className="cursor-pointer text-slate-400 hover:text-white transition-colors"
            title="New File"
          />
          <Folder
            size={16}
            onClick={() => handleAddItem("folder")}
            className="cursor-pointer text-slate-400 hover:text-white transition-colors"
            title="New Folder"
          />
        </div>
      </div>

      {newItem && (
        <div className="px-3 py-2">
          <input
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleCreateItem}
            onKeyDown={(e) => e.key === "Enter" && handleCreateItem()}
            placeholder={`Enter ${newItem} name`}
            className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs outline-none focus:border-indigo-500"
          />
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-2 py-2 no-scrollbar">
        {renderTree(tree)}
      </div>

      <div className="p-3 border-t border-slate-800 bg-[#0f172a]/30 flex flex-col gap-2">
        <button
          onClick={copyRoomId}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-lg text-xs font-medium transition-all group"
        >
          <Copy size={14} className="text-indigo-400 group-hover:scale-110 transition-transform" />
          Copy Room ID
        </button>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to leave the workspace?")) {
              window.location.href = "/";
            }
          }}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-xs font-medium text-red-400 transition-all group"
        >
          <LogOut size={14} className="group-hover:-translate-x-1 transition-transform" />
          Leave Collaboration
        </button>
      </div>
    </div>
  );
}

export default FileExplorer;