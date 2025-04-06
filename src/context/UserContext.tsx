import { createContext } from "react";
import useAuth from "../hooks/useAuth";

interface UserContextProps {
    authenticated: boolean;
    login: (user: { email: string; password: string }) => Promise<void>;
}
export interface ChildrenProps {
    children: React.ReactNode;
}


const Context = createContext({} as UserContextProps)

const UserProvider: React.FC<ChildrenProps> = ({ children }: ChildrenProps) => {
    const { authenticated, login } = useAuth() as UserContextProps;

    return (
        <Context.Provider value={{ authenticated, login }}>
            {children}
        </Context.Provider>
    );
};

export {Context, UserProvider}