import PlaceholderPic from '../assets/placeholder.png';
import PlaceholderCompanyPic from '../assets/placeholder-company.png';
import {useRef} from "react";

export function StudentComponent({overlay}){
    const ref = useRef(null);
    const handleClick = () => {
        ref.current.style.transform = `translateX(${overlay.current.offsetWidth/2 - ref.current.offsetLeft - ref.current.offsetWidth/2}px)`;
        ref.current.style.transform += `translateY(${overlay.current.offsetHeight/2 - ref.current.offsetTop - ref.current.offsetHeight/2}px)`;
        ref.current.style.zIndex = "2";
        overlay.current.style.zIndex = "1";
        overlay.current.style.opacity = ".7";
    }
    return (
        <div className="student" ref={ref} onClick={handleClick}>
            <img className="student-profile-picture" src={PlaceholderPic} alt="student"/>
            <div className="student-overlay"></div>
            <div className="student-main-infos">
                <h3>Prénom</h3>
                <h3>NOM</h3>
                <img className="company-icon" src={PlaceholderCompanyPic} alt=""/>
            </div>
            <div className="student-detailed-infos">
                <p><span>Promotion :</span> FIL 2024</p>
                <p><span>Promotion :</span> FIL 2024</p>
                <p><span>Promotion :</span> FIL 2024</p>
            </div>
        </div>
    )
}