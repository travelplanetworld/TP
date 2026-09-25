'use client';

import React from 'react';
import { 
  Shield, Sparkles, TrendingUp, Users, Building, Tag, 
  UserPlus, Cable, CheckCircle2, ArrowRight, Activity, 
  DollarSign, Briefcase, FileText, AlertTriangle, Layers, ArrowLeftRight 
} from 'lucide-react';
import Link from 'next/link';

export default function AdminCommandCenterPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Bar */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center font-black text-white text-base shadow-md">
            TP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-white tracking-tight">Travel Planet Operating System</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-sky-500/20 text-sky-400 border border-sky-500/30">
                VOYAGE8 KERNEL
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Cross-System Command Center (CRM • ERP • Accounting) • Principal: Amal Babu</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition"
          >
            Marketplace
          </Link>
          <Link
            href="/admin/system-health"
            className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Cable className="w-3.5 h-3.5" />
            <span>System Health</span>
          </Link>
        </div>
      </header>

      {/* Main Command Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {/* Navigation Quick Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-bold uppercase text-[10px] mr-1">Workspaces:</span>
            <Link href="/crm/dashboard" className="px-3 py-1.5 rounded-lg bg-sky-950 text-sky-300 hover:bg-sky-900 border border-sky-800 font-bold transition">
              CRM Engine →
            </Link>
            <Link href="/erp/dashboard" className="px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 hover:bg-emerald-900 border border-emerald-800 font-bold transition">
              ERP Operations →
            </Link>
            <Link href="/finance/dashboard" className="px-3 py-1.5 rounded-lg bg-indigo-950 text-indigo-300 hover:bg-indigo-900 border border-indigo-800 font-bold transition">
              Finance & Tax →
            </Link>
            <Link href="/finance/general-ledger" className="px-3 py-1.5 rounded-lg bg-purple-950 text-purple-300 hover:bg-purple-900 border border-purple-800 font-bold transition">
              General Ledger →
            </Link>
            <Link href="/admin/approvals" className="px-3 py-1.5 rounded-lg bg-amber-950 text-amber-300 hover:bg-amber-900 border border-amber-800 font-bold transition">
              Approval Center (4) →
            </Link>
          </div>
          <Link href="/crm/customers/usr_cust_rahul" className="text-xs text-sky-400 hover:underline font-bold">
            Customer 360 Spotlight →
          </Link>
        </div>

        {/* 4 Primary System-Wide KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Bookings (MTD)</span>
            <div className="text-2xl font-black text-white">1,420</div>
            <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +18.4% vs last month
            </span>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Gross Revenue (GBV)</span>
            <div className="text-2xl font-black text-emerald-400">₹4,82,40,000</div>
            <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +24.2% growth
            </span>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Active Trips Abroad</span>
            <div className="text-2xl font-black text-sky-400">42 Groups</div>
            <span className="text-[11px] font-bold text-slate-400">
              Dubai • Bali • Maldives • Paris
            </span>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Customer Directory</span>
            <div className="text-2xl font-black text-white">12,850</div>
            <span className="text-[11px] font-bold text-purple-400">
              42% Repeat Travelers
            </span>
          </div>
        </div>

        {/* 4 Quadrants: Operations • Sales/CRM • Finance • Suppliers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quad 1: Operations */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" /> Operational Fulfilment (ERP)
              </h2>
              <Link href="/erp/dashboard" className="text-xs text-emerald-400 hover:underline font-bold">
                Open ERP Desk →
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Pending Bookings</div>
                <div className="text-lg font-black text-white mt-1">18 PNRs</div>
                <div className="text-[10px] text-emerald-400">All within SLA</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Supplier Issues</div>
                <div className="text-lg font-black text-amber-400 mt-1">1 Delay</div>
                <div className="text-[10px] text-slate-400">Weather delay MLE</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Trip Exceptions</div>
                <div className="text-lg font-black text-white mt-1">0 Critical</div>
                <div className="text-[10px] text-emerald-400">100% resolved</div>
              </div>
            </div>
          </div>

          {/* Quad 2: Sales / CRM */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-sky-400" /> Sales & Opportunities (CRM)
              </h2>
              <Link href="/crm/dashboard" className="text-xs text-sky-400 hover:underline font-bold">
                Open CRM Desk →
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                <div className="text-slate-400 text-[10px] uppercase font-bold">New Leads (Today)</div>
                <div className="text-lg font-black text-white mt-1">14 Leads</div>
                <div className="text-[10px] text-sky-400">4 Hot priority</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Open Opportunities</div>
                <div className="text-lg font-black text-purple-400 mt-1">29 Active</div>
                <div className="text-[10px] text-slate-400">₹1.48 Cr Pipeline</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Quotes Sent</div>
                <div className="text-lg font-black text-white mt-1">45 Quotes</div>
                <div className="text-[10px] text-emerald-400">62% Accept rate</div>
              </div>
            </div>
          </div>

          {/* Quad 3: Finance & Ledgers */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" /> Ledger & Bookkeeping (Accounting)
              </h2>
              <Link href="/finance/dashboard" className="text-xs text-emerald-400 hover:underline font-bold">
                Open Finance Desk →
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Receivables</div>
                <div className="text-lg font-black text-white mt-1">₹34.5L</div>
                <div className="text-[10px] text-slate-400">Current & Aging</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Supplier Payables</div>
                <div className="text-lg font-black text-amber-400 mt-1">₹41.2L</div>
                <div className="text-[10px] text-slate-400">Net-30 cycle</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                <div className="text-slate-400 text-[10px] uppercase font-bold">TCS 206C(1G) Pool</div>
                <div className="text-lg font-black text-sky-400 mt-1">₹8.12L</div>
                <div className="text-[10px] text-emerald-400">Quarterly Form 27EQ</div>
              </div>
            </div>
          </div>

          {/* Quad 4: Suppliers & Procurement */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Building className="w-4 h-4 text-purple-400" /> Suppliers & Procurement
              </h2>
              <Link href="/admin/approvals" className="text-xs text-purple-400 hover:underline font-bold">
                Approvals →
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Pending Confirmations</div>
                <div className="text-lg font-black text-white mt-1">7 Vouchers</div>
                <div className="text-[10px] text-slate-400">Direct DMC contracts</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Sync Health Score</div>
                <div className="text-lg font-black text-emerald-400 mt-1">99.8%</div>
                <div className="text-[10px] text-emerald-400">0 sync errors</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Settlement Batches</div>
                <div className="text-lg font-black text-purple-400 mt-1">2 Ready</div>
                <div className="text-[10px] text-slate-400">Awaiting payout click</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Executive Brief */}
        <div className="bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-800/60 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">AI Executive Brief</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700 space-y-1">
              <div className="font-bold text-amber-400 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Weather Alert: Malé Seaplane Operations
              </div>
              <p className="text-slate-300 text-[11px]">
                Heavy rainfall forecast for North Atoll. Ground ops re-routed 2 arrivals via speedboat with zero delay.
              </p>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700 space-y-1">
              <div className="font-bold text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> High-Margin Opportunity: Diwali Long Weekend
              </div>
              <p className="text-slate-300 text-[11px]">
                Dubai hotel demand up 44%. Recommended releasing 12 pre-held Atlantis suites at +14% dynamic markup.
              </p>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700 space-y-1">
              <div className="font-bold text-sky-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Statutory Compliance: Form 27EQ Draft Ready
              </div>
              <p className="text-slate-300 text-[11px]">
                Q2 Section 206C(1G) TCS reconciliations 100% complete. Form 27D certificates auto-dispatched to 114 PANs.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
