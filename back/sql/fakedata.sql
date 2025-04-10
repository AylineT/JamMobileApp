BEGIN;

-- Désactiver temporairement les contraintes de clé étrangère
ALTER TABLE Events DISABLE TRIGGER ALL;
ALTER TABLE EventParticipants DISABLE TRIGGER ALL;
ALTER TABLE EventHosts DISABLE TRIGGER ALL;

-- Désactiver temporairement les contraintes de clé étrangère
SET CONSTRAINTS ALL DEFERRED;

-- Vider les tables de force
TRUNCATE TABLE EventHosts CASCADE;
TRUNCATE TABLE EventParticipants CASCADE;
TRUNCATE TABLE Events CASCADE;
TRUNCATE TABLE Address CASCADE;
TRUNCATE TABLE Users CASCADE;

-- Réinitialiser les séquences (fait repartir les IDs de 1)
ALTER SEQUENCE address_id_seq RESTART WITH 1;
ALTER SEQUENCE conversations_id_seq RESTART WITH 1;
ALTER SEQUENCE events_id_seq RESTART WITH 1;
ALTER SEQUENCE messages_id_seq RESTART WITH 1;
ALTER SEQUENCE users_id_seq RESTART WITH 1;

-- Insert fake data into Users table
INSERT INTO Users (username, email, hashed_password, full_name, bio) VALUES
('john_doe', 'john@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MrqphJY6vRrtR4NCbDPA5XDHQhqdQ1a', 'John Doe', 'Music lover and guitarist'),
('jane_smith', 'jane@example.com', '$2a$10$cA2l6b0E.u/6ZJQ6YlzR.eYvU.5Xv5Qd9VjJY7uXKkLm9JQ6r5X5O', 'Jane Smith', 'Pianist and singer'),
('alice_music', 'alice@example.com', '$2a$10$3mXq.dK5Vc1JZ5X5X5X5XeYvU.5Xv5Qd9VjJY7uXKkLm9JQ6r5X5O', 'Alice Johnson', 'DJ and electronic music producer');

-- Insert fake data into Address table
INSERT INTO Address (label, house_number, street_name, postcode, city, citycode, context, longitude, latitude) VALUES
('12 Rue de la Paix, 75002 Paris, France', '12', 'Rue de la Paix', '75002', 'Paris', '75102', 'Île-de-France', 2.331389, 48.868611),
('1 Avenue des Champs-Élysées, 75008 Paris, France', '1', 'Avenue des Champs-Élysées', '75008', 'Paris', '75108', 'Île-de-France', 2.295028, 48.873778),
('Parc de la Tête d Or, 69006 Lyon, France', NULL, 'Parc de la Tête d Or', '69006', 'Lyon', '69386', 'Auvergne-Rhône-Alpes', 4.855278, 45.776944),
('35 Rue de la République, 13001 Marseille, France', '35', 'Rue de la République', '13001', 'Marseille', '13201', 'Provence-Alpes-Côte d Azur', 5.380000, 43.296667);

-- Insert fake data into Events table
INSERT INTO Events (title, description, location_id, event_date, created_by, created_at) VALUES
('Jazz Night', 'A night of jazz music with local artists', 1, '2023-12-15 20:00:00', 1, '2023-12-15 20:00:00'),
('Rock Fest', 'Annual rock music festival in the park', 3, '2023-11-20 18:00:00', 2, '2023-12-15 20:00:00'),
('Electronic Beats', 'Electronic music night with famous DJs', 2, '2023-12-31 22:00:00', 3, '2023-12-15 20:00:00'),
('Classical Concert', 'Symphony orchestra performance', 4, '2024-01-10 19:30:00', 1, '2023-12-15 20:00:00');

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

-- Réactiver les contraintes
ALTER TABLE Events ENABLE TRIGGER ALL;
ALTER TABLE EventParticipants ENABLE TRIGGER ALL;
ALTER TABLE EventHosts ENABLE TRIGGER ALL;

COMMIT;
