import { collection, getDocs , doc, setDoc, deleteDoc } from "firebase/firestore";
import { diaryDb } from '../config/firebase-config.js';


export const setDiary = async (data) => {
    try {
        await setDoc(doc(diaryDb, "diary", String(data.id)), data);
    } catch (e) {
        console.error("Error setting document: ", e);
    }
}

export const getDiary = async () =>{
    const querySnapshot = await getDocs(collection(diaryDb, "diary"));
    const diaryArray = [];
    querySnapshot.forEach((doc) => {
        diaryArray.push(doc.data());
      });
    return diaryArray;
}

export const deleteDiary = async (id) => {
    await deleteDoc(doc(diaryDb, "diary", String(id)));
}


