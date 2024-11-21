-- Inserção dos registros na tabela Driver
INSERT INTO Driver (name, description, vehicle, value, min_km)
VALUES
('Homer Simpson', 'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).', 
 'Plymouth Valiant 1973 rosa e enferrujado', 2.50, 1),
('Dominic Toretto', 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.', 
 'Dodge Charger R/T 1970 modificado', 5.00, 5),
('James Bond', 'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.', 
 'Aston Martin DB5 clássico', 10.00, 10);


-- Inserção das avaliações dos motoristas (considerando customerId como UUID)

INSERT INTO DriverReview (rating, comment, driverId, customerId)
VALUES
(2, 'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.', 1, 'uuid-da-customer-1'),
(4, 'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!', 2, 'uuid-da-customer-2'),
(5, 'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.', 3, 'uuid-da-customer-3');