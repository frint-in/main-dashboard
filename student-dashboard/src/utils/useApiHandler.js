import { toast } from "sonner";
import axios from "axios";

const useApiHandler = () => {
    const handleApiCall = async (apiCall) => {
        let toastId;
        try {
          // Show loading toast
          toastId = toast.loading("Loading...");
    
          const response = await apiCall();
    
          // Handle response
          handleApiResponse(response, toastId);
    
          return response;
        } catch (error) {
          // Handle error
          handleApiError(error, toastId);
          throw error;  // re-throw the error after handling it
        }
      };

  const handleApiResponse = (response, toastId) => {

    const statusCode = response.status;
    const message = response.data.message;
  
    switch (statusCode) {
      case 200: // Standard response for successful HTTP requests
        toast.success(message || 'Operation was successful', { id: toastId });
        break;
      case 201: // Indicates that a resource has been successfully created
        toast.success(message || 'Operation was successful', { id: toastId });
        break;
      case 204: // Indicates successful request with no content to return
        toast.success(message || 'No content to display', { id: toastId });
        break;
      default: // Other successful responses with no specific status code handling
        toast.info(message || 'Operation completed with no specific response', { id: toastId });
        break;
    }
  };

  const handleApiError = (error, toastId) => {
    if (error.response) {
      const statusCode = error.response.status;
      const message = error.response.data.message;

      switch (statusCode) {
        case 400:
          toast.warning(message || "Bad Request", { id: toastId });
          break;
        case 401:
          toast.error(message || "Unauthorized access", { id: toastId });
          break;
        case 403:
          toast.error(message || "Forbidden", { id: toastId });
          break;
        case 404:
          toast.error(message || "Not found", { id: toastId });
          break;
        case 409:
          toast.warning(message || "Conflict", { id: toastId });
          break;
        case 500:
          toast.error(message || "Internal Server Error", { id: toastId });
          break;
        case 502:
          toast.error(message || "Bad Gateway", { id: toastId });
          break;
        case 503:
          toast.error(message || "Service Unavailable", { id: toastId });
          break;
        default:
          toast.error(message || "An unexpected error occurred", { id: toastId });
          break;
      }
    } else if (error.request) {
      toast.error("No response received from the server", { id: toastId });
    } else {
      toast.error("Error in setting up the request", { id: toastId });
    }
  };

  return { handleApiCall };
};

export default useApiHandler;
