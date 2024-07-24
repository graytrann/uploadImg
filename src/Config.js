import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// initializeApp: setup Firebase services cho dự án với những thông tin dưới
// getStorage: khởi tạo và trả về 1 phiên bản của bộ lưu trữ, để thực hiện thêm xóa sửa
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
