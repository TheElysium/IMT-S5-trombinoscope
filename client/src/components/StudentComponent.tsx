import PlaceholderPic from '../assets/placeholder.png';
import PlaceholderCompanyPic from '../assets/placeholder-company.png';

export function StudentComponent() {
    return (
        <div className="student">
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