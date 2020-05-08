

export default (state, action) => {

    switch (action.type){

        case 'TOGGLE_LESSON_FORM':
            return {
                ...state,
                showLessonForm: !state.showLessonForm
            }

        case 'SET_SCHOOLS':
            return {
                ...state,
                schools: action.payload
            }

        case 'SAVE_LOCAL_PROFILE':
            
            return {
                ...state,
                profileIsSaved: true
            }      
        case 'SET_USER_TYPE':
            return {
                ...state,
                profileUserType: action.payload
            }  
        case 'SET_USER_EMAIL':
            return {
                ...state,
                profileUserEmail: action.payload
            } 
        case 'SET_USER_NAME':
            return {
                ...state,
                profileUserName: action.payload
            }    
        case 'SET_USER_PHOTO':
            return {
                ...state,
                profileUserPhoto: action.payload
            }      
        case 'DELETE_STUDENT':
            state.profileStudents.splice(action.payload, 1);
            localStorage.setItem('parent-checklist_students', JSON.stringify(state.profileStudents));
            return {
                ...state,
                profileStudents: state.profileStudents
            }       
        case 'ADD_STUDENT':
            let student = {
                name: action.payload,
                teachers: []
            }
            return {...state,
                profileStuudents: state.profileStudents.push(student)
            };
        case 'REDUCE_CLASSROOMS':
            return {
                ...state,
                uniqueClassrooms: action.payload
            } 

        default: 
            return state;
    }
}