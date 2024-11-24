export interface User {
  accessToken: string;
  id: number;
  firebaseId: string;
  name: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
}
