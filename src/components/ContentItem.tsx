import React from 'react';

type Props = {
  id: number;
  title: string;
  subtitle: string;
  author: string;
  description: string;
  img: string;
  subimg: string[];
};

export default function ContentItem({
  title,
  subtitle,
  author,
  description,
  img,
  subimg,
}: Props) {
  return (
    <div className='content'>
      <div className='content__group'>
        <div className='content__title'>
          <span className='oh'>{title}</span>
          <span className='oh'>{subtitle}</span>
        </div>
        <div className='content__meta oh'>{author}</div>
        <div className='content__text'>{description}</div>
      </div>
      <div className='preview__thumbs'>
        {subimg.map((img) => (
          <div
            className='content__thumbs__item'
            style={{ backgroundImage: `url('${img}')` }}
          ></div>
        ))}
      </div>
      <div className='preview__img'>
        <div
          className='preview__img__inner'
          style={{ backgroundImage: `url('${img}')` }}
        ></div>
      </div>
    </div>
  );
}
