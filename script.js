
import { evaluate } from 'https://esm.sh/mathjs';

let Conta = "";

const Calcular = document.getElementById("CalcularBotao");
const botoes = document.querySelectorAll(".grid-item:not(#CalcularBotao)");
const display = document.getElementById("calculoMostrar");

function CalcularConta() {
  try {
    const resultado = evaluate(Conta);
    display.textContent = resultado;
    Conta = String(resultado);
  } catch (erro) {
    display.textContent = "Expressão inválida";
  }
}

Calcular.addEventListener("click", () => {
  CalcularConta();
});

botoes.forEach(botao => {
  botao.addEventListener("click", () => {
    Conta += botao.value;
    display.textContent = Conta;
  });
});
