// Importa a função 'evaluate' da biblioteca Math.js para processar as strings matemáticas
import { evaluate } from 'https://esm.sh/mathjs';

// Variáveis de controle de texto (armazenam as strings dos cálculos)
let Conta = "";    // Guarda a expressão no formato que o Math.js entende (ex: 2 + sqrt(9))
let Aparece = "";  // Guarda a expressão no formato amigável para o usuário ver (ex: 2 + √(9))

// Seleção dos elementos do HTML (DOM)
const Calcular = document.getElementById("CalcularBotao"); // Botão "="
const botoes = document.querySelectorAll(".grid-item:not(#CalcularBotao)"); // Todos os botões, exceto o "="
const display = document.getElementById("calculoMostrar"); // Tela de exibição da calculadora

/**
 * Função responsável por validar parênteses, calcular a expressão e atualizar o display
 */
function CalcularConta() {
  // Conta quantas vezes "(" e ")" aparecem na string usando a técnica do .split().length - 1
  let ParentesesAberto = Conta.split("(").length - 1; 
  let ParentesesFechado = Conta.split(")").length - 1; 

  // Corrige parênteses esquecidos: adiciona ")" ao final enquanto houver mais abertos que fechados
  while (ParentesesAberto > ParentesesFechado) {
    Conta += ")";
    
    // Atualiza as contagens para verificar se o laço 'while' já pode ser encerrado
    ParentesesAberto = Conta.split("(").length - 1; 
    ParentesesFechado = Conta.split(")").length - 1; 
  }

  // Bloco de tratamento de erros para efetuar o cálculo com segurança
  try {
    // Avalia a string matemática da variável 'Conta' e devolve o número final
    const resultado = evaluate(Conta);
    
    // Mostra o resultado final diretamente na tela da calculadora
    display.textContent = resultado;
    
    // MODIFICAÇÃO SOLICITADA: Limpa a memória para que o próximo clique comece uma nova conta do zero
    Conta = "";
    Aparece = ""; 
    
  } catch (erro) {
    // Se o usuário digitar algo logicamente impossível (ex: "++2"), cai aqui
    display.textContent = "Expressão inválida";
    
    // Reseta as variáveis em caso de erro para o usuário recomeçar de forma limpa
    Conta = "";
    Aparece = "";
  }
}

// Ouvinte de clique: Quando clicar no botão "=", executa a função de cálculo
Calcular.addEventListener("click", () => {
  CalcularConta();
});

// Varre todos os botões numéricos e de operadores para capturar os cliques
botoes.forEach(botao => {
  botao.addEventListener("click", () => {
    
    // Caso especial: se o botão clicado for o de raiz quadrada
    if (botao.innerHTML === "√") {
      Conta += "sqrt(";   // Adiciona a sintaxe padrão exigida pela biblioteca Math.js
      Aparece += "√(";    // Adiciona o formato bonito/visual que o usuário espera na tela
    } 
    // Caso comum: para qualquer outro número ou operador (+, -, *, /, etc)
    else {
      Conta += botao.value;     // Adiciona o valor técnico do botão (ex: de um botão com value="*")
      Aparece += botao.innerHTML; // Adiciona o texto visível do botão (ex: de um botão com innerHTML="×")
    }
    
    // Atualiza o visor da calculadora a cada tecla pressionada
    display.textContent = Aparece;
  });
});
