import React, { useContext } from 'react';
import { Context } from '../../Context/Context.js';
import ContentCard from './ContentCard.js';
import ClassAssignments from './ClassAssignments.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Classrooms({ }) {
    const [state, setState] = useContext(Context);
    const { sections } = state;


    return (
        sections.map( (section, index) => {
            let link = encodeURI(section.schools+'-'+section.teachers+'-'+section.subjects+'-'+section.grades);
            console.log(link);
            return (
                <ContentCard
                    key={index}
                    mainTitle={section.schools+" "+ section.teachers}
                    subTitle={section.grades+" "+ section.subjects}
                    icon="door-open"
                    iconTo={"/classrooms/:"+link}
                    >
                    <ClassAssignments 
                    section={section} link={link}
                    />
                </ContentCard>
            )
        })
    )
   
}