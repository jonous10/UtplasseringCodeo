import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import GameDetails from "./game-details";

interface GameSearchAreaProps {
    searchedGames: { appid: number; name: string }[]
}

export function GameSearchArea({searchedGames}: GameSearchAreaProps) {
  return (
    <div className="p-8 w-full">
        <ScrollArea className="h-240 w-full rounded-md border">
            <div className="p-4">
                {searchedGames.length > 0 ? searchedGames.map((game) => (
                    <div className="" key={game.appid}>
                        <GameDetails
                        name={game.name}
                        appid={`${game.appid}`}
                        />
                        <Separator/>
                    </div>
                )) : "Search to get a result"}
            </div>
        </ScrollArea>
    </div>
  )
}
