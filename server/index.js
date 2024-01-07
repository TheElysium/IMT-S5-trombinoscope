const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');
const {generateRandomData} = require('./data-generator');
const cors = require('cors');

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

const port = 4000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/graphql`);
});
