const messagesDiv = document.getElementById("messages");
const input = document.getElementById("input");
let conversation = [];

if (input) {
  input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
}

async function sendMessage() {
  const text = input.value;
  if (!text) return;

  conversation.push({ role: "user", content: text });
  messagesDiv.innerHTML += `<div class="message user">${text}</div>`;
  input.value = "";
  messagesDiv.innerHTML += `<div class="typing" id="typing">La IA está escribiendo...</div>`;
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  try {
    const response = await fetch("https://workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: conversation })
    });

    const data = await response.text();
    document.getElementById("typing").remove();
    conversation.push({ role: "assistant", content: data });
    messagesDiv.innerHTML += `<div class="message bot">${data}</div>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

  } catch (error) {
    if (document.getElementById("typing")) document.getElementById("typing").remove();
    messagesDiv.innerHTML += `<div class="message bot">Error conectando con la IA</div>`;
  }
}

function abrirEkekoChat() {
  const chatWindow = document.querySelector('.chat-box');
  if (chatWindow) {
    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active')) {
      document.getElementById("input").focus();
    }
  }
// Cierra el chat si el usuario hace clic en cualquier parte fuera de la caja
document.addEventListener("click", function (event) {
  const chatWindow = document.querySelector(".chat-box");
  const botonHero = document.querySelector(".btn-secondary");

  // Si el chat está abierto, y el clic NO fue dentro del chat ni en el botón del Hero, lo cierra
  if (chatWindow && chatWindow.classList.contains("active")) {
    if (!chatWindow.contains(event.target) && !botonHero.contains(event.target)) {
      chatWindow.classList.remove("active");
    }
  }
});
}
