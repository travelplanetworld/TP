'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/travel/Navbar';
import { 
  Plane, Hotel, Car, Compass, ShieldCheck, CheckCircle2, 
  Clock, AlertTriangle, User, Users, Calendar, MapPin, Download, 
  ExternalLink, PhoneCall, MessageSquare, ArrowRight 
} from 'lucide-react';
import Link from 'next/link';

export default function TripCommandCenterPage({ params }: { params: { id: string } }) {
  const [lifecycle, setLifecycle] = useState<'PLANNED' | 'CONFIRMATION' | 'PRE_TRAVEL' | 'ACTIVE' | 'COMPLETED'>('CONFIRMATION');

  const trip = {
    id: params.id || 'trip_tp892401',
    bookingNumber: 'TP-892401',
    title: '5D/4N Dubai Futuristic Skyline & Desert Oasis',
    customer: 'Rahul Sharma',
    phone: '+91 98765 43210',
    destination: 'Dubai & Abu Dhabi, UAE',
    dates: '12 Nov 2026 - 17 Nov 2026',
    pax: 3,
    components: {
      flight: { status: 'CONFIRMED', ref: 'EK-PNR-77192', desc: 'Emirates BOM-DXB-BOM Return (3 Pax)' },
      hotel: { status: 'CONFIRMED', ref: 'HTL-ATR-8812', desc: 'Atlantis The Royal Palm View Room (4 Nights)' },
      transfer: { status: 'PENDING', ref: 'TRF-LIM-90', desc: 'Private Chauffeur Limousine DXB Airport' },
      experience: { status: 'CONFIRMED', ref: 'EXP-YCH-40', desc: 'Private Yacht Charter & VIP Desert Safari' },
      visa: { status: 'APPROVED', ref: 'EVISA-DXB-99120', desc: '3-Day UAE eVisa (3 Pax Verified)' },
      payment: { status: 'PAID', ref: 'TXN-RAZOR-8812', desc: 'Total ₹3,15,290 Reconciled & Invoiced' }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Banner */}
      <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/erp/dashboard" className="text-xs text-sky-400 hover:underline">
            ← ERP Operations
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-xs text-slate-400 font-mono">TRIP COMMAND CENTER: {trip.bookingNumber}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Voucher packet downloaded.')}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download All Vouchers</span>
          </button>
          <Link
            href="/finance/general-ledger"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition"
          >
            Ledger Traceability →
          </Link>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {/* Header Overview Card */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-sky-400">{trip.bookingNumber}</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                83% FULFILLED
              </span>
            </div>
            <h1 className="text-2xl font-black text-white">{trip.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-slate-400" /> {trip.customer}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {trip.dates}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {trip.destination}</span>
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-slate-400" /> {trip.pax} Travelers</span>
            </div>
          </div>

          <div className="flex flex-col justify-between items-end text-right">
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-700 text-xs">
              <div className="text-[10px] text-slate-400 uppercase">Emergency Concierge Assigned</div>
              <div className="font-bold text-white mt-0.5">Gulf Oasis DMC Desk (+971 50 734 7676)</div>
            </div>
            <div className="flex gap-2 mt-3">
              <Link
                href="/crm/customers/usr_cust_rahul"
                className="text-xs text-sky-400 hover:underline font-bold flex items-center gap-1"
              >
                <span>View Customer 360</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Trip Lifecycle Stepper */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Trip Execution Lifecycle</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 text-center text-xs">
            {[
              { stage: 'PLANNED', active: true },
              { stage: 'BOOKING', active: true },
              { stage: 'CONFIRMATION', active: true, current: true },
              { stage: 'PRE_TRAVEL', active: false },
              { stage: 'ACTIVE', active: false },
              { stage: 'COMPLETED', active: false },
              { stage: 'POST_TRIP', active: false }
            ].map((s, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border ${
                  s.current ? 'border-sky-500 bg-sky-950/60 text-sky-300 font-bold ring-2 ring-sky-500/30' :
                  s.active ? 'border-emerald-600 bg-emerald-950/40 text-emerald-300 font-semibold' :
                  'border-slate-800 bg-slate-900 text-slate-500'
                }`}
              >
                <div className="text-[10px] opacity-70">Step {idx + 1}</div>
                <div className="text-xs truncate mt-0.5">{s.stage}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Component Fulfilment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Flight */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-sky-400" />
                <h4 className="font-bold text-white text-sm">Flight Ticketing</h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                {trip.components.flight.status}
              </span>
            </div>
            <p className="text-xs text-slate-300">{trip.components.flight.desc}</p>
            <div className="text-[11px] text-slate-400 font-mono">Ref: {trip.components.flight.ref}</div>
          </div>

          {/* Hotel */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Hotel className="w-4 h-4 text-purple-400" />
                <h4 className="font-bold text-white text-sm">Hotel Voucher</h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                {trip.components.hotel.status}
              </span>
            </div>
            <p className="text-xs text-slate-300">{trip.components.hotel.desc}</p>
            <div className="text-[11px] text-slate-400 font-mono">Ref: {trip.components.hotel.ref}</div>
          </div>

          {/* Transfer */}
          <div className="bg-slate-800/80 border border-amber-600/50 rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-amber-400" />
                <h4 className="font-bold text-white text-sm">Airport Transfer</h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                {trip.components.transfer.status}
              </span>
            </div>
            <p className="text-xs text-slate-300">{trip.components.transfer.desc}</p>
            <button
              onClick={() => alert('Chauffeur limousine dispatched.')}
              className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs py-2 rounded-xl transition"
            >
              Dispatch Chauffeur Now
            </button>
          </div>

          {/* Experience */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-sky-400" />
                <h4 className="font-bold text-white text-sm">Excursion & Yacht</h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                {trip.components.experience.status}
              </span>
            </div>
            <p className="text-xs text-slate-300">{trip.components.experience.desc}</p>
            <div className="text-[11px] text-slate-400 font-mono">Ref: {trip.components.experience.ref}</div>
          </div>

          {/* Visa */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h4 className="font-bold text-white text-sm">Visa Concierge</h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                {trip.components.visa.status}
              </span>
            </div>
            <p className="text-xs text-slate-300">{trip.components.visa.desc}</p>
            <div className="text-[11px] text-slate-400 font-mono">Ref: {trip.components.visa.ref}</div>
          </div>

          {/* Payment */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h4 className="font-bold text-white text-sm">Commercial Payment</h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                {trip.components.payment.status}
              </span>
            </div>
            <p className="text-xs text-slate-300">{trip.components.payment.desc}</p>
            <div className="text-[11px] text-slate-400 font-mono">Ref: {trip.components.payment.ref}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
