import Editor from "@monaco-editor/react";
import { useContext, useEffect, useRef } from "react";
import { EditorContext } from "../../context/EditorContext";
import { useSocket } from "../../context/SocketContext";
import { useParams } from "react-router-dom";

function CodeEditor() {
  const { activeTab, updateCode } = useContext(EditorContext);
  const socket = useSocket();
  const { roomId } = useParams();
  const editorRef = useRef(null);

  useEffect(() => {
    if (!socket) return;

    // Listen for code updates from other users
    socket.on("code-update", ({ code, fileName }) => {
      updateCode(fileName, code);
    });

    // Handle new user joining - send them the current code
    socket.on("user-joined", ({ socketId }) => {
      if (activeTab) {
        socket.emit("sync-code", {
          socketId,
          code: activeTab.code,
          fileName: activeTab.name,
        });
      }
    });

    return () => {
      socket.off("code-update");
      socket.off("user-joined");
    };
  }, [socket, activeTab, updateCode]);

  const handleEditorChange = (value) => {
    if (activeTab) {
      updateCode(activeTab.name, value);
      socket.emit("code-change", {
        roomId,
        code: value,
        fileName: activeTab.name,
      });
    }
  };

  return (
    <div className="h-full">
      {activeTab ? (
        <Editor
          height="100%"
          theme="vs-dark"
          defaultLanguage={activeTab.language || "javascript"}
          value={activeTab.code}
          onChange={handleEditorChange}
          onMount={(editor) => {
            editorRef.current = editor;
          }}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
          }}
        />
      ) : (
        <div className="flex items-center justify-center h-full text-slate-500">
          Select a file to start editing
        </div>
      )}
    </div>
  );
}

export default CodeEditor;