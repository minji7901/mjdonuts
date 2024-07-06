import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { addOrUpdateCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

export default function Detail() {
  const { user } = useAuthContext();
  const uid = user?.uid;
  const { state: { product } } = useLocation();
  const { id, image, options, price, title } = product;
  const [selectedOption, setSelectedOption] = useState(options && options[0]);
  const [numSelected, setNumSelected] = useState(0);
  const handleSelect = (e, i) => {
    setSelectedOption(e.target.value);
    setNumSelected(i);
  };
  
  // 기본 가격과 할인된 가격 계산
  const defaultPrice = price * selectedOption;
  const calculatedPrice = numSelected > 0 ? defaultPrice - ((defaultPrice / 100) * (5 * numSelected)) : defaultPrice;
  
  const [successMessage, setSuccessMessage] = useState(null);
  
  const { login } = useAuthContext();
  const handleClick = () => {
    if (!user) {
      alert("로그인이 필요합니다");
      login();  // 로그인 함수 호출
      return;
    }
    const productToAdd  = { id, image, title, price: calculatedPrice? calculatedPrice: defaultPrice, option: selectedOption, quantity: 1 };

    addOrUpdateCart(uid, productToAdd )
      .then(() => {
        setSuccessMessage('장바구니에 상품이 담겼습니다');
        setTimeout(() => {
          setSuccessMessage(null)
        }, 2000)
      })
      .catch((error) => {
        console.error('장바구니 추가 중 오류 발생:', error);
      });
  }
  const SUCCESS_MESSAGE_CLASSNAME = "absolute top-24 z-10 left-[50%] translate-x-[-50%] bg-primary font-bold text-black px-5 py-3 rounded-xl shadow-md shadow-primary/50";
  const CART_BTN_CLASSNAME = "mt-6 rounded-full w-full py-3 bg-[#396AD5] font-bold text-lg"

  return (
    <section className="detail-bg pt-10">
      <div className="inner pt-10">
        {successMessage &&
          <span className={SUCCESS_MESSAGE_CLASSNAME}>👏 {successMessage}</span>
        }
        <div className="flex justify-center items-center gap-40">
          <img src={image} alt={title} />
          <div>
            <ul className="detail-item">
              <li className="title">
                <p>상품명</p>
                <p className="text-2xl">{title}</p>
              </li>
              <li className="option">
                <p>묶음</p>
                <div className="flex gap-4">
                  {options && options.map((item, i) => (
                    <div className="flex gap-1 cursor-pointer bg-transparent" key={i}>
                      <input
                        type="radio"
                        id={item}
                        name="op"
                        value={item}
                        className="cursor-pointer"
                        onChange={(e) => handleSelect(e, i)}
                        defaultChecked={i === 0}
                      />
                      <label htmlFor={item} className="cursor-pointer text-white/50">{item}개</label>
                    </div>
                  ))}
                </div>
              </li>
              <li>
                <p>가격</p>
                {
                  numSelected === 0 ? (
                    <p className="text-primary text-xl">{defaultPrice.toLocaleString()} 캐시</p>
                  ) : (
                    <div className="flex items-center gap-5">
                      <p className="text-white/50 line-through text-nowrap">{defaultPrice.toLocaleString()} 캐시</p>
                      <p className="text-primary text-xl">{calculatedPrice.toLocaleString()} 캐시</p>
                    </div>
                  )
                }
              </li>
            </ul>
            <button className={CART_BTN_CLASSNAME} onClick={handleClick}>장바구니</button>
          </div>
        </div>
      </div>
    </section>
  );
}