import axios from "axios";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate()

    const verifyUserEmail = async () => {
        try {

            // const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}api/user/verifyemail`, { token });
            const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}api/user/verifyemail`, { token });


            if (response) {
                setVerified(true);
            }
        } catch (error) {
            setError(true);
            // console.log(error.response.data);
            console.log("error in verifyUserEmail>>>>>>>>>>>",error);
            
        }

    }

    //useEffects

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []); 


    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    const urlToken = window.location.search.split("=")[1];
    console.log('urlToken>>>>>>>>>>>>>>', urlToken);
    

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <h3 onClick={() => navigate('/login')}>Login</h3>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                    
                </div>
            )}
        </div>
    )

}