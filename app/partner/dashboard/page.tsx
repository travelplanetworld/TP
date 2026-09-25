'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/travel/Navbar';
import { Footer } from '@/components/travel/Footer';
import { Briefcase, CreditCard, Percent, Image, ArrowRight, ShieldCheck, Download, Users } from 'lucide-react';

export default function PartnerDashboard() {
  const [markupPercent, setMarkupPercent] = useState<number>(8);
  const [partnerCreditLimit, setPartnerCreditLimit] = useState<number>(2500000);
  const [availableCredit, setAvailableCredit] = useState<number>(1840000);
  const [agencyName, setAgencyName] = useState('Apex Holidays India');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center font-black text-xs text-white">
            B2B
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white">B2B2C Partner Portal — {agencyName}</h1>
            <p className="text-[11px] text-slate-400">Wholesale Net Rates & White-Label Itinerary Generator</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-purple-400 bg-purple-950 px-3 py-1 rounded-full border border-purple-800">
            Tier 1 Diamond Partner
          </span>
          <a href="/admin/dashboard" className="text-xs text-slate-400 hover:text-white transition">Admin Console →</a>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl">
            <div className="text-xs font-semibold text-slate-400 uppercase">Available Credit Line</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">₹{availableCredit.toLocaleString('en-IN')}</div>
            <div className="text-[11px] text-slate-400 mt-1">Limit: ₹{partnerCreditLimit.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl">
            <div className="text-xs font-semibold text-slate-400 uppercase">Current Markup Margin</div>
            <div className="text-2xl font-black text-purple-400 mt-1">{markupPercent}%</div>
            <div className="text-[11px] text-slate-400 mt-1">Auto-applied on net wholesale rates</div>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl">
            <div className="text-xs font-semibold text-slate-400 uppercase">B2B Bookings (This Month)</div>
            <div className="text-2xl font-black text-white mt-1">38 Itineraries</div>
            <div className="text-[11px] text-emerald-400 mt-1">+18% growth vs last cycle</div>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl">
            <div className="text-xs font-semibold text-slate-400 uppercase">Accrued Commission</div>
            <div className="text-2xl font-black text-sky-400 mt-1">₹3,42,800</div>
            <div className="text-[11px] text-slate-400 mt-1">Payout scheduled: 1st of month</div>
          </div>
        </div>

        {/* Configuration Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Markup & White-Label Config */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Percent className="w-4 h-4 text-purple-400" /> Dynamic Markup & Agency Branding
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Default Wholesale Markup (%)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={25}
                    value={markupPercent}
                    onChange={(e) => setMarkupPercent(parseInt(e.target.value) || 0)}
                    className="flex-1 accent-purple-600"
                  />
                  <span className="font-mono font-bold text-base text-purple-400 w-12">{markupPercent}%</span>
                </div>
                <span className="text-[11px] text-slate-400">
                  Client quotations will automatically include this margin on top of Voyage8 net rates.
                </span>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Agency Trading Name</label>
                <input
                  type="text"
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={() => alert('Agency configuration saved successfully.')}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition"
                >
                  Save White-Label Settings
                </button>
              </div>
            </div>
          </div>

          {/* Quick Wholesale Search */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-sky-400" /> Instant Wholesale Quote Builder
            </h2>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/50 space-y-2">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Dubai 5D/4N Atlantis Luxury Package</span>
                  <span className="font-mono font-bold text-white">Net: ₹48,000</span>
                </div>
                <div className="flex justify-between items-center text-purple-300">
                  <span>With Your {markupPercent}% Markup</span>
                  <span className="font-mono font-bold text-purple-400">
                    Client: ₹{Math.round(48000 * (1 + markupPercent / 100)).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/50 space-y-2">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Bali 7D/6N Pool Villa Package</span>
                  <span className="font-mono font-bold text-white">Net: ₹54,000</span>
                </div>
                <div className="flex justify-between items-center text-purple-300">
                  <span>With Your {markupPercent}% Markup</span>
                  <span className="font-mono font-bold text-purple-400">
                    Client: ₹{Math.round(54000 * (1 + markupPercent / 100)).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <a
                  href="/trip-planner"
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
                >
                  <span>Build Custom Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
