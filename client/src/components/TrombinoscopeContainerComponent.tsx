import PlusIcon from '../assets/plus.svg';
import {StudentComponent} from "./StudentComponent";
import {AddStudentComponent} from "./AddStudentComponent";
import {useEffect, useRef, useState} from "react";
import {gql, request} from "graphql-request";
import {GRAPHQL_ENDPOINT} from "../constants.ts";
import {useQuery} from "@tanstack/react-query";
import {Student} from "../types.ts";

interface TrombinoscopeContainerProps {
    promotionId: string;
}

interface StudentQueryResponse {
    students: Student[];
}

export function TrombinoscopeContainerComponent({
                                                    promotionId,
                                                }: TrombinoscopeContainerProps): JSX.Element {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [showAddStudentForm, setShowAddStudentForm] = useState(false);
    const overlay = useRef<HTMLDivElement>(null);
    const grid = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (overlay.current) {
            overlay.current.style.top = `${scrollPosition}px`;
        }
    }, [scrollPosition]);

    const updateOverlayPosition = () => {
        if (grid.current) {
            setScrollPosition(grid.current.scrollTop);
        }
    };

    const handleNewStudentClick = () => {
        setShowAddStudentForm(true);
        if (overlay.current) {
            overlay.current.classList.add("active");
            overlay.current.addEventListener("click", handleOverlayClick);
        }
    };

    const handleOverlayClick = () => {
        setShowAddStudentForm(false);
        if (overlay.current) {
            overlay.current.classList.remove("active");
            overlay.current.removeEventListener("click", handleOverlayClick);
        }
    };

    const studentsQuery = gql `
        query students {
            students(promotionId: "${promotionId}") {
                id,
                lastName,
                firstName,
                description,
                email,
                linkedin,
                profilePicture,
                company {
                    name, 
                    logo
                }       
            }
        }
    `

    const loadStudents = async (): Promise<Student[]> => {
        return await request(GRAPHQL_ENDPOINT, studentsQuery, {promotionId,});
    };

    const {
        isLoading: isLoadingStudents,
        error: errorStudents,
        data: dataStudents,
        refetch: refetchStudents,
    } = useQuery<StudentQueryResponse>({
        queryKey: ['students', promotionId],
        queryFn: loadStudents,
        enabled: !!promotionId,
    });

    useEffect(() => {
        if (promotionId) refetchStudents();
        console.log("fetch");
    }, [refetchStudents, promotionId]);

    const renderStudents = (): JSX.Element[] | JSX.Element => {
        if (isLoadingStudents || !dataStudents) return <div>Loading...</div>;
        if (errorStudents) return <div>Error: {errorStudents}</div>;

        return dataStudents.students.map((student: Student) => (
            <StudentComponent
                key={student.id}
                student={student}
                overlay={overlay}
                scrollPosition={scrollPosition}
                promotion={promotionId}
            />
        ));
    };

    return (
        <div id="trombinoscope-grid-container" onScroll={updateOverlayPosition} ref={grid}>
            <div id="trombinoscope-grid">
                <div id="new-student" onClick={handleNewStudentClick}>
                    <div id="new-student-content">
                        <img src={PlusIcon} alt="" />
                        ajouter
                    </div>
                </div>
                {renderStudents()}
            </div>
            <div id="trombinoscope-grid-overlay" ref={overlay}></div>
            <AddStudentComponent showStudentComponent={showAddStudentForm} />
        </div>
    );
}
