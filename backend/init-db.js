async function injectData() {
  // Dados dos motoristas
  const drivers = [
    {
      name: 'Homer Simpson',
      description: 'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
      vehicle: 'Plymouth Valiant 1973 rosa e enferrujado',
      value: 2.50,
      min_km: 1,
    },
    {
      name: 'Dominic Toretto',
      description: 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
      vehicle: 'Dodge Charger R/T 1970 modificado',
      value: 5.00,
      min_km: 5,
    },
    {
      name: 'James Bond',
      description: 'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
      vehicle: 'Aston Martin DB5 clássico',
      value: 10.00,
      min_km: 10,
    }
  ];

  // Dados de avaliações
  const reviews = [
    {
      rating: 2,
      comment: 'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
      customerId: 'teste@email.com',
      driverId: 1,
    },
    {
      rating: 4,
      comment: 'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
      customerId: 'teste@email.com',
      driverId: 2,
    },
    {
      rating: 5,
      comment: 'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
      customerId: 'teste@email.com',
      driverId: 3,
    }
  ];

  // Dados do usuário Teste
  const user = {
    name: 'Teste',
    email: 'teste@email.com',
  };

  try {
    // Inserir usuário
    const userResponse = await fetch('http://localhost:8080/customer/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!userResponse.ok) {
      throw new Error('Erro ao inserir usuário');
    }

    const userData = await userResponse.json();
    console.log('Usuário inserido:', userData);

    // Inserir motoristas
    for (const driver of drivers) {
      const response = await fetch('http://localhost:8080/driver/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(driver),
      });

      if (!response.ok) {
        throw new Error('Erro ao inserir motorista');
      }

      const data = await response.json();
      console.log('Motorista inserido:', data);
    }

    // Inserir avaliações
    for (const review of reviews) {
  
      const reviewResponse = await fetch('http://localhost:8080/reviews/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });

      if (!reviewResponse.ok) {
        throw new Error('Erro ao inserir avaliação');
      }

      const reviewResult = await reviewResponse.json();
      console.log('Avaliação inserida:', reviewResult);
    }

    console.log('Dados inseridos com sucesso!');
  } catch (error) {
    console.error('Erro na injeção de dados:', error);
  }
}

// Chama a função de injeção de dados
injectData();
