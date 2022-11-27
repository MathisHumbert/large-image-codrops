import React from 'react';

export default function BackButton() {
  const onClick = () => {};

  return (
    <button className='unbutton action' onClick={onClick}>
      <svg width='25px' height='25px' viewBox='0 0 25 25'>
        <path d='M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z'></path>
      </svg>
      <span>Go Back</span>
    </button>
  );
}
