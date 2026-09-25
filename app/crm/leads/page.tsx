'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/travel/Navbar';
import { 
  Users, Filter, Search, Plus, Phone, MessageSquare, 
  ArrowRight, Flame, Clock, CheckCircle2, ChevronDown 
} from 'lucide-react';
import Link from 'next/link';

export default function LeadsPage() {
  const [filterSource, setFilterSource] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const leads = [
    { id: 'LD-901', name: 'Kavita Patel', source: 'WEBSITE', destination: 'Dubai, UAE', budget: '₹2,50,000', pax: 2, score: 88, status: 'QUALIFIED', agent: 'Priya Sharma', date: 'Today' },
    { id: 'LD-902', name: 'Dr. Anand Verma', source: 'GOOGLE', destination: 'Dubai & Maldives Combo', budget: '₹6,50,000', pax: 4, score: 96, status: 'QUOTED', agent: 'Priya Sharma', date: 'Today' },
    { id: 'LD-903', name: 'Rohan Mehra', source: 'WHATSAPP', destination: 'Bali Island Hopping', budget: '₹1,80,000', pax: 2, score: 78, status: 'CONTACTED', agent: 'David Roy', date: 'Yesterday' },
    { id: 'LD-904', name: 'Meera Singhania', source: 'INSTAGRAM', destination: 'Paris & Swiss Alps', budget: '₹8,20,000', pax: 2, score: 94, status: 'NEGOTIATION', agent: 'David Roy', date: 'Yesterday' },
    { id: 'LD-905', name: 'Vikram Malhotra', source: 'REFERRAL', destination: 'Maldives Overwater Retreat', budget: '₹5,00,000', pax: 2, score: 85, status: 'REQUIREMENT_CAPTURED', agent: 'Sarah Khan', date: '2 days ago' },
    { id: 'LD-906', name: 'Sanjay Reddy', source: 'PHONE', destination: 'Singapore & Sentosa', budget: '₹3,40,000', pax: 3, score: 72, status: 'NEW', agent: 'Unassigned', date: '3 days ago' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Banner */}
      <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/crm/dashboard" className="text-xs text-sky-400 hover:underline">
            ← CRM Dashboard
          </Link>
          <span className="text-slate-600">/</span>
          <h1 className="text-base font-extrabold text-white">Lead Pipeline & Qualification Board</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('New Lead creation modal.')}
            className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Lead</span>
          </button>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter by Source:
            </span>
            {['ALL', 'WEBSITE', 'GOOGLE', 'WHATSAPP', 'INSTAGRAM', 'REFERRAL'].map((s) => (
              <button
                key={s}
                onClick={() => setFilterSource(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  filterSource === s ? 'bg-sky-600 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search leads by name or city..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Lead Table */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold border-b border-slate-700">
              <tr>
                <th className="p-4">Lead ID & Prospect</th>
                <th className="p-4">Source</th>
                <th className="p-4">Destination & Pax</th>
                <th className="p-4">Budget</th>
                <th className="p-4">Score</th>
                <th className="p-4">Status</th>
                <th className="p-4">Assigned Agent</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {leads
                .filter(l => filterSource === 'ALL' || l.source === filterSource)
                .map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-700/30 transition">
                    <td className="p-4">
                      <Link href={`/crm/customers/usr_cust_rahul`} className="font-bold text-white hover:text-sky-400">
                        {lead.name}
                      </Link>
                      <div className="text-[10px] text-slate-400 font-mono">{lead.id} • {lead.date}</div>
                    </td>
                    <td className="p-4">
                      <span className="text-[11px] font-semibold bg-slate-900 text-slate-300 px-2 py-0.5 rounded">
                        {lead.source}
                      </span>
                    </td>
                    <td className="p-4 text-slate-300">
                      <div>{lead.destination}</div>
                      <div className="text-[10px] text-slate-500">{lead.pax} Travelers</div>
                    </td>
                    <td className="p-4 font-bold text-emerald-400">{lead.budget}</td>
                    <td className="p-4">
                      <span className="font-mono font-bold text-amber-400 bg-amber-950/60 border border-amber-800 px-2 py-0.5 rounded text-[11px]">
                        {lead.score}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-sky-950 text-sky-300 border border-sky-800">
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-300">{lead.agent}</td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/crm/quotes?lead=${lead.id}`}
                        className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg transition inline-flex items-center gap-1"
                      >
                        <span>Build Quote</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
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
