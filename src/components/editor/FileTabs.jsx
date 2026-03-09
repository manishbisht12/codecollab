import { useContext } from "react";
import { EditorContext } from "../../context/EditorContext";
import { X } from "lucide-react";

function FileTabs() {

  const { tabs, activeTab, setActiveTab, setTabs } = useContext(EditorContext);

  const closeTab = (e, tabName) => {
    e.stopPropagation();

    const updatedTabs = tabs.filter((tab) => tab.name !== tabName);
    setTabs(updatedTabs);

    if (activeTab?.name === tabName) {
      setActiveTab(updatedTabs[updatedTabs.length - 1] || null);
    }
  };

  return (
    <div className="flex border-b border-slate-800 bg-[#020617] overflow-x-auto">

      {tabs.map((tab, index) => (

        <div
          key={index}
          onClick={() => setActiveTab(tab)}
          className={`group flex items-center gap-2 px-4 py-2 text-sm cursor-pointer border-r border-slate-800
          ${activeTab?.name === tab.name
            ? "bg-[#0b0f1a] text-white"
            : "text-slate-400 hover:bg-slate-900"
          }`}
        >

          {/* FILE NAME */}
          <span>{tab.name}</span>

          {/* CROSS ICON (SHOW ON HOVER) */}
          <X
            size={14}
            onClick={(e) => closeTab(e, tab.name)}
            className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400"
          />

        </div>

      ))}

      <div className="px-3 py-2 text-slate-500 cursor-pointer">+</div>

    </div>
  );
}

export default FileTabs;