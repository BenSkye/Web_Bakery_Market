import { useState } from 'react'
import MainLayout from './layouts/DefaultLayout';



function App() {
  const [count, setCount] = useState(0);

  return (
    <MainLayout>
      <div>
        <p>Current count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increase Count</button>
      </div>
    </MainLayout>
  );
}

export default App
