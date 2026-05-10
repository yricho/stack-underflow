import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where
} from "firebase/firestore/lite";

import { db } from "../lib/firebase";

export const postAccomodation = async (
  accomodation: any,
  collectionName: string,
) => {
  const response = await addDoc(collection(db, collectionName), accomodation);
  return response.id;
};

export const getAccomodations = async (collectionName: string) => {
  const snapshot = await getDocs(collection(db, collectionName));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getAccomodationById = async (
  collectionName: string,
  id: string,
) => {
  const ref = doc(db, collectionName, id);

  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

export const updateAccomodation = async (
  collectionName: string,
  id: string,
  payload: any,
) => {
  const ref = doc(db, collectionName, id);

  await updateDoc(ref, payload);

  return true;
};

export const deleteAccomodation = async (
  collectionName: string,
  id: string,
) => {
  const ref = doc(db, collectionName, id);

  await deleteDoc(ref);

  return true;
};

export const getAccomodationByField = async (
  collectionName: string,
  field: string,
  value: any,
) => {
  const q = query(collection(db, collectionName), where(field, "==", value));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
