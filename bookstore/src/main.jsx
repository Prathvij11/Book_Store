import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SearchProvider from "./context/SearchContext.jsx";
import NavProvider from './context/NavContext.jsx';
import { Toaster } from 'react-hot-toast'
import { CartProvider } from './context/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <NavProvider>
    <SearchProvider>
      <CartProvider>
        <App />
        <Toaster position="bottom-right" reverseOrder={false} />
      </CartProvider>
    </SearchProvider>
  </NavProvider>
)