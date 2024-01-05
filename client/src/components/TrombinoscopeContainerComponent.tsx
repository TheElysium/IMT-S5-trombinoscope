import PlusIcon from '../assets/plus.svg';
import {StudentComponent} from "./StudentComponent";

export function TrombinoscopeContainerComponent(){
    const students = () => {
        const students = [];
        for (let i = 0; i < 30; i++) {
            students.push(<StudentComponent/>)
        }
        return students;
    }
    return (
/*        <div id="trombinoscope-container">
            <div id="carousel-arrow-up">
                <img src={ArrowIcon} alt="Arrow icon up"/>
            </div>
            <div id="trombinoscope-grid-container">
                <div id="trombinoscope-grid">
                    {students()}
                </div>
            </div>
            <div id="carousel-arrow-down">
                <img src={ArrowIcon} alt="Arrow icon down"/>
            </div>
            <div id="carousel-selector"></div>
        </div>*/
        <div id="trombinoscope-grid-container">
            <div id="trombinoscope-grid">
                <div id="new-student">
                    <div id="new-student-content">
                        <img src={PlusIcon} alt=""/>
                        ajouter
                    </div>
                </div>
                {students()}
            </div>
        </div>
        )
}