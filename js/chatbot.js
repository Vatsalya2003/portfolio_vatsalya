// ===========================
// AI CHATBOT VATSALYA'S PORTFOLIO
// Using FREE Google Gemini API
// ===========================

// System prompt for AI
const SYSTEM_PROMPT = `You are a professional AI assistant representing Vatsalya Dabhi on his portfolio website. Your job is to make a great impression on visitors and provide accurate information.

CRITICAL RULES:
1. NEVER use emojis
2. Use bullet points (•) for lists
3. Keep responses concise and professional (2-4 sentences unless more detail needed)
4. When mentioning links or email, include the full URL/email
5. Be friendly but professional
6. Only provide factual information from the data below
7. Redirect inappropriate questions to professional topics
8. Always create a positive impression of Vatsalya

ABOUT VATSALYA:
• Name: Vatsalya Dabhi
• Role: Software Developer and MSCS Student
• Location: Seattle, Washington, USA
• Email: vatsalyadabhi05@gmail.com
• LinkedIn: https://www.linkedin.com/in/vatsalya-dabhi/
• GitHub: https://github.com/Vatsalya2003
• Portfolio: https://www.vatsalya.site/

EDUCATION:
• Master of Science in Computer Science at Northeastern University, Seattle (Expected September 2027)
  - Coursework: Algorithms, Software Engineering, Programming Design Paradigms, Building Distributed Systems
• Bachelor of Engineering in Computer Science from SETI Gujarat Technological University, India (Graduated April 2024)
  - Coursework: iOS App Development, Data Structures and Algorithms, Artificial Intelligence, Object-Oriented Programming

WORK EXPERIENCE:
• iOS Developer at Fancall Pvt Ltd (December 2024 - August 2025) - Full Time
  - Built creator-fan video calling app using Swift, UIKit, AWS, MVVM architecture, and Agora SDK
  - Improved app performance by 20% and reduced launch time by 25%
  - Collaborated across iOS, Android, and backend teams

• Software Developer Intern at Globle Tech Solution (September 2024 - December 2024)
  - Developed cross-platform mobile apps using React Native and Flutter
  - Reduced development time by 30%
  - Implemented real-time synchronization with Firebase

• iOS Developer Intern at Laurentian University, Canada (July 2024 - August 2024)
  - Built iOS app using SwiftUI, Core Data, and Firebase
  - Led a small developer team
  - Ranked number 1 in class project showcase

TECHNICAL SKILLS:
• Mobile Development: Swift, SwiftUI, UIKit, Flutter, Dart, React Native, Core Data
• Frontend: HTML, CSS, JavaScript, React, Figma
• Backend: Python, Java, Node.js, SQL, Firebase, AWS, GCP
• Tools: Git, Xcode, Android Studio, VS Code, Docker

PROJECTS:
• Fancall - Creator-fan video calling app with real-time communication using Agora SDK (Swift, UIKit, AWS, MVVM)
• Distributed Chat System - Scalable WebSocket chat handling 50,000+ concurrent users (Spring Boot, Java, AWS EC2, AWS SQS)
• GTU Laurentian Connect - Cross-platform student-mentor connection app (React Native, Firebase, Node.js) - Available on App Store and Play Store
• GemChat - AI-powered chatbot using Gemini AI (SwiftUI, Firebase)
• Expenzy - Personal finance tracking app (SwiftUI, Core Data)

AVAILABILITY:
• Open to software engineering internships and full-time opportunities
• Particularly interested in iOS development and distributed systems roles
• Available to start immediately for internships

RESPONSE FORMAT:
• Use bullet points for lists
• Include full URLs when mentioning websites
• Include full email when mentioning contact
• Keep responses clear and well-structured
• Never use emojis`;

// Chat elements
const chatFab = document.getElementById('chatFab');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const quickReplies = document.getElementById('quickReplies');

// Conversation history
let conversationHistory = [];

// Welcome message
const welcomeMessage = `Hello! I am Vatsalya's AI assistant. I can help you learn about:

• His skills and expertise
• Work experience and projects
• Education background
• How to get in touch

What would you like to know?`;

