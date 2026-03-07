-- ============================================================
-- Ember & Oak — Menu Image Update
-- Run this in your Supabase SQL Editor
-- ============================================================

-- STARTERS
UPDATE menu_items
SET image_url = 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=800&q=80'
WHERE name ILIKE '%bruschetta%';

UPDATE menu_items
SET image_url = 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=800&q=80'
WHERE name ILIKE '%soup%';

UPDATE menu_items
SET image_url = 'https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=800&q=80'
WHERE name ILIKE '%calamari%';

-- MAINS
UPDATE menu_items
SET image_url = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
WHERE name ILIKE '%steak%';

UPDATE menu_items
SET image_url = 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80'
WHERE name ILIKE '%salmon%';

UPDATE menu_items
SET image_url = 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=800&q=80'
WHERE name ILIKE '%pasta%';

UPDATE menu_items
SET image_url = 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80'
WHERE name ILIKE '%pizza%';

-- DESSERTS
UPDATE menu_items
SET image_url = 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=800&q=80'
WHERE name ILIKE '%chocolate%';

UPDATE menu_items
SET image_url = 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80'
WHERE name ILIKE '%cheesecake%';

-- DRINKS
UPDATE menu_items
SET image_url = 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80'
WHERE name ILIKE '%cocktail%';

UPDATE menu_items
SET image_url = 'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?w=800&q=80'
WHERE name ILIKE '%wine%';

UPDATE menu_items
SET image_url = 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=800&q=80'
WHERE name ILIKE '%coffee%';

-- Verify results
SELECT id, name, category, image_url
FROM menu_items
ORDER BY category, name;
