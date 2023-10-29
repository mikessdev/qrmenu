export interface User {
  accessToken?: string;
  uid: string;
  name: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber?: string;
}
