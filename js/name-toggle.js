// js/scripts.js
document.addEventListener("DOMContentLoaded", () => {
  const nomeInput = document.getElementById("nome");
  const nascInput = document.getElementById("nascimento");
  const btnNext = document.getElementById("btnNext");
  const toggle = document.querySelector(".calendar-toggle");

  // inicializa o flatpickr no input de data
  const fp = flatpickr("#nascimento", {
    locale: "pt",
    dateFormat: "d/m/Y",
    allowInput: true,
  });

  // dispara o calendário ao clicar no ícone
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    fp.open();
  });

  // regex Unicode: só letras e espaços, vários nomes separados por espaços
  const nameRegex = /^\p{L}+(?:\s+\p{L}+)*$/u;
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

  function updateButtonState() {
    const validName = nameRegex.test(nomeInput.value.trim());
    const validDate = dateRegex.test(nascInput.value);
    if (validName && validDate) {
      btnNext.disabled = false;
      btnNext.classList.replace("btn-secondary", "btn-primary");
    } else {
      btnNext.disabled = true;
      btnNext.classList.replace("btn-primary", "btn-secondary");
    }
  }

  // sempre que o usuário digitar algo
  nomeInput.addEventListener("input", updateButtonState);
  nascInput.addEventListener("input", updateButtonState);

  // estado inicial
  updateButtonState();

  // navegar para next.html quando clicar
  btnNext.addEventListener("click", () => {
    if (!btnNext.disabled) {
      window.location.href = "nome.html";
    }
  });
});
