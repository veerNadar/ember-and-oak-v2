// ─────────────────────────────────────────────
// TypeScript interfaces matching the Supabase
// database schema in supabase-schema.sql
// ─────────────────────────────────────────────

export interface MenuItem {
    id: string;
    category: 'starters' | 'mains' | 'desserts' | 'drinks';
    name: string;
    description: string | null;
    price: number;
    image_url: string | null;
    is_available: boolean;
    created_at: string;
}

export interface Reservation {
    id: string;
    customer_name: string;
    phone: string;
    email: string | null;
    date: string;
    time: string;
    party_size: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'seated';
    notes: string | null;
    created_at: string;
}
