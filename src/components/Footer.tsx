import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#231F1E] text-[#D8C7B4] py-16 px-6 lg:px-12 border-t border-[#38312E]">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-serif text-2xl font-semibold text-white tracking-tight">
              Atelier Farine
            </h3>
            <p className="text-xs text-[#A8988B] leading-relaxed max-w-sm">
              Parisian couture cake atelier and artisan boulangerie. Dedicated to slow fermentation,
              single-origin botanicals, and bespoke recipe architecture for milestone moments.
            </p>
            <div className="text-[11px] text-[#88786B] pt-2">
              All creations prepared in a facility handling dairy, eggs, gluten, and tree nuts.
            </div>
          </div>

          {/* Boutique Atelier Hours & Location */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#F3D6B5]">
              Atelier Boutique & Kitchen
            </p>
            <div className="space-y-2 text-xs text-[#A8988B]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C97A3E] shrink-0 mt-0.5" />
                <span>14 Rue de Bretagne, 75003 Paris, France</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#C97A3E] shrink-0 mt-0.5" />
                <span>Tuesday – Sunday: 7:30 AM – 7:00 PM (Monday Closed)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C97A3E] shrink-0" />
                <span>+33 (0)1 42 68 90 20</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C97A3E] shrink-0" />
                <span>concierge@atelierfarine.com</span>
              </div>
            </div>
          </div>

          {/* Ordering Information */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#F3D6B5]">
              Bespoke Services
            </p>
            <ul className="space-y-1.5 text-xs text-[#A8988B]">
              <li>Celebration & Wedding Tiers</li>
              <li>Corporate Breakfast Boxes</li>
              <li>Recipe Customization Studio</li>
              <li>Refrigerated Same-Day Courier</li>
              <li>Allergen-Calibrated Baking</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-[#38312E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#88786B]">
          <p>© {new Date().getFullYear()} Atelier Farine Pâtisserie. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            <span>Food Safety Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
