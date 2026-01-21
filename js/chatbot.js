// ===========================
// AI CHATBOT FOR VATSALYA'S PORTFOLIO
// Using FREE Google Gemini API
// ===========================

// 🔑 Get your FREE API key from: https://aistudio.google.com/
const GEMINI_API_KEY = 'AIzaSyAqyRvKwDMdy4gIazq34NrYgRzIctUQa9k';

// Vatsalya's Information
const VATSALYA_INFO = {
    name: "Vatsalya Dabhi",
    role: "Software Developer & MSCS Student",
    location: "Seattle, Washington",
    email: "vatsalyadabhi05@gmail.com",
    linkedin: "linkedin.com/in/vatsalya-dabhi",
    github: "github.com/Vatsalya2003"
};

// System prompt for AI
const SYSTEM_PROMPT = `You are a friendly and professional AI assistant representing Vatsalya Dabhi on his portfolio website. Your job is to make a great impression on visitors.

ABOUT VATSALYA:
- Name: Vatsalya Dabhi
- Role: Software Developer & MSCS Student
- Location: Seattle, Washington
- Email: vatsalyadabhi05@gmail.com

EDUCATION:
- MS in Computer Science at Northeastern University, Seattle (Expected Sep 2027)
- BE in Computer Science from SETI Gujarat Technological University (Graduated Apr 2024)

WORK EXPERIENCE:
- iOS Developer at Fancall Pvt Ltd (Dec 2024 – Aug 2025): Built creator-fan video calling app using Swift, UIKit, AWS. Improved performance by 20%, reduced launch time by 25%.
- Software Developer Intern at Globle Tech Solution (Sep 2024 – Dec 2024): Built cross-platform apps with React Native and Flutter.
- iOS Developer Intern at Laurentian University (July 2024 – Aug 2024): Led team to build iOS app. Ranked #1 in class showcase.

SKILLS:
- Mobile: Swift, SwiftUI, UIKit, Flutter, Dart, React Native, Core Data
- Frontend: HTML/CSS, JavaScript, React, Figma
- Backend: Python, Java, Node.js, SQL, Firebase, AWS, GCP

PROJECTS:
- Fancall: Creator-fan video calling app (Swift, UIKit, AWS, Agora SDK)
- Distributed Chat System: Handles 50,000+ concurrent users (Spring Boot, Java, AWS)
- GTU Laurentian Connect: Student-mentor app (React Native, Firebase)
- GemChat: AI chatbot with Gemini AI (SwiftUI, Firebase)
- Expenzy: Finance tracking app (SwiftUI, Core Data)

GUIDELINES:
1. Be friendly, professional, and enthusiastic
2. Keep responses concise (2-4 sentences)
3. Highlight strengths: iOS expertise, distributed systems, team leadership
4. He's open to internship and job opportunities
5. For contact: provide email and suggest using contact form
6. Never make up information
7. Redirect inappropriate questions to professional topics
8. Be positive and create a great impression
9. Use emojis sparingly to be friendly 😊`;

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
const welcomeMessage = `Hey there! 👋 I'm Vatsalya's AI assistant. I can tell you about his skills, projects, experience, or help you get in touch. What would you like to know?`;

// Initialize chatbot
document.addEventListener('DOMContentLoaded', function() {
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
        if (e.key === 'Enter' && !e.shiftKey) {
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
});

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;
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
        // Use local fallback
        const fallbackResponse = getLocalResponse(message);
        addMessage(fallbackResponse, 'bot');
    }
    
    chatSend.disabled = false;
}

// Get response from Gemini API (FREE)
async function getGeminiResponse(userMessage) {
    // Build conversation context
    const conversationContext = conversationHistory
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n');
    
    const prompt = `${SYSTEM_PROMPT}

Previous conversation:
${conversationContext}

User: ${userMessage}

Respond as Vatsalya's AI assistant:`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 300
                },
                safetySettings: [
                    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
                ]
            })
        });
        
        if (!response.ok) {
            throw new Error('API request failed');
        }
        
        const data = await response.json();
        
        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
            return data.candidates[0].content.parts[0].text;
        }
        
        throw new Error('No response from API');
        
    } catch (error) {
        console.error('Gemini API Error:', error);
        return getLocalResponse(userMessage);
    }
}

// Local fallback responses
function getLocalResponse(message) {
    const msg = message.toLowerCase();
    
    if (msg.includes('about') || msg.includes('who is') || msg.includes('tell me about')) {
        return `Vatsalya is a passionate Software Developer and MSCS student at Northeastern University, Seattle. He specializes in iOS development with Swift and has experience building scalable distributed systems. He loves crafting user-centric digital solutions! 🚀`;
    }
    
    if (msg.includes('skill') || msg.includes('tech') || msg.includes('stack')) {
        return `Vatsalya's expertise includes: 📱 Mobile: Swift, SwiftUI, UIKit, Flutter, React Native | 🌐 Frontend: React, JavaScript | ⚙️ Backend: Java, Python, Node.js, AWS, Firebase. He's particularly strong in iOS development and distributed systems!`;
    }
    
    if (msg.includes('project') || msg.includes('work') || msg.includes('built')) {
        return `Some of Vatsalya's notable projects: 🎬 Fancall - creator-fan video calling app | 💬 Distributed Chat System handling 50K+ users | 📚 GTU Laurentian Connect - student mentorship app | 🤖 GemChat - AI chatbot. Check out the Projects section for more!`;
    }
    
    if (msg.includes('experience') || msg.includes('job') || msg.includes('worked')) {
        return `Vatsalya worked as an iOS Developer at Fancall (Full-time), improving app performance by 20%. He also interned at Globle Tech Solution and Laurentian University, where his team ranked #1 in the project showcase! 🏆`;
    }
    
    if (msg.includes('contact') || msg.includes('reach') || msg.includes('email') || msg.includes('hire')) {
        return `You can reach Vatsalya at: 📧 vatsalyadabhi05@gmail.com | 💼 LinkedIn: linkedin.com/in/vatsalya-dabhi | 🐙 GitHub: github.com/Vatsalya2003. He's open to opportunities!`;
    }
    
    if (msg.includes('education') || msg.includes('study') || msg.includes('degree')) {
        return `Vatsalya is pursuing MS in Computer Science at Northeastern University, Seattle (graduating 2027). He completed his BE in Computer Science from Gujarat Technological University in 2024. 🎓`;
    }
    
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
        return `Hey there! 😊 Great to meet you! I'm here to tell you about Vatsalya. What would you like to know - his skills, projects, experience, or how to contact him?`;
    }
    
    if (msg.includes('thanks') || msg.includes('thank you')) {
        return `You're welcome! 😊 Feel free to explore the portfolio or ask me anything else. If you'd like to connect with Vatsalya, use the contact form!`;
    }
    
    return `Great question! Vatsalya is a skilled iOS Developer and MSCS student passionate about building technology that connects people. Ask about his skills, projects, experience, or how to get in touch! 😊`;
}

console.log('🤖 Chatbot loaded!');