export function AddStudentComponent() {
    return (
        <form action="" id="add-student-form">
            <div className="add-student-profile-picture">
                <div className="fake-label">photo</div>
                <label htmlFor="photo">photo</label>
                <input type="file" name="photo" id="photo" alt="profile picture"/>
            </div>

            <div className="add-student-mandatory">
                <div id="add-student-name">
                    <div>
                        <label htmlFor="firstName">prénom*</label>
                        <input type="text" name="firstName" id="firstName"/>
                    </div>
                    <div>
                        <label htmlFor="lastName">nom*</label>
                        <input type="text" name="lastName" id="lastName"/>
                    </div>
                </div>

                <div id="add-student-company">
                    <div style={{flex: 'auto'}}>
                        <label htmlFor="company">entreprise d'apprentissage*</label>
                        <input type="text" name="company" id="company"/>
                    </div>
                    <div className="add-student-company-logo">
                        <div className="fake-label">logo</div>
                        <label htmlFor="company-logo"></label>
                        <input type="file" name="company-logo" id="company-logo" alt="company logo"/>
                    </div>
                </div>
            </div>
            <div className="add-student-description">
                <label htmlFor="description">description</label>
                <textarea name="description" id="description"></textarea>
            </div>
            <div className="add-student-linkedin">
                <label htmlFor="linkedin">profil LinkedIn</label>
                <input type="text" name="linkedin" id="linkedin"/>
            </div>
            <div className="add-student-website">
                <label htmlFor="website">site web</label>
                <input type="text" name="website" id="website"/>
            </div>
        </form>
    )
}