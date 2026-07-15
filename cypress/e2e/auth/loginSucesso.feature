Feature: Login    

    Scenario Outline: Realizar login com sucesso
        Given que acesso a tela de login
        When informo o email "<email>"
        And informo a senha "<senha>"
        And clico no botao de login
        Then devo visualizar o resultado "<feedback>" do sistema

        Examples:    
            | email                  |senha    | feedback                             |
            | teste2021@teste.com.br |teste    | Teste Automacao                      |
    
    Scenario Outline: Tentativa login invalido
        Given que acesso a tela de login
        When informo o email "<email>"
        And informo a senha "<senha>"
        And clico no botao de login
        Then devo visualizar o resultado "<feedback>" do sistema

        Examples:    
            | email                  |senha    | feedback                             |
            | teste221@teste.com.br  |teste    | Your email or password is incorrect! |
            | teste2021@teste.com.br |teste123 | Your email or password is incorrect! |
