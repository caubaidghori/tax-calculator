import type { TaxComparison } from '../types/tax';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Download, FileText, TrendingDown, TrendingUp, Check } from 'lucide-react';
import { exportToPDF, exportToExcel } from '../utils/exportUtils';

interface TaxResultsProps {
  comparison: TaxComparison;
}

export function TaxResults({ comparison }: TaxResultsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const isOldBetter = comparison.betterRegime === 'old';

  return (
    <div className="space-y-6">
      <Card className={`border-0 shadow-xl overflow-hidden ${isOldBetter ? 'bg-gradient-to-br from-emerald-50 to-teal-50' : 'bg-gradient-to-br from-amber-50 to-orange-50'}`}>
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md mb-4">
              {isOldBetter ? (
                <>
                  <TrendingDown className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-emerald-700">Old Regime Wins!</span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                  <span className="font-semibold text-amber-700">New Regime Wins!</span>
                </>
              )}
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              You Save {formatCurrency(comparison.savings)}
            </h2>
            <p className="text-slate-600">
              by choosing the <strong>{isOldBetter ? 'Old' : 'New'} Tax Regime</strong>
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button
              onClick={() => exportToPDF(comparison)}
              className="bg-slate-800 hover:bg-slate-700 text-white gap-2"
            >
              <FileText className="w-4 h-4" />
              Export PDF
            </Button>
            <Button
              onClick={() => exportToExcel(comparison)}
              variant="outline"
              className="border-slate-300 hover:bg-slate-100 gap-2"
            >
              <Download className="w-4 h-4" />
              Export Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={`border-2 overflow-hidden ${isOldBetter ? 'border-emerald-400 shadow-emerald-100' : 'border-slate-200'}`}>
          <CardHeader className={`${isOldBetter ? 'bg-emerald-600' : 'bg-slate-600'} text-white`}>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                Old Tax Regime
                {isOldBetter && (
                  <span className="bg-white text-emerald-600 text-xs px-2 py-1 rounded-full font-bold">
                    RECOMMENDED
                  </span>
                )}
              </CardTitle>
              {isOldBetter && <Check className="w-6 h-6" />}
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Gross Income</span>
                <span className="font-medium text-slate-800">{formatCurrency(comparison.oldRegime.grossIncome)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Total Deductions</span>
                <span className="font-medium text-emerald-600">- {formatCurrency(comparison.oldRegime.totalDeductions)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Taxable Income</span>
                <span className="font-medium text-slate-800">{formatCurrency(comparison.oldRegime.taxableIncome)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Tax Before Cess</span>
                <span className="font-medium text-slate-800">{formatCurrency(comparison.oldRegime.taxBeforeCess)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Surcharge</span>
                <span className="font-medium text-slate-800">
                  {formatCurrency(comparison.oldRegime.surcharge)}
              </span>
            </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Cess (4%)</span>
                <span className="font-medium text-slate-800">{formatCurrency(comparison.oldRegime.cess)}</span>
              </div>
              <div className="flex justify-between py-3 bg-slate-50 rounded-lg px-3 mt-4">
                <span className="font-bold text-slate-800">Total Tax</span>
                <span className="font-bold text-xl text-slate-800">{formatCurrency(comparison.oldRegime.totalTax)}</span>
              </div>
              <div className="text-center pt-2">
                <span className="text-sm text-slate-500">
                  Effective Rate: <strong>{comparison.oldRegime.effectiveRate.toFixed(2)}%</strong>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`border-2 overflow-hidden ${!isOldBetter ? 'border-amber-400 shadow-amber-100' : 'border-slate-200'}`}>
          <CardHeader className={`${!isOldBetter ? 'bg-amber-500' : 'bg-slate-600'} text-white`}>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                New Tax Regime
                {!isOldBetter && (
                  <span className="bg-white text-amber-600 text-xs px-2 py-1 rounded-full font-bold">
                    RECOMMENDED
                  </span>
                )}
              </CardTitle>
              {!isOldBetter && <Check className="w-6 h-6" />}
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Gross Income</span>
                <span className="font-medium text-slate-800">{formatCurrency(comparison.newRegime.grossIncome)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Standard Deduction</span>
                <span className="font-medium text-amber-600">- {formatCurrency(comparison.newRegime.totalDeductions)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Taxable Income</span>
                <span className="font-medium text-slate-800">{formatCurrency(comparison.newRegime.taxableIncome)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Tax Before Cess</span>
                <span className="font-medium text-slate-800">{formatCurrency(comparison.newRegime.taxBeforeCess)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Surcharge</span>
                <span className="font-medium text-slate-800">
                  {formatCurrency(comparison.newRegime.surcharge)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Cess (4%)</span>
                <span className="font-medium text-slate-800">{formatCurrency(comparison.newRegime.cess)}</span>
              </div>
              <div className="flex justify-between py-3 bg-slate-50 rounded-lg px-3 mt-4">
                <span className="font-bold text-slate-800">Total Tax</span>
                <span className="font-bold text-xl text-slate-800">{formatCurrency(comparison.newRegime.totalTax)}</span>
              </div>
              <div className="text-center pt-2">
                <span className="text-sm text-slate-500">
                  Effective Rate: <strong>{comparison.newRegime.effectiveRate.toFixed(2)}%</strong>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg bg-white">
        <CardHeader className="bg-slate-800 rounded-t-lg">
          <CardTitle className="text-white">Tax Slabs Comparison</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-slate-800 mb-4">Old Regime Slabs</h4>
              <div className="space-y-2">
                {[
                  { range: 'Up to ₹2,50,000', rate: '0%' },
                  { range: '₹2,50,001 - ₹5,00,000', rate: '5%' },
                  { range: '₹5,00,001 - ₹10,00,000', rate: '20%' },
                  { range: 'Above ₹10,00,000', rate: '30%' },
                ].map((slab, i) => (
                  <div key={i} className="flex justify-between items-center py-2 px-3 bg-slate-50 rounded">
                    <span className="text-slate-600">{slab.range}</span>
                    <span className="font-semibold text-slate-800">{slab.rate}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-3">
                Rebate u/s 87A: No tax if taxable income ≤ ₹5L
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-4">New Regime Slabs (FY 2026-27)</h4>
              <div className="space-y-2">
                {[
                  { range: 'Up to ₹4,00,000', rate: '0%' },
                  { range: '₹4,00,001 - ₹8,00,000', rate: '5%' },
                  { range: '₹8,00,001 - ₹12,00,000', rate: '10%' },
                  { range: '₹12,00,001 - ₹16,00,000', rate: '15%' },
                  { range: '₹16,00,001 - ₹20,00,000', rate: '20%' },
                  { range: '₹20,00,001 - ₹24,00,000', rate: '25%' },
                  { range: 'Above ₹24,00,000', rate: '30%' },
                ].map((slab, i) => (
                  <div key={i} className="flex justify-between items-center py-2 px-3 bg-amber-50 rounded">
                    <span className="text-slate-600">{slab.range}</span>
                    <span className="font-semibold text-amber-700">{slab.rate}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-3">
                Rebate u/s 87A: No tax if taxable income ≤ ₹12sL
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}