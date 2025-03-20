import { getGameDetails, getPlayerCount } from "@/api/games";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useEffect, useState } from "react";
import { Separator } from "./separator";

interface GameDetailsProps {
    name: string;
    appid: string;
}

export default function GameDetails({ name, appid }: GameDetailsProps) {
    const [data, setData] = useState<any>()
    const [playerCount, setPlayerCount] = useState(0)
    const [shouldFetch, setShouldFetch] = useState<boolean>(false)

    useEffect(() => {
        getPlayerCount(Number(appid)).then((res) => {
            setPlayerCount(res)
        })

        if (!shouldFetch) return;
        setShouldFetch(false)
        getGameDetails(appid).then((res) => {
            setData(res)
        })
    }, [shouldFetch])
    return (
        <Popover>
            <PopoverTrigger
            className="m-2"
            onClick={() => setShouldFetch(true)}
            >{name}</PopoverTrigger>
            <PopoverContent>
                <div className="p-3">
                    <p className="font-bold">{name}</p>
                    <Separator/>
                    <p className="font-bold m-2">{playerCount} playing right now</p>
                    <Separator/>
                    {data ? (
                        data.error ? (
                            <p>{data.error || "error"}</p>
                        ) : (
                            <div>
                                {data.discount && <>
                                    <p className="font-bold m-2 opacity-45">{data.original_price} -{data.discount}%</p>
                                    <p className="ml-5">↓</p>
                                </>
                                    
                                }
                                <p className="font-bold m-2">{data.price}</p>
                                <Separator/>
                                <p className="font-bold m-2">age {data.required_age}+</p>
                                <Separator/>
                                <p className="font-bold m-2">Categories : </p>
                                <div className="m-3">{data.categories ? data.categories.map((cat: {description: string}, key: number) => {
                                    return <p
                                    key={key}
                                    className="m-2"
                                    >{cat.description}</p>
                                    }) : "no categories"}
                                </div>
                            </div>
                        )
                    ) : (
                        "Loading..."
                    )}
                </div>
            </PopoverContent>
        </Popover>
      )
}