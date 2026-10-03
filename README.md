# Calculadora de troco
Número da Lista: 45
Conteúdo da Disciplina: Algoritmos ambiciosos

## Alunos
|Matrícula | Aluno |
| -- | -- |
| 211062698  |  Marcos Vinícius Lima Bezerra |
| 241031852  | Matheus Lemes Amaral |

## Sobre
Neste trabalho, será desenvolvido um sistema de cálculo de troco, utilizando e analisando o algoritmo ambicioso do trocador para encontrar uma combinação de moedas e cédulas que represente o valor do troco.

### O problema
Dado um conjunto de denominações (moedas e cédulas) e um valor de troco, encontrar uma forma de pagar esse valor usando a **menor quantidade possível de peças**.

### O algoritmo do trocador (cashier's algorithm)
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

**Exemplo:** troco de R$ 2,89 → 1 × R$ 2,00 + 1 × R$ 0,50 + 1 × R$ 0,25 + 1 × R$ 0,10 + 4 × R$ 0,01

### É ótimo?
Para sistemas como o real brasileiro, sim. Para sistemas arbitrários, não necessariamente: com denominações {1, 3, 4} e valor 6, o guloso retorna 4+1+1 (3 peças), mas o ótimo é 3+3 (2 peças). Esse comportamento será explorado no projeto.

## Screenshots
Adicione 3 ou mais screenshots do projeto em funcionamento.

## Instalação 
**Linguagem**: TypeScript <br>
**Framework**: React + Vite <br>

Pré-requisito: [Node.js](https://nodejs.org/) instalado.

    npm install
    npm run dev

## Uso 
Explique como usar seu projeto caso haja algum passo a passo após o comando de execução.

## Outros 
Quaisquer outras informações sobre seu projeto podem ser descritas abaixo.