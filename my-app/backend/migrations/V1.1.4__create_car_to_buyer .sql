create table car_to_buyer 
(
	car_id int references car(car_id) not null,
	buyer_id int references buyer(id) not null
)