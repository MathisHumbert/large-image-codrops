import ReactDOM from 'react-dom/client';

import App from './App';
import { PageProvider } from './context/pageContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <PageProvider>
    <App />
  </PageProvider>
);
