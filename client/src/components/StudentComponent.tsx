import PlaceholderPic from '../assets/placeholder.png';
import PlaceholderCompanyPic from '../assets/placeholder-company.png';
import {useRef} from "react";

export function StudentComponent({overlay, scrollPosition}){
    const studentTile = useRef(null);
    const studentDetailedInfos = useRef(null);

    const handleClick = () => {
        showStudentDetailedInfos();
        moveStudentTile();
        showOverlay();
    }

    const showStudentDetailedInfos = () => {
        studentDetailedInfos.current.classList.add("active");
        studentDetailedInfos.current.style.left = `${studentTile.current.offsetWidth - 20}px`;
    }

    const moveStudentTile = () => {
        const translateX = overlay.current.offsetWidth/2 - studentTile.current.offsetLeft - studentTile.current.offsetWidth/2 - studentDetailedInfos.current.offsetWidth/2;
        const translateY = overlay.current.offsetHeight/2 - studentTile.current.offsetTop - studentTile.current.offsetHeight/2 + scrollPosition;
        studentTile.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
        studentTile.current.style.zIndex = "3";
    }

    const showOverlay = () => {
        overlay.current.classList.add("active");
        overlay.current.addEventListener("click", handleOverlayClick);
    }

    const handleOverlayClick = () => {
        studentTile.current.style.transform = `translate(0px, 0px)`;
        resetOverlay();
        studentDetailedInfos.current.classList.remove("active");
        // Wait for the animation to end before resetting the z-index
        setTimeout(() => {
            studentTile.current.style.zIndex = "0";
        }, 300);
    }

    const resetOverlay = () => {
        overlay.current.classList.remove("active");
        overlay.current.removeEventListener("click", handleOverlayClick);
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
                <p><span>Entreprise :</span> Google</p>
                <br/>
                <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.”</p>
                <br/>
                <div className="student-links">
                    <a href="">Profil LinkedIn ↗</a>
                    <a href="">Site web ↗</a>
                </div>
            </div>
        </div>
    )
}