const initialState = {
    activeTab: 'Home'
}

const initialProject = {
    activeProject: 'None'
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ACTIVE_TAB':
            return {
                ...state,
                activeTab: action.payload
            }
        case 'ACTIVE_PROJECT':  
            return {
                ...state,
                activeProject: action.payload
            }    
        default:
            return state;
    }
}

export { rootReducer };
