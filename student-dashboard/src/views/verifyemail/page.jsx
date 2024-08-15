import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("loading"); // 'loading', 'verified', or 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  console.log(token);



const verifyUserEmail = async (verificationToken) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}api/user/verifyemail`, 
        { token: verificationToken }
      );
      if (response.data.success) {
        setStatus("verified");
      } else {
        throw new Error(response.data.message || "Verification failed");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.response?.data?.message || error.message || "An error occurred during verification");
      console.error("Error in verifyUserEmail:", error);
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    if (urlToken) {
      setToken(urlToken);
      verifyUserEmail(urlToken);
    } else {
      setStatus("error");
      setErrorMessage("No verification token found in URL");
    }
  }, []);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
            <p className="text-lg">Verifying your email...</p>
          </div>
        );
      case "verified":
        return (
          <Alert variant="default" className="bg-green-100 border-green-400">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Your email has been verified. You can now log in to your account.
            </AlertDescription>
            <Button 
              onClick={() => navigate('/login')}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white"
            >
              Go to Login
            </Button>
          </Alert>
        );
      case "error":
        return (
          <Alert variant="destructive">
            <XCircle className="h-6 w-6" />
            <AlertTitle>Verification Failed</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
            <Button 
              onClick={() => navigate('/')}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white"
            >
              Return to Home
            </Button>
          </Alert>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Email Verification</h1>
        {renderContent()}
      </div>
    </div>
  );
}