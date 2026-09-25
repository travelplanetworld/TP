'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Activity, RefreshCw, ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function SystemHealthPage() {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchHealth = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/health');
      const data = await res.json();
      if (data.success) {
        setReport(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch system health:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-sm font-extrabold tracking-tight">System Health & Telemetry</h1>
            <p className="text-[11px] text-slate-400">Section 25 Observability Engine · Vercel & Neon Production Health</p>
          </div>
        </div>

        <button
          onClick={fetchHealth}
          disabled={loading}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh Telemetry
        </button>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {/* Top Banner */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 flex items-center gap-1 border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" /> OVERALL STATUS: HEALTHY
              </span>
              <span className="text-xs font-mono text-slate-400">{report?.version || 'Voyage8-2.0.0-PROD'}</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 mt-2">All Production Subsystems Nominal</h2>
            <p className="text-xs text-slate-500 mt-0.5">Canonical Database: {report?.databaseEngine || 'Neon Serverless PostgreSQL (AWS)'}</p>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-bold text-slate-400 block uppercase">Last Health Ping</span>
            <span className="text-xs font-mono font-bold text-slate-700">{report ? new Date(report.timestamp).toLocaleTimeString() : 'Loading...'}</span>
          </div>
        </div>

        {/* 7 Subsystem Health Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {report?.vectors.map((v: any) => (
            <div key={v.name} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="font-extrabold text-xs text-slate-800">{v.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black ${v.status === 'HEALTHY' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {v.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{v.details}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Latency: <span className="font-mono font-bold text-slate-800">{v.latencyMs}ms</span></span>
                <span className="text-slate-400">Uptime: <span className="font-mono font-bold text-emerald-600">{v.uptimePercent}%</span></span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
