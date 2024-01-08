export type SelectorOption = {
    id: string;
    value: string;
}

export type Promotion = {
    id: string;
    year: string;
    students: Student[];
}

export const promotionToSelectorOption = (promotion: Promotion): SelectorOption => {
    return {
        id: promotion.id,
        value: promotion.year
    }
}

export type Program = {
    id: string;
    name: string;
    promotions: Promotion[];
}

export const programToSelectorOption = (program: Program): SelectorOption => {
    return {
        id: program.id,
        value: program.name
    }
}

export type Company = {
    name: string
    logo: string
}

export type Student = {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
    email: string;
    linkedin: string;
    description: string;
    company: Company;
}

