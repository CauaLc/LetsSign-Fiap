document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formCadastro');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const campos = form.querySelectorAll('input');
      let valido = true;
  
      campos.forEach(campo => {
        if (!campo.value.trim()) {
          campo.classList.add('is-invalid');
          valido = false;
        } else {
          campo.classList.remove('is-invalid');
        }
      });
  
      const senha = form.querySelector('input[placeholder="Senha"]');
      const confirmar = form.querySelector('input[placeholder="Confirmar Senha"]');
      
      if (senha.value !== confirmar.value) {
        confirmar.classList.add('is-invalid');
        valido = false;
      } else if (confirmar.value) {
        confirmar.classList.remove('is-invalid');
      }
  
      if (valido) {
        window.location.href = 'login.html';
      }
    });
  });
  