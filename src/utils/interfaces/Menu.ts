export interface Menu {
  id: string;
  userId: string;
  headerImg: string;
  profileImg: string;
  name: string;
  url: string;
  phoneNumber: string;
  instagram: string;
  openDays: string;
  address: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
