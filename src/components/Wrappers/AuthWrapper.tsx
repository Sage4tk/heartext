import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../lib/firebase";


// create user context
interface IUserContext {
    user: User |null,
    loading: boolean
}

const UserContext = createContext<IUserContext>({
    user: null,
    loading: false
});

// custom hook to access user context
export const useUser = () => useContext(UserContext);

const AuthWrapper:React.FC<{
    children:React.ReactNode
}> = ({
    children
}) => {

    // STATES
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // USE EFFECTS

    // listen to use authentication changes
    useEffect(() => {

        onAuthStateChanged(auth, (user) => {

            // set in user state
            setUser(user);

            // loading state will be initially true on every restart to fetch the user's data and will be required to turn off soon as it loads.
            if (loading) setLoading(false); 

        });

    }, []);

    return (
        <UserContext.Provider value={{
            user: user,
            loading: loading
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default AuthWrapper;