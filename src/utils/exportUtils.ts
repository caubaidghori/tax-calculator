import type { TaxComparison } from '../types/tax';

export function exportToPDF(comparison: TaxComparison): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to export PDF');
    return;
  }

  const betterRegimeText = comparison.betterRegime === 'old' ? 'Old Regime' : 'New Regime';
  const savingsText = comparison.betterRegime === 'old' 
    ? `You save ₹${comparison.savings.toLocaleString('en-IN')} with Old Regime`
    : `You save ₹${comparison.savings.toLocaleString('en-IN')} with New Regime`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Income Tax Comparison Report</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
        h1 { color: #1e3a5f; border-bottom: 3px solid #f59e0b; padding-bottom: 10px; }
        h2 { color: #374151; margin-top: 30px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #1e3a5f; color: white; padding: 12px; text-align: left; }
        td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
        .highlight { background: #fef3c7; font-weight: bold; }
        .savings-box { background: #d1fae5; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .regime-header { display: flex; justify-content: space-between; align-items: center; }
        .better-badge { background: #10b981; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
        .amount { text-align: centre; font-family: monospace; }
        .page-break { page-break-before: always; }
      </style>
    </head>
    <body>
      <body>

  <div style="
    border-bottom: 3px solid #f59e0b;
    padding-bottom: 20px;
    margin-bottom: 30px;
  ">
  
    <h1 style="
      color: #1e3a5f;
      margin-bottom: 10px;
    ">
    Tax Calculator for Tax-year 2026-27
    </h1>

    <p style="
      font-size: 18px;
      font-weight: bold;
      color: #111827;
      margin: 5px 0;
    ">
      Prepared by CA Ubaid Ghori
    </p>

    <p style="
      color: #4b5563;
      margin: 5px 0;
    ">
      Tax & Financial Consultant
    </p>

    <p style="
      color: #2563eb;
      margin: 5px 0;
    "> Email: caubaidghori@gmail.com | Instagram: @ca_ubaid_ghorii </p>

  </div>
      <p style="color: #6b7280;">Generated on ${new Date().toLocaleDateString('en-IN', { 
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
      })}</p>
      
      <div class="savings-box">
        <h2 style="margin: 0; color: #065f46;">${savingsText}</h2>
        <p style="margin: 10px 0 0 0; color: #047857;">Recommended: ${betterRegimeText}</p>
      </div>

      <h2>Old Tax Regime (Tax year 2026-27)</h2>
      <table>
        <tr><td>Gross Income</td><td class="amount">₹${comparison.oldRegime.grossIncome.toLocaleString('en-IN')}</td></tr>
        <tr><td>Total Deductions</td><td class="amount">₹${comparison.oldRegime.totalDeductions.toLocaleString('en-IN')}</td></tr>
        <tr><td>Taxable Income</td><td class="amount">₹${comparison.oldRegime.taxableIncome.toLocaleString('en-IN')}</td></tr>
        <tr><td>Tax Before Cess</td><td class="amount">₹${comparison.oldRegime.taxBeforeCess.toLocaleString('en-IN')}</td></tr>
        <tr><td>Surcharge><td class="amount">₹${comparison.oldRegime.surcharge.toLocaleString('en-IN')}</td></tr>
        <tr><td>Health & Education Cess (4%)</td><td class="amount">₹${comparison.oldRegime.cess.toLocaleString('en-IN')}</td></tr>
        <tr class="highlight"><td><strong>Total Tax Payable</strong></td><td class="amount"><strong>₹${comparison.oldRegime.totalTax.toLocaleString('en-IN')}</strong></td></tr>
      </table>
      <p> Effective Tax Rate: ${comparison.oldRegime.effectiveRate.toFixed(2)}%</p> 

      <div class="page-break"></div>
      <h2>New Tax Regime (Tax year 2026-27)</h2>
      <table>
        <tr><td>Gross Income</td><td class="amount">₹${comparison.newRegime.grossIncome.toLocaleString('en-IN')}</td></tr>
        <tr><td>Standard Deduction</td><td class="amount">₹${comparison.newRegime.totalDeductions.toLocaleString('en-IN')}</td></tr>
        <tr><td>Taxable Income</td><td class="amount">₹${comparison.newRegime.taxableIncome.toLocaleString('en-IN')}</td></tr>
        <tr><td>Tax Before Cess</td><td class="amount">₹${comparison.newRegime.taxBeforeCess.toLocaleString('en-IN')}</td></tr>
        <tr><td>Surcharge><td class="amount">₹${comparison.newRegime.surcharge.toLocaleString('en-IN')}</td></tr>
        <tr><td>Health & Education Cess (4%)</td><td class="amount">₹${comparison.newRegime.cess.toLocaleString('en-IN')}</td></tr>
        <tr class="highlight"><td><strong>Total Tax Payable</strong></td><td class="amount"><strong>₹${comparison.newRegime.totalTax.toLocaleString('en-IN')}</strong></td></tr>
      </table>
      <p>Effective Tax Rate: ${comparison.newRegime.effectiveRate.toFixed(2)}%</p>
      <div class="footer">
        <p>This is an estimated tax calculation based on information provided by the user.
        Please consult a qualified tax professional before making financial decisions.</p>
        <p>Prepared by <strong>CA Ubaid Ghori<strong> | Email: caubaidghori@gmail.com | Instagram: @ca_ubaid_ghorii</p>

    </div>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.print();
}

export function exportToExcel(comparison: TaxComparison): void {
  const rows = [
    ['Income Tax Calculator Tax Year 2026-27', '', ''],
    ['Prepared by CA Ubaid Ghori', '', ''],
    ['Tax & Financial Consultant', '', ''],
    ['Email', 'caubaidghori@gmail.com', ''],
    ['Instagram', '@ca_ubaid_ghorii', ''],
    ['Generated on', new Date().toLocaleDateString('en-IN'), ''],
    ['', '', ''],
    ['Summary', '', ''],
    ['Better Regime', comparison.betterRegime === 'old' ? 'Old Regime' : 'New Regime', ''],
    ['Potential Savings', `₹${comparison.savings.toLocaleString('en-IN')}`, ''],
    ['', '', ''],
    ['Old Tax Regime', '', ''],
    ['Particulars', 'Amount (₹)', ''],
    ['Gross Income', comparison.oldRegime.grossIncome, ''],
    ['Total Deductions', comparison.oldRegime.totalDeductions, ''],
    ['Taxable Income', comparison.oldRegime.taxableIncome, ''],
    ['Tax Before Cess', comparison.oldRegime.taxBeforeCess, ''],
    ['Surcharge', comparison.oldRegime.surcharge, ''],
    ['Health & Education Cess (4%)', comparison.oldRegime.cess, ''],
    ['Total Tax Payable', comparison.oldRegime.totalTax, ''],
    ['Effective Tax Rate', `${comparison.oldRegime.effectiveRate.toFixed(2)}%`, ''],
    ['', '', ''],
    ['New Tax Regime', '', ''],
    ['Particulars', 'Amount (₹)', ''],
    ['Gross Income', comparison.newRegime.grossIncome, ''],
    ['Standard Deduction', comparison.newRegime.totalDeductions, ''],
    ['Taxable Income', comparison.newRegime.taxableIncome, ''],
    ['Tax Before Cess', comparison.newRegime.taxBeforeCess, ''],
    ['Surcharge', comparison.newRegime.surcharge, ''],
    ['Health & Education Cess (4%)', comparison.newRegime.cess, ''],
    ['Total Tax Payable', comparison.newRegime.totalTax, ''],
    ['Effective Tax Rate', `${comparison.newRegime.effectiveRate.toFixed(2)}%`, ''],
  ];

  const csvContent = rows.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `tax_comparison_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}