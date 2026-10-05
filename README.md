# Calculadora de troco
Número da Lista: 45
Conteúdo da Disciplina: Algoritmos ambiciosos

## Alunos
|Matrícula | Aluno |
| -- | -- |
| 211062698  |  Marcos Vinícius Lima Bezerra |
| 241031852  | Matheus Lemes Amaral |

## Sobre
Neste trabalho foi desenvolvida uma calculadora de troco que utiliza o algoritmo ambicioso do trocador para encontrar uma combinação de moedas e cédulas do real que represente o valor do troco, mostrando também o passo a passo da escolha de cada peça. O projeto foi hospedado e se encontra [neste link](https://greedy-calculadora-de-troco.vercel.app)

### O problema
Dado um conjunto de denominações (moedas e cédulas) e um valor de troco, encontrar uma forma de pagar esse valor usando a **menor quantidade possível de peças**.

### O algoritmo do trocador
A cada iteração, escolhe-se a peça de **maior valor que não ultrapasse** o valor restante, até que o restante seja zero. Se não houver nenhuma peça que caiba, não existe solução.

Pseudocódigo:

    ordenar as denominações em ordem decrescente
    S ← vazio
    enquanto restante ≠ 0:
        c ← maior denominação ≤ restante
        se não existir c: retornar "sem solução"
        restante ← restante − c
        S ← S ∪ {c}
    retornar S

**Exemplo:** troco de R$ 2,89 → 1 × R$ 2,00 + 1 × R$ 0,50 + 1 × R$ 0,25 + 1 × R$ 0,10 + 4 × R$ 0,01 (8 peças)

### É ótimo?
Para sistemas como o real brasileiro, sim. Para sistemas arbitrários, não necessariamente: com denominações {1, 3, 4} e valor 6, o guloso retorna 4+1+1 (3 peças), mas o ótimo é 3+3 (2 peças). Por isso a calculadora trabalha com o sistema monetário brasileiro, no qual o algoritmo ambicioso encontra sempre a solução mínima.

## Screenshots
![foto](/public/4.png)
![foto](/public/3.png)
![foto](/public/2.png)
![foto](/public/1.png)

## Instalação 
**Linguagem**: TypeScript <br>
**Framework**: React + Vite <br>

Pré-requisito: [Node.js](https://nodejs.org/) instalado.

    npm install
    npm run dev

Depois abra no navegador o endereço exibido no terminal (normalmente `http://localhost:5173`).

## Uso 
1. Informe o **valor devido** (o total da compra) e o **valor pago** (o que o cliente entregou). Use vírgula ou ponto para os centavos, por exemplo `7,11` ou `10`.
2. O troco é calculado automaticamente (valor pago − valor devido) e exibido no topo do resultado.
3. Abaixo do troco aparece a lista de moedas e cédulas escolhidas pelo algoritmo, com a quantidade de cada uma e o total de peças.
4. A seção **Passo a passo** mostra cada iteração do algoritmo: o valor restante, a maior peça que cabe nele, quantas vezes ela é usada e o novo restante. Peças iguais usadas em sequência aparecem agrupadas em uma única linha.

Exemplo: devido `7,11` e pago `10` → troco de R$ 2,89, pago com 8 peças (1 × R$ 2,00, 1 × R$ 0,50, 1 × R$ 0,25, 1 × R$ 0,10 e 4 × R$ 0,01).

Mensagens que podem aparecer:
- **Formato inválido**: o valor não segue o padrão `7,11` ou `10` (no máximo 2 casas decimais, sem sinal negativo).
- **Faltam R$ X**: o valor pago é menor que o devido.
- **Não há troco a dar**: o valor pago é igual ao devido.
- **Troco máximo**: o troco deve ser de até R$ 1.000.000,00.

## Outros 
- Todos os valores são tratados internamente em **centavos inteiros** (R$ 2,89 = 289), evitando erros de ponto flutuante como `0.1 + 0.2`.
- Complexidade: o algoritmo percorre cada denominação uma vez, portanto é O(n), com n igual ao número de denominações.
- Outros comandos:

      npm test        # executa os testes (Vitest)
      npm run lint    # verifica o código com ESLint
      npm run build   # gera a versão de produção

- Estrutura principal: `src/algorithms/greedy.ts` (algoritmo), `src/denominations.ts` (moedas e cédulas), `src/money.ts` (leitura e formatação de valores) e `src/App.tsx` (interface).