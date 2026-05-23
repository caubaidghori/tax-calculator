import { useState } from 'react';
import type { IncomeDetails, DeductionsOldRegime } from '../types/tax';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Plus, Minus } from 'lucide-react';
import { Button } from './ui/button';

interface IncomeFormProps {
  income: IncomeDetails;
  deductions: DeductionsOldRegime;
  onIncomeChange: (income: IncomeDetails) => void;
  onDeductionsChange: (deductions: DeductionsOldRegime) => void;
}

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  hint?: string;
}

function NumberInput({ label, value, onChange, hint }: NumberInputProps) {
  return (
    <div className="space-y-1">
      <Label className="text-slate-700 text-sm font-medium">{label}</Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">₹</span>
        <Input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="pl-7 h-10 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
          placeholder="0"
        />
      </div>
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

export function IncomeForm({ income, deductions, onIncomeChange, onDeductionsChange }: IncomeFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateIncome = (field: keyof IncomeDetails, value: number) => {
    onIncomeChange({ ...income, [field]: value });
  };

  const updateDeduction = (field: keyof DeductionsOldRegime, value: number) => {
    onDeductionsChange({ ...deductions, [field]: value });
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-t-lg">
          <CardTitle className="text-white flex items-center gap-2">
            <span className="bg-amber-500 w-2 h-6 rounded-full"></span>
            Income Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NumberInput
              label="Basic Salary (Annual)"
              value={income.basicSalary}
              onChange={(v) => updateIncome('basicSalary', v)}
              hint="Your annual basic salary"
            />
            <NumberInput
              label="HRA (House Rent Allowance)"
              value={income.hra}
              onChange={(v) => updateIncome('hra', v)}
            />
            <NumberInput
              label="LTA (Leave Travel Allowance)"
              value={income.lta}
              onChange={(v) => updateIncome('lta', v)}
            />
            <NumberInput
              label="Special Allowance"
              value={income.specialAllowance}
              onChange={(v) => updateIncome('specialAllowance', v)}
            />
            <NumberInput
              label="Other Allowances"
              value={income.otherAllowances}
              onChange={(v) => updateIncome('otherAllowances', v)}
            />
            <NumberInput
              label="Performance Bonus"
              value={income.bonus}
              onChange={(v) => updateIncome('bonus', v)}
            />
          </div>

          <Button
            variant="ghost"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-slate-600 hover:text-slate-800 flex items-center gap-2"
          >
            {showAdvanced ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showAdvanced ? 'Hide' : 'Show'} Other Income Sources
          </Button>

          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
              <NumberInput
                label="Rental Income"
                value={income.rentIncome}
                onChange={(v) => updateIncome('rentIncome', v)}
              />
              <NumberInput
                label="Other Income"
                value={income.otherIncome}
                onChange={(v) => updateIncome('otherIncome', v)}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-white">
        <CardHeader className="bg-gradient-to-r from-amber-600 to-amber-500 rounded-t-lg">
          <CardTitle className="text-white flex items-center gap-2">
            <span className="bg-white w-2 h-6 rounded-full"></span>
            Deductions (Old Regime Only)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> These deductions are only applicable under the Old Tax Regime. 
              New Regime offers a standard deduction of ₹75,000 only.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NumberInput
              label="Section 80C (Max ₹1.5L)"
              value={deductions.section80C}
              onChange={(v) => updateDeduction('section80C', v)}
              hint="PPF, ELSS, Insurance Premium, etc."
            />
            <NumberInput
              label="Section 80D - Health Insurance"
              value={deductions.section80D}
              onChange={(v) => updateDeduction('section80D', v)}
              hint="Max ₹75,000 (self + parents)"
            />
            <NumberInput
              label="Section 80E - Education Loan"
              value={deductions.section80E}
              onChange={(v) => updateDeduction('section80E', v)}
              hint="No limit on interest"
            />
            <NumberInput
              label="Section 80G - Donations"
              value={deductions.section80G}
              onChange={(v) => updateDeduction('section80G', v)}
            />
            <NumberInput
              label="Section 80TTA - Savings Interest"
              value={deductions.section80TTA}
              onChange={(v) => updateDeduction('section80TTA', v)}
              hint="Max ₹10,000"
            />
            <NumberInput
              label="HRA Exemption"
              value={deductions.hraExemption}
              onChange={(v) => updateDeduction('hraExemption', v)}
            />
            <NumberInput
              label="LTA Exemption"
              value={deductions.ltaExemption}
              onChange={(v) => updateDeduction('ltaExemption', v)}
            />
            <NumberInput
              label="Professional Tax"
              value={deductions.professionalTax}
              onChange={(v) => updateDeduction('professionalTax', v)}
            />
            <NumberInput
              label="Home Loan Interest (Sec 24)"
              value={deductions.homeLoanInterest}
              onChange={(v) => updateDeduction('homeLoanInterest', v)}
              hint="Max ₹2 Lakh"
            />
          </div>

          <div className="bg-slate-50 rounded-lg p-4 mt-4">
            <p className="text-slate-600 text-sm mb-2">
              <strong>Standard Deduction:</strong> ₹{deductions.standardDeduction.toLocaleString('en-IN')}
            </p>
            <p className="text-slate-500 text-xs">Auto-applied for salaried individuals</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}