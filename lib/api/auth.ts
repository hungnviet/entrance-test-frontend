import { SignupRequest,SigninRequest,ApiResponse,SigninResponseData } from "@/types/dashboard";

export async function signupUser(userData: SignupRequest): Promise<ApiResponse> {
  try {
    const response = await fetch("http://localhost:5001/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    
    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    return {
      message: "Failed to connect to server",
      code: 500,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

export async function signinUser(credentials: SigninRequest): Promise<ApiResponse<SigninResponseData>> {
  try {
    const response = await fetch("http://localhost:5001/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    
    const data: ApiResponse<SigninResponseData> = await response.json();
    return data;
  } catch (error) {
    return {
      message: "Failed to connect to server",
      code: 500,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}



export async function logoutUser(): Promise<void> {
  try {
    // Clear auth token and user data from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    

    // await fetch("http://localhost:5001/api/auth/logout", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${localStorage.getItem("authToken")}`
    //   },
    // });
    
    
    window.location.href = "/auth/signin";
  } catch (error) {
    console.error("Logout error:", error);
    
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location.href = "/auth/signin";
  }
}