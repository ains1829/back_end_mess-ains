create database message_ains;
create table user_message (
  iduser serial primary key ,
  name_user varchar(255) ,
  first_name varchar(255),
  birthday date ,
  photo_user text
);
INSERT INTO user_message (name_user, first_name, birthday, photo_user) VALUES
('Rakoto', 'Jean', '1990-05-12', 'boy-6281260_640.jpg'),
( 'Randria', 'Marie', '1995-08-21', 'child-3473596_640.jpg'),
('Rasoanaivo', 'Paul', '2000-02-14', 'kid-7152758_640.jpg'),
('Andrianina', 'Sophie', '1988-11-03', 'male-5321547_640.jpg'),
('Rakotomalala', 'Luc', '1993-07-09', 'portrait-7942151_640.jpg');
