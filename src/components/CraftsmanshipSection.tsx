import React from 'react';
import { Sparkles, Clock, Wheat, ShieldCheck } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section id="craftsmanship" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-b border-[#ECE3D5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#92542B]">
            <span>The Atelier Philosophy</span>
            <span aria-hidden="true">·</span>
            <span>Uncompromising Ingredients</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#231F1E] font-medium [text-wrap:balance]">
            Slow fermentation, heirloom grains, and zero shortcuts.
          </h2>
          <p className="text-sm sm:text-base text-[#5F5651] leading-relaxed">
            In our Paris atelier, we believe great pâtisserie cannot be hurried. From 48-hour
            levain maturation to hand-tempered single-origin Valrhona couverture, every batch is
            an exercise in French tradition.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl border border-[#EDE4D6] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#FAF5EE] text-[#92542B] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#231F1E]">
              48-Hour Slow Fermentation
            </h3>
            <p className="text-xs text-[#7A6F68] leading-relaxed">
              Our sourdough boules and laminated viennoiserie undergo two full days of temperature-calibrated proofing. This breaks down enzymes for effortless digestion and golden caramelized crusts.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#92542B]">
              Natural Starters · Zero Preservatives
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#EDE4D6] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#FAF5EE] text-[#92542B] flex items-center justify-center">
              <Wheat className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#231F1E]">
              AOP Charentes-Poitou Butter
            </h3>
            <p className="text-xs text-[#7A6F68] leading-relaxed">
              We exclusively source certified Appellation d'Origine Protégée churned butter with 84% milk fat. Yielding over 27 distinct gossamer layers in our signature morning croissants.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#92542B]">
              84% Butterfat · Label Rouge Grain
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#EDE4D6] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#FAF5EE] text-[#92542B] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#231F1E]">
              Chilled White-Glove Courier
            </h3>
            <p className="text-xs text-[#7A6F68] leading-relaxed">
              Delicate Swiss meringue ruffles and tiered celebration cakes travel in bespoke insulated packaging with food-grade chilling packs, guaranteed to arrive immaculate at your banquet table.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#92542B]">
              Temperature Maintained at 4°C
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
