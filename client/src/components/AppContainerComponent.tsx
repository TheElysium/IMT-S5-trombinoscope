import {TrombinoscopeContainerComponent} from "./TrombinoscopeContainerComponent";
import {SelectorComponent} from "./SelectorComponent.tsx";
import {SearchComponent} from "./SearchComponent.tsx";
import {useEffect, useState} from "react";
import {gql, request} from "graphql-request";
import {GRAPHQL_ENDPOINT} from "../constants.ts";
import {useQuery} from "@tanstack/react-query";
import {programToSelectorOption, promotionToSelectorOption} from "../types.ts";

export function AppContainerComponent() {

    const [selectedProgramId, setSelectedProgramId] = useState<string>();
    const [selectedPromotionId, setSelectedPromotionId] = useState<string>();

    const programsQuery = gql`
        query programs {
            programs {
                id,
                name
            }
        }
    `;

    const loadPrograms = async () => {
        const response = await request(GRAPHQL_ENDPOINT, programsQuery);
        setSelectedProgramId(response.programs[0].id);
        return response;
    };
    const {
        isLoading: isLoadingPrograms,
        error: errorPrograms,
        data: dataPrograms,
        refetch: refetchPrograms
    } = useQuery({
        queryKey: ['programs'],
        queryFn: loadPrograms,
    });

    const promotionsQuery = gql`
        query promotions {
            promotions(programId: "${selectedProgramId}") {
                id,
                year
            }
        }
    `;

    const loadPromotions = async () => {
        const response = await request(GRAPHQL_ENDPOINT, promotionsQuery);
        setSelectedPromotionId(response.promotions[0].id);
        return response;
    };

    const {
        isLoading: isLoadingPromotions,
        error: errorPromotions,
        data: dataPromotions,
        refetch: refetchPromotions
    } = useQuery({
        queryKey: ['promotions', selectedProgramId],
        queryFn: loadPromotions,
        enabled: !!selectedProgramId
    });

    useEffect(() => {
        refetchPromotions();
    }, [refetchPromotions, selectedProgramId]);

    return (
        <div id="app-container">
            <h1 id="vertical-title">trombinoscope</h1>
            <div id="app-content">
                <div id="top-bar">
                    {dataPrograms &&
                        <SelectorComponent
                            selected={selectedProgramId}
                            options={dataPrograms.programs.map((p) => programToSelectorOption(p))}
                            setSelected={setSelectedProgramId}
                        />
                    }
                    {dataPromotions &&
                        <SelectorComponent
                            selected={selectedPromotionId}
                            options={dataPromotions.promotions.map((p) => promotionToSelectorOption(p))}
                            setSelected={setSelectedPromotionId}
                        />
                    }
                    <SearchComponent />
                </div>
                <TrombinoscopeContainerComponent/>
            </div>
        </div>
    )
}