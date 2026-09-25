'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/travel/Navbar';
import { 
  Activity, ShieldCheck, Clock, AlertTriangle, CheckCircle2, 
  Plane, Hotel, Car, Compass, Users, ArrowRight, RefreshCw, FileCheck 
} from 'lucide-react';
import Link from 'next/link';

export default function ERPDashboard() {
  const [activeFilter, setActiveFilter] = useState('ALL');

  // KPIs from Section 12
  const kpis = [
    { label: 'Bookings Today', value: '18', change: '+3 vs avg', isGood: true },
    { label: 'Active Trips', value: '42', change: 'Across 6 countries', isGood: true },
    { label: 'Pending Confirmations', value: '7', change: 'Supplier action req', isAlert: true },
    { label: 'Supplier Responses', value: '94%', change: 'Avg 18m response', isGood: true },
    { label: 'Pending Documents', value: '4', change: 'Visa/Passports', isAlert: true },
    { label: 'Operational Tasks', value: '28', change: '16 In Progress', isGood: true },
    { label: 'SLA Breaches', value: '0', change: '100% on time', isGood: true },
    { label: 'Disruptions', value: '1', change: 'MLE Seaplane weather', isCritical: true },
    { label: 'Refund Cases', value: '2', change: 'Awaiting finance approval', isAlert: true }
  ];

  // Component Fulfillment Tasks
  const tasks = [
    { id: 'TSK-101', booking: 'TP-892401', client: 'Rahul Sharma', comp: 'FLIGHT', desc: 'Issue NDC Emirates PNR (EK501/EK502)', team: 'Airline Desk', priority: 'HIGH', sla: '32m remaining', status: 'IN_PROGRESS' },
    { id: 'TSK-102', booking: 'TP-892401', client: 'Rahul Sharma', comp: 'HOTEL', desc: 'Lock Atlantis Palm Jumeirah Voucher', team: 'Hospitality Desk', priority: 'MEDIUM', sla: '1h 14m remaining', status: 'OPEN' },
    { id: 'TSK-103', booking: 'TP-892401', client: 'Rahul Sharma', comp: 'TRANSFER', desc: 'Private Chauffeur Limousine Dispatch', team: 'Ground Ops', priority: 'MEDIUM', sla: '2h 10m remaining', status: 'OPEN' },
    { id: 'TSK-104', booking: 'TP-892401', client: 'Rahul Sharma', comp: 'VISA', desc: 'ICAO Doc 9303 MRZ OCR & eVisa Check', team: 'Visa Concierge', priority: 'CRITICAL', sla: 'Done', status: 'COMPLETED' },
    { id: 'TSK-105', booking: 'TP-884120', client: 'Dr. Anand Verma', comp: 'HOTEL', desc: 'Soneva Jani Overwater Villa Confirm', team: 'Hospitality Desk', priority: 'HIGH', sla: '45m remaining', status: 'IN_PROGRESS' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-black text-xs text-white">
            ERP
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white">ERP Operational Fulfilment Command Center</h1>
            <p className="text-[11px] text-slate-400">Enterprise Resource Planning • Booking Operations • Trips • Suppliers • SLAs</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/approvals"
            className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Approval Center (3)</span>
          </Link>
          <Link href="/admin/dashboard" className="text-xs text-slate-400 hover:text-white transition">
            Admin Console →
          </Link>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* KPI Layer */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Operational Health KPIs</h2>
            <div className="text-xs text-emerald-400 font-medium">98.4% On-Time Fulfillment</div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {kpis.map((k, i) => (
              <div key={i} className={`p-4 rounded-2xl border transition-all ${
                k.isCritical ? 'bg-rose-950/40 border-rose-800/80 text-rose-200' :
                k.isAlert ? 'bg-amber-950/40 border-amber-800/80 text-amber-200' :
                'bg-slate-800/80 border-slate-700/80 text-slate-100'
              }`}>
                <div className="text-[11px] text-slate-400 font-medium truncate">{k.label}</div>
                <div className="text-xl font-black mt-1">{k.value}</div>
                <div className="text-[10px] mt-1 font-semibold text-slate-400">{k.change}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Lifecycle Pipeline */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" /> Operational Fulfilment Flow
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs">
            {[
              { stage: '1. BOOKING', desc: 'Order Placed', count: 18, color: 'border-sky-600 bg-sky-950/40 text-sky-300' },
              { stage: '2. SUPPLIER', desc: 'PO Dispatched', count: 14, color: 'border-indigo-600 bg-indigo-950/40 text-indigo-300' },
              { stage: '3. CONFIRM', desc: 'Vouchers Locked', count: 11, color: 'border-purple-600 bg-purple-950/40 text-purple-300' },
              { stage: '4. DOCUMENT', desc: 'Visas & Tickets', count: 9, color: 'border-emerald-600 bg-emerald-950/40 text-emerald-300' },
              { stage: '5. PAYMENT', desc: 'Reconciled', count: 18, color: 'border-emerald-600 bg-emerald-950/40 text-emerald-300' },
              { stage: '6. FULFILMENT', desc: 'Voucher Packet', count: 8, color: 'border-amber-600 bg-amber-950/40 text-amber-300' },
              { stage: '7. TRIP', desc: 'Currently Traveling', count: 42, color: 'border-sky-600 bg-sky-950/40 text-sky-300' },
              { stage: '8. POST-TRIP', desc: 'Feedback & Review', count: 15, color: 'border-slate-600 bg-slate-900 text-slate-300' },
            ].map((s, i) => (
              <div key={i} className={`p-3 rounded-xl border ${s.color} space-y-1`}>
                <div className="font-bold text-[11px] truncate">{s.stage}</div>
                <div className="text-lg font-black">{s.count}</div>
                <div className="text-[10px] opacity-80 truncate">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Component Fulfilment Task Queue */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400" /> Active Component Fulfillment Queue
              </h3>
              <p className="text-[11px] text-slate-400">Component Tasks Auto-Generated from Commercial Bookings</p>
            </div>
            <div className="flex gap-2">
              {['ALL', 'FLIGHT', 'HOTEL', 'TRANSFER', 'VISA'].map(c => (
                <button
                  key={c}
                  onClick={() => setActiveFilter(c)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    activeFilter === c ? 'bg-sky-600 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold border-b border-slate-700">
                <tr>
                  <th className="p-3">Task ID & Comp</th>
                  <th className="p-3">Booking & Client</th>
                  <th className="p-3">Action Description</th>
                  <th className="p-3">Assigned Team</th>
                  <th className="p-3">Priority</th>
                  <th className="p-3">SLA Countdown</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {tasks
                  .filter(t => activeFilter === 'ALL' || t.comp === activeFilter)
                  .map(task => (
                    <tr key={task.id} className="hover:bg-slate-700/30 transition">
                      <td className="p-3">
                        <div className="font-mono font-bold text-white">{task.id}</div>
                        <span className="text-[10px] font-bold text-sky-400 bg-sky-950 px-1.5 py-0.2 rounded border border-sky-800">
                          {task.comp}
                        </span>
                      </td>
                      <td className="p-3">
                        <Link href="/erp/trips/trip_tp892401" className="font-mono font-bold text-sky-400 hover:underline">
                          {task.booking}
                        </Link>
                        <div className="text-slate-300 font-semibold">{task.client}</div>
                      </td>
                      <td className="p-3 text-slate-200">{task.desc}</td>
                      <td className="p-3 text-slate-400">{task.team}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          task.priority === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                          task.priority === 'HIGH' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                          'bg-slate-800 text-slate-300'
                        }`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-slate-300">{task.sla}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          task.status === 'COMPLETED' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                          task.status === 'IN_PROGRESS' ? 'bg-sky-950 text-sky-300 border border-sky-800' :
                          'bg-slate-800 text-slate-400'
                        }`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        {task.status !== 'COMPLETED' ? (
                          <button
                            onClick={() => alert(`Task ${task.id} marked fulfilled!`)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg transition"
                          >
                            Complete
                          </button>
                        ) : (
                          <span className="text-emerald-400 font-bold text-[11px] flex items-center justify-end gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Fulfilled
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
