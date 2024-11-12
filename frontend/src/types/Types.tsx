export type Signup = {
  _id?: any;
  name?:string
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  password: string;
  preferences?: string[];
};

export interface BlogType {
  author?: string;
  _id?: any;
  id?: any;
  title?: string;
  content: string;
  date:string;
  description?: string;
  image?: File | string | null;
  tags: string[];
  category?: string;
  imagePreview?: any;
  likes?: any;
  dislikes?: any;
  blocks?: any;
}
