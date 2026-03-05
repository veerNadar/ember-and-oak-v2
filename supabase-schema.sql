-- ============================================================
-- Ember & Oak — Supabase Database Schema
-- ============================================================

-- ─────────────────────────
-- 1. MENU ITEMS
-- ─────────────────────────
CREATE TABLE IF NOT EXISTS menu_items (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  category     text        NOT NULL CHECK (category IN ('starters', 'mains', 'desserts', 'drinks')),
  name         text        NOT NULL,
  description  text,
  price        numeric     NOT NULL,
  image_url    text,
  is_available boolean     NOT NULL DEFAULT true,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- ─────────────────────────
-- 2. RESERVATIONS
-- ─────────────────────────
CREATE TABLE IF NOT EXISTS reservations (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text        NOT NULL,
  phone         text        NOT NULL,
  email         text,
  date          date        NOT NULL,
  time          text        NOT NULL,
  party_size    integer     NOT NULL,
  status        text        NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'seated')),
  notes         text,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- ─────────────────────────
-- 3. ROW LEVEL SECURITY
-- ─────────────────────────

-- Menu items: publicly readable, only service role can write
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "menu_items: public read"
  ON menu_items FOR SELECT
  USING (true);

-- Reservations: only service role can read/write (admin-only)
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- (No public policies — all reservation access goes through the server-side service role key)

-- ─────────────────────────
-- 4. SEED DATA — MENU ITEMS
-- ─────────────────────────

INSERT INTO menu_items (category, name, description, price) VALUES

  -- Starters
  ('starters', 'Oak-Smoked Burrata',
   'Housemade burrata lightly kissed with oak smoke, heirloom tomatoes, basil oil, and flaked sea salt.',
   16.00),

  ('starters', 'Ember Chicken Wings',
   'Crispy wings charred over open flame, tossed in a bourbon-honey glaze with blue cheese dipping sauce.',
   14.00),

  ('starters', 'Roasted Beet Salad',
   'Tri-color beets, whipped goat cheese, candied walnuts, arugula, and a sherry vinaigrette.',
   13.00),

  -- Mains
  ('mains', '40-Day Dry-Aged Ribeye',
   '14 oz bone-in ribeye, ember-roasted fingerling potatoes, compound butter, and seasonal greens.',
   58.00),

  ('mains', 'Pan-Seared Atlantic Salmon',
   'Wild-caught salmon, celery root purée, braised leeks, and a caper-brown butter sauce.',
   36.00),

  ('mains', 'Heritage Breed Pork Chop',
   'Thick-cut Berkshire pork chop, charred apple chutney, sweet potato mash, and pickled mustard seeds.',
   38.00),

  ('mains', 'Wild Mushroom Risotto',
   'Arborio rice, foraged mushroom medley, aged Parmigiano-Reggiano, truffle oil, and fresh thyme. (V)',
   28.00),

  -- Desserts
  ('desserts', 'Burnt Basque Cheesecake',
   'Deeply caramelized Basque-style cheesecake served warm with a Pedro Ximénez sherry reduction.',
   12.00),

  ('desserts', 'Dark Chocolate Ember Tart',
   '72% Valrhona chocolate tart, smoked caramel, Maldon salt, and a scoop of vanilla bean ice cream.',
   13.00),

  ('desserts', 'Seasonal Fruit Crisp',
   'Rotating stone fruit crisp with an oat-almond crumble, topped with crème fraîche. (GF)',
   11.00),

  -- Drinks
  ('drinks', 'Ember Old Fashioned',
   'Woodford Reserve bourbon, angostura bitters, housemade dark cherry syrup, orange peel.',
   16.00),

  ('drinks', 'Oak & Citrus Spritz',
   'St-Germain elderflower liqueur, grapefruit juice, sparkling water, rosemary sprig. (Non-alcoholic option available)',
   14.00);
