/*
  # Add Sample Blog Posts

  1. Content Added
    - Sample blog posts for various destinations
    - TripAdvisor booking links
    - Rich content about popular tourist destinations
*/

-- Insert sample blog posts
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
  'The Magic of Venice: A Complete Guide to the City of Canals',
  'venice-city-guide',
  'Discover the enchanting beauty of Venice, from its historic canals to hidden gems. Your complete guide to experiencing the best of the Floating City.',
  E'<h2>Exploring Venice''s Timeless Beauty</h2>
  <p>Venice, the city of canals and romance, stands as a testament to human ingenuity and artistic vision. Built entirely on water, this UNESCO World Heritage site continues to captivate visitors with its unique architecture, rich history, and vibrant culture.</p>
  
  <h3>Must-Visit Attractions</h3>
  <ul>
    <li><strong>St. Mark''s Basilica:</strong> The crown jewel of Venice, featuring stunning Byzantine architecture and golden mosaics</li>
    <li><strong>Doge''s Palace:</strong> A masterpiece of Gothic architecture, once the residence of Venice''s rulers</li>
    <li><strong>Rialto Bridge:</strong> The oldest bridge across the Grand Canal, offering spectacular views</li>
  </ul>
  
  <h3>Hidden Gems</h3>
  <p>Venture beyond the main tourist areas to discover authentic Venetian life in neighborhoods like Cannaregio and Dorsoduro. Here you''ll find local restaurants, artisan shops, and peaceful canals.</p>',
  'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?ixlib=rb-4.0.3',
  'Venice Travel Guide - Explore the City of Canals',
  'Plan your perfect Venice vacation with our comprehensive guide covering attractions, hidden gems, and local experiences.',
  (SELECT id FROM countries WHERE slug = 'italy'),
  (SELECT id FROM categories WHERE slug = 'cities'),
  true
),
(
  'Kyoto: A Journey Through Japan''s Cultural Heart',
  'kyoto-cultural-guide',
  'Experience the essence of traditional Japan in Kyoto, home to ancient temples, serene gardens, and timeless traditions.',
  E'<h2>Discovering Kyoto''s Ancient Treasures</h2>
  <p>Kyoto, Japan''s former imperial capital, preserves the soul of traditional Japanese culture. With over 1,600 Buddhist temples, 400 Shinto shrines, and 17 UNESCO World Heritage sites, the city offers an unparalleled journey into Japan''s rich heritage.</p>
  
  <h3>Iconic Temples and Shrines</h3>
  <ul>
    <li><strong>Kinkaku-ji (Golden Pavilion):</strong> A Zen temple covered in gold leaf, reflecting beautifully in its mirror pond</li>
    <li><strong>Fushimi Inari Shrine:</strong> Famous for its thousands of vermillion torii gates</li>
    <li><strong>Kiyomizu-dera:</strong> An ancient temple offering panoramic views of Kyoto</li>
  </ul>
  
  <h3>Cultural Experiences</h3>
  <p>Immerse yourself in Japanese culture through tea ceremonies, traditional gardens, and geisha districts like Gion. Spring brings the famous cherry blossoms, while fall paints the city in vibrant autumn colors.</p>',
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3',
  'Kyoto Travel Guide - Experience Traditional Japan',
  'Discover the best of Kyoto with our guide to temples, shrines, and cultural experiences in Japan''s ancient capital.',
  (SELECT id FROM countries WHERE slug = 'japan'),
  (SELECT id FROM categories WHERE slug = 'culture'),
  true
);

-- Insert TripAdvisor booking links
INSERT INTO trip_advisor_links (blog_id, url, title) VALUES
(
  (SELECT id FROM blogs WHERE slug = 'venice-city-guide'),
  'https://www.tripadvisor.com/Tourism-g187870-Venice_Veneto-Vacations.html',
  'Book Your Venice Adventure'
),
(
  (SELECT id FROM blogs WHERE slug = 'kyoto-cultural-guide'),
  'https://www.tripadvisor.com/Tourism-g298564-Kyoto_Kyoto_Prefecture_Kinki-Vacations.html',
  'Plan Your Kyoto Experience'
);