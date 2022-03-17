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
    fk_computer_p int primary key,
    display varchar(100),
    keyboard varchar(100),
    mouse varchar(100),
    sound varchar(100),
    foreign key(fk_computer_p)references computer(id)
);

create table computer_components(
   fk_computer_c int primary key,
   ram_memory varchar(100),
   motherboard varchar (100),
   cpu varchar (100),
   gpu varchar (100),
   psu varchar (100),
   storage varchar (100),
   foreign key(fk_computer_c)references computer(id)
);

create table computer_maintenance(
    id int primary key auto_increment,
    fk_computer int,
    fixes varchar(500),
    maintenance_date TIMESTAMP NOT NULL DEFAULT current_timestamp
);

create table support_ticket(
    id int primary key auto_increment,
    fk_user int,
    fk_computer int,
    lifting_date TIMESTAMP NOT NULL DEFAULT current_timestamp,
    required_fixes varchar(500),
    status varchar(50),
    FOREIGN KEY(fk_user)REFERENCES users(id),
    FOREIGN KEY(fk_computer)REFERENCES computer(id)
);

DELIMITER //
CREATE TRIGGER `DeleteComputer` BEFORE DELETE ON `computer` FOR EACH ROW BEGIN
	DELETE FROM computer_components WHERE fk_computer_c = OLD.id;
	DELETE FROM computer_maintenance WHERE fk_computer = OLD.id;
	DELETE FROM computer_perhipheals WHERE fk_computer_p = OLD.id;
	DELETE FROM support_ticket WHERE fk_computer = OLD.id;
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `DeleteLaboratory` BEFORE DELETE ON `laboratory` FOR EACH ROW BEGIN
	DELETE FROM computer WHERE fk_laboratory = OLD.id;
END//
DELIMITER ;