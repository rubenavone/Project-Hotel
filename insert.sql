INSERT INTO hotel.category (id, name, description, persons, data) VALUES (1, 'chambre simple', 'chambre de 9m2 avec un lit simple', 1, '{"rooms": ["101", "102"]}');
INSERT INTO hotel.category (id, name, description, persons, data) VALUES (2, 'chambre double', 'chambre de 12m2 avec un lit double', 2, '{"rooms": ["201", "202", "203"]}');
INSERT INTO hotel.category (id, name, description, persons, data) VALUES (3, 'chambre lits jumeaux', 'chambre de 13m2 avec deux lits simples', 2, '{"rooms": ["205", "206", "207"]}');
INSERT INTO hotel.category (id, name, description, persons, data) VALUES (4, 'chambre triple', 'chambre de 18m2 avec un lit double et un lit simple', 3, '{"rooms": ["301", "302"]}');
SELECT pg_catalog.setval('hotel.category_id_seq', 4, true);


INSERT INTO hotel.period (id, category_id, start_date, end_date, data) VALUES (1, 1, '2020-01-01', '2020-06-30', '{"prices": [40, 40, 40, 40, 40, 40, 40]}');
INSERT INTO hotel.period (id, category_id, start_date, end_date, data) VALUES (2, 1, '2020-07-01', '2020-08-31', '{"prices": [45, 45, 45, 45, 45, 45, 45]}');
INSERT INTO hotel.period (id, category_id, start_date, end_date, data) VALUES (3, 1, '2020-09-01', '2020-12-31', '{"prices": [40, 40, 40, 40, 40, 40, 40]}');
INSERT INTO hotel.period (id, category_id, start_date, end_date, data) VALUES (4, 2, '2020-01-01', '2020-06-30', '{"prices": [65, 60, 60, 60, 60, 65, 65]}');
INSERT INTO hotel.period (id, category_id, start_date, end_date, data) VALUES (5, 2, '2020-07-01', '2020-08-31', '{"prices": [85, 80, 80, 80, 80, 85, 85]}');
INSERT INTO hotel.period (id, category_id, start_date, end_date, data) VALUES (6, 2, '2020-09-01', '2020-12-31', '{"prices": [65, 60, 60, 60, 60, 60, 65]}');
INSERT INTO hotel.period (id, category_id, start_date, end_date, data) VALUES (7, 3, '2020-01-01', '2020-06-30', '{"prices": [65, 60, 60, 60, 60, 60, 65]}');
INSERT INTO hotel.period (id, category_id, start_date, end_date, data) VALUES (8, 3, '2020-07-01', '2020-08-31', '{"prices": [85, 80, 80, 80, 80, 85, 85]}');
INSERT INTO hotel.period (id, category_id, start_date, end_date, data) VALUES (9, 3, '2020-09-01', '2020-12-31', '{"prices": [65, 60, 60, 60, 60, 60, 65]}');
INSERT INTO hotel.period (id, category_id, start_date, end_date, data) VALUES (10, 4, '2020-01-01', '2020-06-30', '{"prices": [75, 70, 70, 70, 70, 70, 75]}');
INSERT INTO hotel.period (id, category_id, start_date, end_date, data) VALUES (11, 4, '2020-07-01', '2020-08-31', '{"prices": [95, 90, 90, 90, 90, 90, 95]}');
INSERT INTO hotel.period (id, category_id, start_date, end_date, data) VALUES (12, 4, '2020-09-01', '2020-12-31', '{"prices": [75, 70, 70, 70, 70, 70, 75]}');
SELECT pg_catalog.setval('hotel.period_id_seq', 12, true);


