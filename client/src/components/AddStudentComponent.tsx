import React, { useState } from 'react';
import UploadProfilePicture from '../assets/upload-profile-picture.svg';
import UploadLogo from '../assets/upload-logo.svg';

export function AddStudentComponent({ showStudentComponent }) {
    const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);
    const [companyLogoPreview, setCompanyLogoPreview] = useState<string | null>(null);


    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicturePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCompanyLogoChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCompanyLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <form action="" id="add-student-form" className={showStudentComponent === true ? "active" : "inactive"}>
            <div className="add-student-profile-picture">
                <div className="fake-label">photo</div>
                <label htmlFor="photo">
                    {profilePicturePreview ? (
                        <img src={profilePicturePreview} alt="Profile Preview" className="image-preview" />
                    ) : (
                        <img src={UploadProfilePicture} alt="" />
                    )}
                </label>
                <input type="file" name="photo" id="photo" onChange={handleProfilePictureChange} />
            </div>

            <div className="add-student-mandatory">
                <div id="add-student-name">
                    <div>
                        <label htmlFor="firstName">prénom*</label>
                        <input type="text" name="firstName" id="firstName" placeholder="Beau"/>
                    </div>
                    <div>
                        <label htmlFor="lastName">nom*</label>
                        <input type="text" name="lastName" id="lastName" placeholder="Gosse"/>
                    </div>
                </div>

                <div id="add-student-company">
                    <div style={{flex: 'auto'}}>
                        <label htmlFor="company">entreprise d'apprentissage*</label>
                        <input type="text" name="company" id="company" placeholder="Ranch Corp"/>
                    </div>
                    <div className="add-student-company-logo">
                        <div className="fake-label">logo</div>
                        <label htmlFor="company-logo">
                            {companyLogoPreview ? (
                                <img src={companyLogoPreview} alt="Company Logo Preview" className="image-preview"/>
                            ) : (
                                <img src={UploadLogo} alt="" />
                            )}
                        </label>
                        <input type="file" name="company-logo" id="company-logo" onChange={handleCompanyLogoChange} />
                    </div>
                </div>
            </div>
            <div className="add-student-description">
                <label htmlFor="description">description</label>
                <textarea name="description" rows="4" id="description" placeholder="votre description"></textarea>
            </div>
            <div className="add-student-linkedin">
                <label htmlFor="linkedin">profil LinkedIn</label>
                <input type="text" name="linkedin" id="linkedin" placeholder="https://linkedin/in/..."/>
            </div>
            <div className="add-student-website">
                <label htmlFor="website">site web</label>
                <input type="text" name="website" id="website" placeholder="https://beaugosse.com"/>
            </div>
            <div className="add-student-submit">
                <input type="submit" value="ajouter +"></input>
            </div>
        </form>
    )
}