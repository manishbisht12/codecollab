import React from "react";
import {
  Wifi,
  GitBranch,
  Search,
  Bell,
  Settings,
  PanelRight,
  PanelLeft,
  UsersRound
} from "lucide-react";

function EditorHeader() {
  return (
    <div className="h-14 border-b border-slate-800 flex items-center justify-between px-4 bg-[#020617] text-slate-300">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-indigo-500 flex items-center justify-center text-white font-bold">
            {"</>"}
          </div>
          <span className="font-semibold text-white">CodeCollab</span>
        </div>

        {/* Branch */}
        <button className="flex items-center gap-2 px-3 py-1 border border-slate-700 bg-slate-900 rounded-md hover:bg-slate-800 transition">
          <GitBranch size={16} />
          main
        </button>

        {/* File Tab */}
        <span className="text-sm text-slate-400  pb-1">
          auth-refactor
        </span>
      </div>

      {/* CENTER SECTION */}
      <div className="flex items-center gap-4">

        <div className="flex items-center gap-2 text-emerald-400">
          <Wifi size={16} />
          <span className="text-sm font-medium">Live</span>
        </div>

        {/* Avatars */}
        <div className="flex -space-x-2">
          <img
            src="https://i.pravatar.cc/30?img=1"
            className="w-7 h-7 rounded-full border border-slate-900"
          />
          <img
            src="https://i.pravatar.cc/30?img=2"
            className="w-7 h-7 rounded-full border border-slate-900"
          />
          <img
            src="https://i.pravatar.cc/30?img=3"
            className="w-7 h-7 rounded-full border border-slate-900"
          />
        </div>

        {/* User Count */}
        <div className="flex items-center gap-1 px-2 py-1 bg-slate-900 border border-slate-700 rounded-md text-sm">
          <UsersRound size={14} />
          3
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4 text-slate-400">

        <PanelLeft size={18} className="cursor-pointer hover:text-white" />
        <PanelRight size={18} className="cursor-pointer hover:text-white" />
        <Search size={18} className="cursor-pointer hover:text-white" />
        <Bell size={18} className="cursor-pointer hover:text-white" />
        <Settings size={18} className="cursor-pointer hover:text-white" />

      </div>

    </div>
  );
}

export default EditorHeader;