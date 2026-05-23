export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* HERO SECTION */}
      <section className="bg-slate-900 text-white py-20 px-6 text-center">

        <h1 className="text-5xl font-bold mb-4">
          Ghori & Associates
        </h1>

        <p className="text-xl mb-8">
          Chartered Accountants & Tax Consultants
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <a
            href="/tax-calculator"
            className="bg-amber-500 hover:bg-amber-600 px-6 py-3 rounded-lg font-semibold transition"
          >
            Open Tax Calculator
          </a>

          <a
            href="#contact"
            className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-slate-900 transition"
          >
            Contact Us
          </a>

        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-16 px-6 max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold mb-6">
          About Us
        </h2>

        <p className="text-lg text-gray-600 leading-8">
          Ghori & Associates provides expert professional services in
          Taxation, GST, accounting, audit, compliance, financial
          planning, and business advisory services to individuals,
          startups, companies and other businesses.
        </p>

      </section>

      {/* SERVICES */}
      <section className="bg-gray-100 py-16 px-6">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold mb-10 text-center">
            Our Services
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              "Income Tax Return Filing",
              "GST Registration & Return Filing",
              "Tax Planning & Advisory",
              "Company / LLP Registration",
              "Accounting & Bookkeeping",
              "Audit & Compliance Services",
            ].map((service) => (

              <div
                key={service}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg">
                  {service}
                </h3>
              </div>

            ))}

          </div>

        </div>

      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 px-6 max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold mb-10 text-center">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-4 gap-6 text-center">

          {[
            "Professional Expertise",
            "Timely Compliance",
            "Personalized Support",
            "Transparent Guidance",
          ].map((item) => (

            <div
              key={item}
              className="border rounded-xl p-6"
            >
              <p className="font-semibold">
                {item}
              </p>
            </div>

          ))}

        </div>

      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="bg-slate-900 text-white py-16 px-6 text-center"
      >

        <h2 className="text-3xl font-bold mb-8">
          Contact Us
        </h2>

        <div className="space-y-4 text-lg">

          <p>
            <strong>CA Ubaid Ghori</strong>
          </p>

          <p>
            Email: caubaidghori@gmail.com
          </p>

          <p>
            Instagram: @ca_ubaid_ghori
          </p>

          <p>
            Surat, Gujarat
          </p>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-5 text-center text-sm">
        © 2026 Ghori & Associates. All Rights Reserved.
      </footer>

    </div>
  );
}