// Initialize chatbot
document.addEventListener('DOMContentLoaded', function() {
    console.log('Chatbot initializing...');
    
    if (!chatFab || !chatWindow) {
        console.error('Chatbot elements not found');
        return;
    }
    
    let isFirstOpen = true;
    
    // Toggle chat window
    chatFab.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
        chatFab.classList.toggle('active');
        
        if (isFirstOpen && chatWindow.classList.contains('open')) {
            addMessage(welcomeMessage, 'bot');
            isFirstOpen = false;
        }
        
        if (chatWindow.classList.contains('open')) {
            chatInput.focus();
        }
    });
    
    // Close chat
    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('open');
        chatFab.classList.remove('active');
    });
    
    // Send message
    chatSend.addEventListener('click', sendMessage);
    
    // Enter key
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Quick replies
    document.querySelectorAll('.quick-reply').forEach(btn => {
        btn.addEventListener('click', () => {
            chatInput.value = btn.dataset.message;
            sendMessage();
        });
    });
    
    console.log('Chatbot initialized successfully');
});

// Format message with clickable links and bold
function formatMessage(text) {
    // Convert URLs to clickable links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    text = text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer"><strong>$1</strong></a>');
    
    // Convert email addresses to clickable mailto links
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    text = text.replace(emailRegex, '<a href="mailto:$1" target="_blank"><strong>$1</strong></a>');
    
    // Convert bullet points to proper list items
    text = text.replace(/^• /gm, '<br>• ');
    text = text.replace(/\n• /g, '<br>• ');
    
    // Convert **text** to bold
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // Convert newlines to breaks
    text = text.replace(/\n/g, '<br>');
    
    return text;
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    // Format bot messages with clickable links
    if (sender === 'bot') {
        messageDiv.innerHTML = formatMessage(text);
    } else {
        messageDiv.textContent = text;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    if (sender === 'user') {
        quickReplies.style.display = 'none';
    }
}

// Show typing indicator
function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Hide typing indicator
function hideTyping() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
}

// Send message
async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    addMessage(message, 'user');
    chatInput.value = '';
    
    conversationHistory.push({ role: 'user', content: message });
    
    showTyping();
    chatSend.disabled = true;
    
    try {
        const response = await getGeminiResponse(message);
        hideTyping();
        addMessage(response, 'bot');
        conversationHistory.push({ role: 'assistant', content: response });
    } catch (error) {
        hideTyping();
        const fallbackResponse = getLocalResponse(message);
        addMessage(fallbackResponse, 'bot');
    }
    
    chatSend.disabled = false;
}

// Get response from Gemini API
async function getGeminiResponse(userMessage) {
    const conversationContext = conversationHistory
        .slice(-6)
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n');
    
    const prompt = `${SYSTEM_PROMPT}

Previous conversation:
${conversationContext}

User: ${userMessage}

Respond as Vatsalya's professional AI assistant (no emojis, use bullet points):`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 400
                },
                safetySettings: [
                    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
                ]
            })
        });
        
        if (!response.ok) throw new Error('API request failed');
        
        const data = await response.json();
        
        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
            return data.candidates[0].content.parts[0].text;
        }
        
        throw new Error('No response');
        
    } catch (error) {
        console.error('Gemini API Error:', error);
        return getLocalResponse(userMessage);
    }
}

