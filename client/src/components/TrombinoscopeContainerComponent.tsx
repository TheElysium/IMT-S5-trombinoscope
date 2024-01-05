import PlusIcon from '../assets/plus.svg';
import { StudentComponent } from "./StudentComponent";
import { useEffect, useRef, useState } from "react";

export function TrombinoscopeContainerComponent() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const overlay = useRef(null);
    const grid = useRef(null);

    useEffect(() => {
        overlay.current.style.top = `${scrollPosition}px`;
    }, [scrollPosition]);

    const updateOverlayPosition = () => {
        setScrollPosition(grid.current.scrollTop);
    };

    const students = () => {
        const students = [];
        for (let i = 0; i < 30; i++) {
            students.push(<StudentComponent overlay={overlay} scrollPosition={scrollPosition}/>);
        }
        return students;
    };

    return (
        <div id="trombinoscope-grid-container" onScroll={updateOverlayPosition} ref={grid}>
            <div id="trombinoscope-grid">
                <div id="new-student">
                    <div id="new-student-content">
                        <img src={PlusIcon} alt="" />
                        ajouter
                    </div>
                </div>
                {students()}
            </div>
            <div id="trombinoscope-grid-overlay" ref={overlay}></div>
        </div>
    );
}
