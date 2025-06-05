
// PAGINA DE LOGIN //

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    
    // Validação de e-mail
    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    // Validação de senha
    function isValidPassword(password) {
        return password.length >= 6;
    }
    
    // Validação ao enviar o formulário
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Resetar erros
        emailError.style.display = 'none';
        passwordError.style.display = 'none';
        
        // Validar e-mail
        if (!email) {
            emailError.textContent = 'O e-mail é obrigatório';
            emailError.style.display = 'block';
            isValid = false;
        } else if (!isValidEmail(email)) {
            emailError.textContent = 'Por favor, insira um e-mail válido';
            emailError.style.display = 'block';
            isValid = false;
        }
        
        // Validar senha
        if (!password) {
            passwordError.textContent = 'A senha é obrigatória';
            passwordError.style.display = 'block';
            isValid = false;
        } else if (!isValidPassword(password)) {
            passwordError.textContent = 'A senha deve ter pelo menos 6 caracteres';
            passwordError.style.display = 'block';
            isValid = false;
        }
        
        // Se o formulário for válido, simular o login
        if (isValid) {
            // Mostrar animação de carregamento
            const submitBtn = loginForm.querySelector('.btn');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';
            submitBtn.disabled = true;
            
            // Simular requisição ao servidor
            setTimeout(() => {
                alert('Login realizado com sucesso! Redirecionando...');
                submitBtn.innerHTML = 'Entrar';
                submitBtn.disabled = false;
                
                // Aqui você redirecionaria para a página principal
                 window.location.href = '/index.html';
            }, 1500);
        }
    });
    
    // Validação em tempo real
    emailInput.addEventListener('input', function() {
        const email = emailInput.value.trim();
        if (email && !isValidEmail(email)) {
            emailError.textContent = 'Por favor, insira um e-mail válido';
            emailError.style.display = 'block';
        } else {
            emailError.style.display = 'none';
        }
    });
    
    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value.trim();
        if (password && !isValidPassword(password)) {
            passwordError.textContent = 'A senha deve ter pelo menos 6 caracteres';
            passwordError.style.display = 'block';
        } else {
            passwordError.style.display = 'none';
        }
    });
    
    // Efeitos de foco nos campos
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        control.addEventListener('focus', function() {
            this.parentElement.parentElement.classList.add('focused');
        });
        
        control.addEventListener('blur', function() {
            this.parentElement.parentElement.classList.remove('focused');
        });
    });
});
