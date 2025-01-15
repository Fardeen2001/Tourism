/*
  # Add More Tourism Destinations

  1. Content Added
    - Additional sample blog posts for diverse destinations
    - More TripAdvisor booking links
    - Rich content about various travel experiences
*/

-- Insert more sample blog posts
INSERT INTO blogs (
  title, 
  slug, 
  description, 
  content,
  thumbnail_url,
  meta_title,
  meta_description,
  country_id,
  category_id,
  published
) VALUES
(
  'Bali: Paradise Island of Indonesia',
  'bali-travel-guide',
  'Experience the magic of Bali - from pristine beaches to ancient temples, discover why this Indonesian island is a traveler''s paradise.',
  E'<h2>The Island of the Gods</h2>
  <p>Bali, known as the Island of the Gods, offers an enchanting blend of natural beauty, rich culture, and spiritual atmosphere. From pristine beaches to lush rice terraces, every corner of this paradise tells a unique story.</p>
  
  <h3>Must-Visit Destinations</h3>
  <ul>
    <li><strong>Ubud:</strong> Cultural heart of Bali, famous for its art galleries, traditional crafts, and monkey forest</li>
    <li><strong>Tanah Lot:</strong> Ancient sea temple perched on a rocky outcrop</li>
    <li><strong>Uluwatu:</strong> Clifftop temple known for its stunning sunset views and traditional Kecak fire dance</li>
  </ul>
  
  <h3>Experiences You Can''t Miss</h3>
  <p>Take a sunrise trek to Mount Batur, explore the iconic rice terraces of Tegalalang, or unwind at a traditional Balinese spa. The island''s warm hospitality and rich traditions create unforgettable memories.</p>',
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3',
  'Ultimate Bali Travel Guide - Island Paradise',
  'Plan your perfect Bali vacation with our comprehensive guide to beaches, temples, and cultural experiences.',
  (SELECT id FROM countries WHERE name = 'India'),
  (SELECT id FROM categories WHERE slug = 'beaches'),
  true
),
(
  'Swiss Alps: A Winter Wonderland Guide',
  'swiss-alps-guide',
  'Discover the majestic Swiss Alps, where snow-capped peaks, world-class skiing, and charming mountain villages create the perfect winter escape.',
  E'<h2>Alpine Paradise</h2>
  <p>The Swiss Alps represent the pinnacle of winter tourism, offering breathtaking mountain scenery, premier ski resorts, and picturesque villages that seem straight out of a fairy tale.</p>
  
  <h3>Top Winter Destinations</h3>
  <ul>
    <li><strong>Zermatt:</strong> Home to the iconic Matterhorn and car-free village charm</li>
    <li><strong>St. Moritz:</strong> Luxury winter sports resort with Olympic heritage</li>
    <li><strong>Grindelwald:</strong> Gateway to the magnificent Jungfrau Region</li>
  </ul>
  
  <h3>Year-Round Activities</h3>
  <p>Whether it''s skiing in winter, hiking in summer, or enjoying Swiss chocolate and cheese fondue any time of year, the Alps offer endless adventures.</p>',
  'https://images.unsplash.com/photo-1531310197839-ccf54634509e?ixlib=rb-4.0.3',
  'Swiss Alps Travel Guide - Winter Paradise',
  'Experience the magic of the Swiss Alps with our guide to skiing, winter sports, and mountain adventures.',
  (SELECT id FROM countries WHERE name = 'France'),
  (SELECT id FROM categories WHERE slug = 'mountains'),
  true
);

-- Insert additional TripAdvisor booking links
INSERT INTO trip_advisor_links (blog_id, url, title) VALUES
(
  (SELECT id FROM blogs WHERE slug = 'bali-travel-guide'),
  'https://www.tripadvisor.com/Tourism-g294226-Bali-Vacations.html',
  'Plan Your Bali Paradise Getaway'
),
(
  (SELECT id FROM blogs WHERE slug = 'swiss-alps-guide'),
  'https://www.tripadvisor.com/Tourism-g188045-Switzerland-Vacations.html',
  'Book Your Swiss Alps Adventure'
);