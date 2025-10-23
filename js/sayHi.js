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
// DYNAMIC BUTTON FILL ANIMATION
// ===========================

const btnBack = document.querySelector('.btn-back');
const btnSend = document.querySelector('.btn-send');
const messageInput = document.querySelector('textarea[name="message"]');

// Track which button should be filled
let activeButton = null;

// Back button hover - show fill on back button, empty send button
if (btnBack) {
    btnBack.addEventListener('mouseenter', function(e) {
        activeButton = 'back';
        btnSend.classList.remove('filled');
        
        const rect = btnBack.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        btnBack.style.setProperty('--x', x + 'px');
        btnBack.style.setProperty('--y', y + 'px');
    });
    
    btnBack.addEventListener('mousemove', function(e) {
        const rect = btnBack.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        btnBack.style.setProperty('--x', x + 'px');
        btnBack.style.setProperty('--y', y + 'px');
    });

    btnBack.addEventListener('mouseleave', function() {
        activeButton = null;
        // Check if user is typing, if yes, fill send button
        if (messageInput && messageInput.value.trim().length > 0) {
            btnSend.classList.add('filled');
        }
    });
}

// Send button hover - show fill animation
if (btnSend) {
    btnSend.addEventListener('mouseenter', function(e) {
        activeButton = 'send';
        
        const rect = btnSend.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        btnSend.style.setProperty('--x', x + 'px');
        btnSend.style.setProperty('--y', y + 'px');
    });
    
    btnSend.addEventListener('mousemove', function(e) {
        const rect = btnSend.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        btnSend.style.setProperty('--x', x + 'px');
        btnSend.style.setProperty('--y', y + 'px');
    });
}

// While typing - keep send button filled
if (messageInput) {
    messageInput.addEventListener('input', () => {
        if (messageInput.value.trim().length > 0 && activeButton !== 'back') {
            btnSend.classList.add('filled');
        } else {
            btnSend.classList.remove('filled');
        }
    });

    messageInput.addEventListener('focus', () => {
        if (messageInput.value.trim().length > 0 && activeButton !== 'back') {
            btnSend.classList.add('filled');
        }
    });
}

// ===========================
// CONTACT FORM SUBMISSION WITH WEB3FORMS
// ===========================

const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const name = contactForm.querySelector('input[name="name"]').value;
    const email = contactForm.querySelector('input[name="email"]').value;
    const message = contactForm.querySelector('textarea[name="message"]').value;
    const accessKey = contactForm.querySelector('input[name="access_key"]').value;
    
    // Create dynamic subject
    const subject = `💼 Say Hi from ${name}`;
    
    console.log('📧 Submitting form with subject:', subject);
    
    // Disable button
    btnSend.disabled = true;
    btnSend.querySelector('span').textContent = 'Sending...';
    
    // Prepare form data for Web3Forms
    const formData = new FormData();
    formData.append('access_key', accessKey);
    formData.append('subject', subject);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    formData.append('from_name', 'Say Hi Page');
    
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            console.log('✅ Message sent successfully!');
            showSuccess();
        } else {
            console.error('❌ Error:', data);
            showError();
        }
        
    } catch (error) {
        console.error('❌ Network error:', error);
        showError();
    }
});

function showSuccess() {
    console.log('🎉 Success! Showing Spider-Man...');
    
    // Show success message
    successMessage.classList.add('show');
    btnSend.querySelector('span').textContent = 'Sent! ✓';
    
    // Show Spider-Man animation
    showSpidermanSwing();
    
    console.log('⏱️ Will redirect in 3 seconds...');
    
    // After Spider-Man completes (3 seconds), redirect to main portfolio
    setTimeout(() => {
        console.log('🔄 Redirecting to index.html...');
        window.location.href = 'index.html';
    }, 3000);
}

function showError() {
    errorMessage.classList.add('show');
    btnSend.disabled = false;
    btnSend.querySelector('span').textContent = 'send →';
    
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 5000);
}

// ===========================
// SPIDER-MAN SWINGING ANIMATION
// ===========================

function showSpidermanSwing() {
    console.log('🕷️ Creating Spider-Man element...');
    
    const spideyContainer = document.createElement('div');
    spideyContainer.className = 'spidey-animation-wrapper';
    spideyContainer.innerHTML = `
        <div class="spidey-swing">
            <div class="web-swing"></div> 
            <div class="spidey-sense-anim"></div>
            <div class="head">
                <div class="eye left"></div>
                <div class="eye right"></div>
            </div>
            <div class="body">
                <div class="neck"></div>
                <div class="arm left">
                    <div class="forearm">
                        <div class="finger"></div>
                        <div class="finger"></div>
                        <div class="finger"></div>
                    </div>
                </div>
                <div class="arm right">
                    <div class="forearm">
                        <div class="finger"></div>
                        <div class="finger"></div>
                        <div class="finger"></div>
                    </div>
                </div>
                <div class="lowerbody">
                    <div class="leg right">
                        <div class="boot">
                            <div class="foot"></div>
                        </div>
                    </div>
                    <div class="leg left">
                        <div class="boot">
                            <div class="foot"></div>
                        </div>
                    </div>
                </div>
                <div class="emblem">
                    <div class="emblem-leg-tl"></div>
                    <div class="emblem-leg-tr"></div>
                    <div class="emblem-leg-bl"></div>
                    <div class="emblem-leg-br"></div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(spideyContainer);
    console.log('✅ Spider-Man added to DOM and swinging!');
    
    // Remove after animation completes (3 seconds)
    setTimeout(() => {
        spideyContainer.remove();
        console.log('✅ Spider-Man removed from DOM');
    }, 3000);
}

console.log('💼 Contact form handler loaded!');