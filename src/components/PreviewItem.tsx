import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import Lenis from '@studio-freight/lenis';

import getAdjacentItems from '../utils/getAdjacentItems';
import usePage from '../context/pageContext';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);

type Props = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  img: string;
  lenis: Lenis;
};

export default function PreviewItem({
  id,
  img,
  title,
  subtitle,
  description,
  lenis,
}: Props) {
  const { setAdjacentItems, setScaleImg } = usePage();
  const previewRef = useRef(null);
  const previewImgRef = useRef<HTMLDivElement>(null);
  const previewImgInnerRef = useRef<HTMLDivElement>(null);
  const previewTitleRef = useRef(null);
  const titleInnerRef = useRef(null);
  const subtitleInnerRef = useRef(null);

  const descriptionRef = useRef(null);

  useEffect(() => {
    gsap.set(previewImgInnerRef.current, { transformOrigin: '50% 0%' });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: previewRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
      .to(previewImgInnerRef.current, { scaleY: 1.8, ease: 'none' }, 0)
      .to(previewTitleRef.current, { yPercent: -100, ease: 'none' }, 0);
  }, []);

  const onClick = () => {
    const previewItems = document.querySelectorAll('.preview');
    const previewItem = previewItems[id - 1];
    const contentItem = document.querySelectorAll('.content')[id - 1];
    const contentTitles = contentItem.querySelectorAll(
      '.content__title .oh__inner'
    );
    const contentMeta = contentItem.querySelectorAll(
      '.content__meta .oh__inner'
    );
    const contentThumbs = contentItem.querySelectorAll(
      '.content__thumbs__item'
    );
    const backButton = document.querySelector('.action__back');

    const adjacentItems = getAdjacentItems(previewItem, previewItems);
    setAdjacentItems(adjacentItems);

    const scaleImg =
      previewImgInnerRef.current!.getBoundingClientRect().height /
      previewImgInnerRef.current!.offsetHeight;
    setScaleImg(scaleImg);

    const tl = gsap.timeline({
      defaults: { duration: 1.5, ease: 'power4.inOut' },
      onStart: () => {
        lenis.stop();
        document.body.classList.add('content-open');
        contentItem.classList.add('content--current');
        gsap.set([contentTitles, contentMeta], { yPercent: -101, opacity: 0 });
        gsap.set(contentThumbs, {
          transformOrigin: '0% 0%',
          yPercent: 150,
          scale: 0,
        });
        gsap.set(backButton, { opacity: 0 });
      },
    });

    for (const el of adjacentItems) {
      tl.to(
        el.item,
        { y: el.position < id - 1 ? -window.innerHeight : window.innerHeight },
        0
      );
    }

    tl.add(() => {
      const flip = Flip.getState(previewImgRef.current);
      contentItem.appendChild(previewImgRef.current!);
      Flip.from(flip, {
        duration: 1.5,
        ease: 'power4.inOut',
        absolute: true,
      });
    }, 0)
      .to(
        [titleInnerRef.current, subtitleInnerRef.current],
        {
          yPercent: 101,
          opacity: 0,
          stagger: -0.03,
        },
        0
      )
      .to(descriptionRef.current, { yPercent: 101, opacity: 0 }, 0)
      .to(previewImgInnerRef.current, { scaleY: 1 }, 0)
      .addLabel('content', 0.15)
      .to(backButton, { opacity: 1 }, 'content')
      .to(contentTitles, { yPercent: 0, opacity: 1, stagger: -0.05 }, 'content')
      .to(contentMeta, { yPercent: 0, opacity: 1 }, 'content')
      .to(contentThumbs, { scale: 1, yPercent: 0, stagger: -0.05 }, 'content');

    // lines
  };

  return (
    <div className='preview' ref={previewRef}>
      <div className='preview__img__wrapper' onClick={onClick}>
        <div className='preview__img' ref={previewImgRef}>
          <div
            className='preview__img__inner'
            style={{ backgroundImage: `url('${img}')` }}
            ref={previewImgInnerRef}
          ></div>
        </div>
      </div>
      <div className='preview__title' ref={previewTitleRef}>
        <h2 className='preview__title__main'>
          <span className='oh'>
            <span className='oh__inner' ref={titleInnerRef}>
              {title}
            </span>
          </span>
          <span className='oh'>
            <span className='oh__inner' ref={subtitleInnerRef}>
              {subtitle}
            </span>
          </span>
        </h2>
        <p className='preview__description' ref={descriptionRef}>
          {description}
        </p>
      </div>
    </div>
  );
}
