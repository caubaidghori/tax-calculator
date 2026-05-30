import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage';
import EMICalculatorPage from './pages/EMICalculatorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/tax-calculator"
          element={<CalculatorPage />}
        />
        <Route
          path="/emi-calculator"
          element={<EMICalculatorPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;