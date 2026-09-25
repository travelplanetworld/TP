'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/travel/Navbar';
import { 
  FileText, Plus, Trash2, ArrowRight, DollarSign, 
  Percent, ShieldCheck, CheckCircle2, RefreshCw 
} from 'lucide-react';
import Link from 'next/link';

interface QuoteItem {
  id: string;
  category: 'FLIGHT' | 'HOTEL' | 'EXPERIENCE' | 'TRANSFER' | 'VISA';
  description: string;
  cost: number;
  markupPercent: number;
}

export default function QuotesPage() {
  const [customerName, setCustomerName] = useState('Rahul Sharma');
  const [validDays, setValidDays] = useState(7);
  const [discount, setDiscount] = useState(10000);
  const [isConverted, setIsConverted] = useState(false);

  const [items, setItems] = useState<QuoteItem[]>([
    { id: '1', category: 'FLIGHT', description: 'Emirates BOM-DXB-BOM Return (3 Pax)', cost: 110000, markupPercent: 6 },
    { id: '2', category: 'HOTEL', description: 'Atlantis The Royal Palm View Room (4 Nights)', cost: 140000, markupPercent: 10 },
    { id: '3', category: 'EXPERIENCE', description: 'Private Yacht Charter & VIP Desert Safari', cost: 35000, markupPercent: 12 },
    { id: '4', category: 'TRANSFER', description: 'Private Airport Chauffeur Limousine', cost: 12000, markupPercent: 15 }
  ]);

  let totalCost = 0;
  let subtotalSelling = 0;
  let gstTax = 0;

  items.forEach(item => {
    const selling = Math.round(item.cost * (1 + item.markupPercent / 100));
    totalCost += item.cost;
    subtotalSelling += selling;
    gstTax += Math.round(selling * 0.05); // 5% GST
  });

  const netSelling = subtotalSelling - discount;
  const grossMargin = netSelling - totalCost;
  const marginPercent = netSelling > 0 ? ((grossMargin / netSelling) * 100).toFixed(2) : '0';
  const totalPayable = netSelling + gstTax;

  const handleConvert = () => {
    setIsConverted(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/crm/dashboard" className="text-xs text-sky-400 hover:underline">
            ← CRM Dashboard
          </Link>
          <span className="text-slate-600">/</span>
          <h1 className="text-base font-extrabold text-white">Quotation Engine & Margin Manager</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/crm/customers/usr_cust_rahul" className="text-xs text-slate-400 hover:text-white transition">
            Customer 360 →
          </Link>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {isConverted ? (
          <div className="bg-slate-800/90 border border-emerald-500/60 rounded-3xl p-10 text-center max-w-xl mx-auto space-y-4 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-white">Quote Converted to Booking!</h2>
            <p className="text-xs text-slate-300">
              Booking reference <strong className="text-white font-mono">TP-892401</strong> has been created. Operational tasks have been auto-dispatched to the Airline and Hotel fulfillment desks.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <Link
                href="/erp/trips/trip_tp892401"
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition"
              >
                Open Trip Command Center →
              </Link>
              <Link
                href="/finance/general-ledger"
                className="bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition"
              >
                Inspect Ledger Journal →
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Quote Items Editor */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-700/60 pb-4">
                  <div>
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-sky-400" /> Quotation Builder (Q-2026-9011)
                    </h2>
                    <p className="text-[11px] text-slate-400">Client: {customerName} • Validity: {validDays} Days</p>
                  </div>
                  <span className="text-xs font-bold text-sky-400 bg-sky-950/60 border border-sky-800 px-3 py-1 rounded-lg">
                    Dubai Luxury Family Itinerary
                  </span>
                </div>

                <div className="space-y-3">
                  {items.map((item, idx) => (
                    <div key={item.id} className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/70 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <span className="text-[10px] font-bold text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800 mr-2">
                          {item.category}
                        </span>
                        <span className="font-semibold text-slate-200">{item.description}</span>
                      </div>
                      <div className="flex items-center gap-4 text-right">
                        <div>
                          <div className="text-[10px] text-slate-400">Supplier Cost</div>
                          <div className="font-mono text-slate-300">₹{item.cost.toLocaleString('en-IN')}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-purple-400">Markup</div>
                          <div className="font-mono font-bold text-purple-300">{item.markupPercent}%</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-emerald-400">Client Price</div>
                          <div className="font-mono font-bold text-white">
                            ₹{Math.round(item.cost * (1 + item.markupPercent / 100)).toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Financial Summary & Conversion Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-5 sticky top-24">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Financial Breakdown</h3>

                <div className="space-y-3 text-xs border-t border-b border-slate-700/60 py-4">
                  <div className="flex justify-between text-slate-400">
                    <span>Total Supplier Cost</span>
                    <span className="font-mono font-bold text-slate-200">₹{totalCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal Client Price</span>
                    <span className="font-mono font-bold text-slate-200">₹{subtotalSelling.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Discount Applied</span>
                    <span className="font-mono text-rose-400">-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>GST (5% Outbound Tour)</span>
                    <span className="font-mono text-slate-200">₹{gstTax.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="pt-2 border-t border-dashed border-slate-700 flex justify-between items-baseline">
                    <div>
                      <div className="text-xs text-purple-400 font-bold">Gross Margin</div>
                      <div className="text-[10px] text-slate-400">{marginPercent}% Margin</div>
                    </div>
                    <span className="font-mono font-bold text-purple-400 text-sm">
                      ₹{grossMargin.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-700 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-white">Total Quote Amount</span>
                    <span className="text-xl font-black text-emerald-400">
                      ₹{totalPayable.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleConvert}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-lg"
                  >
                    <span>Convert to Booking</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => alert('Quotation PDF generated and sent via WhatsApp & Email.')}
                    className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold text-xs py-2.5 rounded-xl transition"
                  >
                    Send PDF to Customer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
