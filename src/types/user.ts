
export type UserRole = "admin" | "doctor" | "caretaker" | "patient";


export type RegisterUserPayload = {
  profile_name: string;        
  profile_email: string;         
  password: string;            
  role: UserRole  
  profile_image?: string;        
};

