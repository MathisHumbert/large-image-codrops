import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  img: string;
};

export default function PreviewItem({
  img,
  title,
  subtitle,
  description,
}: Props) {
  const previewRef = useRef(null);
  const previewImgRef = useRef(null);
  const previewTitleRef = useRef(null);

  useEffect(() => {
    gsap.set(previewImgRef.current, { transformOrigin: '50% 0%' });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: previewRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
      .to(previewImgRef.current, { scaleY: 1.8, ease: 'none' }, 0)
      .to(previewTitleRef.current, { yPercent: -100, ease: 'none' }, 0);
  }, []);

  const onClick = () => {};

  return (
    <div className='preview' ref={previewRef}>
      <div className='preview__img__wrapper' onClick={onClick}>
        <div className='preview__img'>
          <div
            className='preview__img__inner'
            style={{ backgroundImage: `url('${img}')` }}
            ref={previewImgRef}
          ></div>
        </div>
      </div>
      <div className='preview__title' ref={previewTitleRef}>
        <h2 className='preview__title__main'>
          <span className='oh'>{title}</span>
          <span className='oh'>{subtitle}</span>
        </h2>
        <p className='preview__description'>{description}</p>
      </div>
    </div>
  );
}
