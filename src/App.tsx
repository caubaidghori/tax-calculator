import { useState } from 'react';
import { IncomeForm } from './components/IncomeForm';
import { TaxResults } from './components/TaxResults';
import type { IncomeDetails, DeductionsOldRegime, TaxComparison, } from './types/tax';
import { compareRegimes } from './utils/taxCalculator';

function App() {
  const [income, setIncome] = useState<IncomeDetails>({
    basicSalary: 0,
    hra: 0,
    lta: 0,
    specialAllowance: 0,
    otherAllowances: 0,
    bonus: 0,
    rentIncome: 0,
    otherIncome: 0,
  });

  const [deductions, setDeductions] = useState<DeductionsOldRegime>({
    section80C: 0,
    section80D: 0,
    section80E: 0,
    section80G: 0,
    section80TTA: 0,
    hraExemption: 0,
    ltaExemption: 0,
    professionalTax: 0,
    homeLoanInterest: 0,
    standardDeduction: 50000,
  });

  const [comparison, setComparison] = useState<TaxComparison | null>(null);

  const handleCalculate = () => {
    const result = compareRegimes(income, deductions);
    setComparison(result);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">
            Indian Income Tax Calculator FY 2026-27
          </h1>

          <p className="text-slate-600 text-lg">
            Compare Old vs New Tax Regime
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Prepared by CA Ubaid Ghori
          </p>

          <p className="text-sm text-slate-500">
          For consultation: caubaidghori@gmail.com
          </p>



        </div>

        <IncomeForm
          income={income}
          deductions={deductions}
          onIncomeChange={setIncome}
          onDeductionsChange={setDeductions}
        />

        <div className="text-center mt-6">
          <button
            onClick={handleCalculate}
            className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Calculate Tax
          </button>
        </div>

        {comparison && (
          <div className="mt-8">
            <TaxResults comparison={comparison} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;