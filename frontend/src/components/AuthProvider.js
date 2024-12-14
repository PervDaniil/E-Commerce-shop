import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);


    useEffect(() => {
        const fetchUserCredentials = async () => {
            const UserAccessToken = UserAccessJWT();
            
            try {
                if (!UserAccessToken) return;
                
                const response = await fetch('http://127.0.0.1:8000/api/v2/token/user/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${UserAccessToken}`
                    }
                });

                console.log(response);
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                }
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }

        fetchUserCredentials();
    }, []);


    const Login = (JWTToken) => {
        localStorage.setItem('refresh', JWTToken.refresh);
        localStorage.setItem('access', JWTToken.access);
    }


    const UserAccessJWT = () => {
        return localStorage.getItem('access');
    }


    return (
        <AuthContext.Provider value={{ user, Login, loading }}>
            {children}
        </AuthContext.Provider>
    )
}