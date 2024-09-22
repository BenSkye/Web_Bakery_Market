
import AppRoutes from './routes/routers';
import { AuthProvider } from './stores/authContex';
import './styles/styles.css'

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App
