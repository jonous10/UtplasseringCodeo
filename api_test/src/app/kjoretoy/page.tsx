"use client"

import { useEffect, useState } from "react";

export default function Home() {
   
    async function fetchDATA(kjennemerke: string){
        const url = `https://akfell-datautlevering.atlas.vegvesen.no/enkeltoppslag/kjoretoydata?kjennemerke=${kjennemerke}`;
        const options = {
            method: 'GET',
            headers: {
                'SVV-Authorization': `Apikey 5975df50-f673-4715-b58e-c3a5222caff9`,
            },
        };

        try {
            const response = await fetch(url, options);

            let dataCar = {
                make: undefined as string | undefined,
                model: undefined as string | undefined,
                error: undefined as string | undefined,
            };

            if (response.status === 401) {
                dataCar.error = 'Unauthorized: Invalid API key or missing authorization.';
            } else if (response.status === 403) {
                dataCar.error = 'Forbidden: API key not valid or user is blocked.';
            } else if (response.status === 429) {
                dataCar.error = 'Quota exceeded: Too many requests.';
            } else if (response.status === 200) {
                const data = await response.json();

                dataCar.make = data.kjoretoydataListe[0].godkjenning.tekniskGodkjenning.tekniskeData.generelt.merke[0].merke;
                dataCar.model = data.kjoretoydataListe[0].godkjenning.tekniskGodkjenning.tekniskeData.generelt.handelsbetegnelse[0];
            }

            return dataCar;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
    fetchDATA("DN12345").then((data) => {
        console.log(data);
    });
  return (
    <div className="justify-center">
        
    </div>
  );
}


