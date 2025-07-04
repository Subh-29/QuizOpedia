import { jwtDecode } from 'jwt-decode'

export const getDecodedData = () => {
    const token = typeof window !== 'undefined'? localStorage.getItem("token") : null;

    if (!token) {
        return null;
    }

    try {
        return jwtDecode(token);
    } catch (error) {
        console.log(error);
        
    }
}