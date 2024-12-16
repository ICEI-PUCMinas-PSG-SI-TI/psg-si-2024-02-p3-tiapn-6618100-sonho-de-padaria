## 3. Modelagem dos Processos de Negócio

### 3.1. Modelagem da situação atual (Modelagem AS IS)

Processo de Cadastro de Funcionário:
 - Candidato se apresenta para trabalhar na padaria;
 - Responsável preenche manualmente uma ficha com os dados pessoais do candidato;
 - Responsável pergunta ao candidato sobre sua experiência e função desejada;
 - Candidato confirma a função e salário acordado;
 - Responsável finaliza o cadastro do funcionário em um caderno ou arquivo manual.

   ![image](https://github.com/user-attachments/assets/c7832a55-9238-4869-a18e-d4d0e99602c4)

Processo de Estoque de Produto:
 - Fornecedor entrega os produtos na padaria;
 - Funcionário responsável pelo estoque recebe os produtos;
 - Funcionário confere manualmente a quantidade e qualidade dos produtos recebidos;
 - Funcionário registra a entrada dos produtos em um caderno ou planilha manual;
 - Funcionário armazena os produtos em seus respectivos locais (geladeira, prateleiras, etc.);
 - Funcionário monitora o estoque diariamente, verificando os níveis de produtos;
 - Quando algum produto está acabando, o funcionário anota a necessidade de reposição;
 - Funcionário solicita a compra de novos produtos ao responsável pela padaria.

   ![image](https://github.com/user-attachments/assets/931d1e57-11fa-4ab4-9302-52982ffab537)

Processo de Etiquetagem de Produto:
 - Funcionário procura o produto manualmente em uma lista de papel;
 - Caso seja vendido por peso, pesa o produto para calcular o valor;
 - Caso seja vendido por unidade, utiliza o valor fixo registrado em anotações;
 - Se o produto não estiver na lista, anota as informações para cadastro futuro;
 - Funcionário calcula manualmente o valor final do produto;
 - Preenche a etiqueta manualmente e a cola no produto;
 - Leva os produtos etiquetados para a área de venda.

   ![image](https://github.com/user-attachments/assets/ec8df964-794d-4922-86e3-87840dc73cbf)

Processo de Venda:
 - Cliente seleciona o produto desejado na loja;
 - Cliente dirige-se até o caixa para realizar a compra;
 - Caixa calcula manualmente o valor total da compra;
 - Caixa informa o valor total ao cliente;
 - Cliente realiza o pagamento conforme a forma escolhida (dinheiro ou cartão);
 - Funcionário detalha manualmente o que foi comprado para o cliente em uma formulário de vendas.
   
   ![image](https://github.com/user-attachments/assets/acd5829d-9e61-4139-b909-84ba7384e8a7)

### 3.2. Análises dos processos

Na situação descrita para os processos de venda, produção, cadastro de funcionário e estoque, diversos problemas podem ser identificados. No processo de venda, o cálculo manual dos valores pelo caixa é suscetível a erros, o que pode causar inconsistências nos preços e lentidão no atendimento, especialmente em horários de pico. Além disso, a falta de automação torna o processo menos eficiente e aumenta o risco de filas e insatisfação dos clientes.
No processo de etiquetagem, a busca manual de produtos em listas físicas torna o procedimento demorado e aumenta a chance de erros na identificação. A ausência de padronização no registro de preços, seja por peso ou unidade, gera inconsistências no valor final e falta de confiabilidade nos preços oferecidos ao cliente. A anotação manual de novos produtos resulta em informações perdidas ou atrasos na atualização, dificultando o controle de estoque e vendas. Além disso, a criação manual de etiquetas pode levar a problemas de legibilidade, impactando a experiência do cliente e ocasionando retrabalho no ponto de venda. Como resultado, o processo atual compromete a acurácia das informações, reduz a produtividade e afeta negativamente a operação como um todo.
No cadastro de funcionários, a coleta manual de dados e o preenchimento de fichas podem gerar atrasos e erros na documentação. A ausência de um sistema digital pode dificultar o acompanhamento da contratação e a gestão de informações importantes sobre o funcionário.
Por fim, no processo de estoque, a conferência e controle manual dos produtos podem resultar em erros de contagem, falta de insumos essenciais e desperdício por vencimento de produtos. A ausência de um sistema automatizado dificulta o monitoramento preciso das necessidades de reposição e a organização eficiente dos insumos, o que pode impactar diretamente a produção e as vendas.
Esses problemas demonstram a necessidade de otimizar os processos com o uso de sistemas automatizados para melhorar a precisão, agilidade e organização em todos os setores da padaria.

### 3.3. Descrição geral da proposta (Modelagem TO BE)

Processo de Venda:
 - Cliente escolhe o produto;
 - Cliente vai até o caixa;
 - O caixa registra o produto no sistema;
 - O sistema calcula automaticamente o valor total da compra;
 - O caixa informa o valor ao cliente;
 - Cliente efetua o pagamento em dinheiro, cartão ou outras formas eletrônicas;
 - O sistema emite o recibo de pagamento;
 - Caixa entrega o recibo e o produto ao cliente.

   ![image](https://github.com/user-attachments/assets/bdb60ac8-bc18-47a4-a1c7-805f19e7b87a)

Processo de Cadastro de Funcionário:
 - Gestor consulta funcionários no sistema;
 - Responsável pela contratação insere os dados do candidato no sistema;
 - O sistema cadastra o candidato como funcionário;
   
   ![image](https://github.com/user-attachments/assets/44a5b528-b08e-4fe9-9565-5d32b2799249)

Processo de Estoque:
 - Funcionário consulta os produtos no sistema;
 - O sistema verifica se o produto existe;
 - Caso negativo: o produto é cadastrado e o estoque é atualizado;
 - Caso positivo: o sistema monitora os níveis de estoque.
 - O sistema verifica se o estoque está abaixo do limite:
 - Caso esteja abaixo do limite: o funcionário realiza novas entradas e atualiza o estoque;
 - Caso não esteja abaixo do limite: o processo é finalizado.

  ![image](https://github.com/user-attachments/assets/5d975578-b1eb-4122-9e3f-92aeba912699)

Processo de Etiquetagem:
 - Funcionário pesquisa o produto;
 - Se o produto existir e for vendido ao kg, pesar o produto para verificar o valor;
 - Se o produto existir e for vendido a unidade, será utilizado o valor fixo;
 - Funcionário cadastra o produto, caso ele não exista.

   ![image](https://github.com/user-attachments/assets/d488f47a-4a74-419c-b72c-73bc9aa1efe6)
