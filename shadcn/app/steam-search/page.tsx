"use client";

import { getAllGames, getPlayerCount, getSteamGame } from "@/api/games";
import { useState } from "react";



export default function Home() {

  const [search, setSearch] = useState("");

  const [allGames, setAllGames] = useState<{ appid: number; name: string }[]>([]);
  const [playerCounts, setPlayerCounts] = useState<Record<number, number>>({});

  function handleClick(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter"){
      getSteamGame(search).then((res) => {
        setAllGames(res);
      });
    }
  }

  return (
    <div>
      <div className="Steam-game-searcher flex flex-col items-center">
        <input
          className="m-10 p-2 bg-gray-800"
          type="text"
          placeholder="Steam Game"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleClick}
        />
        <button
          className="w-40 p-3 m-4 border-1"
          onClick={() => handleClick}
        >
          SEARCH
        </button>

        <div className="flex flex-col items-center">
          {allGames.length > 0
            ? allGames.map((game) => (
              <div className="flex justify-between w-168 border-b border-gray-600 p-2" key={game.appid}>
              <p
                className="cursor-pointer text-left"
                onMouseEnter={() => {
                  getPlayerCount(game.appid).then((res) => {
                    console.log(res)
                    setPlayerCounts((prev) => ({
                      ...prev,
                      [game.appid]: res, // Store player count under appid
                    }));
                  });
                }}
                onClick={() =>
                  window.location.href =`/steam-search/game-details?appid=${game.appid}`
                }
              >
                {game.name}
              </p>
              <p className="text-right">
                {playerCounts[game.appid] !== undefined ? playerCounts[game.appid] : ""}
              </p>
            </div>
              ))
            : "No games found"}
        </div>
      </div>
    </div>
  );
}
