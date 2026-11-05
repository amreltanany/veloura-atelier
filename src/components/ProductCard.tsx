import React from 'react';
import { SlidersHorizontal, Plus } from 'lucide-react';
import { Product } from '../types/bakery';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickAdd,
}) => {
  return (
    <div
      onClick={() => onSelect(product)}
      className="group flex flex-col bg-white rounded-xl border border-[#EDE4D6] overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      {/* 65%-75% Visual Image Container with uniform ratio */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F6F0E6]">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />

        {/* Clean unboxed tag in top right */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-medium text-[#7D4520] tracking-wide uppercase shadow-xs">
          {product.isCustomizable ? 'Customizable Recipe' : 'Artisan Batch'}
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-[#8A7E75]">
            <span className="uppercase tracking-wider font-medium text-[#92542B]">
              {product.category.replace('-', ' ')}
            </span>
            <span aria-hidden="true">·</span>
            <span>{product.servings}</span>
          </div>

          <h3 className="font-serif text-lg font-semibold text-[#231F1E] group-hover:text-[#92542B] transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-[#7A6F68] line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-[#F2ECE3] flex items-center justify-between gap-3">
          <div>
            <span className="text-xs text-[#8A7E75] block">Starting at</span>
            <span className="font-mono tabular-nums text-lg font-bold text-[#231F1E]">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(product);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#231F1E] bg-[#F7F2EA] hover:bg-[#EFE7DC] active:scale-[0.98] rounded-md transition-colors cursor-pointer"
              title="Customize recipe and portions"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#92542B]" />
              <span>Customize</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onQuickAdd(product);
              }}
              className="p-1.5 text-white bg-[#231F1E] hover:bg-[#92542B] active:scale-[0.98] rounded-md transition-colors cursor-pointer"
              title="Add to shopping bag"
              aria-label={`Add ${product.name} to bag`}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
