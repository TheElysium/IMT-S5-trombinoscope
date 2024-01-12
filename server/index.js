const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');
const {generateRandomData} = require('./data-generator');
const cors = require('cors');
const faker = require('faker');

const data = generateRandomData();

const schema = buildSchema(`
  type Company {
    name: String
    logo: String
  }
  
  type Student {
    id: ID
    lastName: String
    firstName: String
    description: String
    email: String
    linkedin: String
    profilePicture: String
    company: Company
  }

  type Promotion {
    id: ID
    year: Int
    students: [Student]
  }

  type Program {
    id: ID
    name: String
    promotions: [Promotion]
  }

  type Query {
    programs: [Program]
    promotions(programId: ID!): [Promotion]
    students(promotionId: ID!): [Student]
    student(studentId: ID!): Student
  }
  
  type Mutation {
    addStudent(
        promotionId: ID!, 
        lastName: String!, 
        firstName: String!, 
        description: String, 
        email: String, 
        linkedin: String, 
        companyName: String, 
    ): Student
  }
`);

const resolvers = {
    programs: () => data.programs,
    promotions: ({programId}) => {
        const program = data.programs.find(p => p.id === programId);
        return program ? program.promotions : null;
    },
    students: ({promotionId}) => {
        for (const program of data.programs) {
            for (const promotion of program.promotions) {
                if (promotion.id === promotionId) {
                    return promotion.students;
                }
            }
        }
        return null;
    },
    student: ({studentId}) => {
        // Ouille
        for (const program of data.programs) {
            for (const promotion of program.promotions) {
                for (const student of promotion.students) {
                    if (student.id === studentId) {
                        return student;
                    }
                }
            }
        }
        return null;
    },
    addStudent: ({ promotionId, lastName, firstName, description, email, linkedin, profilePicture, companyName, companyLogo }) => {
        const newStudent = {
            id: faker.datatype.uuid(),
            lastName,
            firstName,
            description,
            email,
            linkedin,
            profilePicture,
            company: {name: companyName, logo: companyLogo}
        };

/*        for (const program of data.programs) {
            for (const promotion of program.promotions) {
                if (promotion.id === promotionId) {
                    promotion.students.push(newStudent);
                    return newStudent;
                }
            }
        }*/

        return null;
    },
};

const app = express();
app.use(cors());
app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        rootValue: resolvers,
        graphiql: true,
    })
);
app.use('/profile-pictures', express.static('profile-pictures'));
app.use('/company-logos', express.static('company-logos'));

app.post('/form-images', (req, res) => {

});


const port = 4000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/graphql`);
});
