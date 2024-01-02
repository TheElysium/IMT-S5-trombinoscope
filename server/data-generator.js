const faker = require('faker');
const {fa} = require("faker/lib/locales");

function generateRandomData() {
    const programs = [];

    // Generate data for each program (FIL, FIT, FISE)
    ['FIL', 'FIT', 'FISE'].forEach((programName, index) => {
        const program = {
            id: index,
            name: programName,
            promotions: {},
        };

        // Generate data for each promotion (e.g., 2077, 2078, 2079)
        for (let year = 2077; year <= 2080; year++) {
            const promotion = {
                id: year,
                year: year,
                students: generateRandomStudentsWithId(),
            };

            program.promotions[year] = promotion;
        }

        programs.push(program);
    });

    return { programs };
}

function generateRandomStudentsWithId() {
    const students = {};
    const studentCount = 30;

    for (let i = 0; i < studentCount; i++) {
        const studentId = faker.datatype.uuid();
        students[studentId] = {
            id: studentId,
            last_name: faker.name.lastName(),
            first_name: faker.name.firstName(),
            description: faker.lorem.sentence(),
            email: faker.internet.email(),
            linkedin: faker.internet.url(),
            profile_picture: faker.image.avatar(),
            company: {
                name: faker.company.companyName(),
                logo: faker.image.business(),
            },
        };
    }

    return students;
}

// Generate the JSON data
const generatedData = generateRandomData();
console.log(JSON.stringify(generatedData, null, 2));

module.exports={generateRandomData}
