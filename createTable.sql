CREATE TABLE IF NOT EXISTS movies(
	id BIGSERIAL PRIMARY KEY,
	"movieName" VARCHAR(50) UNIQUE NOT NULL,
	description TEXT DEFAULT NUll,
	duration INTEGER NOT NULL,
	price INTEGER NOT NULL	
);


INSERT INTO movies ("movieName", description, price, duration)
VALUES 
  ('Avengers: Infinity War', 'The Avengers face the Mad Titan', 45, 7200),
  ('Ant-Man and The Wasp', 'Ant-Man teams up with The Wasp', 38, 6300),
  ('Captain Marvel', 'Captain Marvel becomes a hero', 43, 7200),
  ('Avengers: Endgame', 'The Avengers try to save the world', 50, 7200),
  ('Spider-Man: Far From Home', 'Peter Parker goes on a European trip', 43, 7200),
  ('Black Widow', 'Black Widow goes on a dangerous mission', 46, 7200),
  ('Shang-Chi and the Legend of the Ten Rings', 'Shang-Chi fights to save the world', 42, 7200),
  ('Eternals', 'The Eternals protect humanity from their enemies', 45, 7200),
  ('Doctor Strange in the Multiverse of Madness', 'Doctor Strange battles in the multiverse', 50, 7200);