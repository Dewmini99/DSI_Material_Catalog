create table category(
  category_id int NOT NULL AUTO_INCREMENT,
  category_name varchar(255) NOT NULL,
  primary key(category_id)  
);

create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    contactNumber varchar(20),
    email varchar(50),
    password varchar(250),
    status varchar(20),
    role varchar(20),
    UNIQUE (email)
);

insert into user(name,contactNumber,email,password,status,role) values('admin','7768541234','admin1@gmail.com','admin1','true','admin');

create table subCategory(
  sub_category_id int NOT NULL AUTO_INCREMENT,
  sub_category_name varchar(255) NOT NULL,
  category_id integer NOT NULL,
  primary key(sub_category_id) ,
  foreign key(category_id) references category(category_id)
);

create table product(
  product_id int NOT NULL AUTO_INCREMENT,
  product_name varchar(255) NOT NULL,
  category_id integer NOT NULL,
  sub_category_id integer,
  product_image varchar(255) NOT NULL,
  product_images text DEFAULT NULL,
  product_description text,
  price float NOT NULL,
  qty_in_stk int(50) NOT NULL,
  reach_compliance varchar(20) NOT NULL,
  primary key(product_id) ,
  foreign key(category_id) references category(category_id)

);

create table categoryVariations(
  category_id int NOT NULL,
  sub_category_id int,
  composition varchar(255),
  width int(50),
  length int(50),
  height int(50),
  thickness int(50),
  unit_of_measurement varchar(100),
  color varchar(100),
  tpx_color_code varchar(100),
  tpg_color_code varchar(100),
  backing_cloth varchar(100),
  built_material varchar(100),
  design varchar(255),
  primary key(category_id),
  foreign key(category_id) references category(category_id)
);
