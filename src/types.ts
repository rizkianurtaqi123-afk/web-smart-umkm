export interface User {
  email: string;
  name: string;
  businessName: string;
  businessType: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'sale' | 'expense';
  item: string;
  amount: number;
  quantity: number;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
  category: string;
}

export type ViewType = 'home' | 'features' | 'pricing' | 'testimonials' | 'about' | 'contact' | 'login' | 'register' | 'forgot' | 'dashboard';
