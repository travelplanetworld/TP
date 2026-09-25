'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Layers, Plus, ExternalLink, Loader2, LayoutTemplate, Eye } from 'lucide-react';
import { getBuilderToken, setBuilderToken } from '@/lib/vibe/builder-api';

interface Row {
  id: string; name: string; slug: string; type: string; status: string;
  visibility: string; version: number; publishedVersion: number | null;
  _count?: { versions: number }; updatedAt: string;
}

const DEMO_IDENTITIES = [
  { token: 'superadmin@test.travelplanet.local', label: 'Platform Super Admin' },
  { token: 'content@test.travelplanet.local', label: 'Editorial Lead (Content Manager)' },
  { token: 'admin@test.travelplanet.local', label: 'Org Admin' },
];

function useApi() {
  return useCallback(async <T,>(method: string, path: string, body?: unknown) => {
    const res = await fetch(path, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getBuilderToken()}` },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const json = await res.json().catch(() => ({}));
    return { ok: res.ok && json.success !== false, data: json.data, error: json.error, status: res.status };
  }, []);
}

export default function BuilderHomePage() {
  const api = useApi();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [token, setToken] = useState('superadmin@test.travelplanet.local');

  useEffect(() => { setToken(getBuilderToken()); }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const r = await api<Row[]>('GET', '/api/v1/experiences?pageSize=100');
    if (r.ok) setRows((r.data as any)?.items ?? r.data ?? []);
    else setError(r.error?.message ?? 'Failed to load experiences');
    setLoading(false);
  }, [api]);

  useEffect(() => { load(); }, [load]);

  const createExperience = async (input: { name: string; type: string; templateId?: string; visibility: string }) => {
    const r = await api('POST', '/api/v1/experiences', input);
    if (r.ok) {
      const id = (r.data as any).id;
      window.location.href = `/admin/builder/${id}`;
    } else {
      setError(r.error?.message ?? 'Create failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-sm font-extrabold tracking-tight flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-400" /> VIBE — Visual Experience Builder
            </h1>
            <p className="text-[11px] text-slate-400">Content &amp; Experience OS · Build once, compose everywhere</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={token}
            onChange={e => { setBuilderToken(e.target.value); setToken(e.target.value); load(); }}
            className="bg-slate-800 border border-slate-700 rounded-lg text-xs px-2 py-1.5"
            title="Active identity (server RBAC still enforced)"
          >
            {DEMO_IDENTITIES.map(d => <option key={d.token} value={d.token}>{d.label}</option>)}
          </select>
          <button onClick={() => setCreating(true)} className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> New Experience
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-4">
        {error && <div className="bg-rose-950/50 border border-rose-800 text-rose-200 text-xs rounded-xl px-4 py-3">{error}</div>}

        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-700 flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-400">Experiences</h2>
            <span className="text-[11px] text-slate-500">{rows.length} total</span>
          </div>
          {loading ? (
            <div className="p-8 flex items-center gap-2 text-slate-400 text-xs"><Loader2 className="w-4 h-4 animate-spin" /> Loading…</div>
          ) : rows.length === 0 ? (
            <div className="p-8 text-sm text-slate-500">No experiences yet. Create one to begin.</div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="text-slate-500">
                <tr className="border-b border-slate-700/60">
                  <th className="px-5 py-2 font-bold">Name</th>
                  <th className="px-3 py-2 font-bold">Type</th>
                  <th className="px-3 py-2 font-bold">Status</th>
                  <th className="px-3 py-2 font-bold">Visibility</th>
                  <th className="px-3 py-2 font-bold">Version</th>
                  <th className="px-3 py-2 font-bold">Updated</th>
                  <th className="px-3 py-2" />
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.id} className="border-b border-slate-800/60 hover:bg-slate-800/40">
                    <td className="px-5 py-2.5 font-semibold text-slate-200">
                      {r.name}
                      <span className="block font-mono text-[10px] text-slate-500">/{r.slug}</span>
                    </td>
                    <td className="px-3 py-2.5 text-slate-400">{r.type}</td>
                    <td className="px-3 py-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black ${r.status === 'PUBLISHED' ? 'bg-emerald-500/20 text-emerald-300' : r.status === 'ARCHIVED' ? 'bg-slate-600/30 text-slate-400' : 'bg-amber-500/20 text-amber-300'}`}>{r.status}</span>
                    </td>
                    <td className="px-3 py-2.5 text-slate-400">{r.visibility}</td>
                    <td className="px-3 py-2.5 font-mono text-slate-400">v{r.version}{r.publishedVersion ? ` · pub v${r.publishedVersion}` : ''} · {r._count?.versions ?? 0} ver</td>
                    <td className="px-3 py-2.5 text-slate-500">{new Date(r.updatedAt).toLocaleDateString()}</td>
                    <td className="px-3 py-2.5 text-right">
                      <Link href={`/admin/builder/${r.id}`} className="text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 font-bold">
                        <LayoutTemplate className="w-3.5 h-3.5" /> Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {creating && <CreateDialog onClose={() => setCreating(false)} onCreate={createExperience} />}
    </div>
  );
}

function CreateDialog({ onClose, onCreate }: { onClose: () => void; onCreate: (i: { name: string; type: string; templateId?: string; visibility: string }) => void }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('DESTINATION');
  const [templateId, setTemplateId] = useState('tpl.destination');
  const [visibility, setVisibility] = useState('PRIVATE');
  const [templates, setTemplates] = useState<{ key: string; name: string; type: string }[]>([]);

  useEffect(() => {
    fetch('/api/v1/templates', { headers: { Authorization: `Bearer ${getBuilderToken()}` } })
      .then(r => r.json())
      .then(j => { if (j.success) setTemplates(j.data.templates); })
      .catch(() => {});
  }, []);

  const typeOptions = ['PAGE', 'LANDING_PAGE', 'DESTINATION', 'PLACE', 'JOURNEY', 'DIARY', 'GUIDE', 'DASHBOARD', 'WORKSPACE', 'FORM', 'SEARCH'];

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
        <h3 className="text-sm font-extrabold flex items-center gap-2"><Plus className="w-4 h-4 text-sky-400" /> New Experience</h3>
        <div className="space-y-1">
          <label className="text-[11px] text-slate-400 font-bold uppercase">Name</label>
          <input value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm" placeholder="Kerala Monsoon Landing" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] text-slate-400 font-bold uppercase">Type</label>
            <select value={type} onChange={e => setType(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-2 text-sm">
              {typeOptions.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-400 font-bold uppercase">Visibility</label>
            <select value={visibility} onChange={e => setVisibility(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-2 text-sm">
              <option>PRIVATE</option><option>WORKSPACE</option><option>PUBLIC</option>
            </select>
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[11px] text-slate-400 font-bold uppercase">Starting Template</label>
          <select value={templateId} onChange={e => setTemplateId(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-2 text-sm">
            <option value="">Blank canvas</option>
            {templates.map(t => <option key={t.key} value={t.key}>{t.name} ({t.type})</option>)}
          </select>
        </div>
        <div className="flex items-center justify-end gap-2 pt-2">
          <button onClick={onClose} className="px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white">Cancel</button>
          <button
            disabled={!name || name.trim().length < 2}
            onClick={() => onCreate({ name: name.trim(), type, templateId: templateId || undefined, visibility })}
            className="px-4 py-1.5 bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" /> Create &amp; open builder
          </button>
        </div>
      </div>
    </div>
  );
}
