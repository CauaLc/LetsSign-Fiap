document.addEventListener("DOMContentLoaded", () => {
  // Elementos do DOM
  const checkboxes = Array.from(document.querySelectorAll(".sig-checkbox"));
  const countEl = document.querySelector(".count");
  const sig2 = document.getElementById("sig2");
  const btnSign = document.getElementById("btnSign");

  // Atualiza o texto “X/2 Assinaturas”
  function updateCount() {
    const total = checkboxes.length;
    const checked = checkboxes.filter((chk) => chk.checked).length;
    countEl.textContent = `${checked}/${total} Assinaturas`;
  }

  // Habilita/desabilita e troca a classe do botão
  function toggleSignButton() {
    if (sig2.checked) {
      btnSign.disabled = false;
      btnSign.classList.replace("btn-secondary", "btn-success");
    } else {
      btnSign.disabled = true;
      btnSign.classList.replace("btn-success", "btn-secondary");
    }
  }

  // Quando qualquer checkbox mudar, atualiza contador e botão
  checkboxes.forEach((chk) => {
    chk.addEventListener("change", () => {
      updateCount();
      toggleSignButton();
    });
  });

  // Estado inicial
  updateCount();
  toggleSignButton();

  // Redireciona ao clicar em “Assinar”
  btnSign.addEventListener("click", () => {
    // só redireciona se o botão estiver habilitado
    if (!btnSign.disabled) {
      window.location.href = "nome.html";
    }
  });
});
