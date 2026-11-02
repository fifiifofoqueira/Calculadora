import { evaluate } from 'https://esm.sh/mathjs';

let Conta = "";
let Aparece = "";

const Calcular = document.getElementById("CalcularBotao");
const botoes = document.querySelectorAll(".grid-item:not(#CalcularBotao)");
const display = document.getElementById("calculoMostrar");

function CalcularConta() {
  let ParentesesAberto = Conta.split("(").length - 1; 
  let ParentesesFechado = Conta.split(")").length - 1; 

  // Agora seu while está seguro e recalcula o tamanho da string corretamente!
  while (ParentesesAberto > ParentesesFechado) {
    Conta += ")";
    ParentesesAberto = Conta.split("(").length - 1; 
    ParentesesFechado = Conta.split(")").length - 1; 
  }

  try {
    const resultado = evaluate(Conta);
    display.textContent = resultado;
    
    // CORREÇÃO AQUI: Atualiza as duas variáveis para o resultado atual
    Conta = String(resultado);
    Aparece = String(resultado); 
  } catch (erro) {
    display.textContent = "Expressão inválida";
    // Opcional: limpa as variáveis se der erro para o usuário recomeçar
    Conta = "";
    Aparece = "";
  }
}

Calcular.addEventListener("click", () => {
  CalcularConta();
});

botoes.forEach(botao => {
  botao.addEventListener("click", () => {
    if (botao.innerHTML === "√") {
      Conta += "sqrt(";       
      Aparece += "√(";        
    } else {
      Conta += botao.value;
      Aparece += botao.innerHTML;
    }
    display.textContent = Aparece;
  });
});
