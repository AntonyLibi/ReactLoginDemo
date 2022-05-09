import { db } from "../firestore"
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc} from "firebase/firestore"

const userCollectionRef=collection(db, "books")

class UserDataService{
    // addUsers = (newUser:any)=>{
    //     return addDoc(userCollectionRef,newUser);
    // }

    // updateUser=(id:any,updateBook:any)=>{
    //     const userDoc=doc(db,"users",id)
    //     return updateDoc(userDoc,updateBook)
    // }

    // deleteUser=(id:any)=>{
    //     const userDoc=doc(db,"users",id);
    //     return deleteDoc(userDoc)
    // }

    getAllUsers=()=>{
        return getDocs(userCollectionRef)
    }
     
    // getUser=(id:any)=>{
    //     const userDoc=doc(db,"users",id)
    //     return getDoc(userDoc)
    // }
}

export default new UserDataService();