const faker = require('faker');

function generateRandomData() {
    const programs = [];

    ['FIL', 'FIT', 'FISE'].forEach((programName) => {
        const program = {
            id: programName,
            name: programName,
            promotions: [],
        };
        for (let year = 2077; year <= 2080; year++) {
            const promotion = {
                id: `${programName}-${year}`,
                year: year,
                students: generateRandomStudentsWithId(),
            };
            program.promotions.push(promotion);
        }
        programs.push(program);
    });

    return {programs};
}

function generateRandomStudentsWithId() {
    const companies = [
        {
            name: "Google",
            logo: "http://localhost:4000/company-logos/google.png"
        },
        {
            name: "Meta",
            logo: "http://localhost:4000/company-logos/meta.png"
        },
        {
            name: "Amazon",
            logo: "http://localhost:4000/company-logos/amazon.png"
        },
        {
            name: "Talend",
            logo: "http://localhost:4000/company-logos/talend.png"
        },
        {
            name: "Docker",
            logo: "http://localhost:4000/company-logos/docker.png"
        },
        {
            name: "Qlik",
            logo: "http://localhost:4000/company-logos/qlik.png"
        },
        {
            name: "Equativ",
            logo: "http://localhost:4000/company-logos/equativ.png"
        },
        {
            name: "Zenika",
            logo: "http://localhost:4000/company-logos/zenika.png"
        },
        {
            name: "Spotify",
            logo: "http://localhost:4000/company-logos/spotify.png"
        },
        {
            name: "La Poste",
            logo: "http://localhost:4000/company-logos/laposte.png"
        }
    ];
    const students = [];
    const studentCount = 30;

    for (let i = 0; i < studentCount; i++) {
        const studentId = faker.datatype.uuid();
        const randomCompany = faker.random.arrayElement(companies);
        const student = {
            id: studentId,
            lastName: faker.name.lastName(),
            firstName: faker.name.firstName(),
            description: faker.lorem.sentence(),
            email: faker.internet.email(),
            linkedin: faker.internet.url(),
            profilePicture: `http://localhost:4000/profile-pictures/profile-pic-${Math.floor(Math.random()*15)}.jpg`,
            company: {
                name: randomCompany.name,
                logo: randomCompany.logo,
            },
        };
        students.push(student);
    }
    return students;
}



module.exports = {generateRandomData};