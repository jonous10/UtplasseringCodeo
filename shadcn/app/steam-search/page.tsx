"use client";

import { getAllGames, getGameDetails, getPlayerCount, getSteamGame } from "@/api/games";
import { Button } from "@/components/ui/button";
import GameDetails from "@/components/ui/game-details";
import Header from "@/components/ui/header";
import { Input } from "@/components/ui/input";
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
        <Header></Header>
        <div className="Steam-game-searcher flex flex-col items-center p-4 gap-4">
            <Input
              className="p-2 w-80"
              type="text"
              placeholder="Steam Game"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleClick}
            />
            <Button
              className="w-40 p-3 border-1"
              onClick={() => handleClick}
            >
              SEARCH
            </Button>
            <p className="text-xs">{allGames.length} results</p>
            <div className="flex flex-col items-center">
              {allGames.length > 0
                ? allGames.map((game) => (
                  <div className="flex justify-between w-168 border-b border-gray-600 p-2" key={game.appid}>
                  <GameDetails
                  name={game.name}
                  appid={`${game.appid}`}
                  ></GameDetails>
                </div>
                  ))
                : "No games found"}
            </div>
        </div>
    </div>
  );
}
