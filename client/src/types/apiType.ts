export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: number;
  }
  

  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface SignupCredentials extends LoginCredentials {
    name: string;
  }
  
  export interface AuthResponse {
    token: string;
    // user: {
    //   id: string;
    //   name: string;
    //   email: string;
    // };
    user:string;
  }
  