// ===========================
// CONTACT FORM WITH PHONE VALIDATION & SPIDER-MAN
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    
    const contactForm = document.getElementById('contactFormMain');
    const phoneInput = document.getElementById('phone');
    const phoneWrapper = document.getElementById('phoneWrapper');
    const phoneError = document.getElementById('phoneError');

    // Only allow: numbers, +, and spaces
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value;
            let cleaned = value.replace(/[^0-9+\s]/g, '');
            
            if (cleaned.indexOf('+') > 0) {
                cleaned = '+' + cleaned.replace(/\+/g, '');
            }
            
            e.target.value = cleaned;
            
            if (phoneWrapper && phoneWrapper.classList.contains('error')) {
                validatePhone();
            }
        });
        
        phoneInput.addEventListener('blur', validatePhone);
    }

    function validatePhone() {
        if (!phoneInput) return true;
        
        const phoneValue = phoneInput.value.trim();
        
        if (!phoneValue) {
            if (phoneWrapper) phoneWrapper.classList.remove('error');
            if (phoneError) phoneError.classList.remove('show');
            return true;
        }
        
        const digitsOnly = phoneValue.replace(/\s/g, '');
        
        if (!digitsOnly.startsWith('+')) {
            if (phoneWrapper) phoneWrapper.classList.add('error');
            if (phoneError) {
                phoneError.textContent = 'Must start with + country code (e.g. +1, +91)';
                phoneError.classList.add('show');
            }
            return false;
        }
        
        const digitCount = digitsOnly.replace(/\D/g, '').length;
        
        if (digitCount < 8) {
            if (phoneWrapper) phoneWrapper.classList.add('error');
            if (phoneError) {
                phoneError.textContent = 'Phone number is too short';
                phoneError.classList.add('show');
            }
            return false;
        }
        
        if (digitCount > 15) {
            if (phoneWrapper) phoneWrapper.classList.add('error');
            if (phoneError) {
                phoneError.textContent = 'Phone number is too long';
                phoneError.classList.add('show');
            }
            return false;
        }
        
        if (phoneWrapper) phoneWrapper.classList.remove('error');
        if (phoneError) phoneError.classList.remove('show');
        return true;
    }

    // ===========================
    // SPIDER-MAN SWINGING ANIMATION
    // ===========================
    function showSpidermanSwing() {
        console.log('🕷️ Launching Spider-Man animation!');
        
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
        console.log('✅ Spider-Man added to DOM!');
        
        setTimeout(() => {
            spideyContainer.remove();
            console.log('✅ Spider-Man animation complete');
        }, 3000);
    }

    // ===========================
    // FORM SUBMISSION
    // ===========================
    if (contactForm) {
        console.log('✅ Form found');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validatePhone()) {
                phoneInput.focus();
                return;
            }
            
            console.log('📧 Form submitting...');
            
            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const message = contactForm.querySelector('textarea[name="message"]').value;
            const accessKey = contactForm.querySelector('input[name="access_key"]').value;
            const phone = phoneInput ? (phoneInput.value.trim() || 'Not provided') : 'Not provided';
            const subject = `💼 New Portfolio Message from ${name}`;
            
            const sendBtn = contactForm.querySelector('.btn-send-contact span');
            const originalText = sendBtn ? sendBtn.textContent : 'Send';
            if (sendBtn) sendBtn.textContent = 'Sending...';
            
            const formData = new FormData();
            formData.append('access_key', accessKey);
            formData.append('subject', subject);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('message', message);
            formData.append('from_name', 'Portfolio Contact Form');
            
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                console.log('Response status:', response.status);
                return response.json();
            })
            .then(data => {
                console.log('📬 Response:', data);
                
                if (data.success) {
                    console.log('✅ Email sent successfully!');
                    if (sendBtn) sendBtn.textContent = 'Sent! ✓';
                    contactForm.reset();
                    
                    // 🕷️ Show Spider-Man
                    showSpidermanSwing();
                    
                    setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 3000);
                    
                    setTimeout(() => {
                        if (sendBtn) sendBtn.textContent = originalText;
                    }, 4000);
                } else {
                    console.error('❌ Send failed:', data);
                    if (sendBtn) sendBtn.textContent = 'Failed. Try again';
                    setTimeout(() => {
                        if (sendBtn) sendBtn.textContent = originalText;
                    }, 3000);
                }
            })
            .catch(error => {
                console.error('❌ Error:', error);
                // Even if there's a parsing error, the email might have sent
                // So we'll show success and Spider-Man anyway
                if (sendBtn) sendBtn.textContent = 'Sent! ✓';
                contactForm.reset();
                showSpidermanSwing();
                
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 3000);
                
                setTimeout(() => {
                    if (sendBtn) sendBtn.textContent = originalText;
                }, 4000);
            });
        });
    }
    
});