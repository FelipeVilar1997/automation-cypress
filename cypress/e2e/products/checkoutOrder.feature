@logged
Feature: Checkout pedidos 

    Scenario Outline: Comprar produtos do carrinho
        Given estou na pagina de produtos
        When adiciono produto "<produto>" ao carrinho
        And seleciono para prosseguir para o carrinho
        And o produto esta no carrinho "<produto>"
        Then prossigo para a tela de checkout
        And valido se o endereco esta preenchido
        And valido se o resumo do pedido esta de acordo "<produto>" "<valorProduto>" "<quantidade>" "<frete>"
        And seleciono para prosseguir para o pagamento
        And preencho os dados de pagamento com cartao
        And valido se o pagamento e realizado com sucesso
        And retorno para a tela inicial

        
            Examples: 
                | produto          | valorProduto     | quantidade | frete |
                | Blue Top         | Rs. 500          | 1          | free  |