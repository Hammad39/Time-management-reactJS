 const setUser = (user) => {
    return {
        type: "SET_USER",
        payload: user
    }
}

const logOut = () => {
    return {
        type: "LOG_OUT"
    }
}   

const exportedObjects ={setUser,logOut}

export default exportedObjects