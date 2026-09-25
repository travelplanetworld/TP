'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/travel/Navbar';
import { 
  Layers, Plus, Filter, Search, ShieldCheck, 
  ArrowRight, DollarSign, CheckCircle2 
} from 'lucide-react';
import Link from 'next/link';

interface Account {
  code: string;
  name: string;
  category: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'COST_OF_SALES' | 'EXPENSE';
  balance: number;
  normal: 'DEBIT' | 'CREDIT';
  desc: string;
}

export default function ChartOfAccountsPage() {
  const [selectedCat, setSelectedCat] = useState('ALL');

  const accounts: Account[] = [
    // Assets
    { code: '1100', name: 'Cash on Hand', category: 'ASSET', balance: 250000, normal: 'DEBIT', desc: 'Petty cash and branch till balances' },
    { code: '1200', name: 'Operating Bank Account (HDFC/ICICI)', category: 'ASSET', balance: 8420000, normal: 'DEBIT', desc: 'Primary INR operational bank account' },
    { code: '1210', name: 'Gateway Settlement Clearing (Razorpay)', category: 'ASSET', balance: 1250000, normal: 'DEBIT', desc: 'Authorized & captured gateway payouts' },
    { code: '1300', name: 'Accounts Receivable (Customers/Agencies)', category: 'ASSET', balance: 3450000, normal: 'DEBIT', desc: 'Customer & B2B agency receivables' },
    { code: '1400', name: 'Supplier Advances & Prepaid Deposits', category: 'ASSET', balance: 980000, normal: 'DEBIT', desc: 'Prepayments to airlines and DMCs' },

    // Liabilities
    { code: '2100', name: 'Accounts Payable (Suppliers/DMCs)', category: 'LIABILITY', balance: 4120000, normal: 'CREDIT', desc: 'Due to airlines, hotels, and ground operators' },
    { code: '2200', name: 'Customer Advance Bookings', category: 'LIABILITY', balance: 5890000, normal: 'CREDIT', desc: 'Unearned customer revenue for future trips' },
    { code: '2300', name: 'GST Output Tax Payable (5% SAC 99855)', category: 'LIABILITY', balance: 420000, normal: 'CREDIT', desc: 'GST collected on outbound tour packages' },
    { code: '2310', name: 'TCS Collected Payable (Sec 206C(1G))', category: 'LIABILITY', balance: 812000, normal: 'CREDIT', desc: 'TCS collected for Form 27EQ filing' },
    { code: '2400', name: 'Accrued Commission Payable', category: 'LIABILITY', balance: 340000, normal: 'CREDIT', desc: 'Commissions owed to travel agents and partners' },

    // Equity
    { code: '3100', name: 'Paid-in Capital', category: 'EQUITY', balance: 5000000, normal: 'CREDIT', desc: 'Founding equity capital' },
    { code: '3200', name: 'Retained Earnings', category: 'EQUITY', balance: 1420000, normal: 'CREDIT', desc: 'Accumulated operational surplus' },

    // Revenue
    { code: '4100', name: 'Flight Ticketing Revenue', category: 'REVENUE', balance: 12400000, normal: 'CREDIT', desc: 'Direct NDC airfares' },
    { code: '4200', name: 'Hotel & Villa Revenue', category: 'REVENUE', balance: 18200000, normal: 'CREDIT', desc: 'Hospitality accommodation revenue' },
    { code: '4300', name: 'Holiday Packages Revenue', category: 'REVENUE', balance: 24800000, normal: 'CREDIT', desc: 'Paced multi-day packaged itineraries' },
    { code: '4400', name: 'Experience & Excursion Revenue', category: 'REVENUE', balance: 6100000, normal: 'CREDIT', desc: 'Activities, charters, safaris, transfers' },
    { code: '4500', name: 'Visa & Concierge Service Fees', category: 'REVENUE', balance: 1450000, normal: 'CREDIT', desc: 'Service fees for visa processing' },

    // Cost of Sales
    { code: '5100', name: 'Airline Supplier Cost', category: 'COST_OF_SALES', balance: 11400000, normal: 'DEBIT', desc: 'Direct carrier costs' },
    { code: '5200', name: 'Hotel & DMC Supplier Cost', category: 'COST_OF_SALES', balance: 15600000, normal: 'DEBIT', desc: 'Contracted wholesale accommodation' },
    { code: '5300', name: 'Excursion & Transfer Supplier Cost', category: 'COST_OF_SALES', balance: 4800000, normal: 'DEBIT', desc: 'Local ground operator costs' },

    // Expenses
    { code: '6100', name: 'Staff Salaries & Benefits', category: 'EXPENSE', balance: 3200000, normal: 'DEBIT', desc: 'Operational payroll' },
    { code: '6200', name: 'Marketing & Digital Acquisition', category: 'EXPENSE', balance: 1850000, normal: 'DEBIT', desc: 'Search and social campaigns' },
    { code: '6300', name: 'Technology & Cloud Infrastructure', category: 'EXPENSE', balance: 420000, normal: 'DEBIT', desc: 'Servers, AI APIs, database, and NDC' },
    { code: '6500', name: 'Payment Gateway Processing Charges', category: 'EXPENSE', balance: 280000, normal: 'DEBIT', desc: 'Card processing and merchant fees' }
  ];

  const filtered = accounts.filter(a => selectedCat === 'ALL' || a.category === selectedCat);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Banner */}
      <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/finance/dashboard" className="text-xs text-sky-400 hover:underline">
            ← Finance Dashboard
          </Link>
          <span className="text-slate-600">/</span>
          <h1 className="text-base font-extrabold text-white">Chart of Accounts (COA) Architecture</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/finance/general-ledger"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition"
          >
            General Ledger →
          </Link>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {['ALL', 'ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'COST_OF_SALES', 'EXPENSE'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedCat === cat
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {cat === 'ALL' ? 'All Accounts' : cat.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        {/* COA Table */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold border-b border-slate-700">
              <tr>
                <th className="p-4">Account Code</th>
                <th className="p-4">Account Title & Description</th>
                <th className="p-4">Category</th>
                <th className="p-4">Normal Balance</th>
                <th className="p-4 text-right">Current Balance (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filtered.map((acc) => (
                <tr key={acc.code} className="hover:bg-slate-700/30 transition">
                  <td className="p-4 font-mono font-bold text-sky-400 text-sm">{acc.code}</td>
                  <td className="p-4">
                    <div className="font-bold text-white text-sm">{acc.name}</div>
                    <div className="text-[11px] text-slate-400">{acc.desc}</div>
                  </td>
                  <td className="p-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                      {acc.category}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-[11px] text-slate-400">{acc.normal}</td>
                  <td className="p-4 text-right font-mono font-bold text-sm text-emerald-400">
                    ₹{acc.balance.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
