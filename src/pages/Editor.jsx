import React, { useEffect, useContext, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useSocket } from "../context/SocketContext";
import { EditorContext } from "../context/EditorContext";

import EditorHeader from "../components/editor/EditorHeader";
import FileExplorer from "../components/explorer/FileExplorer";
import CodeEditor from "../components/editor/CodeEditor";
import ChatPanel from "../components/chat/ChatPanel";
import FileTabs from "../components/editor/FileTabs";
import StatusBar from "../components/editor/StatusBar";

function Editor() {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const socket = useSocket();
  const { 
    openFile, 
    toggleFolder, 
    addItemToTree, 
    deleteFromTree 
  } = useContext(EditorContext);

  const [users, setUsers] = useState([]);
  const username = location.state?.username;

  useEffect(() => {
    if (!socket || !roomId || !username) {
        if (!username && socket) {
            toast.error("Username is required");
            navigate("/");
        }
        return;
    }

    // Join room once
    socket.emit("join-room", { roomId, username });

    // Listen for room-related events
    socket.on("room-users", (userList) => {
        setUsers(userList);
    });

    const handleUserJoined = ({ username: joinedUser }) => {
        toast.success(`${joinedUser} joined the workspace`, {
            style: { borderRadius: "8px", background: "#334155", color: "#fff" },
        });
    };

    const handleUserLeft = ({ username: leftUser }) => {
        toast.error(`${leftUser} left the workspace`, {
            style: { borderRadius: "8px", background: "#334155", color: "#fff" },
        });
    };

    const handleFileSystemSync = ({ type, data }) => {
        switch(type) {
            case "file-open":
                openFile(data.node);
                break;
            case "folder-toggle":
                toggleFolder(data.folderName);
                break;
            case "item-create":
                addItemToTree(data.type, data.name);
                break;
            case "item-delete":
                deleteFromTree(data.name);
                break;
            default:
                break;
        }
    };

    socket.on("user-joined", handleUserJoined);
    socket.on("user-left", handleUserLeft);
    socket.on("file-system-sync", handleFileSystemSync);

    return () => {
      socket.off("room-users");
      socket.off("user-joined", handleUserJoined);
      socket.off("user-left", handleUserLeft);
      socket.off("file-system-sync", handleFileSystemSync);
    };
  }, [socket, roomId, username, openFile, toggleFolder, addItemToTree, deleteFromTree, navigate]);

  return (
    <div className="h-screen w-full bg-[#0f172a] text-white flex flex-col">
      <Toaster position="top-right" />
      
      {/* Top Navbar */}
      <EditorHeader users={users} />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* Explorer */}
        <div className="w-[235px] border-r border-slate-800">
          <FileExplorer />
        </div>

        {/* Editor Section */}
        <div className="flex flex-col flex-1">

          {/* Tabs */}
          <FileTabs />

          {/* Code Editor */}
          <div className="flex-1">
            <CodeEditor />
          </div>

          {/* Status Bar (only under editor) */}
          <StatusBar users={users} />

        </div>

        {/* Chat */}
        <div className="w-[270px] border-l border-slate-800">
          <ChatPanel />
        </div>

      </div>

    </div>
  );
}

export default Editor;