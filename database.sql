CREATE TABLE "list"(
    "id" serial primary key not null,
    "task" varchar(250) not null,
    -- Not null makes the value required
    "completed" boolean not null default false
);


INSERT INTO "list" 
	("task", "completed") 
VALUES
	('Pick up prescription', 'False'),
	('Wash car', 'False'),
	('Do laundry', 'False'),
	('Go to the gym', 'False'),
	('Pay car bill', 'True'),
	('Cook Dinner', 'False' );