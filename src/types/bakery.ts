export type CategoryId = 'all' | 'signature-cakes' | 'custom-studio' | 'viennoiserie' | 'tarts';

export interface Product {
  id: string;
  name: string;
  frenchName: string;
  category: CategoryId;
  price: number;
  description: string;
  shortDescription: string;
  image: string;
  servings: string;
  prepTime: string;
  dietary: string[];
  flavorNotes: string[];
  allergens: string[];
  isCustomizable: boolean;
  defaultSweetness?: number; // 50, 75, 100
  availableSizes?: { label: string; servings: string; priceMultiplier: number }[];
}

export interface CustomCakeRecipe {
  size: 'single-6' | 'single-8' | 'tiered-duo' | 'tiered-trio';
  sponge: 'vanilla-bourbon' | 'valrhona-dark' | 'bronte-pistachio' | 'earl-grey' | 'carrot-pecan';
  filling: 'tahitian-cream' | 'salted-caramel' | 'wild-berry-coulis' | 'lemon-curd' | 'espresso-ganache';
  exteriorFinish: 'ivory-buttercream' | 'sage-cream' | 'vintage-caramel' | 'semi-naked' | 'mirror-glaze';
  garnishes: string[];
  inscription: string;
  dietaryOption: 'standard' | 'gluten-free' | 'vegan';
  sweetnessLevel: '100%' | '75%' | '50%';
  candlesCount: number;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  name: string;
  frenchName?: string;
  image: string;
  unitPrice: number;
  quantity: number;
  selectedSize?: string;
  sweetnessLevel?: string;
  inscription?: string;
  candlesCount?: number;
  dietaryOption?: string;
  isCustomRecipe?: boolean;
  recipeDetails?: CustomCakeRecipe;
}

export interface DeliverySlot {
  date: string;
  timeWindow: string;
  type: 'delivery' | 'pickup';
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  suite?: string;
  city: string;
  postalCode: string;
  deliveryNotes?: string;
  giftMessage?: string;
  paymentMethod: 'express-apple-pay' | 'card' | 'pickup-cash';
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  deliverySlot: DeliverySlot;
  customer: CustomerDetails;
  status: 'confirmed' | 'baking' | 'decorating' | 'out_for_delivery' | 'ready_for_pickup';
}
