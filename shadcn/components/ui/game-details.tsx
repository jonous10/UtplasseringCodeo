import { getGameDetails } from "@/api/games";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useEffect, useState } from "react";

interface GameDetailsProps {
    name: string;
    appid: string;
}

export default function GameDetails({ name, appid }: GameDetailsProps) {
    const [data, setData] = useState<any>()
    const [fetched, setFetched] = useState<boolean>(false)

    useEffect(() => {
        if (fetched) return;
        setFetched(true)
        getGameDetails(appid).then((res) => {
            setData(res)
        })
    })
    return (
        <Popover>
            <PopoverTrigger>{name}</PopoverTrigger>
            <PopoverContent>
                <div>
                    <p className="font-bold">{name}</p>
                    {data ? (
                        data.error ? (
                            <p>{data.error || "error"}</p>
                        ) : (
                            <div>
                                <p>{data.price}</p>
                                <p>age {data.required_age}+</p>
                                <div>{data.categories ? data.categories.map((cat: {description: string}) => {
                                    return <p>{cat.description}</p>
                                    }) : "no categories"}
                                </div>
                            </div>
                        )
                    ) : (
                        "no data"
                    )}
                </div>
            </PopoverContent>
        </Popover>
      )
}