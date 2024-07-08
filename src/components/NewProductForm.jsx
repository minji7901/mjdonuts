import React from 'react';
import { MdOutlineTitle } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";
import { BiCategoryAlt } from "react-icons/bi";

const InputField = ({ icon: Icon, type, name, value, placeholder, onChange, required = false }) => (
  <div className="flex items-stretch rounded-full px-3 py-1 shadow-base">
    <span className="h-10 w-10 flex items-center justify-center rounded-l-md"><Icon /></span>
    <input
      type={type}
      className="bg-transparent font-bold w-full pr-4 focus:outline-none"
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
    />
  </div>
);

export default function NewProductForm({ product, file, isUploading, handleChange, handleSubmit }) {
  return (
    <form className="grid gap-5 max-w-3xl mx-auto" onSubmit={handleSubmit}>
    <input
      type="file"
      name="file"
      accept="image/*"
      onChange={handleChange}
      className="cursor-pointer"
      required
    />
    <InputField
      icon={MdOutlineTitle}
      type="text"
      name="title"
      value={product.title ?? ""}
      placeholder="NAME"
      onChange={handleChange}
      required
    />
    <InputField
      icon={TbMoneybag}
      type="number"
      name="price"
      value={product.price ?? ""}
      placeholder="PRICE"
      onChange={handleChange}
      required
    />
    <InputField
      icon={BiCategoryAlt}
      type="text"
      name="options"
      value={product.options ?? ""}
      placeholder="OPTION"
      onChange={handleChange}
    />
    <button className={"shadow-base " + "cursor-pointer w-full bg-secondary rounded-full py-3 mt-5 text-white font-bold uppercase text-2xl"} disabled={isUploading}>
      regist
    </button>
  </form>
  );
}

