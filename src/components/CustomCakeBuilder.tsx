import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  ChevronRight,
  Info,
  Layers,
  Heart,
  Palette,
  Feather,
  Flame,
} from 'lucide-react';
import {
  CUSTOM_SPONGES,
  CUSTOM_FILLINGS,
  CUSTOM_FINISHES,
  CUSTOM_GARNISHES,
} from '../data/products';
import { CustomCakeRecipe, CartItem } from '../types/bakery';

interface CustomCakeBuilderProps {
  onAddToCart: (item: CartItem) => void;
  onNavigateHome: () => void;
}

export const CustomCakeBuilder: React.FC<CustomCakeBuilderProps> = ({
  onAddToCart,
  onNavigateHome,
}) => {
  // State for recipe customization
  const [size, setSize] = useState<'single-6' | 'single-8' | 'tiered-duo' | 'tiered-trio'>('single-8');
  const [spongeId, setSpongeId] = useState<string>('vanilla-bourbon');
  const [fillingId, setFillingId] = useState<string>('salted-caramel');
  const [finishId, setFinishId] = useState<string>('ivory-buttercream');
  const [selectedGarnishes, setSelectedGarnishes] = useState<string[]>(['gold-leaf', 'fresh-berries']);
  const [inscription, setInscription] = useState<string>('Joyeux Anniversaire');
  const [dietaryOption, setDietaryOption] = useState<'standard' | 'gluten-free' | 'vegan'>('standard');
  const [sweetnessLevel, setSweetnessLevel] = useState<'100%' | '75%' | '50%'>('75%');
  const [candlesCount, setCandlesCount] = useState<number>(5);

  const [activeTab, setActiveTab] = useState<'architecture' | 'flavor' | 'finish' | 'personalize'>('architecture');

  // Pricing math
  const basePrices: Record<string, number> = {
    'single-6': 65,
    'single-8': 85,
    'tiered-duo': 150,
    'tiered-trio': 230,
  };

  const selectedSponge = CUSTOM_SPONGES.find((s) => s.id === spongeId) || CUSTOM_SPONGES[0];
  const selectedFilling = CUSTOM_FILLINGS.find((f) => f.id === fillingId) || CUSTOM_FILLINGS[0];
  const selectedFinish = CUSTOM_FINISHES.find((f) => f.id === finishId) || CUSTOM_FINISHES[0];

  const garnishesTotal = selectedGarnishes.reduce((sum, gId) => {
    const item = CUSTOM_GARNISHES.find((g) => g.id === gId);
    return sum + (item ? item.price : 0);
  }, 0);

  const dietarySurcharge = dietaryOption === 'gluten-free' ? 8 : dietaryOption === 'vegan' ? 10 : 0;
  const candleSurcharge = candlesCount > 0 ? (candlesCount === 1 ? 2 : candlesCount === 5 ? 4 : 6) : 0;

  const calculatedTotal =
    basePrices[size] +
    selectedFilling.price +
    selectedFinish.price +
    garnishesTotal +
    dietarySurcharge +
    candleSurcharge;

  const toggleGarnish = (id: string) => {
    if (selectedGarnishes.includes(id)) {
      setSelectedGarnishes(selectedGarnishes.filter((g) => g !== id));
    } else {
      setSelectedGarnishes([...selectedGarnishes, id]);
    }
  };

  const handleCreateOrder = () => {
    const recipe: CustomCakeRecipe = {
      size,
      sponge: spongeId as any,
      filling: fillingId as any,
      exteriorFinish: finishId as any,
      garnishes: selectedGarnishes,
      inscription: inscription.trim(),
      dietaryOption,
      sweetnessLevel,
      candlesCount,
    };

    const sizeLabels = {
      'single-6': 'Petite Single (6" · 6–8 guests)',
      'single-8': 'Classic Single (8" · 10–14 guests)',
      'tiered-duo': 'Celebration 2-Tier (6"+8" · 20–25 guests)',
      'tiered-trio': 'Grand Gala 3-Tier (6"+8"+10" · 35–45 guests)',
    };

    const cartItem: CartItem = {
      cartItemId: `custom-cake-${Date.now()}`,
      productId: 'custom-bespoke-cake',
      name: `Bespoke Cake: ${selectedSponge.name}`,
      frenchName: 'Gâteau Sur Mesure Atelier',
      image: `${import.meta.env.BASE_URL}images/cake_berry_pistachio_1793892278361.jpg`,
      unitPrice: calculatedTotal,
      quantity: 1,
      selectedSize: sizeLabels[size],
      sweetnessLevel,
      inscription: inscription.trim() || undefined,
      candlesCount,
      dietaryOption: dietaryOption === 'standard' ? 'Standard Recipe' : dietaryOption === 'gluten-free' ? 'Gluten-Free Organic Blend' : 'Vegan Plant-Based',
      isCustomRecipe: true,
      recipeDetails: recipe,
    };

    onAddToCart(cartItem);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Studio Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#92542B]">
            <span>VÈLÔURÁ Custom Studio</span>
            <span aria-hidden="true">·</span>
            <span>Hand-Crafted Pâtisserie</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#231F1E] font-medium [text-wrap:balance]">
            Custom Cake & Recipe Customizer
          </h1>
          <p className="text-sm text-[#5F5651] max-w-2xl leading-relaxed">
            Formulate your signature cake recipe from base sponge to fillings, Swiss meringue finishes, and personalized piping.
          </p>
        </div>

        {/* 2-Column Studio: Left Configurator & Right Live Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Step Selector & Options */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-[#EDE4D6] shadow-xs overflow-hidden">
            {/* Step Navigation Tabs */}
            <div className="grid grid-cols-4 border-b border-[#EDE4D6] bg-[#FAF7F2] p-1.5 gap-1 text-xs">
              {[
                { id: 'architecture', label: '1. Size & Tiers' },
                { id: 'flavor', label: '2. Sponge & Filling' },
                { id: 'finish', label: '3. Finish & Glaze' },
                { id: 'personalize', label: '4. Inscription & Diet' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-2 text-center rounded font-medium transition-colors cursor-pointer truncate ${
                    activeTab === tab.id
                      ? 'bg-white text-[#92542B] shadow-xs font-semibold'
                      : 'text-[#7A6F68] hover:text-[#231F1E]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* TAB 1: Architecture & Size */}
              {activeTab === 'architecture' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl font-semibold text-[#231F1E]">
                      Select Cake Architecture & Servings
                    </h3>
                    <p className="text-xs text-[#7A6F68]">
                      Tiered options include hidden food-grade internal dowels for pristine structural support.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {[
                      {
                        id: 'single-6' as const,
                        title: 'Petite 6" Single Tier',
                        servings: '6–8 guests',
                        desc: 'Ideal for intimate birthdays & anniversaries.',
                        price: 65,
                      },
                      {
                        id: 'single-8' as const,
                        title: 'Classic 8" Single Tier',
                        servings: '10–14 guests',
                        desc: 'Our most popular celebration proportion.',
                        price: 85,
                      },
                      {
                        id: 'tiered-duo' as const,
                        title: 'Celebration 2-Tier (6" + 8")',
                        servings: '20–26 guests',
                        desc: 'Elegant double-stacked centerpiece.',
                        price: 150,
                      },
                      {
                        id: 'tiered-trio' as const,
                        title: 'Grand Gala 3-Tier (6" + 8" + 10")',
                        servings: '38–48 guests',
                        desc: 'Showstopping wedding & grand banquet tiers.',
                        price: 230,
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSize(opt.id)}
                        className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                          size === opt.id
                            ? 'border-[#92542B] bg-[#FAF5EE] shadow-xs ring-1 ring-[#92542B]'
                            : 'border-[#EDE4D6] hover:border-[#D8C7B4] bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-[#231F1E]">{opt.title}</span>
                          <span className="font-mono tabular-nums text-sm font-bold text-[#92542B]">
                            ${opt.price}
                          </span>
                        </div>
                        <div className="text-xs text-[#7A6F68] font-medium mt-1">{opt.servings}</div>
                        <div className="text-[11px] text-[#8A7E75] mt-1 leading-normal">{opt.desc}</div>
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setActiveTab('flavor')}
                      className="flex items-center gap-1.5 px-5 py-2.5 bg-[#231F1E] text-white text-xs font-semibold rounded-lg hover:bg-[#3D3532] transition-colors cursor-pointer"
                    >
                      <span>Next: Sponge & Filling</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: Sponge & Fillings */}
              {activeTab === 'flavor' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  {/* Sponge Foundation */}
                  <div className="space-y-3">
                    <div className="space-y-0.5">
                      <h3 className="font-serif text-lg font-semibold text-[#231F1E]">
                        Sponge Foundation Recipe
                      </h3>
                      <p className="text-xs text-[#7A6F68]">
                        Freshly baked from stone-milled French flour and grass-fed butter.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {CUSTOM_SPONGES.map((sponge) => (
                        <button
                          key={sponge.id}
                          type="button"
                          onClick={() => setSpongeId(sponge.id)}
                          className={`text-left p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                            spongeId === sponge.id
                              ? 'border-[#92542B] bg-[#FAF5EE] shadow-xs'
                              : 'border-[#EDE4D6] hover:border-[#D8C7B4] bg-white'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full border border-black/10 shrink-0 mt-0.5"
                            style={{ backgroundColor: sponge.colorHex }}
                          />
                          <div>
                            <div className="font-semibold text-xs text-[#231F1E]">{sponge.name}</div>
                            <div className="text-[11px] text-[#7A6F68] leading-tight mt-0.5">
                              {sponge.description}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fillings */}
                  <div className="space-y-3 pt-4 border-t border-[#EDE4D6]">
                    <div className="space-y-0.5">
                      <h3 className="font-serif text-lg font-semibold text-[#231F1E]">
                        Artisanal Filling & Layer Confit
                      </h3>
                      <p className="text-xs text-[#7A6F68]">
                        Rich house-made compotes, ganaches, and whipped creams layered between sponges.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {CUSTOM_FILLINGS.map((filling) => (
                        <button
                          key={filling.id}
                          type="button"
                          onClick={() => setFillingId(filling.id)}
                          className={`text-left p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                            fillingId === filling.id
                              ? 'border-[#92542B] bg-[#FAF5EE] shadow-xs'
                              : 'border-[#EDE4D6] hover:border-[#D8C7B4] bg-white'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full border border-black/10 shrink-0 mt-0.5"
                            style={{ backgroundColor: filling.colorHex }}
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-xs text-[#231F1E]">{filling.name}</span>
                              {filling.price > 0 && (
                                <span className="text-[11px] font-mono font-medium text-[#92542B]">
                                  +${filling.price}
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-[#7A6F68] leading-tight mt-0.5">
                              {filling.description}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveTab('architecture')}
                      className="text-xs text-[#7A6F68] hover:text-[#231F1E] font-medium cursor-pointer"
                    >
                      Back to Architecture
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('finish')}
                      className="flex items-center gap-1.5 px-5 py-2.5 bg-[#231F1E] text-white text-xs font-semibold rounded-lg hover:bg-[#3D3532] transition-colors cursor-pointer"
                    >
                      <span>Next: Finish & Garnishes</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: Exterior Finish & Garnishes */}
              {activeTab === 'finish' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="space-y-3">
                    <div className="space-y-0.5">
                      <h3 className="font-serif text-lg font-semibold text-[#231F1E]">
                        Exterior Frosting & Glaze Style
                      </h3>
                      <p className="text-xs text-[#7A6F68]">
                        Silky Swiss meringue buttercream or high-shine dark chocolate mirror glaze.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {CUSTOM_FINISHES.map((finish) => (
                        <button
                          key={finish.id}
                          type="button"
                          onClick={() => setFinishId(finish.id)}
                          className={`text-left p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                            finishId === finish.id
                              ? 'border-[#92542B] bg-[#FAF5EE] shadow-xs'
                              : 'border-[#EDE4D6] hover:border-[#D8C7B4] bg-white'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full border border-black/10 shrink-0 mt-0.5"
                            style={{ backgroundColor: finish.colorHex }}
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-xs text-[#231F1E]">{finish.name}</span>
                              {finish.price > 0 && (
                                <span className="text-[11px] font-mono font-medium text-[#92542B]">
                                  +${finish.price}
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-[#7A6F68] leading-tight mt-0.5">
                              {finish.description}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Artisanal Botanicals & Garnishes */}
                  <div className="space-y-3 pt-4 border-t border-[#EDE4D6]">
                    <div className="space-y-0.5">
                      <h3 className="font-serif text-lg font-semibold text-[#231F1E]">
                        Luxury Garnishes & Botanicals
                      </h3>
                      <p className="text-xs text-[#7A6F68]">
                        Select any desired hand-placed toppings (multi-select).
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {CUSTOM_GARNISHES.map((garnish) => {
                        const isChecked = selectedGarnishes.includes(garnish.id);
                        return (
                          <button
                            key={garnish.id}
                            type="button"
                            onClick={() => toggleGarnish(garnish.id)}
                            className={`text-left p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                              isChecked
                                ? 'border-[#92542B] bg-[#FAF5EE] text-[#231F1E]'
                                : 'border-[#EDE4D6] hover:border-[#D8C7B4] text-[#5F5651]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-4 h-4 rounded flex items-center justify-center border text-white ${
                                  isChecked ? 'bg-[#92542B] border-[#92542B]' : 'border-[#C4B6A3] bg-white'
                                }`}
                              >
                                {isChecked && <Check className="w-3 h-3" />}
                              </div>
                              <span className="text-xs font-medium">{garnish.name}</span>
                            </div>
                            <span className="text-xs font-mono font-medium text-[#92542B]">
                              +${garnish.price}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveTab('flavor')}
                      className="text-xs text-[#7A6F68] hover:text-[#231F1E] font-medium cursor-pointer"
                    >
                      Back to Flavor
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('personalize')}
                      className="flex items-center gap-1.5 px-5 py-2.5 bg-[#231F1E] text-white text-xs font-semibold rounded-lg hover:bg-[#3D3532] transition-colors cursor-pointer"
                    >
                      <span>Next: Inscription & Diet</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 4: Inscription, Diet & Sweetness */}
              {activeTab === 'personalize' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  {/* Piping Inscription */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#7A6F68]">
                        Piped Sugar Plaque Message
                      </label>
                      <span className="text-[11px] text-[#8A7E75]">Max 36 characters</span>
                    </div>
                    <input
                      type="text"
                      maxLength={36}
                      value={inscription}
                      onChange={(e) => setInscription(e.target.value)}
                      placeholder="e.g., Happy 30th Birthday Madeleine"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#EDE4D6] focus:border-[#92542B] focus:outline-none bg-white transition-colors"
                    />
                    <p className="text-[11px] text-[#8A7E75]">
                      Hand-written in gold or dark chocolate calligraphy on a white chocolate plaque.
                    </p>
                  </div>

                  {/* Dietary Formulation */}
                  <div className="space-y-2 pt-2 border-t border-[#EDE4D6]">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6F68]">
                      Dietary Formulation Preference
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'standard' as const, label: 'Traditional Parisian', extra: '+$0' },
                        { id: 'gluten-free' as const, label: 'Gluten-Free Flour', extra: '+$8' },
                        { id: 'vegan' as const, label: 'Vegan Plant-Based', extra: '+$10' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setDietaryOption(item.id)}
                          className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                            dietaryOption === item.id
                              ? 'border-[#92542B] bg-[#FAF5EE] text-[#231F1E] font-semibold'
                              : 'border-[#EDE4D6] hover:border-[#D8C7B4] text-[#5F5651]'
                          }`}
                        >
                          <div>{item.label}</div>
                          <div className="text-[11px] text-[#92542B] font-mono mt-0.5">{item.extra}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sweetness Calibration */}
                  <div className="space-y-2 pt-2 border-t border-[#EDE4D6]">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#7A6F68]">
                        Recipe Sweetness Calibration
                      </label>
                      <span className="text-xs font-mono font-medium text-[#92542B]">
                        {sweetnessLevel}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { val: '100%' as const, label: '100% Classic', desc: 'Original balanced sweetness' },
                        { val: '75%' as const, label: '75% Subtle', desc: 'Chef recommended balance' },
                        { val: '50%' as const, label: '50% Low-Sugar', desc: 'Accent on natural tea & fruit' },
                      ].map((lvl) => (
                        <button
                          key={lvl.val}
                          type="button"
                          onClick={() => setSweetnessLevel(lvl.val)}
                          className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                            sweetnessLevel === lvl.val
                              ? 'border-[#92542B] bg-[#FAF5EE] text-[#231F1E] font-semibold'
                              : 'border-[#EDE4D6] hover:border-[#D8C7B4] text-[#5F5651]'
                          }`}
                        >
                          <div>{lvl.label}</div>
                          <div className="text-[10px] text-[#8A7E75] font-normal mt-0.5">{lvl.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Celebration Candles */}
                  <div className="space-y-2 pt-2 border-t border-[#EDE4D6]">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6F68]">
                      Hand-dipped Gold Beeswax Candles
                    </label>
                    <div className="flex items-center gap-2">
                      {[
                        { count: 0, label: 'No candles' },
                        { count: 1, label: '1 Taper (+$2)' },
                        { count: 5, label: 'Set of 5 (+$4)' },
                        { count: 10, label: 'Set of 10 (+$6)' },
                      ].map((c) => (
                        <button
                          key={c.count}
                          type="button"
                          onClick={() => setCandlesCount(c.count)}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                            candlesCount === c.count
                              ? 'border-[#92542B] bg-[#FAF5EE] text-[#92542B]'
                              : 'border-[#EDE4D6] text-[#5F5651] hover:border-[#D8C7B4]'
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveTab('finish')}
                      className="text-xs text-[#7A6F68] hover:text-[#231F1E] font-medium cursor-pointer"
                    >
                      Back to Finish
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Live Visual Cake Renderer & Price Breakdown */}
          <div className="lg:col-span-5 space-y-6 sticky top-24">
            <div className="bg-white rounded-xl border border-[#EDE4D6] shadow-xs p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-[#EDE4D6] pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#92542B]">
                  Live Recipe Preview
                </span>
                <span className="text-xs text-[#7A6F68]">
                  {size === 'tiered-trio' ? '3 Tiers' : size === 'tiered-duo' ? '2 Tiers' : '1 Tier'}
                </span>
              </div>

              {/* Dynamic SVG / Canvas Cake Illustration */}
              <div className="relative aspect-square w-full rounded-xl bg-gradient-to-b from-[#FAF6F0] to-[#EFE9DF] flex flex-col items-center justify-center p-6 overflow-hidden border border-[#EDE4D6]">
                <div className="w-full max-w-[280px] flex flex-col items-center justify-center transition-all duration-300">
                  {/* Cake Pedestal Stand */}
                  <div className="w-full flex flex-col items-center">
                    {/* Top Tier (only if 3-tier) */}
                    {size === 'tiered-trio' && (
                      <div
                        className="w-24 h-12 rounded-t-md shadow-xs border-b-2 border-black/10 relative transition-all duration-300 flex items-center justify-center"
                        style={{ backgroundColor: selectedFinish.colorHex }}
                      >
                        <div
                          className="w-full h-1.5 absolute bottom-1"
                          style={{ backgroundColor: selectedFilling.colorHex }}
                        />
                      </div>
                    )}

                    {/* Mid Tier (if 2-tier or 3-tier) */}
                    {(size === 'tiered-duo' || size === 'tiered-trio') && (
                      <div
                        className="w-36 h-14 rounded-t-md shadow-xs border-b-2 border-black/10 relative transition-all duration-300 flex items-center justify-center"
                        style={{ backgroundColor: selectedFinish.colorHex }}
                      >
                        <div
                          className="w-full h-1.5 absolute bottom-1"
                          style={{ backgroundColor: selectedFilling.colorHex }}
                        />
                      </div>
                    )}

                    {/* Base Tier (always visible) */}
                    <div
                      className={`h-20 rounded-t-lg shadow-sm border-b-4 border-black/15 relative transition-all duration-300 flex flex-col items-center justify-center p-2 ${
                        size === 'single-6' ? 'w-40' : 'w-52'
                      }`}
                      style={{ backgroundColor: selectedFinish.colorHex }}
                    >
                      {/* Internal filling layer peek */}
                      <div
                        className="w-full h-2 absolute bottom-2"
                        style={{ backgroundColor: selectedFilling.colorHex }}
                      />

                      {/* Calligraphy Inscription Plaque */}
                      {inscription && (
                        <div className="z-10 bg-white/95 px-2.5 py-1 rounded shadow-xs border border-amber-900/10 max-w-[85%] truncate">
                          <p className="font-serif italic text-[11px] text-[#7D4520] tracking-tight text-center truncate">
                            &ldquo;{inscription}&rdquo;
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Cake Pedestal Stand Base */}
                    <div className="w-56 h-3 bg-[#E5DCD0] rounded-full shadow-md mt-1" />
                    <div className="w-20 h-4 bg-[#D8CDBC] rounded-b-md" />
                  </div>
                </div>

                {/* Garnishes Badges Overlaid at Top */}
                <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-1.5 pointer-events-none">
                  {selectedGarnishes.map((gId) => {
                    const item = CUSTOM_GARNISHES.find((g) => g.id === gId);
                    if (!item) return null;
                    return (
                      <span
                        key={gId}
                        className="px-2 py-0.5 text-[10px] bg-white/90 backdrop-blur-xs rounded shadow-xs text-[#7D4520] font-medium"
                      >
                        {item.name}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Recipe Summary List */}
              <div className="space-y-2 text-xs text-[#5F5651] border-b border-[#EDE4D6] pb-4">
                <div className="flex justify-between">
                  <span className="text-[#8A7E75]">Foundation Sponge:</span>
                  <span className="font-medium text-[#231F1E]">{selectedSponge.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7E75]">Gourmet Filling:</span>
                  <span className="font-medium text-[#231F1E]">{selectedFilling.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7E75]">Outer Glaze:</span>
                  <span className="font-medium text-[#231F1E]">{selectedFinish.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7E75]">Diet & Sweetness:</span>
                  <span className="font-medium text-[#231F1E]">
                    {dietaryOption} · {sweetnessLevel}
                  </span>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#231F1E]">Bespoke Total</span>
                  <span className="font-mono tabular-nums text-2xl font-bold text-[#92542B]">
                    ${calculatedTotal.toFixed(2)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCreateOrder}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#92542B] hover:bg-[#7D4520] active:scale-[0.99] text-white text-sm font-semibold rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4 text-[#F3D6B5]" />
                  <span>Add Bespoke Cake to Bag</span>
                </button>

                <p className="text-[11px] text-center text-[#8A7E75]">
                  Baked with 48h cold-courier temperature guarantee & luxury gift box.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
