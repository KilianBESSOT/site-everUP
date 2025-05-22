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
        // Informations sur everUP et ses fonctionnalités
        "comment fonctionne everup": "everUP est une plateforme de communication interne qui centralise toutes vos interactions. Elle permet de créer des espaces de discussion, partager des documents, et engager vos collaborateurs autour de vos valeurs d'entreprise.",
        "fonctionnalités": "everUP propose de nombreuses fonctionnalités : espaces de discussion thématiques, partage de documents, sondages interactifs, reconnaissance entre collègues, tableaux de bord analytiques, et intégration avec vos outils existants.",
        "avantages": "Les principaux avantages d'everUP sont : centralisation de la communication, réduction des emails internes, amélioration de l'engagement des collaborateurs, et accès à des données analytiques pour mesurer l'impact de vos actions.",
        
        // Informations sur les tarifs et offres
        "quels sont vos tarifs": "Découvrez nos solutions personnalisées qui s'adaptent parfaitement à vos besoins ! Pour obtenir une proposition sur mesure et sans engagement, prenez rendez-vous dès maintenant avec Christophe qui saura vous proposer l'offre idéale pour votre organisation.",
        "prix": "Investir dans everUP, c'est investir dans la performance de votre organisation ! Pour connaître nos tarifs adaptés à votre contexte spécifique, réservez un échange privilégié avec Christophe. Il vous présentera une solution optimisée pour votre budget avec un retour sur investissement garanti.",
        "offres": "Chez everUP, nous vous accompagnons de A à Z ! Installation, formation, support technique... tout est inclus pour vous garantir une expérience optimale. Pour découvrir l'ensemble des avantages et services inclus dans nos offres, échangez directement avec Christophe qui vous guidera vers la meilleure solution.",
        
        // Informations sur les services et l'entreprise
        "puis-je avoir une démo": "Bien sûr ! Vous pouvez réserver une démo gratuite de 30 minutes avec l'un de nos experts en cliquant sur le bouton 'Réservez une démo' en haut de la page ou en vous rendant sur la page Contact.",
        "missions": "Nos missions principales sont : l'accompagnement en intelligence artificielle, la gestion de projet agile, et la gouvernance IT. Nous vous aidons à digitaliser vos processus et à optimiser votre communication interne.",
        "qui êtes-vous": "everUP est une entreprise française spécialisée dans les solutions de communication interne et d'engagement collaborateur. Fondée en 2020, notre mission est de simplifier et d'améliorer les interactions au sein des organisations.",
        "contact": "Vous pouvez nous contacter par téléphone au 06 25 65 35 27 ou 04 22 46 17 02, par email à contact@everup.com, ou en prenant rendez-vous via notre calendrier sur la page 'Nous Contacter'.",
        "où êtes-vous": "Nos bureaux sont situés au 300 rue du Vallon, 06560 Valbonne, France. Vous pouvez nous rendre visite sur rendez-vous ou nous contacter par téléphone ou email.",
        
        // Salutations et remerciements
        "bonjour": "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
        "salut": "Salut ! Je suis l'assistant virtuel d'everUP. Que puis-je faire pour vous ?",
        "merci": "Je vous en prie ! Avez-vous d'autres questions sur nos services ou notre plateforme ?",
        "au revoir": "Au revoir ! N'hésitez pas à revenir si vous avez d'autres questions. Bonne journée !",
        
        // Réponses par défaut variées pour les questions sans réponse
        "default": [
            "Je n'ai pas toutes les réponses à cette question. Souhaitez-vous être mis en relation avec un conseiller ? Vous pouvez prendre rendez-vous sur notre page Contact.",
            "Cette question nécessite une expertise plus approfondie. Je vous invite à contacter directement notre équipe au 06 25 65 35 27 ou via notre formulaire de contact pour obtenir une réponse personnalisée.",
            "Je ne peux pas répondre précisément à cette question. Pour une information complète et adaptée à votre situation, pourquoi ne pas réserver une démo gratuite avec l'un de nos experts ?"
        ]
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
            if (key !== 'default' && userMessage.includes(key)) {
                return botResponses[key];
            }
        }
        
        // Si aucune correspondance n'est trouvée, retourner une réponse aléatoire parmi les réponses par défaut
        if (Array.isArray(botResponses.default)) {
            const randomIndex = Math.floor(Math.random() * botResponses.default.length);
            return botResponses.default[randomIndex];
        } else {
            return botResponses.default;
        }
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
