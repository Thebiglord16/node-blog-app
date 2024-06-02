import {createContext,} from "react";

export const UserContext = createContext({
        user:{
            userId: undefined,
            token: undefined
        },
        setUser: (user) => {
        }
    }
);
