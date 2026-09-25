'use client';

import React from 'react';
import { WORKSPACE_REGISTRY } from '@/lib/workspaces/workspace-registry';
import { Shield, Sparkles, TrendingUp, Users, Building, Tag, UserPlus, Cable, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SuperAdminDashboardPage() {
  const ws = WORKSPACE_REGISTRY['SUPER_ADMIN'];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center font-black text-white">
            TP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-extrabold tracking-tight">Travel Planet Operating System</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-sky-500/20 text-sky-400 border border-sky-500/30">
                VOYAGE8 KERNEL
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Global Command Center · Super Administrator Principal: Amal Babu</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-bold transition"
          >
            Exit to Marketplace
          </Link>
          <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
            <div className="w-7 h-7 rounded-full bg-brand-500 flex items-center justify-center text-xs font-bold text-white">
              AB
            </div>
            <span className="text-xs font-bold text-slate-200">Amal Babu</span>
          </div>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {/* Workspace Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{ws.name}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{ws.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button onClick={() => alert('Quick Action: Add Supplier')} className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-bold transition shadow-2xs flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-slate-500" /> Add Supplier
            </button>
            <button onClick={() => alert('Quick Action: Create Offer')} className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-bold transition shadow-2xs flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-slate-500" /> Create Offer
            </button>
            <button onClick={() => alert('Quick Action: Provision User')} className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-bold transition shadow-2xs flex items-center gap-1.5">
              <UserPlus className="w-3.5 h-3.5 text-slate-500" /> Provision User
            </button>
            <Link href="/admin/system-health" className="px-3.5 py-1.5 bg-slate-900 hover:bg-sky-600 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5">
              <Cable className="w-3.5 h-3.5 text-emerald-400" /> System Health
            </Link>
          </div>
        </div>

        {/* 4 Primary KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ws.kpis.map((k) => (
            <div key={k.label} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">{k.label}</span>
              <div className="text-2xl font-black text-slate-900">{k.value}</div>
              <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {k.trend}
              </span>
            </div>
          ))}
        </div>

        {/* Operational Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-slate-900">Live Platform Bookings Queue</h3>
              <span className="text-xs font-bold text-sky-600">Auto-refresh (15s)</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr class="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="pb-2">Booking ID</th>
                    <th className="pb-2">Passenger</th>
                    <th className="pb-2">Destination / Route</th>
                    <th className="pb-2">Gross Fare</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  <tr>
                    <td className="py-2.5 font-bold text-slate-900">TP-9082</td>
                    <td>Amal Babu</td>
                    <td>Dubai Highlights (4D/3N)</td>
                    <td className="font-bold">₹49,999</td>
                    <td><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">CONFIRMED</span></td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-900">TP-9081</td>
                    <td>Pooja Menon</td>
                    <td>Bali Escape (5D/4N)</td>
                    <td className="font-bold">₹74,900</td>
                    <td><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">CONFIRMED</span></td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-900">TP-9080</td>
                    <td>Aditya Varma</td>
                    <td>Kashmir Paradise (6D/5N)</td>
                    <td className="font-bold">₹45,798</td>
                    <td><span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold">TICKETED</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Executive Copilot Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Voyage8 Executive AI
                </span>
                <span className="text-[10px] font-mono text-emerald-400">ONLINE</span>
              </div>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                "Platform GMV is pacing 14% ahead of September targets. Indigo & Emirates Direct NDC integrations saved ₹1,42,800 in GDS distribution fees yesterday. 0 reconciliation variances detected in double-entry ledger."
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>All 19 RBAC Scopes Enforced</span>
              <span className="text-emerald-400 font-bold">Audit Buffer: 100% OK</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
