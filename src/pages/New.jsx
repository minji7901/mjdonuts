import React, { useState } from 'react';
import { MdOutlineTitle } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";
import { BiCategoryAlt } from "react-icons/bi";
import { uploadImage } from "../api/uploader";
import { addNewProduct } from "../api/firebase";
import { FaRegEdit } from "react-icons/fa";

export default function New() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file)
      .then(url => {
        addNewProduct(product, url)
          .then(() => {
            setSuccess('성공!')
            setTimeout(() => {
              setSuccess(null)
            }, 4000)
          })
      })
      .finally(() => setIsUploading(false))
  };


  return (
    <section className="inner mt-20">
      <div className="flex items-center justify-center text-3xl mb-10 gap-3">
        <FaRegEdit />
        <h1 className="font-black">아이템 등록</h1>
      </div>
      {success && <div className="bg-green-300 font-bold text-black px-5 py-3 rounded-xl shadow-md shadow-green-300/50">👏 {success}</div>}
      {file && <img src={URL.createObjectURL(file)} alt="local file" className="mx-auto" />}
      <form className="grid gap-5 max-w-3xl mx-auto" onSubmit={handleSubmit}>
        <div className="">
          <input type="file" accept="image/*" name="file" required onChange={handleChange} className="cursor-pointer" />
        </div>
        <div className="select-box">
          <span><MdOutlineTitle /></span>
          <input type="text" name="title" value={product.title ?? ""} placeholder="아이템명" required onChange={handleChange} />
        </div>
        <div className="select-box">
          <span><TbMoneybag /></span>
          <input type="number" name="price" value={product.price ?? ""} required onChange={handleChange} placeholder="금액" />
        </div>
        <div className="select-box">
          <span><BiCategoryAlt /></span>
          <input type="text" name="options" value={product.options ?? ""} required onChange={handleChange} placeholder="카테고리" />
        </div>
        <button className="cursor-pointer w-full bg-primary rounded-md py-3 mt-5 text-black font-bold">등록하기</button>
      </form>
    </section>
  );
}