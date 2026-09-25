'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/travel/Navbar';
import { Footer } from '@/components/travel/Footer';
import { Users, FileText, Send, CheckCircle2, Clock, Plus, Phone, MessageSquare, ArrowRight } from 'lucide-react';

interface Inquiry {
  id: string;
  client: string;
  phone: string;
  destination: string;
  travelers: number;
  budget: string;
  stage: 'NEW' | 'QUOTED' | 'CONFIRMED' | 'TRAVELING';
  dates: string;
}

export default function AgentDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([
    { id: 'INQ-401', client: 'Vikram & Priya Oberoi', phone: '+91 9820011223', destination: 'Dubai, UAE', travelers: 2, budget: '₹1.5L', stage: 'NEW', dates: '12 Nov - 17 Nov' },
    { id: 'INQ-402', client: 'Arjun Mehta Family', phone: '+91 9819922334', destination: 'Bali, Indonesia', travelers: 4, budget: '₹2.8L', stage: 'QUOTED', dates: '24 Dec - 30 Dec' },
    { id: 'INQ-403', client: 'Rohit Kulkarni', phone: '+91 9821033445', destination: 'Maldives', travelers: 2, budget: '₹3.2L', stage: 'CONFIRMED', dates: '10 Oct - 14 Oct' },
    { id: 'INQ-404', client: 'Sunita Rao', phone: '+91 9833044556', destination: 'Paris, France', travelers: 1, budget: '₹1.8L', stage: 'TRAVELING', dates: '22 Sep - 28 Sep' },
  ]);

  const stages: ('NEW' | 'QUOTED' | 'CONFIRMED' | 'TRAVELING')[] = ['NEW', 'QUOTED', 'CONFIRMED', 'TRAVELING'];

  const stageLabels = {
    NEW: 'New Inquiries',
    QUOTED: 'Quotations Sent',
    CONFIRMED: 'Bookings Confirmed',
    TRAVELING: 'Currently Traveling'
  };

  const advanceStage = (id: string) => {
    setInquiries(prev => prev.map(inq => {
      if (inq.id === id) {
        const next = inq.stage === 'NEW' ? 'QUOTED' : inq.stage === 'QUOTED' ? 'CONFIRMED' : inq.stage === 'CONFIRMED' ? 'TRAVELING' : 'TRAVELING';
        return { ...inq, stage: next };
      }
      return inq;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-xs text-white">
            AGT
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white">Travel Consultant Workspace</h1>
            <p className="text-[11px] text-slate-400">Agent: Priya Sharma | Scope: USER / TEAM</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/trip-planner"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Quote</span>
          </a>
          <a href="/admin/dashboard" className="text-xs text-slate-400 hover:text-white transition">Admin Console →</a>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {/* KPI Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl">
            <div className="text-xs font-semibold text-slate-400 uppercase">Active Inquiries</div>
            <div className="text-2xl font-black text-white mt-1">{inquiries.length} Leads</div>
            <div className="text-[11px] text-emerald-400 mt-1">68% historical conversion</div>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl">
            <div className="text-xs font-semibold text-slate-400 uppercase">Confirmed Bookings (MTD)</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">₹14,80,000</div>
            <div className="text-[11px] text-slate-400 mt-1">11 Completed Itineraries</div>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl">
            <div className="text-xs font-semibold text-slate-400 uppercase">Accrued Commission</div>
            <div className="text-2xl font-black text-indigo-400 mt-1">₹1,18,400</div>
            <div className="text-[11px] text-slate-400 mt-1">Average 8% commission earned</div>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl">
            <div className="text-xs font-semibold text-slate-400 uppercase">Customer CSAT</div>
            <div className="text-2xl font-black text-amber-400 mt-1">4.95 / 5.0</div>
            <div className="text-[11px] text-slate-400 mt-1">Based on 32 traveler reviews</div>
          </div>
        </div>

        {/* Inquiry Kanban Board */}
        <div>
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" /> Inquiry Pipeline & Follow-Up Board
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stages.map(stage => {
              const stageInqs = inquiries.filter(i => i.stage === stage);
              return (
                <div key={stage} className="bg-slate-800/60 border border-slate-700/70 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                    <span className="text-xs font-bold text-slate-200 uppercase">{stageLabels[stage]}</span>
                    <span className="w-5 h-5 rounded-full bg-slate-700 text-slate-300 text-[11px] font-bold flex items-center justify-center">
                      {stageInqs.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {stageInqs.map(inq => (
                      <div key={inq.id} className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-3 space-y-2 hover:border-slate-500 transition">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-mono text-indigo-400 font-bold">{inq.id}</span>
                          <span className="text-[10px] font-bold text-emerald-400">{inq.budget}</span>
                        </div>
                        <div className="font-bold text-xs text-white">{inq.client}</div>
                        <div className="text-[11px] text-slate-400">
                          {inq.destination} • {inq.travelers} Pax
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Dates: {inq.dates}
                        </div>

                        <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                          <div className="flex gap-2">
                            <a href={`tel:${inq.phone}`} className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white">
                              <Phone className="w-3 h-3" />
                            </a>
                            <a href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white">
                              <MessageSquare className="w-3 h-3" />
                            </a>
                          </div>

                          {inq.stage !== 'TRAVELING' && (
                            <button
                              onClick={() => advanceStage(inq.id)}
                              className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                            >
                              <span>Next</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
