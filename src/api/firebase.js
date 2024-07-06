import { initializeApp } from "firebase/app";
import { v4 as uuid } from "uuid";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, get ,remove} from "firebase/database";

// Firebase 앱 초기화
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};
const app = initializeApp(firebaseConfig);

// 인증 및 데이터베이스 인스턴스 생성
const auth = getAuth();
const database = getDatabase(app);

// Google 인증 제공자 생성
const provider = new GoogleAuthProvider();

// 로그인
export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

// 로그아웃
export function logout() {
  signOut(auth).catch(console.error);
}

// 사용자 인증 상태 변화 감지
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await enhanceUserWithAdmin(user) : null;
    callback(updatedUser);
  });
}

// 관리자 여부 확인 및 사용자 정보에 추가
async function enhanceUserWithAdmin(user) {
  const snapshot = await get(ref(database, "admins"));
  if (snapshot.exists()) {
    const admins = snapshot.val();
    const isAdmin = admins.includes(user.uid);
    return { ...user, isAdmin };
  }
  return user;
}

// 새 제품 추가
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

// 모든 제품 가져오기
export async function getProducts(){
  const snapshot = await get(ref(database, 'products'));
  return snapshot.exists() ? Object.values(snapshot.val()) : [];
}

// 사용자 장바구니 가져오기
export async function getCart(userId){
  const snapshot = await get(ref(database, `cart/${userId}`));
  const items = snapshot.val() || {};
  return Object.values(items);
}

// 장바구니에 제품 추가 또는 업데이트
export async function addOrUpdateCart(userId,product){
  return set(ref(database, `cart/${userId}/${product.id}`),product);
}

// 장바구니에서 제품 삭제
export async function removeCart(userId,productId){
  return remove(ref(database, `cart/${userId}/${productId}`));
}