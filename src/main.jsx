import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast';

import { SearchProvider } from './context/search.jsx';
import { CartProvider } from './context/cart.jsx';
import { OrderProvider } from './context/order.jsx';
import 'antd/dist/reset.css';
import { AuthProvider } from './context/auth.jsx';


createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <OrderProvider>
          <StrictMode>
            <App />
            <Toaster />
          </StrictMode>
        </OrderProvider>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>

)
