// ===========================
// CUSTOM CURSOR
// ===========================

const cursor = document.getElementById('cursor');
const hoverElements = document.querySelectorAll('[data-hover]');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// ===========================
// BUTTON FILL FOLLOWS CURSOR 
// ===========================

const contactBtns = document.querySelectorAll('.btn-back, .btn-send');

contactBtns.forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--x', x + 'px');
        button.style.setProperty('--y', y + 'px');
    });
    
    button.addEventListener('mousemove', function(e) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--x', x + 'px');
        button.style.setProperty('--y', y + 'px');
    });
});

// ===========================
// SHOW/HIDE SEND BUTTON
// ===========================

const messageInput = document.getElementById('messageInput');
const btnSend = document.getElementById('btnSend');

messageInput.addEventListener('input', () => {
    if (messageInput.value.trim().length >= 2) {
        btnSend.classList.add('visible');
    } else {
        btnSend.classList.remove('visible');
    }
});

// ===========================
// FORM SUBMISSION
// ===========================

const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const message = messageInput.value.trim();
    
    if (message.length < 2) {
        return;
    }

    // Disable button while sending
    btnSend.disabled = true;
    btnSend.style.opacity = '0.5';

    try {
        // ===========================
        // FORMSPREE INTEGRATION
        // ===========================
        // Replace YOUR_FORM_ID with your actual Formspree form ID
        
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message
            })
        });

        if (response.ok) {
            showSuccess();
        } else {
            showError();
        }

    } catch (error) {
        showError();
    }
});

function showSuccess() {
    successMessage.classList.add('show');
    messageInput.value = '';
    btnSend.classList.remove('visible');
    btnSend.disabled = false;

    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 5000);
}

function showError() {
    errorMessage.classList.add('show');
    btnSend.disabled = false;
    btnSend.style.opacity = '1';

    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 5000);
}

console.log('Contact page loaded! ✨');