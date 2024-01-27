Feature: Deletar uma instância de Usuário

  Scenario: Deve remover uma instância existente de Usuário
    Given inicio a remocao de um usuário passando o id 1
    Then o resultado da remocao deve ser de sucesso
    And não deve retornar nada

  Scenario: Não deve remover nenhuma instância de Usuário
    Given inicio a remocao de um usuário passando um id nulo
    Then o resultado da remocao deve ser de erro
    And deve retornar a mensagem de erro '"id" is a required field'
