export interface SignupTypes {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  preferences?: string[];
}

export interface LoginTypes{
  email:string,
  password:string
}