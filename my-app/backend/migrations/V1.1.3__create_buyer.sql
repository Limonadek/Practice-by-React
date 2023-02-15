create table buyer
(
	id int generated always as identity primary key,
	buyer_name text not null,
	buyer_age int not null,
	place text not null,
	buyer_phone text,
	purchase_date date, 
	date_of_return date 
)