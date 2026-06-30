
-- Clean, duplicate-free seed data for MovieDB
-- NO cast/actor data included

-- ========================================
-- USERS
-- ========================================
INSERT INTO users (username, email, password, birth_year, role) VALUES
('admin', 'admin@moviedb.com', '$2b$10$B2LR3jZHBHIDjXoJhvd0ZeH7KO6EmGFF46EHDQT4ph.T3kzW5BZs2', 1985, 'admin'),
('john_doe', 'john@example.com', '$2b$10$RN9zB47JX/82mcgTTt2syOjmGXZb1wV9P0lhD1mLmYy2FVUVeDPGq', 1990, 'user'),
('jane_smith', 'jane@example.com', '$2b$10$RN9zB47JX/82mcgTTt2syOjmGXZb1wV9P0lhD1mLmYy2FVUVeDPGq', 1992, 'user'),
('mike_jones', 'mike@example.com', '$2b$10$RN9zB47JX/82mcgTTt2syOjmGXZb1wV9P0lhD1mLmYy2FVUVeDPGq', 1988, 'user'),
('sarah_wilson', 'sarah@example.com', '$2b$10$RN9zB47JX/82mcgTTt2syOjmGXZb1wV9P0lhD1mLmYy2FVUVeDPGq', 1995, 'user'),
('david_brown', 'david@example.com', '$2b$10$RN9zB47JX/82mcgTTt2syOjmGXZb1wV9P0lhD1mLmYy2FVUVeDPGq', 1987, 'user'),
('emily_davis', 'emily@example.com', '$2b$10$RN9zB47JX/82mcgTTt2syOjmGXZb1wV9P0lhD1mLmYy2FVUVeDPGq', 1993, 'user'),
('chris_taylor', 'chris@example.com', '$2b$10$RN9zB47JX/82mcgTTt2syOjmGXZb1wV9P0lhD1mLmYy2FVUVeDPGq', 1989, 'user'),
('amanda_anderson', 'amanda@example.com', '$2b$10$RN9zB47JX/82mcgTTt2syOjmGXZb1wV9P0lhD1mLmYy2FVUVeDPGq', 1991, 'user'),
('daniel_thomas', 'daniel@example.com', '$2b$10$RN9zB47JX/82mcgTTt2syOjmGXZb1wV9P0lhD1mLmYy2FVUVeDPGq', 1994, 'user'),
('laura_martinez', 'laura@example.com', '$2b$10$RN9zB47JX/82mcgTTt2syOjmGXZb1wV9P0lhD1mLmYy2FVUVeDPGq', 1986, 'user'),
('james_garcia', 'james@example.com', '$2b$10$RN9zB47JX/82mcgTTt2syOjmGXZb1wV9P0lhD1mLmYy2FVUVeDPGq', 1997, 'user');

