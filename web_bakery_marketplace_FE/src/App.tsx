
import AppRoutes from './routes/routers';
import { AuthProvider } from './stores/authContex';
import { CartProvider } from './stores/cartContext';
import './styles/styles.css'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </AuthProvider>
  );
}

export default App
