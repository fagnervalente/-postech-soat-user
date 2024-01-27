Feature: Criar uma nova instância de Usuário

  Scenario: Deve criar uma nova instância de Usuário
    Given inicio a criação de um usuário passando dados válidos
    Then o resultado deve ser de sucesso
    And deve retornar o usuário criado

  Scenario: Não Deve criar uma nova instância de Usuário já existente
    Given inicio a criação de um usuário passando o cpf "51650096291" já registrado
    Then o resultado deve ser de erro
    And não deve retornar nenhum usuário e a mensagem de erro "CPF informed is already registered in our system"
