export const initialState = {
    users: []
}; //empty users array
//2 args: current state and action based on the dispatched func




// Replace useState for users with useReducer


// Form will simply dispatch ADD_USER with form values


export const userReducer = (state, action) => {
    // console.log("Action is: ", action);
    // console.log("previous state is: ", state);
    switch (action.type) {
        case "SET_USERS":
            return {
                ...state,
                users: action.payload
            };

        case "ADD_USER":
            return {
                ...state,
                users: [...state.users,
                    { ...action.payload,
                company: {
                    department: action.payload.department
                }
            }
        ]
            
            };

        case "DELETE_USER":
            return {
                ...state,
                users: state.users.filter(user => user.id!==action.payload)
            };

        case "TOGGLE_USER_STATUS":
            return {
                ...state,
                users: state.users.map(user => 
                    user.id === action.payload ? {...user, isActive: !user.isActive} : user)
                };

        case "UPDATE_USER":
            return {
                ...state,
                users: state.users.map((user) => user.id === action.payload.id? action.payload : user),
            };
        default:
            return state;
    }
}