export interface UserFormData {
  name: string;
  age: number;
  nickname: string;
  instaId?: string;
  fbId?: string;
  email: string;
  choice: string;
  hobby: string;
}

export type FormErrors = Partial<Record<keyof UserFormData, string>>;