import { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import wrapLines from '../utils/wrapLines';

type Props = {
  id: number;
  title: string;
  subtitle: string;
  author: string;
  description: string;
  subimg: string[];
};

export default function ContentItem({
  id,
  title,
  subtitle,
  author,
  description,
  subimg,
}: Props) {
  const contentTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const splitTypeInstance = new SplitType(contentTextRef.current!, {
      types: 'lines',
    });

    wrapLines(splitTypeInstance.lines!, 'div', 'oh');

    const onWindowResize = () => {
      // @ts-ignore
      splitTypeInstance.split();

      wrapLines(splitTypeInstance.lines!, 'div', 'oh');
    };

    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return (
    <div className='content' data-id={id}>
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
        <div className='content__text' ref={contentTextRef}>
          {description}
        </div>
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
