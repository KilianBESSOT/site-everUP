// Script pour le chat IA
document.addEventListener('DOMContentLoaded', function() {
    // Créer les éléments du chat
    const body = document.querySelector('body');
    
    // Créer la bulle de chat
    const chatBubble = document.createElement('div');
    chatBubble.className = 'chat-bubble';
    chatBubble.innerHTML = '<i class="fas fa-comment-dots"></i>';
    body.appendChild(chatBubble);
    
    // Créer la fenêtre de chat
    const chatWindow = document.createElement('div');
    chatWindow.className = 'chat-window';
    chatWindow.innerHTML = `
        <div class="chat-header">
            <div class="chat-title">
                <img src="images/logos/Logo-everUP-Classique.svg" alt="everUP Assistant" class="chat-avatar">
                <div>
                    <h4>Assistant everUP</h4>
                    <p class="chat-status">En ligne</p>
                </div>
            </div>
            <button class="chat-close"><i class="fas fa-times"></i></button>
        </div>
        <div class="chat-messages">
            <div class="message bot">
                <div class="message-content">
                    <p>Bonjour ! Je suis l'assistant virtuel d'everUP. Comment puis-je vous aider aujourd'hui ?</p>
                </div>
                <div class="message-time">Maintenant</div>
            </div>
        </div>
        <div class="chat-suggestions">
            <button class="suggestion-btn">Comment fonctionne everUP ?</button>
            <button class="suggestion-btn">Quels sont vos tarifs ?</button>
            <button class="suggestion-btn">Puis-je avoir une démo ?</button>
        </div>
        <div class="chat-input">
            <input type="text" placeholder="Écrivez votre message..." id="chat-input-field">
            <button class="chat-send"><i class="fas fa-paper-plane"></i></button>
        </div>
    `;
    body.appendChild(chatWindow);
    
    // Variables pour stocker les messages prédéfinis
    const botResponses = {
        "comment fonctionne everup": "everUP est une plateforme de communication interne qui centralise toutes vos interactions. Elle permet de créer des espaces de discussion, partager des documents, et engager vos collaborateurs autour de vos valeurs d'entreprise.",
        "quels sont vos tarifs": "Nous proposons plusieurs formules adaptées à la taille de votre entreprise. Notre formule de base commence à 9€ par utilisateur et par mois. Pour un devis personnalisé, vous pouvez prendre rendez-vous avec notre équipe commerciale.",
        "puis-je avoir une démo": "Bien sûr ! Vous pouvez réserver une démo gratuite de 30 minutes avec l'un de nos experts en cliquant sur le bouton 'Réservez une démo' en haut de la page ou en vous rendant sur la page Contact.",
        "bonjour": "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
        "salut": "Salut ! Comment puis-je vous aider aujourd'hui ?",
        "merci": "Je vous en prie ! Avez-vous d'autres questions ?",
        "au revoir": "Au revoir ! N'hésitez pas à revenir si vous avez d'autres questions.",
        "default": "Je n'ai pas toutes les réponses à cette question. Souhaitez-vous être mis en relation avec un conseiller ? Vous pouvez prendre rendez-vous sur notre page Contact."
    };
    
    // Fonction pour ajouter un message à la conversation
    function addMessage(text, sender) {
        const messagesContainer = document.querySelector('.chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
            <div class="message-time">${timeString}</div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Fonction pour obtenir une réponse du bot
    function getBotResponse(userMessage) {
        userMessage = userMessage.toLowerCase().trim();
        
        // Chercher une correspondance dans les réponses prédéfinies
        for (const key in botResponses) {
            if (userMessage.includes(key)) {
                return botResponses[key];
            }
        }
        
        // Si aucune correspondance n'est trouvée
        return botResponses.default;
    }
    
    // Gérer l'ouverture et la fermeture de la fenêtre de chat
    chatBubble.addEventListener('click', function() {
        chatWindow.classList.toggle('active');
        chatBubble.classList.toggle('hidden');
    });
    
    document.querySelector('.chat-close').addEventListener('click', function() {
        chatWindow.classList.remove('active');
        chatBubble.classList.remove('hidden');
    });
    
    // Gérer l'envoi de messages
    const chatInputField = document.getElementById('chat-input-field');
    const chatSendButton = document.querySelector('.chat-send');
    
    function sendMessage() {
        const userMessage = chatInputField.value.trim();
        if (userMessage) {
            // Ajouter le message de l'utilisateur
            addMessage(userMessage, 'user');
            chatInputField.value = '';
            
            // Simuler un délai de réponse du bot
            setTimeout(function() {
                const botResponse = getBotResponse(userMessage);
                addMessage(botResponse, 'bot');
            }, 1000);
        }
    }
    
    chatSendButton.addEventListener('click', sendMessage);
    
    chatInputField.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Gérer les suggestions de questions
    const suggestionButtons = document.querySelectorAll('.suggestion-btn');
    suggestionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const suggestionText = this.textContent;
            addMessage(suggestionText, 'user');
            
            // Simuler un délai de réponse du bot
            setTimeout(function() {
                const botResponse = getBotResponse(suggestionText);
                addMessage(botResponse, 'bot');
            }, 1000);
        });
    });
});
