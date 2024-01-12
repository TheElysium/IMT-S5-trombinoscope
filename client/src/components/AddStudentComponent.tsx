import React, {useState} from 'react';
import UploadProfilePicture from '../assets/upload-profile-picture.svg';
import UploadLogo from '../assets/upload-logo.svg';
import {SubmitHandler, useForm} from "react-hook-form";
import {gql, request} from "graphql-request";
import {useMutation} from "@tanstack/react-query";
import {GRAPHQL_ENDPOINT} from "../constants";

type Inputs = {
    firstName: string,
    lastName: string,
    companyName: string,
    description: string,
    linkedin: string,
    website: string,
    profilePicture: File,
    companyLogo: File,
}


export function AddStudentComponent({showStudentComponent}) {
    const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);
    const [companyLogoPreview, setCompanyLogoPreview] = useState<string | null>(null);
    const linkedinPattern = /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
    const websitePattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}(\/?[a-zA-Z0-9#]+\/?)*$/;
    const descriptionMaxLength = 100;

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<Inputs>({mode: "onBlur"})



    const onSubmit: SubmitHandler<Inputs> = (data) => sendStudent(data);

    const sendStudent = async (data) => {
        const mutationQuery = gql`
            mutation {
                addStudent(
                    promotionId: "FIL-2027"
                    lastName: "${data.lastName}"
                    firstName: "${data.firstName}"
                    description: "${data.description}"
                    email: "${data.website}"
                    linkedin: "${data.linkedin}"
                    profilePicture: "${data.profilePicture}"
                    companyName: "${data.companyName}"  
                    companyLogo: "${data.companyLogo}"
                ) {
                    id
                    lastName
                    firstName
                    description
                    email
                    linkedin
                    profilePicture
                    company {
                        name
                        logo
                    }
                }
            }
        `;
        console.log(mutationQuery)
        return;
        // return await request(GRAPHQL_ENDPOINT, mutationQuery);
    }
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
        <form
            id="add-student-form"
            className={showStudentComponent === true ? "active" : "inactive"}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="add-student-profile-picture">
                <div className="fake-label">photo</div>
                <label htmlFor="photo">
                    {profilePicturePreview ? (
                        <img src={profilePicturePreview} alt="Profile Preview" className="image-preview"/>
                    ) : (
                        <img src={UploadProfilePicture} alt=""/>
                    )}
                </label>
                <input type="file" name="photo"
                       id="photo" {...register("profilePicture", {onChange: handleProfilePictureChange})} />
            </div>

            <div className="add-student-mandatory">
                <div id="add-student-name">
                    <div>
                        <label htmlFor="firstName">prénom*</label>
                        <input
                            type="text" name="firstName" placeholder="Beau"
                            id="firstName" className={errors.firstName ? "error" : ""}
                            {...register("firstName", {required: true})}
                        />
                        {errors.firstName && <span className="error-message">Ce champ est obligatoire</span>}
                    </div>
                    <div>
                        <label htmlFor="lastName">nom*</label>
                        <input
                            type="text" name="lastName" id="lastName" className={errors.lastName ? "error" : ""}
                            placeholder="Gosse" {...register("lastName", {required: true})}
                        />
                        {errors.lastName && <span className="error-message">Ce champ est obligatoire</span>}
                    </div>
                </div>

                <div id="add-student-company">
                    <div style={{flex: 'auto'}}>
                        <label htmlFor="company">entreprise d'apprentissage*</label>
                        <input
                            type="text" name="company" placeholder="Ranch Corp"
                            id="company" className={errors.company ? "error" : ""}
                            {...register("companyName", {required: true})}
                        />
                        {errors.company && <span className="error-message">Ce champ est obligatoire</span>}
                    </div>
                    <div className="add-student-company-logo">
                        <div className="fake-label">logo</div>
                        <label htmlFor="company-logo">
                            {companyLogoPreview ? (
                                <img src={companyLogoPreview} alt="Company Logo Preview" className="image-preview"/>
                            ) : (
                                <img src={UploadLogo} alt=""/>
                            )}
                        </label>
                        <input
                            type="file" name="company-logo" id="company-logo"
                            {...register("companyLogo", {onChange: handleCompanyLogoChange})}
                        />
                    </div>
                </div>
            </div>
            <div className="add-student-description">
                <label htmlFor="description">description<span>({descriptionMaxLength} char. max.)</span></label>
                <textarea
                    name="description" rows="4" placeholder="votre description"
                    id="description" className={errors.description ? "error" : ""}
                    {...register("description", {maxLength: descriptionMaxLength})}
                ></textarea>
                {errors.description &&
                    <span className="error-message">La description doit faire moins de 100 caractères</span>}
            </div>
            <div className="add-student-linkedin">
                <label htmlFor="linkedin">profil LinkedIn</label>
                <input
                    type="text" name="linkedin" placeholder="https://linkedin/in/..."
                    id="linkedin" className={errors.linkedin ? "error" : ""}
                    {...register("linkedin", {pattern: linkedinPattern})}
                />
                {errors.linkedin && <span className="error-message">Le format de l'URL est invalide</span>}
            </div>
            <div className="add-student-website">
                <label htmlFor="website">site web</label>
                <input
                    type="text" name="website" placeholder="https://beaugosse.com"
                    id="website" className={errors.website ? "error" : ""}
                    {...register("website", {pattern: websitePattern})}
                />
                {errors.website && <span className="error-message">Le format de l'URL est invalide</span>}
            </div>
            <div className="add-student-submit">
                <input type="submit" value="ajouter +"></input>
            </div>
        </form>
    )
}