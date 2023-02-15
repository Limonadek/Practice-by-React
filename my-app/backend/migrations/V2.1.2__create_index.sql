create unique index car_and_buyer_id on car_and_buyer(buyer_id, car_id);

create index car_and_buyer_search_by_buyer_age_vehicle_condition on car_and_buyer
	using btree (buyer_age, vehicle_condition);

create index car_search_by_car_brand_car_color_vehicle_condition on car
    using btree (car_brand, car_color, vehicle_condition);