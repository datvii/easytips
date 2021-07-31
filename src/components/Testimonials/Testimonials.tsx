import React, { useState } from "react";
import { getUserLang } from '../../Context/LangContext';
import arrow_down from '../../assets/imgs/arrow_down.svg';
import Stars from "../Stars/Stars";

const Testimonials = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [star, setStar] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');
  const locale = getUserLang();
  const clickOpenHandler = (e: React.MouseEvent): void => {
    e.preventDefault();
    setIsActive(true);
  }

  const clickCloseHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsActive(false);
  }

  const onChangeHandler = (e: { target: { value: React.SetStateAction<string>; }; }): void => {
    setComment(e.target.value);
  }

  const clickSendHandler = () => {
    const url = '/article/fetch/post/user';

    let data = {
      star,
      comment
    };
    
    console.table(data);
    // axios.post(url, {
    //   title: 'Title of post',
    //   body: JSON.stringify(data)
    // }).then(response => console.log(response.data))
    // .catch(error => console.log(error));
  }

  const onStarsClick = (index: number): void => {
    let res = index === 5 ? 1
      : index === 4 ? 2
      : index === 2 ? 4
      : index === 1 ? 5
      : 3;

    setStar(res);
  }

  return (
    <div onClick={ clickOpenHandler } className={`testimonials ${ isActive ? 'active' : '' }`}>
      <a href="#" onClick={ e => clickCloseHandler(e) } className="testimonials__btn btn--close">&times;</a>
      <p>{ locale.arrayLang.leaveOnlyComment }</p>
      <Stars type={ `${isActive ? 'filled' : 'stroked'}` } handleClick={ onStarsClick } />
      <a href="#" className="testimonials__btn btn--open"><img src={ arrow_down } alt="arrow"/></a>
      <textarea onChange={ onChangeHandler } value={ comment } placeholder={ locale.arrayLang.leaveComment }></textarea>
      <a href="#" onClick={ clickSendHandler } className={`btn btn--green ${star ? '' : 'btn--disabled'}`}>{ locale.arrayLang.send }</a>
    </div>
  );
};

export default Testimonials;
