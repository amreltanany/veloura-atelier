import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { startSmoothScroll } from './smooth-scroll';

createRoot(document.getElementById('root')!).render(<App />);

startSmoothScroll();
