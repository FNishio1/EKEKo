const messagesDiv = document.getElementById("messages");
const input = document.getElementById("input");
let conversation = [];
const systemGreeting = "¡Hola! 👋 Soy Ekeko IA, el asistente de EkekoWebs. Estamos especializados en crear webs profesionales para pequeños negocios en Perú. ¿En qué te puedo ayudar?";

if (input) {
  input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  conversation.push({ role: "user", content: text });
  messagesDiv.innerHTML += `<div class="message user">${text}</div>`;
  input.value = "";
  messagesDiv.innerHTML += `<div class="typing" id="typing">La IA está escribiendo...</div>`;
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  try {
    const response = await fetch("https://ekeko-webs-ia-chat.fnishio.workers.dev", {
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
}

document.addEventListener("click", function (event) {
  const chatWindow = document.querySelector(".chat-box");
  const botonHero = document.querySelector(".btn-secondary");

  if (chatWindow && chatWindow.classList.contains("active")) {
    if (!chatWindow.contains(event.target) && !botonHero.contains(event.target)) {
      chatWindow.classList.remove("active");
    }
  }
});
function abrirPaquetes() {
  document.getElementById('modalPaquetes').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function cerrarPaquetes(event) {
  if (!event || event.target === document.getElementById('modalPaquetes')) {
    document.getElementById('modalPaquetes').classList.remove('active');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') cerrarPaquetes();
});

function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('active');
}

// ========================= 
// WHATSAPP CHAT POPUP      
// =========================

function abrirWaChat() {
  const box = document.getElementById('waChatBox');
  box.classList.toggle('active');
  if (box.classList.contains('active')) {
    document.getElementById('waInput').focus();
  }
}

function cerrarWaChat() {
  document.getElementById('waChatBox').classList.remove('active');
}

function enviarWaChat() {
  const input = document.getElementById('waInput');
  const body = document.getElementById('waMessages');
  const text = input.value.trim();
  if (!text) return;

  const bubble = document.createElement('div');
  bubble.classList.add('wa-bubble-user');
  bubble.textContent = text;
  body.appendChild(bubble);
  body.scrollTop = body.scrollHeight;
  input.value = '';

  setTimeout(() => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/51999156493?text=${encoded}`, '_blank');
  }, 600);
}

// Enter para enviar en wa chat
document.addEventListener('DOMContentLoaded', function() {
  const waInput = document.getElementById('waInput');
  if (waInput) {
    waInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') enviarWaChat();
    });
  }
});

// Cierra wa-chat al hacer click fuera
document.addEventListener('click', function(event) {
  const box = document.getElementById('waChatBox');
  const btn = document.querySelector('.wa-chat-button');
  if (box && box.classList.contains('active')) {
    if (!box.contains(event.target) && btn && !btn.contains(event.target)) {
      box.classList.remove('active');
    }
  }
});
// Cierra el menú al hacer click fuera
document.addEventListener('click', function(event) {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.querySelector('.hamburger');
  
  if (menu && menu.classList.contains('active')) {
    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
      menu.classList.remove('active');
    }
  }
});
