import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadImage = (file: any, uid: string, fileName: string) => {
  const storage = getStorage();
  const imageRef = ref(storage, `${uid}/products/${fileName}.jpg`);
  return uploadBytes(imageRef, file);
};

export const donwloadImage = async (imageRef: any) => {
  const storage = getStorage();
  const productRef = ref(storage, imageRef);
  return await getDownloadURL(productRef);
};
