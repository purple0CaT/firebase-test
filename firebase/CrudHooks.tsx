import { db } from "./firebase-config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const userCollections = collection(db, "users");

export const useGetUsers = async () => {
  const data = await getDocs(userCollections);
  const userData = data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
  return userData;
};

export const useAddUser = async (data: { name: string; age: number }) => {
  await addDoc(userCollections, data);
  return true;
};

export const useUpdateUser = async (id: any, data: any) => {
  const userDoc = doc(db, "users", id);
  await updateDoc(userDoc, data);
  return true;
};

export const useDeleteUser = async (id: any) => {
  const userDoc = doc(db, "users", id);
  await deleteDoc(userDoc);
  return true;
};
