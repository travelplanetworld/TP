'use client';

import React, { useState } from 'react';
import { Sparkles, Wand2, Hotel, Compass, Car, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export const AITripPlanner: React.FC = () => {
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [suggestedTrip, setSuggestedTrip] = useState({
    title: 'Bali Escape',
    sub: '5 Days / 4 Nights',
    price: '₹74,900',
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop',
  });

  const handleSynthesize = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      setSuggestedTrip({
        title: 'Switzerland & Paris Romance',
        sub: '7 Days / 6 Nights (Custom Fit)',
        price: '₹1,18,500',
        img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=600&auto=format&fit=crop',
      });
    }, 800);
  };

  return (
    <section id="ai-planner" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-sky-50 via-white to-slate-50 border border-sky-100 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Form */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" /> AI Trip Planner
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Don't know where to go?</h2>
              <p className="text-sm text-slate-600 mt-2 font-medium max-w-lg">
                Tell us what you're looking for. Travel Planet turns your preferences into a complete journey you can explore, customize and book.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">I want a</label>
                  <select className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold text-slate-800 focus:outline-none">
                    <option>Romantic getaway</option>
                    <option>Adventure escape</option>
                    <option>Family holiday</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">For</label>
                  <select className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold text-slate-800 focus:outline-none">
                    <option>2 people</option>
                    <option>1 person</option>
                    <option>Family (4+)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Duration</label>
                  <select className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold text-slate-800 focus:outline-none">
                    <option>5 days</option>
                    <option>3 days</option>
                    <option>7 days</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Budget</label>
                  <select className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold text-slate-800 focus:outline-none">
                    <option>₹75,000</option>
                    <option>₹50,000</option>
                    <option>₹1,20,000</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">From</label>
                  <select className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold text-slate-800 focus:outline-none">
                    <option>India</option>
                    <option>UAE</option>
                    <option>Singapore</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex items-center space-x-3">
                <button
                  type="button"
                  onClick={handleSynthesize}
                  disabled={isSynthesizing}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md shadow-sky-600/20 transition flex items-center gap-2"
                >
                  <span>{isSynthesizing ? 'Synthesizing...' : 'Build My Trip'}</span>
                  <Wand2 className="w-4 h-4" />
                </button>
                <span className="text-xs text-slate-500 font-medium">Ready to synthesize in seconds with Voyage8.</span>
              </div>
            </div>

            {/* Suggested Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 relative group">
                <div className="relative h-48 overflow-hidden">
                  <img src={suggestedTrip.img} alt={suggestedTrip.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-extrabold text-sky-700 shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" /> AI Suggested
                  </div>
                  <div className="absolute inset-y-0 left-2 flex items-center">
                    <button className="w-7 h-7 rounded-full bg-black/40 text-white hover:bg-black/60 flex items-center justify-center transition">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute inset-y-0 right-2 flex items-center">
                    <button className="w-7 h-7 rounded-full bg-black/40 text-white hover:bg-black/60 flex items-center justify-center transition">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-extrabold text-slate-900">{suggestedTrip.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{suggestedTrip.sub}</p>

                  <div className="flex items-center space-x-4 my-3 text-xs text-slate-600 font-semibold">
                    <span className="flex items-center gap-1 text-slate-700"><Hotel className="w-3.5 h-3.5 text-sky-600" /> Stay</span>
                    <span className="flex items-center gap-1 text-slate-700"><Compass className="w-3.5 h-3.5 text-sky-600" /> Experiences</span>
                    <span className="flex items-center gap-1 text-slate-700"><Car className="w-3.5 h-3.5 text-sky-600" /> Transport</span>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-extrabold text-slate-900">{suggestedTrip.price}</span>
                      <span className="text-xs text-slate-400 font-normal"> / 2 travellers</span>
                    </div>
                    <button className="px-4 py-2 bg-slate-900 hover:bg-sky-600 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5">
                      View Journey <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
