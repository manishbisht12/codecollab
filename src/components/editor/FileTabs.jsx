import { useContext } from "react";
import { useParams } from "react-router-dom";
import { EditorContext } from "../../context/EditorContext";
import { useSocket } from "../../context/SocketContext";
import { X } from "lucide-react";

function FileTabs() {

  const { tabs, activeTab, setActiveTab, setTabs, deleteFromTree } = useContext(EditorContext);
  const socket = useSocket();
  const { roomId } = useParams();

  const closeTab = (e, tabName) => {
    e.stopPropagation();
    deleteFromTree(tabName);
    if (socket) {
        socket.emit("file-system-update", { 
            roomId, 
            type: "item-delete", 
            data: { name: tabName } 
        });
    }
  };

  return (
    <div className="flex border-b border-slate-800 bg-[#020617] overflow-x-auto no-scrollbar">

      {tabs.map((tab, index) => (

        <div
          key={index}
          onClick={() => {
            setActiveTab(tab);
            if (socket) {
                socket.emit("file-system-update", { 
                    roomId, 
                    type: "file-open", 
                    data: { node: tab } 
                });
            }
          }}
          className={`group flex items-center gap-2 px-4 py-3 text-[11px] font-medium cursor-pointer border-r border-slate-800 transition-all
          ${activeTab?.name === tab.name
            ? "bg-[#0b0f1a] text-white border-t-2 border-t-indigo-500 shadow-inner"
            : "text-slate-500 hover:bg-slate-900/50 hover:text-slate-300"
          }`}
        >

          {/* FILE NAME */}
          <span className="truncate max-w-[120px]">{tab.name}</span>

          {/* CROSS ICON */}
          <X
            size={12}
            onClick={(e) => closeTab(e, tab.name)}
            className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded p-[1px] transition-all"
          />

        </div>

      ))}

      <div className="px-3 flex items-center text-slate-600 hover:text-slate-300 cursor-pointer transition-colors">+</div>

    </div>
  );
}

export default FileTabs;