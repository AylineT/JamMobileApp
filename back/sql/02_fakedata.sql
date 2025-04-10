-- Insert fake data into Users table
INSERT INTO Users (username, email, hashed_password, full_name, bio) VALUES
('john_doe', 'john@example.com', 'hashed_password_1', 'John Doe', 'Music lover and guitarist'),
('jane_smith', 'jane@example.com', 'hashed_password_2', 'Jane Smith', 'Pianist and singer');

-- Insert fake data into Events table
INSERT INTO Events (title, description, location, event_date, created_by) VALUES
('Jazz Night', 'A night of jazz music', 'City Jazz Club', '2023-12-15 20:00:00', 1),
('Rock Fest', 'Rock music festival', 'City Park', '2023-11-20 18:00:00', 2);

-- Insert fake data into Messages table
INSERT INTO Messages (content, sender_id, receiver_id, event_id) VALUES
('Looking forward to the Jazz Night!', 1, 2, 1),
('Who s coming to Rock Fest?', 2, 1, 2);

-- Insert fake data into EventParticipants table
INSERT INTO EventParticipants (event_id, user_id) VALUES
(1, 2),
(2, 1);

-- Insert fake data into EventHosts table
INSERT INTO EventHosts (event_id, user_id) VALUES
(1, 1),
(2, 2);
