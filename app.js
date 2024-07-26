document.addEventListener("DOMContentLoaded", function() {
    const chatbox = document.getElementById("chatbox");

    const newsData = [
        {
            "title": "Sensex hits new high",
            "date": "2023-07-21",
            "content": "The BSE Sensex hit a new high today, driven by gains in banking and IT stocks."
        },
        {
            "title": "RBI announces new monetary policy",
            "date": "2023-07-20",
            "content": "The Reserve Bank of India has announced its new monetary policy, keeping interest rates unchanged."
        },
        {
            "Unnamed: 0": 49994,
            "Date": "February 11, 2003, Tuesday",
            "Title": "Uti Bank Rolls Out At Par Facility",
            "Description": "Uti Bank Rolls Out At Par Facility"
        },
        {
            "Unnamed: 0": 49995,
            "Date": "February 11, 2003, Tuesday",
            "Title": "Lic Mops Up Government Securities As Prices Crash",
            "Description": "Lic Mops Up Government Securities As Prices Crash"
        },
        {
            "Unnamed: 0": 49996,
            "Date": "February 11, 2003, Tuesday",
            "Title": "Banks Plan To Raise Lending Rates Without Altering Plrs",
            "Description": "Banks Plan To Raise Lending Rates Without Altering Plrs"
        },
        {
            "Unnamed: 0": 49997,
            "Date": "February 10, 2003, Monday",
            "Title": "Net Scheduled Inflows Of Rs 1,559.9 Crore",
            "Description": "Net Scheduled Inflows Of Rs 1,559.9 Crore"
        },
        {
            "Unnamed: 0": 49998,
            "Date": "February 10, 2003, Monday",
            "Title": "Rbi Calls Meet To Push Floating Rate Deposits",
            "Description": "Rbi Calls Meet To Push Floating Rate Deposits"
        },
        {
            "Unnamed: 0": 49999,
            "Date": "February 10, 2003, Monday",
            "Title": "Sticky Loans Divide Consortiums",
            "Description": "Sticky Loans Divide Consortiums"
        }
    ];

    function sendMessage() {
        const inputBox = document.getElementById("userInput");
        const userMessage = inputBox.value.trim();
        if (userMessage === "") return;

        displayMessage(userMessage, 'user');
        inputBox.value = "";

        // Show typing indicator
        showTypingIndicator();

        setTimeout(() => {
            // Remove typing indicator
            removeTypingIndicator();

            const botResponse = getResponse(userMessage, newsData);
            typeResponse(botResponse);
        }, 2000); // Simulate typing delay
    }

    function displayMessage(message, sender) {
        const messageElement = document.createElement("div");
        messageElement.className = `message ${sender}`;
        messageElement.textContent = message;
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    function showTypingIndicator() {
        const typingIndicator = document.createElement("div");
        typingIndicator.className = "message bot typing-indicator";
        typingIndicator.innerHTML = `
            <span class="typing"></span>
            <span class="typing"></span>
            <span class="typing"></span>
        `;
        chatbox.appendChild(typingIndicator);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    function removeTypingIndicator() {
        const typingIndicator = document.querySelector(".typing-indicator");
        if (typingIndicator) {
            chatbox.removeChild(typingIndicator);
        }
    }

    function typeResponse(response) {
        const responseElement = document.createElement("div");
        responseElement.className = "message bot";
        chatbox.appendChild(responseElement);
        chatbox.scrollTop = chatbox.scrollHeight;

        let i = 0;
        function typeWriter() {
            if (i < response.length) {
                responseElement.textContent += response.charAt(i);
                i++;
                setTimeout(typeWriter, 50); // Adjust typing speed here
            }
        }
        typeWriter();
    }

    function getResponse(userMessage, newsData) {
        userMessage = userMessage.toLowerCase();
        const keywords = extractKeywords(userMessage);
        const matchingArticles = searchNews(keywords, newsData);

        if (matchingArticles.length > 0) {
            let response = "Here are some articles I found:\n";
            matchingArticles.forEach(article => {
                response += `\nTitle: ${article.title || article.Title}\nDate: ${article.date || article.Date}\nContent: ${article.content || article.Description.slice(0, 100)}...\n`;
            });
            return response;
        } else {
            return "Sorry, I couldn't find any news articles related to your query.";
        }
    }

    function extractKeywords(message) {
        return message.toLowerCase().split(/\s+/);
    }

    function searchNews(keywords, newsData) {
        return newsData.filter(article =>
            keywords.some(keyword =>
                (article.title && article.title.toLowerCase().includes(keyword)) || 
                (article.content && article.content.toLowerCase().includes(keyword)) || 
                (article.Title && article.Title.toLowerCase().includes(keyword)) || 
                (article.Description && article.Description.toLowerCase().includes(keyword))
            )
        );
    }

    window.sendMessage = sendMessage;

    // Ensure input is taken and response is generated when Enter key is pressed
    document.getElementById('userInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
