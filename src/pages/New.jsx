import React, { useState } from 'react';
import { uploadImage } from "../api/uploader";
import useProducts from "../hooks/useProducts";
import { MdOutlineTitle } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { TbMoneybag } from "react-icons/tb";
import { BiCategoryAlt } from "react-icons/bi";

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
            setTimeout(() => {
              setSuccessMessage(null);
            }, 4000);
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
  const SUCCESS_MESSAGE_CLASSNAME = "bg-green-300 font-bold text-black px-5 py-3 rounded-xl shadow-md shadow-green-300/50"
  const ADD_BTN_CLASSNAME = "cursor-pointer w-full bg-primary rounded-md py-3 mt-5 text-black font-bold"

  return (
    <section className="inner pt-10">
      <div className="flex items-center justify-center text-3xl mb-10 gap-3">
        <FaRegEdit />
        <h1 className="font-black">아이템 등록</h1>
      </div>
      {successMessage && <div className={SUCCESS_MESSAGE_CLASSNAME}>👏 {successMessage}</div>}
      {file && <img src={URL.createObjectURL(file)} alt="local file" className="mx-auto" />}
      <form className="grid gap-5 max-w-3xl mx-auto" onSubmit={handleSubmit}>
        <div className="">
          <input 
          type="file" 
          name="file" 
          accept="image/*" 
          onChange={handleChange} 
          className="cursor-pointer" 
          required
          />
        </div>
        <div className="select-box">
          <span><MdOutlineTitle /></span>
          <input 
          type="text" 
          name="title" 
          value={product.title ?? ""} 
          placeholder="아이템명" 
          onChange={handleChange} 
          required 
          />
        </div>
        <div className="select-box">
          <span><TbMoneybag /></span>
          <input 
          type="number" 
          name="price" 
          value={product.price ?? ""} 
          onChange={handleChange} 
          placeholder="금액" 
          required 
          />
        </div>
        <div className="select-box">
          <span><BiCategoryAlt /></span>
          <input 
          type="text" 
          name="options" 
          value={product.options ?? ""} 
          onChange={handleChange} 
          placeholder="묶음" 
          required 
          />
        </div>
        <button className={ADD_BTN_CLASSNAME} disabled={isUploading}>등록하기</button>
      </form>
    </section>
  );
}