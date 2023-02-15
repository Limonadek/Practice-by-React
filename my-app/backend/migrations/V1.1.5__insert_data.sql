insert into salon_carsharing (name_salon, location_salon, salon_category)
	values ('Лучший автосалон питера', 'Питер', 'Легковушка'),
		   ('Лучший автосалон питера', 'Питер', 'Крузак');

insert into car(fk_id, car_name, car_brand, car_color, vehicle_condition, price)
	values (1, 'A3 Sedan', 'Audi', 'blue', 'new', 5000),
		   (1, 'Haval Jolion', 'Haval', 'red', 'new', 3500),
		   (2, 'Chery Tiggo 8 Pro MGenaax', 'Chery', 'red', 'new', 6000),
		   (2, 'Rapid Active', 'Skoda', 'black', 'old', 1500),
		   (2, 'Arkana Live', 'Renault', 'white', 'old', 2000);

insert into buyer(buyer_name, buyer_age, buyer_phone, place, purchase_date, date_of_return) 
	values ('Gena', 35, '89588593989', 'Москва', '2022-12-02', '2022-12-03'),
		   ('Nikita', 20, '89584567238', 'Москва', '2022-11-14', '2022-11-15'),
		   ('Vova', 47, '87432434323', 'Екб', '2022-04-02', '2022-04-03'),
           ('Nikita', 48, '464532343423', 'Екб', '2022-6-14', '2022-6-15'),
		   ('Vova', 40, '54334454353', 'Екб', '2022-6-14', '2022-6-15');

insert into car_to_buyer
	values (1, 1), 
		   (1, 3),
		   (2, 2);



