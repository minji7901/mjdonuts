import { initializeApp } from "firebase/app";
import { v4 as uuid } from "uuid";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, get, remove } from "firebase/database";

// Firebase 앱 초기화
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

// 사용자 인증 상태 변화 감지
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

// 관리자 여부 확인 및 사용자 정보에 추가
async function adminUser(user) {
  return get(ref(database, 'admins')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}

// 새 제품 추가
export async function addNewProduct(product, image) {
  const id = uuid();
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image,
    options: product.options.split(','),
  })
}

// 모든 제품 가져오기
export async function getProducts() {
  return get(ref(database, 'products')).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

// 사용자 장바구니 가져오기
export async function getCart(userId) {
  return get(ref(database, `cart/${userId}`)) //
    .then((snapshot) => {
      const items = snapshot.val() || {};
      return Object.values(items);
    });
}

// 장바구니에 제품 추가 또는 업데이트
export async function addOrUpdateToCart(userId, product) {
  return set(ref(database, `cart/${userId}/${product.id}`), product);
}

// 장바구니에서 제품 삭제
export async function removeFromCart(userId, productId) {
  return remove(ref(database, `cart/${userId}/${productId}`));
}