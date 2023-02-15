create materialized view car_and_buyer as
	select buyer_id, buyer_name, buyer_age, buyer_phone, car.car_id, car_name, vehicle_condition, price
		from buyer 
			join car_to_buyer on car_to_buyer.buyer_id = buyer.id
			join car on car.car_id = car_to_buyer.car_id;