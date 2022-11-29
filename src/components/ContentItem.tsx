import React from 'react';

type Props = {
  id: number;
  title: string;
  subtitle: string;
  author: string;
  description: string;
  subimg: string[];
};

export default function ContentItem({
  title,
  subtitle,
  author,
  description,
  subimg,
}: Props) {
  return (
    <div className='content'>
      <div className='content__group'>
        <div className='content__title'>
          <span className='oh'>
            <span className='oh__inner'>{title}</span>
          </span>
          <span className='oh'>
            <span className='oh__inner'>{subtitle}</span>
          </span>
        </div>
        <div className='content__meta oh'>
          <span className='oh__inner'>{author}</span>
        </div>
        <div className='content__text'>{description}</div>
      </div>
      <div className='content__thumbs'>
        {subimg.map((img) => (
          <div
            key={img}
            className='content__thumbs__item'
            style={{ backgroundImage: `url('${img}')` }}
          ></div>
        ))}
      </div>
    </div>
  );
}
