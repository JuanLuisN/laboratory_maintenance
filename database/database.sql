create database lab_maintenance;

use lab_maintenance;

create table roles (
    id int primary key auto_increment,
    description varchar(50)
);

insert into roles (id, description) values (null, 'Admin');
insert into roles (id, description) values (null, 'User');

create table users (
    id int primary key auto_increment,
    username varchar(100),
    fullname varchar(100),
    email varchar(100),
    password varchar (255),
    fk_rol int,
    foreign key (fk_rol) references roles (id)
);

create table laboratory (
    id int primary key auto_increment,
    location varchar (200)
);

create table computer (
    id int primary key auto_increment,
    fk_laboratory int,
    serial_number varchar(200),
    brand varchar(200),
    network_type varchar (50),
    status varchar (50),
    foreign key (fk_laboratory) references laboratory (id)
);

create table computer_perhipheals(
    id int primary key auto_increment,
    fk_computer int,
    display varchar(100),
    keyboard varchar(100),
    mouse varchar(100),
    sound varchar(100)
);

create table computer_components(
   id int primary key auto_increment,
   fk_computer int,
   ram_memory varchar(100),
   motherboard varchar (100),
   cpu varchar (100),
   gpu varchar (100),
   psu varchar (100),
   storage varchar (100)
);

create table computer_maintenance(
    id int primary key auto_increment,
    fk_computer int,
    fixes varchar(500)
);

create table support_ticket(
    id int primary key auto_increment,
    fk_user int,
    fk_computer int,
    lifting_date varchar(100),
    required_fixes varchar(500),
    status varchar(50)
);