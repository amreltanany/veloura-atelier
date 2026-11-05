import React from 'react';
import { ArrowRight, Sparkles, Clock, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreCatalog: () => void;
  onOpenCustomBuilder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, onOpenCustomBuilder }) => {
  return (
    <section className="relative overflow-hidden border-b border-[#ECE3D5] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Editorial & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-[#92542B]">
              <span>Parisian Pâtisserie & Cake Atelier</span>
              <span aria-hidden="true">·</span>
              <span>Crafted Fresh Daily</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#231F1E] font-medium leading-[1.12] tracking-tight [text-wrap:balance]">
              Artisanal cakes & viennoiserie, sculpted for celebration.
            </h1>

            <p className="text-base sm:text-lg text-[#5F5651] max-w-xl leading-relaxed">
              Every creation begins with stone-milled French grain, churned Normandy butter,
              and rare heirloom botanicals. Order our seasonal signatures or formulate your
              own bespoke recipe in our interactive custom studio.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenCustomBuilder}
                className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#92542B] hover:bg-[#7D4520] active:scale-[0.99] rounded-md transition-all shadow-sm cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-[#F3D6B5]" />
                <span>Customize Your Cake</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onExploreCatalog}
                className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#231F1E] bg-[#F1EAE0] hover:bg-[#E8DFD3] active:scale-[0.99] rounded-md transition-all cursor-pointer whitespace-nowrap"
              >
                <span>View Daily Bakes</span>
              </button>
            </div>

            {/* Quiet unboxed metadata trust strip */}
            <div className="pt-4 border-t border-[#ECE3D5] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#7A6F68]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#92542B]" />
                <span>Baked morning of delivery</span>
              </div>
              <span aria-hidden="true" className="text-[#D8C7B4]">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#92542B]" />
                <span>Temperature-controlled white-glove courier</span>
              </div>
              <span aria-hidden="true" className="text-[#D8C7B4]">·</span>
              <span>100% Preservative-free</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden shadow-lg border border-[#E8DEC\-C] bg-[#F3ECE1] aspect-[4/3] lg:aspect-auto lg:h-[460px]">
              <img
                src={`${import.meta.env.BASE_URL}images/hero_bakery_signature_1793892276298.jpg`}
                alt="Artisanal French bakery atelier counter with tiered celebration cake and fresh sourdough pastries"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />
              
              {/* Subtle caption overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs font-medium tracking-wide uppercase text-[#F3D6B5]">
                  Atelier Showcase
                </p>
                <p className="font-serif text-lg font-medium leading-snug">
                  The Grand Triple-Tier Pâtisserie Gala
                </p>
                <p className="text-xs text-white/80 mt-0.5">
                  Hand-piped lambeth ruffles & seasonal botanicals
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
