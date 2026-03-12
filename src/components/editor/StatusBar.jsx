import { Wifi } from "lucide-react";

export default function StatusBar({users=[]}) {
  return (
    <div className="w-full bg-[#5b5bd6] text-white text-xs px-4 py-2 flex items-center justify-between">

      <div className="flex items-center gap-6">
        <span>⎇ main</span>
        <span>Ln 12, Col 8</span>
        <span>TypeScript React</span>
      </div>

      <div className="flex items-center gap-6">
        <span>UTF-8</span>
        <span>Spaces: 2</span>

        <span className="flex items-center gap-2 text-green-300">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          {users.length} Online
        </span>
      </div>

    </div>
  );
}