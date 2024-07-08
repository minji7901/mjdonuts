import React, { useState } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { uploadImage } from "../api/uploader";
import useProducts from "../hooks/useProducts";
import NewProductForm from "../components/NewProductForm";

export default function New() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const { addProduct } = useProducts();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
    } else {
      setProduct({ ...product, [name]: value });
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      addProduct.mutate(
        { product: { ...product, image: imageUrl }, url: imageUrl },
        {
          onSuccess: () => {
            setSuccessMessage('상품이 성공적으로 등록되었습니다.');
            setTimeout(() => setSuccessMessage(null), 4000);
            setProduct({ title: '', price: '', options: '' });
            setFile(null);
          },
          onError: (error) => {
            console.error('상품 등록 중 오류 발생:', error);
          }
        }
      );
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const TITLE_CLASSNAME = "flex items-center justify-center text-5xl mb-10 gap-3 font-medium"
  const SUCCESS_MESSAGE_CLASSNAME = "bg-green-300 font-bold text-black px-5 py-3 rounded-xl shadow-md shadow-green-300/50"

  return (
    <section className=" text-default bg-main h-cal">
      <div className="inner">
        <div className={TITLE_CLASSNAME}>
          <FaRegEdit className="text-4xl" />
          <h1>NEW</h1>
        </div>
        {successMessage &&
          <div className={SUCCESS_MESSAGE_CLASSNAME}>👏 {successMessage}</div>
        }
        {file &&
          <img
            src={URL.createObjectURL(file)}
            className="mx-auto max-w-80"
            alt="local file"
          />
        }
        <NewProductForm
          product={product}
          file={file}
          isUploading={isUploading}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}