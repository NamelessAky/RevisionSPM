document.addEventListener('DOMContentLoaded', function () {
    const goLinks = document.querySelectorAll('.go-link');
    const passwordModal = document.getElementById('password-modal');
    const passwordInput = document.getElementById('password-input');
    const passwordSubmit = document.getElementById('password-submit');
    const passwordMessage = document.getElementById('password-message');
    const correctPassword = 'exam2024'; 
    let clickedLink;
    let countdownActive = false;

    goLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            clickedLink = link;
            passwordModal.style.display = 'block';
        });
    });

    passwordSubmit.addEventListener('click', function () {
        if (countdownActive) {
            return;
        }
    
        const enteredPassword = passwordInput.value;
        if (enteredPassword === correctPassword) {
            passwordModal.style.display = 'none';
            if (clickedLink) {
                window.location.href = clickedLink.getAttribute('data-href');
            }
        } else if (enteredPassword === '123') {
            passwordModal.style.display = 'none';
            window.location.href = 'data/Shh/index.html'; 
        } else {
            let countdown = 3;
            countdownActive = true;
            passwordMessage.textContent = `Password incorrect (${countdown}s)`;
            passwordMessage.style.display = 'block';
            passwordSubmit.disabled = true;
    
            const countdownInterval = setInterval(() => {
                countdown -= 1;
                if (countdown > 0) {
                    passwordMessage.textContent = `Password incorrect (${countdown}s)`;
                } else {
                    passwordMessage.style.display = 'none';
                    clearInterval(countdownInterval);
                    countdownActive = false;
                    passwordSubmit.disabled = false;
                }
            }, 1000);
        }
    });

    window.onclick = function (event) {
        if (event.target == passwordModal) {
            passwordModal.style.display = 'none';
            countdownActive = false;
        }
    };
});