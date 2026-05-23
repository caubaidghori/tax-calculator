import type { IncomeDetails, DeductionsOldRegime, TaxResult, TaxComparison } from '../types/tax';

const OLD_REGIME_SLABS = [
  { limit: 250000, rate: 0 },
  { limit: 500000, rate: 5 },
  { limit: 1000000, rate: 20 },
  { limit: Infinity, rate: 30 },
];

const NEW_REGIME_SLABS_FY2026 = [
  { limit: 400000, rate: 0 },
  { limit: 800000, rate: 5 },
  { limit: 1200000, rate: 10 },
  { limit: 1600000, rate: 15 },
  { limit: 2000000, rate: 20 },
  { limit: 2400000, rate: 25 },
  { limit: Infinity, rate: 30 },
];

const REBATE_LIMIT_OLD = 500000;
const REBATE_LIMIT_NEW = 1200000;

export function calculateGrossIncome(income: IncomeDetails): number {
  return (
    income.basicSalary +
    income.hra +
    income.lta +
    income.specialAllowance +
    income.otherAllowances +
    income.bonus +
    income.rentIncome +
    income.otherIncome
  );
}

export function calculateTotalDeductionsOld(income: IncomeDetails, deductions: DeductionsOldRegime): number {
  const section80C = Math.min(deductions.section80C, 150000);
  const section80D = Math.min(deductions.section80D, 75000);
  const section80E = deductions.section80E;
  const section80G = deductions.section80G;
  const section80TTA = Math.min(deductions.section80TTA, 10000);
  const homeLoanInterest = Math.min(deductions.homeLoanInterest, 200000);
  const hraExemption = Math.min(deductions.hraExemption,income.hra);

  return (
    section80C +
    section80D +
    section80E +
    section80G +
    section80TTA +
    hraExemption +
    deductions.ltaExemption +
    deductions.professionalTax +
    homeLoanInterest +
    deductions.standardDeduction
  );
}

function calculateTaxFromSlabs(taxableIncome: number, slabs: typeof OLD_REGIME_SLABS): number {
  let tax = 0;
  let remainingIncome = taxableIncome;
  let prevLimit = 0;

  for (const slab of slabs) {
    if (remainingIncome <= 0) break;
    
    const taxableInSlab = Math.min(remainingIncome, slab.limit - prevLimit);
    tax += (taxableInSlab * slab.rate) / 100;
    remainingIncome -= taxableInSlab;
    prevLimit = slab.limit;
  }

  return tax;
}

function calculateSurcharge(
  taxableIncome: number,
  tax: number,
  regime: 'old' | 'new'
): number {

  // OLD REGIME
  if (regime === 'old') {
    if (taxableIncome <= 5000000) {
      return 0;
    } else if (taxableIncome <= 10000000) {
      return tax * 0.10;
    } else if (taxableIncome <= 20000000) {
      return tax * 0.15;
    } else if (taxableIncome <= 50000000) {
      return tax * 0.25;
    } else {
      return tax * 0.37;
    }
  }

  // NEW REGIME
  else {
    if (taxableIncome <= 5000000) {
      return 0;
    } else if (taxableIncome <= 10000000) {
      return tax * 0.10;
    } else if (taxableIncome <= 20000000) {
      return tax * 0.15;
    } else {
      return tax * 0.25;
    }
  }
}

function applyMarginalRelief(
  taxableIncome: number,
  taxBeforeSurcharge: number,
  surcharge: number,
  regime: 'old' | 'new'
): number {

  const thresholds =
    regime === 'old'
      ? [
          { limit: 5000000, rate: 0.10 },
          { limit: 10000000, rate: 0.15 },
          { limit: 20000000, rate: 0.25 },
          { limit: 50000000, rate: 0.37 },
        ]
      : [
          { limit: 5000000, rate: 0.10 },
          { limit: 10000000, rate: 0.15 },
          { limit: 20000000, rate: 0.25 },
        ];

  for (const threshold of thresholds) {

    if (taxableIncome > threshold.limit) {

      const excessIncome = taxableIncome - threshold.limit;

      // Tax exactly at threshold
      const thresholdTax =
        regime === 'old'
          ? calculateTaxFromSlabs(
              threshold.limit,
              OLD_REGIME_SLABS
            )
          : calculateTaxFromSlabs(
              threshold.limit,
              NEW_REGIME_SLABS_FY2026
            );

      // Maximum tax allowed after marginal relief
      const maxTaxAllowed =
        thresholdTax + excessIncome;

      const actualTax =
        taxBeforeSurcharge + surcharge;

      if (actualTax > maxTaxAllowed) {
        return maxTaxAllowed;
      }
    }
  }

  return taxBeforeSurcharge + surcharge;
}

export function calculateOldRegimeTax(
  income: IncomeDetails,
  deductions: DeductionsOldRegime
): TaxResult {
  const grossIncome = calculateGrossIncome(income);
  const totalDeductions = calculateTotalDeductionsOld(income, deductions);
  const taxableIncome = Math.max(0, grossIncome - totalDeductions);
  
  let taxBeforeCess = calculateTaxFromSlabs(taxableIncome, OLD_REGIME_SLABS);
  
  // Apply rebate under 87A
  if (taxableIncome <= REBATE_LIMIT_OLD) {
    taxBeforeCess = 0;
  }
  
  const surcharge = calculateSurcharge(
  taxableIncome,
  taxBeforeCess,
  'old'
);

let taxWithSurcharge = applyMarginalRelief(
  taxableIncome,
  taxBeforeCess,
  surcharge,
  'old'
);

  const cess =  taxWithSurcharge * 0.04;
  const totalTax = taxWithSurcharge + cess;
  const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;

  return {
    regime: 'old',
    grossIncome,
    totalDeductions,
    taxableIncome,
    taxBeforeCess,
    surcharge,
    cess,
    totalTax,
    effectiveRate,
  };
}

export function calculateNewRegimeTax(income: IncomeDetails): TaxResult {
  const grossIncome = calculateGrossIncome(income);
  const standardDeduction = 75000;
  const totalDeductions = standardDeduction;
  const taxableIncome = Math.max(0, grossIncome - totalDeductions);
  
  let taxBeforeCess = calculateTaxFromSlabs(taxableIncome, NEW_REGIME_SLABS_FY2026);
  
  // Apply rebate under 87A
  if (taxableIncome <= REBATE_LIMIT_NEW) {
    taxBeforeCess = 0;
  }
  
  const surcharge = calculateSurcharge(
  taxableIncome,
  taxBeforeCess,
  'new'
);

let taxWithSurcharge = applyMarginalRelief(
  taxableIncome,
  taxBeforeCess,
  surcharge,
  'new'
);

  const cess = taxWithSurcharge * 0.04;
  const totalTax = taxWithSurcharge + cess;
  const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;

  return {
    regime: 'new',
    grossIncome,
    totalDeductions,
    taxableIncome,
    taxBeforeCess,
    surcharge,
    cess,
    totalTax,
    effectiveRate,
  };
}

export function compareRegimes(
  income: IncomeDetails,
  deductions: DeductionsOldRegime
): TaxComparison {
  const oldRegime = calculateOldRegimeTax(income, deductions);
  const newRegime = calculateNewRegimeTax(income);
  
  const savings = Math.abs(oldRegime.totalTax - newRegime.totalTax);
  const betterRegime = oldRegime.totalTax <= newRegime.totalTax ? 'old' : 'new';

  return {
    oldRegime,
    newRegime,
    savings,
    betterRegime,
  };
}