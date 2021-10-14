let initialState={
    token:'',
    role:''
}

const currentUser = (state = initialState, action) => {
    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                token: action.payload.token,
                role: action.payload.user.roles[0].name,
                id: action.payload.user.id,
                firstName: action.payload.user.firstName,
                lastName: action.payload.user.lastName,
                loggedIn: true
            }
        case "LOG_OUT":
            return {
                ...state,
                token: "",
                role: "",
                id: "",
                firstName:"",
                lastName:"",
                loggedIn: false
            }
        default:
            return state
    }
}

export default currentUser;