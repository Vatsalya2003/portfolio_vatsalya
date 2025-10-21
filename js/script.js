// ===========================
// CUSTOM CURSOR
// ===========================

const cursor = document.getElementById('cursor');
const hoverElements = document.querySelectorAll('[data-hover]');

// Track cursor position
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Check if cursor is over actual text
    const element = document.elementFromPoint(e.clientX, e.clientY);
    
    if (element) {
        const isTextElement = element.matches('.hero-title, .hero-title *, .hero-description, .section-title, .section-subtitle, .project-description, .skill-name, .education-degree') ||
                             element.closest('.hero-title, .hero-description, .section-title, .section-subtitle, .project-description, .skill-name, .education-degree');
        
        const isButton = element.matches('[data-hover]') || element.closest('[data-hover]');
        
        if (isButton) {
            cursor.classList.remove('text-mode', 'text-large', 'text-medium', 'text-small');
        } else if (isTextElement) {
            // Get text content at cursor position
            const range = document.caretRangeFromPoint(e.clientX, e.clientY);
            
            if (range && range.startContainer.nodeType === Node.TEXT_NODE) {
                const textContent = range.startContainer.textContent;
                const offset = range.startOffset;
                
                // Check if cursor is over a non-space character
                if (textContent[offset] && textContent[offset].trim() !== '') {
                    cursor.classList.add('text-mode');
                    
                    // Determine size based on element
                    if (element.closest('.hero-title') || element.matches('.hero-title *')) {
                        cursor.classList.add('text-large');
                        cursor.classList.remove('text-medium', 'text-small');
                    } else if (element.closest('.section-title')) {
                        cursor.classList.add('text-large');
                        cursor.classList.remove('text-medium', 'text-small');
                    } else if (element.closest('.hero-description')) {
                        cursor.classList.add('text-medium');
                        cursor.classList.remove('text-large', 'text-small');
                    } else {
                        cursor.classList.add('text-small');
                        cursor.classList.remove('text-large', 'text-medium');
                    }
                } else {
                    cursor.classList.remove('text-mode', 'text-large', 'text-medium', 'text-small');
                }
            } else {
                cursor.classList.remove('text-mode', 'text-large', 'text-medium', 'text-small');
            }
        } else {
            cursor.classList.remove('text-mode', 'text-large', 'text-medium', 'text-small');
        }
    }
});

// Hover elements
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursor.classList.remove('text-mode', 'text-large', 'text-medium', 'text-small');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});


// ===========================
// BUTTON FILL FOLLOWS CURSOR
// ===========================

const allButtons = document.querySelectorAll('.btn');

allButtons.forEach(button => {
    const fill = button.querySelector('.btn-fill');
    
    if (fill) {
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
    }
});

// ===========================
// BENTO CARD + SKILL TAG CASCADE FILL EFFECT
// ===========================
const bentoCards = document.querySelectorAll('.bento-card');

bentoCards.forEach(card => {
    const skillTags = card.querySelectorAll('.skill-tag');
    let isHoveringTag = false;
    
    // Main card fill
    card.addEventListener('mouseenter', function(e) {
        if (!isHoveringTag) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--x', x + 'px');
            card.style.setProperty('--y', y + 'px');
        }
    });
    
    card.addEventListener('mousemove', function(e) {
        if (!isHoveringTag) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--x', x + 'px');
            card.style.setProperty('--y', y + 'px');
        }
    });
    
    // Skill tag cascade effect
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function(e) {
            isHoveringTag = true;
            
            // Force empty main card by adding a class
            card.classList.add('tag-hover');
            
            // Add fill effect to skill tag
            tag.style.position = 'relative';
            tag.style.overflow = 'hidden';
            
            // Create fill element if it doesn't exist
            let tagFill = tag.querySelector('.tag-fill');
            if (!tagFill) {
                tagFill = document.createElement('div');
                tagFill.className = 'tag-fill';
                tagFill.style.cssText = `
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.2);
                    transform: translate(-50%, -50%);
                    transition: width 0.6s cubic-bezier(0.22, 0.61, 0.36, 1),
                                height 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
                    z-index: 0;
                    pointer-events: none;
                `;
                tag.appendChild(tagFill);
            }
            
            // Set cursor position for tag
            const rect = tag.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            tagFill.style.left = x + 'px';
            tagFill.style.top = y + 'px';
            tagFill.style.width = '300%';
            tagFill.style.height = '300%';
        });
        
        tag.addEventListener('mousemove', function(e) {
            const tagFill = tag.querySelector('.tag-fill');
            if (tagFill) {
                const rect = tag.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                tagFill.style.left = x + 'px';
                tagFill.style.top = y + 'px';
            }
        });
        
        tag.addEventListener('mouseleave', function(e) {
            isHoveringTag = false;
            
            // Remove empty state from main card
            card.classList.remove('tag-hover');
            
            // Empty skill tag (reset fill)
            const tagFill = tag.querySelector('.tag-fill');
            if (tagFill) {
                tagFill.style.width = '0';
                tagFill.style.height = '0';
                
                // Remove after animation
                setTimeout(() => {
                    if (tagFill && tagFill.parentNode) {
                        tagFill.remove();
                    }
                }, 600);
            }
            
            // Refill main card from current cursor position
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--x', x + 'px');
            card.style.setProperty('--y', y + 'px');
        });
    });
});
// ===========================
// ROTATING GREETING
// ===========================

const greetings = [
    'hi.',
    'hola.',
    'नमस्ते.',
    'bonjour.',
    'નમસ્તે.',
    'こんにちは.'
];

let currentGreeting = 0;
const greetingElement = document.getElementById('greeting');

