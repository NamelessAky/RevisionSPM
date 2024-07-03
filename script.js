document.addEventListener('DOMContentLoaded', function () {
    changeAnnouncement()
    
    const goLinks = document.querySelectorAll('.go-link');
    const passwordModal = document.getElementById('password-modal');
    const passwordInput = document.getElementById('password-input');
    const passwordSubmit = document.getElementById('password-submit');
    const passwordMessage = document.getElementById('password-message');
    
    const passwordMap = {
        'id001': '', //RC PPT T4
        'id002': '', //RC PPT T5
        'id003': 'skba', //SK PPT BA
        'id004': '', //SK PPT BB
    };
    
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
        const linkId = clickedLink ? clickedLink.id : '';
        const correctPassword = passwordMap[linkId];
    
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

    function adjustBackgroundBrightness() {
        const hour = new Date().getHours();
        let brightness;
    
        if (hour >= 6 && hour < 12) {
            brightness = 1;
        } else if (hour >= 12 && hour < 18) {
            brightness = 0.8;
        } else {
            brightness = 0.5;
        }
    
        const backgroundOverlay = document.querySelector('.background-overlay');
        if (backgroundOverlay) {
            if (brightness === 0.5) {
                backgroundOverlay.style.backgroundColor = 'rgba(10, 5, 60, 0.6)';
            } else {
                backgroundOverlay.style.backgroundColor = `rgba(0, 0, 0, ${1 - brightness})`;
            }
        }
    }
    
    adjustBackgroundBrightness();
});

function changeAnnouncement() {
    var content = {
        h1: "公告 v1.3",
        h2: "项目移除通知",
        h3: "因为老师，诶不是，资料提供者要睡觉，就没更新啦那个SK PPT Bahagian A的部分了哈",
        p: "收工睡觉~~额，不对，你怎么这个时间在这里？" 
    };

    var announcementDiv = document.getElementById("announcement");

    var hasContent = false;

    Object.keys(content).forEach(function(tagName) {
        var element = announcementDiv.querySelector(tagName);
        if (element) {
            element.textContent = content[tagName];
            if (content[tagName].trim() === "") {
                element.style.display = "none";
            } else {
                element.style.display = "block"; 
                hasContent = true; 
            }
        }
    });

    var hrElement = announcementDiv.querySelector('hr');
    var pElement = announcementDiv.querySelector('p');
    if (hrElement && pElement && pElement.style.display === "none") {
        hrElement.style.display = "none";
    } else {
        hrElement.style.display = "block";
    }

    announcementDiv.style.display = hasContent ? "block" : "none";
}