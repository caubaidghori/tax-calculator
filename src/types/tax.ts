export interface IncomeDetails {
  basicSalary: number;
  hra: number;
  lta: number;
  specialAllowance: number;
  otherAllowances: number;
  bonus: number;
  rentIncome: number;
  otherIncome: number;
}

export interface DeductionsOldRegime {
  section80C: number;
  section80D: number;
  section80E: number;
  section80G: number;
  section80TTA: number;
  hraExemption: number;
  ltaExemption: number;
  professionalTax: number;
  homeLoanInterest: number;
  standardDeduction: number;
}

export interface TaxResult {
  regime: 'old' | 'new';
  grossIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  taxBeforeCess: number;
  cess: number;
  totalTax: number;
  effectiveRate: number;
}

export interface TaxComparison {
  oldRegime: TaxResult;
  newRegime: TaxResult;
  savings: number;
  betterRegime: 'old' | 'new';
}