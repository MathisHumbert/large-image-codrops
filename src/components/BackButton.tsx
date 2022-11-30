import { useRef } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import Lenis from '@studio-freight/lenis';

import usePage from '../context/pageContext';

export default function BackButton({ lenis }: { lenis: Lenis }) {
  const { adjacentItems, scaleImg } = usePage();
  const backButtonRef = useRef(null);

  const onClick = () => {
    const contentItem = document.querySelector('.content--current')!;
    const contentTitles = contentItem.querySelectorAll(
      '.content__title .oh__inner'
    );
    const contentMeta = contentItem.querySelector('.content__meta .oh__inner');
    const contentThumbs = contentItem.querySelectorAll(
      '.content__thumbs__item'
    );

    const previewItemIndex = +contentItem.getAttribute('data-id')! - 1;
    const previewItem = document.querySelectorAll('.preview')[previewItemIndex];
    const previewImgWrapper = previewItem.querySelector(
      '.preview__img__wrapper'
    )!;
    const previewImg = contentItem.querySelector('.preview__img')!;
    const previewImgInner = contentItem.querySelector('.preview__img__inner');
    const previewTitles = previewItem.querySelectorAll(
      '.preview__title__main .oh__inner'
    );
    const previewDescription = previewItem.querySelector(
      '.preview__description'
    );

    const tl = gsap.timeline({
      defaults: { duration: 1.5, ease: 'power4.inOut' },
      onComplete: () => {
        document.body.classList.remove('content-open');
        contentItem.classList.remove('content--current');
        lenis.start();
      },
    });

    tl.to(contentTitles, { yPercent: -101, opacity: 0, stagger: 0.05 }, 0)
      .to(contentMeta, { yPercent: -101, opacity: 0 }, 0)
      .to(backButtonRef.current, { opacity: 0 }, 0)
      .to(contentThumbs, { yPercent: 150, scale: 0, stagger: -0.05 }, 0)
      .addLabel('preview', 0.15)
      .add(() => {
        const flip = Flip.getState(previewImg);
        previewImgWrapper.appendChild(previewImg);
        Flip.from(flip, {
          duration: 1.5,
          ease: 'power4.inOut',
          absolute: true,
        });
      }, 'preview')
      .to(
        // @ts-ignore
        adjacentItems.map((el) => el.item),
        {
          y: 0,
        },
        'preview'
      )
      .to(
        previewTitles,
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.03,
        },
        'preview'
      )
      .to(previewDescription, { yPercent: 0, opacity: 1 }, 'preview')
      .to(previewImgInner, { scaleY: scaleImg }, 'preview');

    // lines
  };

  return (
    <button
      className='unbutton action__back'
      ref={backButtonRef}
      onClick={onClick}
    >
      <svg width='25px' height='25px' viewBox='0 0 25 25'>
        <path d='M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z'></path>
      </svg>
      <span>Go Back</span>
    </button>
  );
}