function rotateGreeting() {
    if (greetingElement) {
        greetingElement.style.opacity = '0';
        
        setTimeout(() => {
            currentGreeting = (currentGreeting + 1) % greetings.length;
            greetingElement.textContent = greetings[currentGreeting];
            greetingElement.style.opacity = '1';
        }, 500);
    }
}

setTimeout(() => {
    setInterval(rotateGreeting, 3000);
}, 2000);

// ===========================
// WEBSITE COLOR CHANGE
// ===========================

// const projects = document.getElementById('projects');
// const root = document.documentElement;

// window.addEventListener('scroll', () => {
//     const projectsRect = projects.getBoundingClientRect();
//     const windowHeight = window.innerHeight;
    
//     if (projectsRect.top < windowHeight * 0.5) {
//         root.classList.add('white-mode');
//     } else {
//         root.classList.remove('white-mode');
//     }
// });
// ===========================
// WEBSITE COLOR CHANGE - PROJECTS, SKILLS, EXPERIENCE, CONTACT
// ===========================

const projects = document.getElementById('projects');
const skills = document.getElementById('skills');
const experience = document.getElementById('experience');
const contact = document.getElementById('contact');
const root = document.documentElement;

window.addEventListener('scroll', () => {
    const projectsRect = projects.getBoundingClientRect();
    const skillsRect = skills ? skills.getBoundingClientRect() : null;
    const experienceRect = experience ? experience.getBoundingClientRect() : null;
    const contactRect = contact.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Turn BLACK when contact section is in view
    if (contactRect.top < windowHeight * 0.5) {
        root.classList.remove('white-mode');
    }
    // Turn WHITE when projects, skills, or experience sections are in view
    else if (projectsRect.top < windowHeight * 0.6 || 
             (skillsRect && skillsRect.top < windowHeight * 0.6) ||
             (experienceRect && experienceRect.top < windowHeight * 0.6)) {
        root.classList.add('white-mode');
    } 
    // Turn BLACK for hero section
    else {
        root.classList.remove('white-mode');
    }
});

// ===========================
// SCROLL ANIMATIONS
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-scroll]').forEach(el => {
    animateOnScroll.observe(el);
});
// ===========================
// iPHONE PARALLAX SCROLL - DESKTOP ONLY
// ===========================

window.addEventListener('scroll', () => {
    // Only run parallax on desktop (screens larger than 768px)
    if (window.innerWidth > 768) {
        const allProjects = document.querySelectorAll('.project');
        
        allProjects.forEach(project => {
            const rect = project.getBoundingClientRect();
            const projectHeight = rect.height;
            const windowHeight = window.innerHeight;
            
            const scrollPercent = (windowHeight - rect.top) / (windowHeight + projectHeight);
            
            if (scrollPercent > 0 && scrollPercent < 1) {
                const leftPhone = project.querySelector('.iphone-left');
                const centerPhone = project.querySelector('.iphone-center');
                const rightPhone = project.querySelector('.iphone-right');
                
                // More dramatic movement - increased multipliers
                if (leftPhone) {
                    const offset1 = (scrollPercent - 0.5) * 600;
                    const rotation = (scrollPercent - 0.5) * -10;
                    leftPhone.style.transform = `scale(0.5) rotate(${rotation}deg) translateY(${offset1}px) translateX(${-offset1 * 0.3}px)`;
                }
                
                if (centerPhone) {
                    const offset2 = (scrollPercent - 0.5) * 600;
                    centerPhone.style.transform = `scale(0.55) translateY(${offset2}px)`;
                }
                
                if (rightPhone) {
                    const offset3 = (scrollPercent - 0.5) * 600;
                    const rotation = (scrollPercent - 0.5) * 10;
                    rightPhone.style.transform = `scale(0.5) rotate(${rotation}deg) translateY(${offset3}px) translateX(${offset3 * 0.3}px)`;
                }
            }
        });
    }
});
// ===========================
// CONFETTI ANIMATION
// ===========================

function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#007AFF', '#34C759', '#5856D6', '#FF3B30', '#FF9500', '#FFCC00', '#FF2D55'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random properties
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.3 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        // Random size
        const size = Math.random() * 8 + 6;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        
        confettiContainer.appendChild(confetti);
    }

    // Clean up after animation
    setTimeout(() => {
        confettiContainer.innerHTML = '';
    }, 5000);
}

// Check if coming back from contact page with success
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        setTimeout(() => {
            createConfetti();
        }, 300);
        
        // Remove parameter from URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});

// Contact send button - fill from cursor position
const contactSendBtn = document.querySelector('.btn-send-contact');

if (contactSendBtn) {
    contactSendBtn.addEventListener('mouseenter', function(e) {
        const rect = contactSendBtn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        contactSendBtn.style.setProperty('--x', x + 'px');
        contactSendBtn.style.setProperty('--y', y + 'px');
    });
    
    contactSendBtn.addEventListener('mousemove', function(e) {
        const rect = contactSendBtn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        contactSendBtn.style.setProperty('--x', x + 'px');
        contactSendBtn.style.setProperty('--y', y + 'px');
    });
}

// Make cursor transparent on send button
const sendButton = document.querySelector('.btn-send-contact');

if (sendButton) {
    sendButton.addEventListener('mouseenter', () => {
        cursor.style.opacity = '0'; // Hide cursor
    });
    
    sendButton.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0.7'; // Show cursor again
    });
}

// Vertical navigation active state
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// EXPERIENCE CARD FILL FOLLOWS CURSOR
// ===========================
const experienceCards = document.querySelectorAll('.experience-card');

experienceCards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--x', x + 'px');
        card.style.setProperty('--y', y + 'px');
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--x', x + 'px');
        card.style.setProperty('--y', y + 'px');
    });
});