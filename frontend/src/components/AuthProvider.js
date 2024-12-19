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
                
                const response = await fetch('/api/v4/user/credentials/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${UserAccessToken}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } 
                else if (response.status === 401) {
                    RefreshUserAccessJWT();
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


    const RefreshUserAccessJWT = () => {
        const fetchRefreshUserJWT = async () => {
            try {
                const response = await fetch('/api/v2/token/refresh/', {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({'refresh' : UserRefreshToken()})
                });
    
                const data = await response.json();
                Login(data)

            } catch (error) {
                console.log(error);
            }
        }

        fetchRefreshUserJWT();
    }


    const Login = (JWTToken) => {
        localStorage.setItem('refresh', JWTToken.refresh);
        localStorage.setItem('access', JWTToken.access);
    }


    const UserRefreshToken = () => {
        return localStorage.getItem('refresh');
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