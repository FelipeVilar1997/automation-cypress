Feature: Busca de produtos 

    Scenario Outline: Buscar produto disponivel
        Given estou na tela de produtos 
        When realizo a busca de um produto "<produto>" 
        And seleciono o produto "<produto>"
        Then valido o nome "<produto>"
        And valido o valor "<valor>"
        And valido a disponibilidade "<disponibilidade>"
        And valido a condicao "<condicao>"
        And valido o tipo "<tipo>"
        
            Examples: 
                | produto          | disponibilidade | condicao | tipo   | valor    |
                | Blue Top         | In Stock        | New      | Polo   | Rs. 500  |
                | Men Tshirt       | In Stock        | New      | H&M    | Rs. 400  |
                | Sleeveless Dress | In Stock        | New      | Madame | Rs. 1000 |
                | Stylish Dress    | In Stock        | New      | Madame | Rs. 1500 |

    Scenario Outline: Buscar produto e adicionar ao carrinho
        Given estou na tela de produtos
        When realizo a busca de um produto "<produto>" 
        And seleciono o produto "<produto>"
        And adiciono ao carrinho
        Then valido se o produto "<produto>" foi adicionado com sucesso

            Examples: 
                | produto          | disponibilidade | condicao | tipo   | valor    |
                | Blue Top         | In Stock        | New      | Polo   | Rs. 500  |
