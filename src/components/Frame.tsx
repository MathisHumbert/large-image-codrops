import React from 'react';

export default function Frame() {
  return (
    <div className='frame'>
      <a
        href='https://tympanus.net/codrops/2022/08/03/large-image-to-content-page-transition/'
        target='_blank'
        className='frame__title'
      >
        <h1 className='frame__title__main'>Image to Content Page Transition</h1>
        <svg width='18px' height='18px' viewBox='0 0 24 24'>
          <path
            vector-effect='non-scaling-stroke'
            d='M18.25 15.5a.75.75 0 00.75-.75v-9a.75.75 0 00-.75-.75h-9a.75.75 0 000 1.5h7.19L6.22 16.72a.75.75 0 101.06 1.06L17.5 7.56v7.19c0 .414.336.75.75.75z'
          ></path>
        </svg>
      </a>
      <a href='/' target='_blank' className='frame__prev'>
        Previous demo
      </a>
      <a
        href='https://twitter.com/Mathis1Humbert'
        target='_blank'
        className='frame__twitter'
      >
        Mathis Humbert
      </a>
    </div>
  );
}
