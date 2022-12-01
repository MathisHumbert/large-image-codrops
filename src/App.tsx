import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import imagesLoaded from 'imagesloaded';

import Frame from './components/Frame';
import PreviewItem from './components/PreviewItem';
import { previewItems, contentItems } from './mockData';
import ContentItem from './components/ContentItem';
import BackButton from './components/BackButton';

const lenis = new Lenis({
  // @ts-ignore
  lerp: 0.01,
  smooth: true,
  direction: 'vertical',
});

function raf(time: any) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

export default function App() {
  useEffect(() => {
    const previewImgs = document.querySelectorAll('.preview__img__inner');
    const contentImgs = document.querySelectorAll('.content__thumbs__item');

    const images = [...previewImgs, ...contentImgs];

    const imgLoaded = imagesLoaded(images, {
      background: true,
    });

    imgLoaded.on('done', () => {
      document.body.classList.remove('loading');
    });
  }, []);

  return (
    <>
      <Frame />
      <section className='preview__wrapper'>
        {previewItems.map((preview) => (
          <PreviewItem key={preview.id} {...preview} lenis={lenis} />
        ))}
      </section>
      <section className='content__wrapper'>
        {contentItems.map((content) => (
          <ContentItem key={content.id} {...content} />
        ))}
        <BackButton lenis={lenis} />
      </section>
    </>
  );
}
