import React, { useState } from 'react';
import { SelectorComponent } from "./SelectorComponent";
import { SearchComponent } from "./SearchComponent";

export function TopBarContainerComponent() {
    const [selectedStudy, setSelectedStudy] = useState("FIL");
    const [selectedPromotion, setSelectedPromotion] = useState("2024");

    const studies = ["FIL", "FIT", "FISE"];
    const promotions = ["2021", "2022", "2023", "2024", "2025", "2026", "2027"];

    return (
        <div id="top-bar">
            <SelectorComponent selected={selectedStudy} options={studies} setSelected={setSelectedStudy} />
            <SelectorComponent selected={selectedPromotion} options={promotions} setSelected={setSelectedPromotion} />
            <SearchComponent />
        </div>
    );
}
