import React, { useState } from 'react';
import { SelectorComponent } from "./SelectorComponent";
import { SearchComponent } from "./SearchComponent";
import {gql, request} from "graphql-request";
import {GRAPHQL_ENDPOINT} from "../constants";
import {useQuery} from "@tanstack/react-query";

export function TopBarContainerComponent() {
    const [selectedProgram, setSelectedProgram] = useState("FIL");
    const [selectedPromotion, setSelectedPromotion] = useState("2024");

    const programsQuery = gql`
        query programs {
            programs {
                id,
                name
            }
        }
    `;

    const loadPrograms = () => {request(GRAPHQL_ENDPOINT, programsQuery)};
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['programs'],
        queryFn: loadPrograms,
    });
    console.log(data)

    const programs = ["FIL", "FIT", "FISE"];
    const promotions = ["2021", "2022", "2023", "2024", "2025", "2026", "2027"];

    return (
        <div id="top-bar">
            <SelectorComponent selected={selectedProgram} options={programs} setSelected={setSelectedProgram} />
            <SelectorComponent selected={selectedPromotion} options={promotions} setSelected={setSelectedPromotion} />
            <SearchComponent />
        </div>
    );
}
