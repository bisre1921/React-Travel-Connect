import { useState } from "react"

export const useHttpClient = () => {
    const [isLoading , setIsLoading] = useState(false);
    const [error , setError] = useState();

    const sendRequest = async (url , method = "GET" , body = null , headers = {}) => {
        try {
            const response = await fetch(url , {
                method,
                body,
                headers
            });
    
            const responseData = await response.json();
    
            if(!response.ok) {
                throw new Error(responseData.message);
            };
        } catch (error) {
            setError(error.message);
        }
      

    };
} 