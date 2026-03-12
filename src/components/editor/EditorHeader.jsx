import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from "react-avatar";
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
import { EditorContext } from "../../context/EditorContext";
import { useSocket } from "../../context/SocketContext";

function EditorHeader({ users = [] }) {
  const { activeTab } = useContext(EditorContext);
  const { roomId } = useParams();

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
          room: {roomId?.slice(0, 8)}...
        </button>

        {/* File Tab */}
        <span className="text-sm text-slate-400 pb-1">
          {activeTab ? activeTab.name : "No file selected"}
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
          {users.slice(0, 3).map((user) => (
            <Avatar 
                key={user.socketId} 
                name={user.username} 
                size="28" 
                round={true} 
                className="border-2 border-[#020617]" 
            />
          ))}
          {users.length > 3 && (
            <div className="w-7 h-7 rounded-full bg-slate-800 border-2 border-[#020617] flex items-center justify-center text-[10px] text-white">
              +{users.length - 3}
            </div>
          )}
        </div>

        {/* User Count */}
        <div className="flex items-center gap-1 px-2 py-1 bg-slate-900 border border-slate-700 rounded-md text-sm">
          <UsersRound size={14} />
          {users.length}
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4 text-slate-400">

        <PanelLeft size={18} className="cursor-pointer hover:text-white" />
        <PanelRight size={18} className="cursor-pointer hover:text-white" />
        <Search size={18} className="cursor-pointer hover:text-white" />
        <Bell size={18} className="cursor-pointer hover:text-white" />
        <button className="flex items-center gap-1 hover:text-white transition group">
            <Settings size={18} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>

      </div>

    </div>
  );
}

export default EditorHeader;