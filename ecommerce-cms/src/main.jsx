import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import UserContext from './context/UserContext';

import './styles/global.css';

const rootContainer = document.querySelector('#root');
const root = createRoot(rootContainer);
root.render(
  <Router>
    <UserContext>
      <App />
    </UserContext>
  </Router>
);
