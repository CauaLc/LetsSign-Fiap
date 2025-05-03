document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formLogin');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const email = document.getElementById('email');
      const senha = document.getElementById('senha');
      let valido = true;
  
      if (!email.value.trim()) {
        email.classList.add('is-invalid');
        valido = false;
      } else {
        email.classList.remove('is-invalid');
      }
  
      if (!senha.value.trim()) {
        senha.classList.add('is-invalid');
        valido = false;
      } else {
        senha.classList.remove('is-invalid');
      }
  
      if (valido) {
        alert("Login simulado com sucesso!");
      }
    });
  });
  