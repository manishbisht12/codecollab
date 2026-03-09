import Editor from "@monaco-editor/react";
import { useContext } from "react";
import { EditorContext } from "../../context/EditorContext";

function CodeEditor() {

  const { activeTab } = useContext(EditorContext);

  return (
    <div className="h-full">

      {activeTab ? (

        <Editor
          height="100%"
          theme="vs-dark"
          defaultLanguage="javascript"
          value={activeTab.code}
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