export interface Menu {
  id: number;
  userId: number;
  headerImg: string;
  profileImg: string;
  name: string;
  color: string;
  url: string;
  phoneNumber: string;
  instagram: string;
  openDays: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}
