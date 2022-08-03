import { CONTINENT_URL, COUNTRY_URL } from "../api/api";
import React, { useEffect, useState } from "react";

export const Fetch = () => {
    //Fetch Continents Data
    // const [continents, setContinents] = useState([]);
    useEffect(() => {
        async function fetchContinents() {
            try {
                const result = await fetch(CONTINENT_URL);
                const continents = await result.json();
                setContinents([...continents]);
                // console.log(continents, 'continents')
            } catch (error) {
                console.log(error);
            }
        }
        fetchContinents();
    }, []);

    return continents;

}







