"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Medal } from "lucide-react";
import { useEffect, useState } from "react";

const leaderboardData = [
  { id: "@Allen0915", points: 64, rank: 1 },
  { id: "@Eurekahi", points: 54, rank: 2 },
  { id: "@joe87", points: 51, rank: 3 },
  { id: "@Tongood", points: 48, rank: 4 },
  { id: "@Tongreat", points: 43, rank: 5 },
  { id: "@Tonawesome", points: 37, rank: 6 },
];

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center text-white shadow-lg">
        <Medal className="w-6 h-6 sm:w-7 sm:h-7" />
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-slate-200 to-slate-400 rounded-full flex items-center justify-center text-white shadow-lg">
        <Medal className="w-6 h-6 sm:w-7 sm:h-7" />
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full flex items-center justify-center text-white shadow-lg">
        <Medal className="w-6 h-6 sm:w-7 sm:h-7" />
      </div>
    );
  }
  return (
    <span className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold text-white shadow-lg">
      {rank}
    </span>
  );
}

export function Leaderboard() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="w-full h-full sm:h-[40rem] sm:max-w-2xl sm:mx-auto sm:p-4">
      <div className="h-full rounded-none sm:rounded-2xl overflow-hidden bg-white shadow-xl">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-6 px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
            Leaderboard
          </h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-gray-100">
              <TableHead className="text-xl sm:text-2xl font-semibold text-gray-700 py-4">
                ID
              </TableHead>
              <TableHead className="text-right text-xl sm:text-2xl font-semibold text-gray-700 py-4">
                Points
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((row) => (
              <TableRow
                key={row.id}
                className={`hover:bg-gray-50 border-b border-gray-100 last:border-0 
                  ${row.rank <= 3 ? "bg-opacity-50" : ""}`}
              >
                <TableCell className="flex items-center gap-3 sm:gap-4 py-6">
                  <RankIcon rank={row.rank} />
                  <span className="text-lg sm:text-xl text-gray-700 truncate max-w-[180px] sm:max-w-none font-medium">
                    {row.id}
                  </span>
                </TableCell>
                <TableCell className="text-right text-lg sm:text-xl text-gray-700 py-4 font-bold">
                  {row.points}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
