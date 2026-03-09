import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import toast,{ Toaster } from "react-hot-toast";


import { Code2, PlusCircle, ArrowRight } from "lucide-react";

function Home() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
 const [mousePosition, setMousePosition] = useState({x:0, y:0});
  const navigate = useNavigate();

  const handleMouseMove = (e)=> {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const createRoom = (e) => {
    e.preventDefault();
    const id = uuid();
    setRoomId(id);
    toast.success("Created a new room", {
    style: {
      borderRadius: "8px",
      background: "#334155", 
      color: "#fff",
      border: "1px solid #334155",
    },
    iconTheme: {
      primary: "#10b981", 
      secondary: "#fff",
    },
  });
  };

  const joinRoom = (e) => {
    e.preventDefault();
    if (!roomId || !username) {
      
      toast.error("Please enter Room ID and Username",{
        style:{
            borderRadius: "8px",
            background: "#334155",
            color: "#fff",
            border: "1px solid #334155"
        },
      })
      return;
    }
    navigate(`/editor/${roomId}`, {
      state: { username }
    });
  };

  return (
<div 
onMouseMove={handleMouseMove}
className="min-h-screen w-full bg-[#0f172a] bg-[radial-gradient(#2e3c51_1px,transparent_1px)]  [background-size:40px_40px]  flex items-center justify-center p-4">
  <div
  className="pointer-events-none absolute inset-0"
  style={{
    background: `radial-gradient(250px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16,185,129,0.15), transparent 80%)`,
  }}
/>

      <Toaster position="top-right" containerStyle={{top: 50, right:40}}  reverseOrder={false} />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full"></div>

      <div className="relative w-full max-w-md">
        
        <div className="flex flex-col items-center mb-8">
          <div className="bg-emerald-500/20 p-3 rounded-2xl mb-4 border border-emerald-500/30">
            <Code2 className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">CodeCollab</h1>
          {/* <p className="text-slate-400 mt-2">Real-time collaborative coding</p> */}
        </div>
        
        
        <div className="bg-[#1e293b]/50 backdrop-blur-xl border border-slate-700/50 p-8 rounded-2xl shadow-2xl">
          <form onSubmit={joinRoom} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Username</label>
              <input
                type="text"
                placeholder="Alex_dev"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#0f172a] border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Room ID</label>
              <input
                type="text"
                placeholder="Paste Invitation ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full bg-[#0f172a] border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#0f172a] font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-emerald-500/20"
            >
              Join Collaboration
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

        
          <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
            <p className="text-slate-400 text-sm ">
              Need a private workspace?{" "}
              <button
                onClick={createRoom}
                className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4 decoration-emerald-500/30 transition-colors inline-flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                Generate New Room
              </button>
            </p>
          </div>
        </div>


        <div className="mt-8 text-center">
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
            Powered by Manish Bisht
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;