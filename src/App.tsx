import Frame from './components/Frame';
import PreviewItem from './components/PreviewItem';
import { previewItems } from './mockData';

function App() {
  return (
    <>
      <Frame />
      <section className='preview__wrapper'>
        {previewItems.map((preview) => (
          <PreviewItem key={preview.id} {...preview} />
        ))}
      </section>
      {/* CONTENT */}
    </>
  );
}

export default App;
