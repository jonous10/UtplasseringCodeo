"use client"

import { useEffect, useState } from "react";

export default function Home() {
    const [search, setSearch] = useState<string>("");
    const [data, setData] = useState<any>(null);

    const [searching, setSearching] = useState<boolean>(false);
 
    async function fetchDATA(word: string){
        // Empties previous data
        setData(null);

        // Start search...
        setSearching(true);
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const responseJson = await response.json();  
        console.log("response: ",responseJson)
        // Fill data
        setData(responseJson);
        setSearching(false);
    }
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter"){
            fetchDATA(search);
        }
    }

  return (
    <div className="justify-center">
        <div className="m-24 p-20 border-4 rounded-2xl bg-gray-700">
            <input 
            className="border-gray-100 border-2 w-auto p-3"
            value={search}
            onChange={e => {
                setSearch(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            ></input>
            <button 
            className="m-3 p-2 text-3xl bg-blue-300 rounded-4xl text-black font-bold"
            onClick={() => {fetchDATA(search)}}
            >Search</button>
            <div className="info-panel m-6">
                {data ? (data.title ||
                    <>
                        <p className="font-bold text-2xl">Phonetics: </p>{
                            data[0]?.phonetics.length > 0 ? data[0]?.phonetics.map((p: any, index: number) => {
                                return <p
                                key={index}
                                className="m-4">{index + 1}. {p.text}</p>;
                            }) : "N/A"
                        } 

                        <p className="font-bold text-2xl">Meanings: </p>{
                            data[0]?.meanings[0].definitions.map((d: any, index: number) => {
                                return <div 
                                key={index} 
                                className="m-4">
                                    <p className="m-2 text-gray-300">{index + 1}. {d.definition}</p>
                                    <p className="m-2 ml-10 text-gray-500">{d.example}</p>
                                </div>;
                            }) || "N/A"
                        } 
                    
                    </>
                ) : searching ? "Searching..." : "Search for a word to get a result."}
                
            </div>
        </div>
    </div>
  );
}