// Local fallback responses (no emojis, with bullet points)
function getLocalResponse(message) {
    const msg = message.toLowerCase();
    
    // About
    if (msg.includes('about') || msg.includes('who is') || msg.includes('tell me about') || msg.includes('introduce')) {
        return `Vatsalya Dabhi is a Software Developer and MSCS student at Northeastern University, Seattle. He specializes in:

• iOS development with Swift and SwiftUI
• Building scalable distributed systems
• Cross-platform mobile development

He is passionate about crafting user-centric digital solutions and building technology that connects people.`;
    }
    
    // Skills
    if (msg.includes('skill') || msg.includes('tech') || msg.includes('stack') || msg.includes('know') || msg.includes('expertise')) {
        return `Vatsalya's technical expertise includes:

• Mobile Development: Swift, SwiftUI, UIKit, Flutter, Dart, React Native, Core Data
• Frontend: HTML, CSS, JavaScript, React, Figma
• Backend: Python, Java, Node.js, SQL, Firebase, AWS, GCP
• Tools: Git, Xcode, Android Studio, VS Code, Docker

His strongest areas are iOS development and distributed systems.`;
    }
    
    // Projects
    if (msg.includes('project') || msg.includes('built') || msg.includes('made') || msg.includes('portfolio')) {
        return `Vatsalya has worked on several notable projects:

• Fancall - Creator-fan video calling app with real-time communication (Swift, UIKit, AWS)
• Distributed Chat System - Handles 50,000+ concurrent users (Spring Boot, Java, AWS)
• GTU Laurentian Connect - Student-mentor app available on App Store and Play Store
• GemChat - AI chatbot using Gemini AI (SwiftUI, Firebase)
• Expenzy - Personal finance tracking app (SwiftUI, Core Data)

Visit the Projects section on this portfolio for more details.`;
    }
    
    // Experience
    if (msg.includes('experience') || msg.includes('work') || msg.includes('job') || msg.includes('company') || msg.includes('career')) {
        return `Vatsalya's professional experience:

• iOS Developer at Fancall Pvt Ltd (Full-time, Dec 2024 - Aug 2025)
  - Improved app performance by 20% and reduced launch time by 25%

• Software Developer Intern at Globle Tech Solution (Sep - Dec 2024)
  - Built cross-platform apps, reducing development time by 30%

• iOS Developer Intern at Laurentian University, Canada (Jul - Aug 2024)
  - Led team to build iOS app, ranked number 1 in class showcase`;
    }
    
    // Contact
    if (msg.includes('contact') || msg.includes('reach') || msg.includes('email') || msg.includes('hire') || msg.includes('connect') || msg.includes('message')) {
        return `You can reach Vatsalya through:

• Email: vatsalyadabhi05@gmail.com
• LinkedIn: https://www.linkedin.com/in/vatsalya-dabhi/
• GitHub: https://github.com/Vatsalya2003

He is open to internship and full-time opportunities. You can also use the contact form at the bottom of this page.`;
    }
    
    // Education
    if (msg.includes('education') || msg.includes('study') || msg.includes('degree') || msg.includes('university') || msg.includes('college') || msg.includes('school')) {
        return `Vatsalya's educational background:

• Master of Science in Computer Science
  - Northeastern University, Seattle, Washington
  - Expected graduation: September 2027
  - Coursework: Algorithms, Software Engineering, Distributed Systems

• Bachelor of Engineering in Computer Science
  - SETI Gujarat Technological University, India
  - Graduated: April 2024
  - Coursework: iOS Development, Data Structures, AI, OOP`;
    }
    
    // Location
    if (msg.includes('location') || msg.includes('where') || msg.includes('live') || msg.includes('based')) {
        return `Vatsalya is currently based in Seattle, Washington, USA. He is pursuing his Master's degree at Northeastern University Seattle campus.`;
    }
    
    // Availability / Hiring
    if (msg.includes('available') || msg.includes('hiring') || msg.includes('looking') || msg.includes('opportunity') || msg.includes('intern') || msg.includes('job')) {
        return `Yes, Vatsalya is currently open to opportunities:

• Looking for software engineering internships and full-time roles
• Particularly interested in iOS development and distributed systems positions
• Available to start immediately for internships
• Open to both on-site and remote opportunities

Contact him at vatsalyadabhi05@gmail.com to discuss opportunities.`;
    }
    
    // Greetings
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('good morning') || msg.includes('good evening')) {
        return `Hello! Welcome to Vatsalya's portfolio. I can help you learn about:

• His skills and technical expertise
• Work experience and projects
• Education background
• How to get in touch with him

What would you like to know?`;
    }
    
    // Thanks
    if (msg.includes('thanks') || msg.includes('thank you') || msg.includes('helpful')) {
        return `You are welcome! Feel free to:

• Explore the portfolio sections above
• Ask me any other questions about Vatsalya
• Use the contact form to reach out directly

Is there anything else you would like to know?`;
    }
    
    // Resume / CV
    if (msg.includes('resume') || msg.includes('cv')) {
        return `For Vatsalya's detailed resume or CV, please contact him directly at vatsalyadabhi05@gmail.com. He will be happy to share his resume for relevant opportunities.`;
    }
    
    // Strengths
    if (msg.includes('strength') || msg.includes('good at') || msg.includes('best')) {
        return `Vatsalya's key strengths include:

• iOS Development - Expert in Swift, SwiftUI, and UIKit
• Distributed Systems - Built systems handling 50,000+ users
• Team Leadership - Led teams and ranked number 1 in project showcases
• Performance Optimization - Improved app performance by 20%
• Cross-platform Development - Experience with Flutter and React Native`;
    }
    
    // Default response
    return `Thank you for your question. Vatsalya is a Software Developer specializing in iOS development and distributed systems. 

I can provide information about:
• His technical skills and expertise
• Work experience and projects
• Education background
• Contact information and availability

Please feel free to ask about any of these topics.`;
}

console.log('Chatbot script loaded');