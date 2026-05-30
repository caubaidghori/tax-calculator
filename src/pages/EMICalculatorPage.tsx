import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function EMICalculatorPage() {

    const [loanAmount, setLoanAmount] = useState(5000000);
    const [interestRate, setInterestRate] = useState(8);
    const [tenure, setTenure] = useState(10);

    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;

    const emi =
        (loanAmount *
            monthlyRate *
            Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = emi * months;
    const totalInterest = totalPayment - loanAmount;

    const amortization = [];

    let balance = loanAmount;

    for (let month = 1; month <= months; month++) {

        const interest = balance * monthlyRate;

        const principal = emi - interest;

        balance -= principal;

        amortization.push({
            month,
            emi,
            principal,
            interest,
            balance: balance > 0 ? balance : 0,
        });
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };
    const downloadPDF = async () => {

    const input = document.getElementById("emi-report");

    if (!input) return;

    const canvas = await html2canvas(input, {
    scale: 3,
    useCORS: true,
    scrollY: -window.scrollY,
  });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210;
    const pageHeight = 297;

    const imgWidth = pdfWidth;

    const imgHeight =
    (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;

    let position = 0;

  pdf.addImage(
    imgData,
    "PNG",
    0,
    position,
    imgWidth,
    imgHeight
  );

  heightLeft -= pageHeight;

  while (heightLeft > 0) {

    position = heightLeft - imgHeight;

    pdf.addPage();

    pdf.addImage(
      imgData,
      "PNG",
      0,
      position,
      imgWidth,
      imgHeight
    );

    heightLeft -= pageHeight;
     }

  pdf.save("EMI-Report.pdf");
    };
    const pieData = [
        {
            name: 'Principal',
            value: Math.round(loanAmount),
        },
        {
            name: 'Interest',
            value: Math.round(totalInterest),
        },
    ];
    const yearlySummary = [];

for (let year = 1; year <= tenure; year++) {

    const yearlyRows = amortization.slice(
        (year - 1) * 12,
        year * 12
    );

    const principalPaid = yearlyRows.reduce(
        (sum, row) => sum + row.principal,
        0
    );

    const interestPaid = yearlyRows.reduce(
        (sum, row) => sum + row.interest,
        0
    );

    const closingBalance =
        yearlyRows[yearlyRows.length - 1]?.balance || 0;

    yearlySummary.push({
        year,
        principalPaid,
        interestPaid,
        closingBalance,
    });
}
    return (
        <div id="emi-report">
            <div className="min-h-screen bg-slate-100 py-10 px-4">

                <div className="max-w-7xl mx-auto">

                    {/* HEADER */}
                    <div className="text-center mb-10">

                        <h1 className="text-4xl font-bold text-slate-800 mb-3">
                            EMI Calculator
                        </h1>
                        <div className="mb-6">

                            <button
                                onClick={downloadPDF}
                                className="bg-slate-800 text-white px-5 py-2 rounded-lg hover:bg-slate-900"
                            >
                                Download PDF
                            </button>

                        </div>

                        <p className="text-slate-600 text-lg">
                            Loan EMI & Amortization Schedule
                        </p>

                        <p className="text-sm text-slate-500 mt-2">
                            Prepared by CA Ubaid Ghori
                        </p>

                        <p className="text-sm text-slate-500">
                            caubaidghori@gmail.com | @ca_ubaid_ghori
                        </p>

                    </div>

                    {/* INPUTS */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

                        <div className="grid md:grid-cols-3 gap-6">

                            <div>
                                <label className="block mb-2 font-semibold">
                                    Loan Amount
                                </label>

                                <input
                                    type="number"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                                    className="w-full border rounded-lg p-3"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold">
                                    Interest Rate (%)
                                </label>

                                <input
                                    type="number"
                                    step="0.1"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                    className="w-full border rounded-lg p-3"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold">
                                    Loan Tenure (Years)
                                </label>

                                <input
                                    type="number"
                                    value={tenure}
                                    onChange={(e) => setTenure(Number(e.target.value))}
                                    className="w-full border rounded-lg p-3"
                                />
                            </div>

                        </div>

                    </div>

                    {/* RESULTS */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">

                        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">

                            <h3 className="text-slate-500 mb-2">
                                Monthly EMI
                            </h3>

                            <p className="text-3xl font-bold text-slate-800">
                                {formatCurrency(emi)}
                            </p>

                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">

                            <h3 className="text-slate-500 mb-2">
                                Total Interest
                            </h3>

                            <p className="text-3xl font-bold text-red-600">
                                {formatCurrency(totalInterest)}
                            </p>

                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">

                            <h3 className="text-slate-500 mb-2">
                                Total Payment
                            </h3>

                            <p className="text-3xl font-bold text-emerald-600">
                                {formatCurrency(totalPayment)}
                            </p>

                        </div>

                    </div>

                    {/* PIE CHART */}

<div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

    <h2 className="text-2xl font-bold mb-6 text-center">
        Loan Breakdown
    </h2>

    <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

            <PieChart>

                <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={140}
                label={({ name, percent }) =>
                `${name} (${((percent ?? 0) * 100).toFixed(1)}%)`
                }
                >

                    <Cell fill="#0f172a" />
                    <Cell fill="#ef4444" />

                </Pie>

                <Tooltip
                formatter={(value) =>
                    formatCurrency(Number(value ?? 0))
                }
                />

            </PieChart>

        </ResponsiveContainer>

    </div>

</div>

                    {/* TABLE */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 overflow-auto">
                        <h2 className="text-2xl font-bold mb-6">
                            Year-wise Amortization Summary
                        </h2>

                        <table className="w-full border-collapse">

                            <thead>

                                <tr className="bg-slate-100">

                                    <th className="p-3 text-left">
                                        Year
                                    </th>

                                    <th className="p-3 text-right">
                                        Principal Paid
                                    </th>

                                    <th className="p-3 text-right">
                                        Interest Paid
                                    </th>

                                    <th className="p-3 text-right">
                                        Closing Balance
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {yearlySummary.map((year) => (

                                    <tr
                                        key={year.year}
                                        className="border-b"
                                    >

                                        <td className="p-3">
                                            {year.year}
                                        </td>

                                        <td className="p-3 text-right">
                                            {formatCurrency(year.principalPaid)}
                                        </td>

                                        <td className="p-3 text-right">
                                            {formatCurrency(year.interestPaid)}
                                        </td>

                                        <td className="p-3 text-right">
                                            {formatCurrency(year.closingBalance)}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>
                    <h2 className="text-2xl font-bold mb-6">
                        Amortization Schedule
                    </h2>

                    <table className="w-full border-collapse">

                        <thead>

                            <tr className="bg-slate-800 text-white">

                                <th className="p-3 text-left">Month</th>
                                <th className="p-3 text-left">EMI</th>
                                <th className="p-3 text-left">Principal</th>
                                <th className="p-3 text-left">Interest</th>
                                <th className="p-3 text-left">Outstanding</th>

                            </tr>

                        </thead>

                        <tbody>

                            {amortization.map((row) => (

                                <tr
                                    key={row.month}
                                    className="border-b"
                                >

                                    <td className="p-3">{row.month}</td>

                                    <td className="p-3">
                                        {formatCurrency(row.emi)}
                                    </td>

                                    <td className="p-3">
                                        {formatCurrency(row.principal)}
                                    </td>

                                    <td className="p-3">
                                        {formatCurrency(row.interest)}
                                    </td>

                                    <td className="p-3">
                                        {formatCurrency(row.balance)}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                {/* Amortization Schedule */}

            </div>

        </div>
  );
}

export default EMICalculatorPage;