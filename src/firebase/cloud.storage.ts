import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  type StorageReference
} from 'firebase/storage';
import { StorageFolder } from '@/utils/enuns/firebase';

export interface DownloadRef {
  userId: string;
  menuId: string;
  categorId: string;
  fileName: string;
  folder: string;
}

export interface UploadData extends DownloadRef {
  file: any;
}

export const uploadImage = async (uploadData: UploadData) => {
  const { userId, menuId, categorId, fileName, file, folder } = uploadData;
  let URL: string = '';

  if (folder === StorageFolder.Banner || folder === StorageFolder.Profile) {
    URL = `${userId}/${menuId}/${folder}/${fileName}.jpg`;
  }

  if (folder === StorageFolder.Products) {
    URL = `${userId}/${menuId}/${categorId}/${folder}/${fileName}.jpg`;
  }

  const storage = getStorage();
  const imageRef = ref(storage, URL);
  return await uploadBytes(imageRef, file);
};

export const donwloadImage = async (downloadRef: DownloadRef) => {
  const { userId, menuId, categorId, fileName, folder } = downloadRef;
  let URL: string = '';

  if (folder === StorageFolder.Banner || folder === StorageFolder.Profile) {
    URL = `${userId}/${menuId}/${folder}/${fileName}.jpg`;
  }

  if (folder === StorageFolder.Products) {
    URL = `${userId}/${menuId}/${categorId}/${folder}/${fileName}.jpg`;
  }

  const storage = getStorage();
  const productRef: StorageReference = ref(storage, URL);
  return await getDownloadURL(productRef);
};
