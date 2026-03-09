import { createContext, useState } from "react";

export const EditorContext = createContext();

export function EditorProvider({ children }) {

  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);

  const openFile = (file) => {

    const exists = tabs.find((t) => t.name === file.name);

    if (!exists) {
      setTabs([...tabs, file]);
    }

    setActiveTab(file);
  };

  return (
    <EditorContext.Provider
      value={{
        tabs,
        setTabs,
        activeTab,
        setActiveTab,
        openFile
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}