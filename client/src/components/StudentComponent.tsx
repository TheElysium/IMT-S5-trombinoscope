import PlaceholderPic from '../assets/placeholder.png';
import PlaceholderCompanyPic from '../assets/placeholder-company.png';
import {useRef} from "react";

export function StudentComponent({overlay}){
    const studentTile = useRef(null);
    const studentDetailedInfos = useRef(null);
    const handleClick = () => {
        const translateX = overlay.current.offsetWidth/2 - studentTile.current.offsetLeft - studentTile.current.offsetWidth/2;
        const translateY = overlay.current.offsetHeight/2 - studentTile.current.offsetTop - studentTile.current.offsetHeight/2;
        studentTile.current.style.transform = `translate(${translateX}px, ${translateY}px)`;

        studentTile.current.style.zIndex = "2";
        overlay.current.style.zIndex = "1";
        overlay.current.style.opacity = ".7";
        overlay.current.addEventListener("click", reset);
    }

    const reset = () => {
        studentTile.current.style.transform = `translate(0px, 0px)`;

        overlay.current.style.zIndex = "-1";
        overlay.current.style.opacity = "0";

        overlay.current.removeEventListener("click", reset);

        // Wait for the animation to end before resetting the z-index
        setTimeout(() => {
            studentTile.current.style.zIndex = "0";
        }, 300);
    }
    return (
        <div className="student" ref={studentTile} onClick={handleClick}>
            <img className="student-profile-picture" src={PlaceholderPic} alt="student"/>
            <div className="student-overlay"></div>
            <div className="student-main-infos">
                <h3>Prénom</h3>
                <h3>NOM</h3>
                <img className="company-icon" src={PlaceholderCompanyPic} alt=""/>
            </div>
            <div className="student-detailed-infos" ref={studentDetailedInfos}>
                <p><span>Promotion :</span> FIL 2024</p>
                <p><span>Promotion :</span> FIL 2024</p>
                <p><span>Promotion :</span> FIL 2024</p>
            </div>
        </div>
    )
}