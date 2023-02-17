create table car
(
	car_id int generated always as identity primary key,
	fk_id int references salon_carsharing(id),
	car_name text not null,
	car_brand text not null, 
	car_color text not null,
	vehicle_condition text not null,
	price int not null
)