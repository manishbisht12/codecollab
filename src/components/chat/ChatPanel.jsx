import React from "react";
import {
  MessageSquare,
  Smile,
  Send,
  Paperclip,
  EllipsisVertical,
  Mic,
  Copy,
  Play
} from "lucide-react";

function ChatPanel() {
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#0b0f1a] to-[#020617] text-white">

      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">

        <div className="flex items-center gap-2">
          <MessageSquare size={18} className="text-indigo-400"/>
          <span className="font-semibold text-xs">Team Chat</span>

          <span className="bg-indigo-600/30 text-indigo-300 text-xs px-2 py-[2px] rounded-full">
            3
          </span>
        </div>

        <EllipsisVertical size={18} className="text-slate-400 cursor-pointer"/>
      </div>


      {/* ACTIVE USERS */}
      <div className="flex gap-6 px-4 py-3 border-b border-slate-800">

        <div className="flex flex-col items-center text-xs text-slate-300">
          <div className="relative">
            <img src="https://i.pravatar.cc/40?img=11"
              className="w-10 h-10 rounded-full border-2 border-indigo-500"/>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#020617] rounded-full"/>
          </div>
          Alex
        </div>

        <div className="flex flex-col items-center text-xs text-slate-300">
          <div className="relative">
            <img src="https://i.pravatar.cc/40?img=32"
              className="w-10 h-10 rounded-full border-2 border-pink-500"/>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#020617] rounded-full"/>
          </div>
          Sarah
        </div>

        <div className="flex flex-col items-center text-xs text-slate-300">
          <div className="relative">
            <img src="https://i.pravatar.cc/40?img=15"
              className="w-10 h-10 rounded-full border-2 border-green-500"/>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-yellow-400 border-2 border-[#020617] rounded-full"/>
          </div>
          Jordan
        </div>

      </div>


      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 ">
        

        {/* LEFT MESSAGE */}
        <div className="flex gap-3 items-start">

          <img
            src="https://i.pravatar.cc/40?img=32"
            className="w-8 h-8 rounded-full"
          />

          <div>
            <div className="text-xs text-pink-400 mb-1">
              Sarah <span className="text-slate-500 ml-2">10:32 AM</span>
            </div>

            <div className="bg-[#1e2230] text-xs px-4 py-3 rounded-2xl max-w-[240px]">
              Hey, I fixed the bug in the auth module 🎉
            </div>
          </div>

        </div>


        {/* RIGHT MESSAGE */}
        <div className="flex justify-end">

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-xs px-4 py-3 rounded-2xl max-w-[260px] shadow-md">
            Nice! Can you check line 45? Something looks off with the token validation.
          </div>

        </div>


        {/* LEFT MESSAGE */}
        <div className="flex gap-3 items-start">

          <img
            src="https://i.pravatar.cc/40?img=15"
            className="w-8 h-8 rounded-full"
          />

          <div>
            <div className="text-xs text-green-400 mb-1">
              Jordan <span className="text-slate-500 ml-2">10:35 AM</span>
            </div>

            <div className="bg-[#1e2230] text-xs px-4 py-3 rounded-2xl max-w-[250px]">
              I'm looking at it now. I think we need to handle the edge case where token is null.
            </div>
          </div>

        </div>


        {/* LEFT MESSAGE */}
        <div className="flex gap-3 items-start">

          <img
            src="https://i.pravatar.cc/40?img=32"
            className="w-8 h-8 rounded-full"
          />

          <div>
            <div className="text-xs text-pink-400 mb-1">
              Sarah <span className="text-slate-500 ml-2">10:36 AM</span>
            </div>

            <div className="bg-[#1e2230] text-xs px-4 py-3 rounded-2xl max-w-[240px]">
              Good catch Jordan! Let me update that.
            </div>
          </div>

        </div>


        {/* RIGHT MESSAGE */}
        <div className="flex justify-end">

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-xs px-4 py-3 rounded-2xl max-w-[250px]">
            Also, should we add unit tests for this function?
          </div>

        </div>

      </div>


      {/* MESSAGE INPUT */}
      <div className="px-3 pb-3 border-t border-slate-800">

        <div className="flex items-center bg-[#141827] rounded-2xl px-3 py-2 mt-3">

          <input
            placeholder="Message team..."
            className="flex-1 bg-transparent outline-none text-xs text-slate-300 placeholder:text-slate-500"
          />

          <Smile size={18} className="text-slate-400 mr-3 cursor-pointer"/>
          <Paperclip size={18} className="text-slate-400 mr-3 cursor-pointer"/>

          <button className="bg-indigo-600 p-2 rounded-xl hover:bg-indigo-500 transition">
            <Send size={16}/>
          </button>

        </div>


        {/* FOOTER ACTIONS */}
        <div className="flex gap-5 text-xs text-slate-400 mt-3 px-1">

          <div className="flex items-center gap-1 cursor-pointer">
            <Mic size={14}/>
            Voice
          </div>

          <div className="flex items-center gap-1 cursor-pointer">
            <Copy size={14}/>
            Share snippet
          </div>

          <div className="flex items-center gap-1 cursor-pointer">
            <Play size={14}/>
            Run
          </div>

        </div>

      </div>

    </div>
  );
}

export default ChatPanel;