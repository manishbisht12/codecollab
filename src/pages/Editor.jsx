import React from "react";
import EditorHeader from "../components/editor/EditorHeader";
import FileExplorer from "../components/explorer/FileExplorer";
import CodeEditor from "../components/editor/CodeEditor";
import ChatPanel from "../components/chat/ChatPanel";
import FileTabs from "../components/editor/FileTabs";
import StatusBar from "../components/editor/StatusBar";

function Editor() {
  return (
    <div className="h-screen w-full bg-[#0f172a] text-white flex flex-col">

      {/* Top Navbar */}
      <EditorHeader />

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
          <StatusBar />

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