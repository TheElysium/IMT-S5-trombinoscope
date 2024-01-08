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
    const students = [];
    const studentCount = 30;

    for (let i = 0; i < studentCount; i++) {
        const studentId = faker.datatype.uuid();
        const student = {
            id: studentId,
            lastName: faker.name.lastName(),
            firstName: faker.name.firstName(),
            description: faker.lorem.sentence(),
            email: faker.internet.email(),
            linkedin: faker.internet.url(),
            profilePicture: `http://localhost:4000/profile-pictures/profile-pic-${Math.floor(Math.random()*15)}.jpg`,
            company: {
                name: faker.company.companyName(),
                logo: faker.image.business(),
            },
        };
        students.push(student);
    }
    return students;
}

module.exports = {generateRandomData};