-- ========================================
-- MOVIES
-- ========================================
INSERT INTO films (name, director, genre, country, runtime, imdb_rating, age_rating, language, dubbing_status, plot, release_year, is_animation, is_anime, poster) VALUES
('The Shawshank Redemption', 'Frank Darabont', 'Drama', 'USA', 142, 9.3, 'R', 'English', 'Original', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 1994, FALSE, FALSE, 'default-movie.jpg'),
('The Godfather', 'Francis Ford Coppola', 'Crime, Drama', 'USA', 175, 9.2, 'R', 'English', 'Original', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant youngest son.', 1972, FALSE, FALSE, 'default-movie.jpg'),
('The Dark Knight', 'Christopher Nolan', 'Action, Crime, Drama', 'USA, UK', 152, 9.0, 'PG-13', 'English', 'Original', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', 2008, FALSE, FALSE, 'default-movie.jpg'),
('Pulp Fiction', 'Quentin Tarantino', 'Crime, Drama', 'USA', 154, 8.9, 'R', 'English', 'Original', 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', 1994, FALSE, FALSE, 'default-movie.jpg'),
('Inception', 'Christopher Nolan', 'Action, Sci-Fi, Thriller', 'USA, UK', 148, 8.8, 'PG-13', 'English', 'Original', 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', 2010, FALSE, FALSE, 'default-movie.jpg'),
('Forrest Gump', 'Robert Zemeckis', 'Drama, Romance', 'USA', 142, 8.8, 'PG-13', 'English', 'Original', 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.', 1994, FALSE, FALSE, 'default-movie.jpg'),
('The Matrix', 'Lana Wachowski, Lilly Wachowski', 'Action, Sci-Fi', 'USA', 136, 8.7, 'R', 'English', 'Original', 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.', 1999, FALSE, FALSE, 'default-movie.jpg'),
('Goodfellas', 'Martin Scorsese', 'Biography, Crime, Drama', 'USA', 146, 8.7, 'R', 'English', 'Original', 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.', 1990, FALSE, FALSE, 'default-movie.jpg'),
('Interstellar', 'Christopher Nolan', 'Adventure, Drama, Sci-Fi', 'USA, UK, Canada', 169, 8.7, 'PG-13', 'English', 'Original', 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity''s survival.', 2014, FALSE, FALSE, 'default-movie.jpg'),
('The Lion King', 'Roger Allers, Rob Minkoff', 'Animation, Adventure, Drama', 'USA', 88, 8.5, 'G', 'English', 'Original', 'A Lion cub crown prince is tricked by a treacherous uncle into thinking he caused his father''s death and flees into exile in despair, only to learn in adulthood his identity and his responsibilities.', 1994, TRUE, FALSE, 'default-movie.jpg'),
('The Silence of the Lambs', 'Jonathan Demme', 'Crime, Drama, Thriller', 'USA', 118, 8.6, 'R', 'English', 'Original', 'A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.', 1991, FALSE, FALSE, 'default-movie.jpg'),
('Gladiator', 'Ridley Scott', 'Action, Adventure, Drama', 'USA, UK', 155, 8.5, 'R', 'English', 'Original', 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.', 2000, FALSE, FALSE, 'default-movie.jpg'),
('Fight Club', 'David Fincher', 'Drama', 'USA', 139, 8.8, 'R', 'English', 'Original', 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.', 1999, FALSE, FALSE, 'default-movie.jpg'),
('Schindler''s List', 'Steven Spielberg', 'Biography, Drama, History', 'USA', 195, 9.0, 'R', 'English', 'Original', 'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.', 1993, FALSE, FALSE, 'default-movie.jpg'),
('The Godfather Part II', 'Francis Ford Coppola', 'Crime, Drama', 'USA', 202, 9.0, 'R', 'English', 'Original', 'The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.', 1974, FALSE, FALSE, 'default-movie.jpg'),
('Se7en', 'David Fincher', 'Crime, Drama, Mystery', 'USA', 127, 8.6, 'R', 'English', 'Original', 'Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.', 1995, FALSE, FALSE, 'default-movie.jpg'),
('Toy Story', 'John Lasseter', 'Animation, Adventure, Comedy', 'USA', 81, 8.3, 'G', 'English', 'Original', 'A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy''s room.', 1995, TRUE, FALSE, 'default-movie.jpg'),
('Back to the Future', 'Robert Zemeckis', 'Adventure, Comedy, Sci-Fi', 'USA', 116, 8.5, 'PG', 'English', 'Original', 'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.', 1985, FALSE, FALSE, 'default-movie.jpg'),
('Titanic', 'James Cameron', 'Drama, Romance', 'USA', 194, 7.9, 'PG-13', 'English', 'Original', 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.', 1997, FALSE, FALSE, 'default-movie.jpg'),
('Jurassic Park', 'Steven Spielberg', 'Action, Adventure, Sci-Fi', 'USA', 127, 8.2, 'PG-13', 'English', 'Original', 'A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids after a power failure causes the park''s cloned dinosaurs to run loose.', 1993, FALSE, FALSE, 'default-movie.jpg');

-- ========================================
-- SERIES
-- ========================================
INSERT INTO series (name, director, genre, country, imdb_rating, age_rating, language, dubbing_status, plot, release_year, end_year, is_animation, is_anime, poster) VALUES
('Breaking Bad', 'Vince Gilligan', 'Crime, Drama, Thriller', 'USA', 9.5, 'TV-MA', 'English', 'Original', 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family''s future.', 2008, 2013, FALSE, FALSE, 'default-series.jpg'),
('Game of Thrones', 'David Benioff, D.B. Weiss', 'Action, Adventure, Drama', 'USA, UK, Canada', 9.2, 'TV-MA', 'English', 'Original', 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.', 2011, 2019, FALSE, FALSE, 'default-series.jpg'),
('The Wire', 'David Simon', 'Crime, Drama, Thriller', 'USA', 9.3, 'TV-MA', 'English', 'Original', 'The Baltimore drug scene, as seen through the eyes of drug dealers and law enforcement.', 2002, 2008, FALSE, FALSE, 'default-series.jpg'),
('The Sopranos', 'David Chase', 'Crime, Drama', 'USA', 9.2, 'TV-MA', 'English', 'Original', 'New Jersey mob boss Tony Soprano deals with personal and professional issues in his home and business life that affect his mental state, leading him to seek professional psychiatric counseling.', 1999, 2007, FALSE, FALSE, 'default-series.jpg'),
('Band of Brothers', 'Tom Hanks, Steven Spielberg', 'Drama, War', 'USA, UK', 9.4, 'TV-MA', 'English', 'Original', 'The story of Easy Company of the U.S. Army 101st Airborne Division and their mission in World War II Europe, from Operation Overlord to V-J Day.', 2001, 2001, FALSE, FALSE, 'default-series.jpg'),
('The Office', 'Greg Daniels, Ricky Gervais, Stephen Merchant', 'Comedy', 'USA', 9.0, 'TV-14', 'English', 'Original', 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.', 2005, 2013, FALSE, FALSE, 'default-series.jpg'),
('Chernobyl', 'Johan Renck', 'Drama, History, Thriller', 'USA, UK', 9.4, 'TV-MA', 'English', 'Original', 'In April 1986, an explosion at the Chernobyl nuclear power plant in the Union of Soviet Socialist Republics becomes one of the world''s worst man-made catastrophes.', 2019, 2019, FALSE, FALSE, 'default-series.jpg'),
('The Crown', 'Peter Morgan', 'Biography, Drama, History', 'UK', 8.7, 'TV-MA', 'English', 'Original', 'Follows the political rivalries and romance of Queen Elizabeth II''s reign and the events that shaped the second half of the twentieth century.', 2016, 2023, FALSE, FALSE, 'default-series.jpg'),
('Stranger Things', 'Matt Duffer, Ross Duffer', 'Drama, Fantasy, Horror', 'USA', 8.7, 'TV-14', 'English', 'Original', 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.', 2016, NULL, FALSE, FALSE, 'default-series.jpg'),
('The Mandalorian', 'Jon Favreau', 'Action, Adventure, Sci-Fi', 'USA', 8.8, 'TV-14', 'English', 'Original', 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.', 2019, NULL, FALSE, FALSE, 'default-series.jpg'),
('The Queen''s Gambit', 'Scott Frank, Allan Scott', 'Drama', 'USA', 8.6, 'TV-MA', 'English', 'Original', 'Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess in 1960s USA. But child fosters institutions do not offer the security that she seeks.', 2020, 2020, FALSE, FALSE, 'default-series.jpg'),
('Dark', 'Baran bo Odar, Jantje Friese', 'Crime, Drama, Mystery', 'Germany', 8.8, 'TV-MA', 'German', 'Original', 'A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families.', 2017, 2020, FALSE, FALSE, 'default-series.jpg'),
('House of Cards', 'Beau Willimon', 'Drama, Thriller', 'USA', 8.7, 'TV-MA', 'English', 'Original', 'A ruthless politician will stop at nothing to conquer Washington, D.C.', 2013, 2018, FALSE, FALSE, 'default-series.jpg'),
('Sherlock', 'Mark Gatiss, Steven Moffat', 'Crime, Drama, Mystery', 'UK', 9.1, 'TV-14', 'English', 'Original', 'A modern update finds the famous sleuth and his doctor partner solving crime in 21st century London.', 2010, 2017, FALSE, FALSE, 'default-series.jpg'),
('The Big Bang Theory', 'Chuck Lorre, Bill Prady', 'Comedy, Romance', 'USA', 8.2, 'TV-14', 'English', 'Original', 'A woman who moves into an apartment across the hall from two brilliant but socially awkward physicists shows them how little they know about life outside of the laboratory.', 2007, 2019, FALSE, FALSE, 'default-series.jpg'),
('Rick and Morty', 'Dan Harmon, Justin Roiland', 'Animation, Adventure, Comedy', 'USA', 9.1, 'TV-MA', 'English', 'Original', 'An animated series that follows the exploits of a super scientist and his not-so-bright grandson.', 2013, NULL, TRUE, FALSE, 'default-series.jpg'),
('Better Call Saul', 'Vince Gilligan, Peter Gould', 'Crime, Drama', 'USA', 8.9, 'TV-MA', 'English', 'Original', 'The trials and tribulations of criminal lawyer Jimmy McGill in the time before he established his strip-mall law office in Albuquerque, New Mexico.', 2015, 2022, FALSE, FALSE, 'default-series.jpg'),
('The Boys', 'Eric Kripke', 'Action, Comedy, Drama', 'USA', 8.7, 'TV-MA', 'English', 'Original', 'A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.', 2019, NULL, FALSE, FALSE, 'default-series.jpg'),
('Succession', 'Jesse Armstrong', 'Comedy, Drama', 'USA', 8.9, 'TV-MA', 'English', 'Original', 'The Roy family is known for controlling the biggest media and entertainment company in the world. However, their world changes when their father steps down.', 2018, 2023, FALSE, FALSE, 'default-series.jpg'),
('Ozark', 'Bill Dubuque, Mark Williams', 'Crime, Drama, Thriller', 'USA', 8.5, 'TV-MA', 'English', 'Original', 'A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.', 2017, 2022, FALSE, FALSE, 'default-series.jpg');

-- ========================================
-- SEASONS for Breaking Bad (series_id=1)
-- ========================================
INSERT INTO seasons (series_id, season_number, episode_count, release_date) VALUES
(1, 1, 7, '2008-01-20'),
(1, 2, 13, '2009-03-08'),
(1, 3, 13, '2010-03-21'),
(1, 4, 13, '2011-07-17'),
(1, 5, 16, '2012-07-15');

-- ========================================
-- EPISODES for Breaking Bad
-- ========================================
INSERT INTO episodes (season_id, episode_number, title, runtime, air_date, plot) VALUES
(1, 1, 'Pilot', 58, '2008-01-20', 'A high school chemistry teacher is diagnosed with cancer and teams up with a former student to cook meth.'),
(1, 2, 'Cat''s in the Bag', 48, '2008-01-27', 'Walter and Jesse try to dispose of two bodies in the most discrete way possible.'),
(1, 3, 'And the Bag''s in the River', 48, '2008-02-10', 'Walter and Jesse continue dealing with the aftermath of the last episode.'),
(1, 4, 'Cancer Man', 48, '2008-02-17', 'Walter''s family finds out he has cancer and tries to convince him to get treatment.'),
(1, 5, 'Gray Matter', 48, '2008-02-24', 'Walter rejects his old friends'' offer to pay for his cancer treatment.'),
(1, 6, 'Crazy Handful of Nothin''', 48, '2008-03-02', 'Walter and Jesse have a brush with the law.'),
(1, 7, 'A No-Rough-Stuff-Type Deal', 48, '2008-03-09', 'Walter and Jesse strike a deal with a drug kingpin.'),
(2, 1, 'Seven Thirty-Seven', 47, '2009-03-08', 'Walter and Jesse face the consequences of their actions.'),
(2, 2, 'Grilled', 48, '2009-03-15', 'Walter and Jesse are held hostage by a pair of drug dealers.'),
(2, 3, 'Bit by a Dead Bee', 48, '2009-03-22', 'Walter tries to cover his tracks after the hostage situation.'),
(2, 4, 'Down', 48, '2009-03-29', 'Walter''s personal life begins to unravel.'),
(2, 5, 'Breakage', 48, '2009-04-05', 'Jesse organizes his own crew.'),
(2, 6, 'Peekaboo', 48, '2009-04-12', 'Jesse goes looking for a pair of junkies who ripped him off.'),
(2, 7, 'Negro y Azul', 48, '2009-04-19', 'Walter is stressed about a rival drug dealer.'),
(2, 8, 'Better Call Saul', 48, '2009-04-26', 'Walter and Jesse hire a sleazy lawyer.'),
(2, 9, '4 Days Out', 48, '2009-05-03', 'Walter and Jesse go on a multi-day cook, but things go wrong.'),
(2, 10, 'Over', 48, '2009-05-10', 'Walter becomes increasingly careless.'),
(2, 11, 'Mandala', 48, '2009-05-17', 'Walter and Jesse meet a new distributor.'),
(2, 12, 'Phoenix', 48, '2009-05-24', 'Jesse falls in love with his landlady.'),
(2, 13, 'ABQ', 48, '2009-05-31', 'Walter deals with a terrible tragedy.'),
(3, 1, 'No Más', 47, '2010-03-21', 'Walter and Jesse try to return to their normal lives.'),
(3, 2, 'Caballo sin Nombre', 48, '2010-03-28', 'Walter faces the consequences of his actions.'),
(3, 3, 'I.F.T.', 48, '2010-04-04', 'Walter and Skyler''s relationship continues to deteriorate.'),
(3, 4, 'Green Light', 48, '2010-04-11', 'Walter loses his lab.'),
(3, 5, 'Más', 48, '2010-04-18', 'Walter is given an offer.'),
(3, 6, 'Sunset', 48, '2010-04-25', 'Walter is on the verge of being caught.'),
(3, 7, 'One Minute', 48, '2010-05-02', 'Hank closes in on Jesse.'),
(3, 8, 'I See You', 48, '2010-05-09', 'Walter deals with an emergency.'),
(3, 9, 'Kafkaesque', 48, '2010-05-16', 'Walter and Jesse start their new operation.'),
(3, 10, 'Fly', 48, '2010-05-23', 'Walter becomes obsessed with a fly in the lab.'),
(3, 11, 'Abiquiu', 48, '2010-05-30', 'Walter and Jesse''s business begins to grow.'),
(3, 12, 'Half Measures', 48, '2010-06-06', 'Walter takes drastic action.'),
(3, 13, 'Full Measure', 48, '2010-06-13', 'Walter faces a life-or-death decision.');

-- ========================================
-- COMMENTS
-- ========================================
INSERT INTO comments (user_id, film_id, series_id, comment) VALUES
(2, 1, NULL, 'An absolute masterpiece!'),
(3, 1, NULL, 'One of the best films ever made.'),
(4, NULL, 1, 'Breaking Bad is incredible!'),
(5, NULL, 1, 'Best series I''ve ever watched.'),
(2, 3, NULL, 'Heath Ledger as Joker is iconic.'),
(6, NULL, 2, 'Winter is coming!'),
(7, 4, NULL, 'Tarantino at his best.'),
(8, NULL, 6, 'The Office always makes me laugh.'),
(9, 5, NULL, 'Mind-blowing concept and execution.'),
(10, NULL, 3, 'The Wire is so realistic.');

-- ========================================
-- FAVORITES
-- ========================================
INSERT INTO favorites (user_id, film_id, series_id) VALUES
(2, 1, NULL),
(2, NULL, 1),
(3, 3, NULL),
(3, NULL, 2),
(4, 5, NULL),
(4, NULL, 1),
(5, 2, NULL),
(5, NULL, 6);

-- ========================================
-- WATCHLIST
-- ========================================
INSERT INTO watchlist (user_id, film_id, series_id) VALUES
(2, 6, NULL),
(2, NULL, 3),
(3, 7, NULL),
(3, NULL, 4),
(4, 8, NULL),
(4, NULL, 5),
(5, 9, NULL),
(5, NULL, 7);
