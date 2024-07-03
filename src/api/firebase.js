import { initializeApp } from "firebase/app";
import { v4 as uuid } from "uuid";
// 로그인 연동
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
// 관리자 권한
import { getDatabase, ref, set, get } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

// 로그인
export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}
// 로그아웃
export function logout() {
  signOut(auth).catch(console.error);
}
// 로그인 유지
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}
// 관리자 권한
async function adminUser(user) {
  return get(ref(database, "admins"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}
//제품추가
export async function addNewProduct(product, image){
  const id = uuid();
  return set(ref(database,`products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image,
    options: product.options.split(','),
  })
}
//상품가져오기
export async function getProducts(){
  return get(ref(database,'products')).then(snapshot => {
    if(snapshot.exists()){
      return Object.values(snapshot.val());
    }
    return [];
  })
}