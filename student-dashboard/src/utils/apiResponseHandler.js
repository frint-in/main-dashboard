// utils/apiResponseHandler.js
import { toast } from "sonner";

const handleApiResponse = (response) => {
  const statusCode = response.status;
  const message = response.data.message;

  switch (statusCode) {
    case 200: // Standard response for successful HTTP requests
    case 201: // Indicates that a resource has been successfully created
      toast.success(message || 'Operation was successful');
      break;
    case 204: // Indicates successful request with no content to return
      toast.success(message || 'No content to display');
      break;
    default: // Other successful responses with no specific status code handling
      toast.info(message || 'Operation completed with no specific response');
      break;
  }
};

const handleApiError = (error) => {
  if (error.response) {
    const statusCode = error.response.status;
    const message = error.response.data.message;

    switch (statusCode) {
      case 400: // The server cannot or will not process the request due to client error
        toast.warning(message || 'Bad Request');
        break;
      case 401: // Authentication is required and has failed or has not yet been provided
        toast.error(message || 'Unauthorized access');
        break;
      case 403: // The request was valid, but the server is refusing to respond to it
        toast.error(message || 'Forbidden');
        break;
      case 404: // The requested resource could not be found
        toast.error(message || 'Not found');
        break;
      case 409: // Indicates a request conflict with the current state of the target resource
        toast.warning(message || 'Conflict');
        break;
      case 500: // A generic error message for an unexpected condition
        toast.error(message || 'Internal Server Error');
        break;
      case 502: // The server was acting as a gateway or proxy and received an invalid response
        toast.error(message || 'Bad Gateway');
        break;
      case 503: // The server cannot handle the request due to temporary overload or maintenance
        toast.error(message || 'Service Unavailable');
        break;
      default: // Other error responses with no specific status code handling
        toast.error(message || 'An unexpected error occurred');
        break;
    }
  } else if (error.request) {
    // The request was made but no response was received
    toast.error('No response received from the server');
  } else {
    // Something happened in setting up the request that triggered an Error
    toast.error('Error in setting up the request');
  }
};

export { handleApiResponse, handleApiError };
