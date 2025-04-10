-- Insert fake data into Users table (with real BCrypt hashed passwords)
INSERT INTO Users (username, email, hashed_password, full_name, bio) VALUES
('john_doe', 'john@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MrqphJY6vRrtR4NCbDPA5XDHQhqdQ1a', 'John Doe', 'Music lover and guitarist'),
('jane_smith', 'jane@example.com', '$2a$10$cA2l6b0E.u/6ZJQ6YlzR.eYvU.5Xv5Qd9VjJY7uXKkLm9JQ6r5X5O', 'Jane Smith', 'Pianist and singer'),
('alice_music', 'alice@example.com', '$2a$10$3mXq.dK5Vc1JZ5X5X5X5XeYvU.5Xv5Qd9VjJY7uXKkLm9JQ6r5X5O', 'Alice Johnson', 'DJ and electronic music producer');

-- Insert fake data into Address table (French addresses format)
INSERT INTO Address (label, house_number, street_name, postcode, city, citycode, context, longitude, latitude) VALUES
('12 Rue de la Paix, 75002 Paris, France', '12', 'Rue de la Paix', '75002', 'Paris', '75102', 'Île-de-France', 2.331389, 48.868611),
('1 Avenue des Champs-Élysées, 75008 Paris, France', '1', 'Avenue des Champs-Élysées', '75008', 'Paris', '75108', 'Île-de-France', 2.295028, 48.873778),
('Parc de la Tête d Or, 69006 Lyon, France', NULL, 'Parc de la Tête d Or', '69006', 'Lyon', '69386', 'Auvergne-Rhône-Alpes', 4.855278, 45.776944),
('35 Rue de la République, 13001 Marseille, France', '35', 'Rue de la République', '13001', 'Marseille', '13201', 'Provence-Alpes-Côte d Azur', 5.380000, 43.296667);

-- Insert fake data into Events table (with location_id)
INSERT INTO Events (title, description, location_id, event_date, created_by) VALUES
('Jazz Night', 'A night of jazz music with local artists', 1, '2023-12-15 20:00:00', 1),
('Rock Fest', 'Annual rock music festival in the park', 3, '2023-11-20 18:00:00', 2),
('Electronic Beats', 'Electronic music night with famous DJs', 2, '2023-12-31 22:00:00', 3),
('Classical Concert', 'Symphony orchestra performance', 4, '2024-01-10 19:30:00', 1);

-- Insert fake data into Messages table
INSERT INTO Messages (content, sender_id, receiver_id, event_id) VALUES
('Looking forward to the Jazz Night!', 1, 2, 1),
('Who s coming to Rock Fest?', 2, 1, 2),
('I ll bring my new equipment to Electronic Beats!', 3, 1, 3),
('The classical concert will feature Mozart and Beethoven.', 1, 3, 4);

-- Insert fake data into EventParticipants table
INSERT INTO EventParticipants (event_id, user_id) VALUES
(1, 2),
(1, 3),
(2, 1),
(2, 3),
(3, 1),
(3, 2),
(4, 2),
(4, 3);

-- Insert fake data into EventHosts table
INSERT INTO EventHosts (event_id, user_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 1);