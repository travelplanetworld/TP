'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/travel/Navbar';
import { 
  ArrowLeftRight, CheckCircle2, AlertTriangle, Clock, 
  Search, Filter, ShieldCheck, Download, RefreshCw 
} from 'lucide-react';
import Link from 'next/link';

interface BankRecord {
  id: string;
  bankTxnDate: string;
  bankRef: string;
  description: string;
  amount: number;
  matchedBookingId?: string;
  matchedCustomer?: string;
  status: 'RECONCILED' | 'SUGGESTED' | 'UNMATCHED' | 'EXCEPTION';
}

export default function BankReconciliationPage() {
  const [records, setRecords] = useState<BankRecord[]>([
    { id: 'REC-01', bankTxnDate: '2026-09-25', bankRef: 'RZP-PAY-881290', description: 'Razorpay Auto-Payout Booking TP-892401', amount: 341040, matchedBookingId: 'TP-892401', matchedCustomer: 'Rahul Sharma', status: 'RECONCILED' },
    { id: 'REC-02', bankTxnDate: '2026-09-25', bankRef: 'CMS-NEFT-99120', description: 'NEFT Corporate Retreat Payment', amount: 820000, matchedBookingId: 'TP-884120', matchedCustomer: 'Dr. Anand Verma', status: 'SUGGESTED' },
    { id: 'REC-03', bankTxnDate: '2026-09-24', bankRef: 'UPI-CR-441029', description: 'UPI Transfer Travel Planet Web', amount: 185000, matchedBookingId: 'TP-771920', matchedCustomer: 'Pooja Iyer', status: 'RECONCILED' },
    { id: 'REC-04', bankTxnDate: '2026-09-24', bankRef: 'SWIFT-INW-7712', description: 'Inward Wire Transfer (USD 2,400)', amount: 198000, status: 'UNMATCHED' },
    { id: 'REC-05', bankTxnDate: '2026-09-23', bankRef: 'CHQ-DEP-1102', description: 'Cheque Return / Fee Charge', amount: 250, status: 'EXCEPTION' }
  ]);

  const handleReconcile = (id: string) => {
    setRecords(prev => prev.map(r => r.id === id ? { ...r, status: 'RECONCILED' } : r));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Banner */}
      <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/finance/dashboard" className="text-xs text-sky-400 hover:underline">
            ← Finance Dashboard
          </Link>
          <span className="text-slate-600">/</span>
          <h1 className="text-base font-extrabold text-white">Bank Statement Reconciliation Workbench</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Bank statement CSV imported.')}
            className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition"
          >
            Import Bank Feed
          </button>
          <Link
            href="/finance/general-ledger"
            className="text-xs text-slate-400 hover:text-white transition"
          >
            General Ledger →
          </Link>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {/* KPI Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-800/80 border border-slate-700 rounded-2xl">
            <div className="text-xs text-slate-400 font-semibold uppercase">Reconciled MTD</div>
            <div className="text-xl font-black text-emerald-400 mt-1">₹4,28,40,000</div>
            <div className="text-[10px] text-slate-400 mt-0.5">97.2% Match Rate</div>
          </div>
          <div className="p-4 bg-slate-800/80 border border-slate-700 rounded-2xl">
            <div className="text-xs text-slate-400 font-semibold uppercase">Suggested Matches</div>
            <div className="text-xl font-black text-amber-400 mt-1">1 Entry</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Click to confirm</div>
          </div>
          <div className="p-4 bg-slate-800/80 border border-slate-700 rounded-2xl">
            <div className="text-xs text-slate-400 font-semibold uppercase">Unmatched Feed Items</div>
            <div className="text-xl font-black text-sky-400 mt-1">1 Wire</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Awaiting customer tag</div>
          </div>
          <div className="p-4 bg-slate-800/80 border border-slate-700 rounded-2xl">
            <div className="text-xs text-slate-400 font-semibold uppercase">Exceptions</div>
            <div className="text-xl font-black text-rose-400 mt-1">1 Item</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Bank fee charge</div>
          </div>
        </div>

        {/* Reconciliation Table */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold border-b border-slate-700">
              <tr>
                <th className="p-4">Bank Ref & Date</th>
                <th className="p-4">Bank Narration</th>
                <th className="p-4">Matched Booking / Client</th>
                <th className="p-4">Amount (INR)</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-slate-700/30 transition">
                  <td className="p-4">
                    <div className="font-mono font-bold text-white">{r.bankRef}</div>
                    <div className="text-[10px] text-slate-400">{r.bankTxnDate}</div>
                  </td>
                  <td className="p-4 text-slate-200">{r.description}</td>
                  <td className="p-4">
                    {r.matchedBookingId ? (
                      <div>
                        <span className="font-mono font-bold text-sky-400">{r.matchedBookingId}</span>
                        <div className="text-[11px] text-slate-400">{r.matchedCustomer}</div>
                      </div>
                    ) : (
                      <span className="text-slate-500 italic">No direct booking match</span>
                    )}
                  </td>
                  <td className="p-4 font-mono font-bold text-white text-sm">
                    ₹{r.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      r.status === 'RECONCILED' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                      r.status === 'SUGGESTED' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      r.status === 'EXCEPTION' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {r.status === 'SUGGESTED' ? (
                      <button
                        onClick={() => handleReconcile(r.id)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg transition"
                      >
                        Accept Match
                      </button>
                    ) : r.status === 'RECONCILED' ? (
                      <span className="text-emerald-400 font-bold text-[11px] flex items-center justify-end gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Settled
                      </span>
                    ) : (
                      <button
                        onClick={() => alert(`Manual match initiated for ${r.bankRef}`)}
                        className="text-sky-400 hover:underline font-bold text-[11px]"
                      >
                        Match Manually
                      </button>
                    )}
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
