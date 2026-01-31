/* ==========================================
   LUMEN - A HEROÍNA DA ZONA SUL
   JavaScript Interativo & Animações
   ========================================== */

// Estado global
const state = {
  currentSection: 'inicio',
  quizAnswers: [],
  selectedPower: null,
  isQuizActive: false
};

// Dados do Quiz
const quizData = [
  {
    question: "Você está no Parque Ibirapuera à noite e vê uma sombra estranha. O que faz?",
    options: [
      { text: "Investiga imediatamente, usando a luz do seu celular", power: "luz", icon: "🔦" },
      { text: "Liga para um amigo e espera ajuda", power: "escudo", icon: "📱" },
      { text: "Corre para ajudar alguém que parece estar em perigo", power: "cura", icon: "🏃" },
      { text: "Analisa a situação rapidamente e busca a melhor rota", power: "velocidade", icon: "👁️" }
    ]
  },
  {
    question: "Em uma crise, qual é sua maior qualidade?",
    options: [
      { text: "Iluminar o caminho para os outros", power: "luz", icon: "✨" },
      { text: "Proteger quem ama a todo custo", power: "escudo", icon: "🛡️" },
      { text: "Curar feridas físicas e emocionais", power: "cura", icon: "💚" },
      { text: "Agir rapidamente antes que piore", power: "velocidade", icon: "⚡" }
    ]
  },
  {
    question: "Qual lugar da Zona Sul de SP mais combina com você?",
    options: [
      { text: "Avenida Paulista - centro de tudo", power: "luz", icon: "🏙️" },
      { text: "Parque do Ibirapuera - natureza protegida", power: "escudo", icon: "🌳" },
      { text: "Beco do Batman - arte e transformação", power: "cura", icon: "🎨" },
      { text: "Metrô Conceição - velocidade e movimento", power: "velocidade", icon: "🚇" }
    ]
  },
  {
    question: "Como você enfrenta seus medos?",
    options: [
      { text: "Encarando-os com determinação", power: "luz", icon: "💪" },
      { text: "Construindo barreiras emocionais", power: "escudo", icon: "🧱" },
      { text: "Aceitando e processando as emoções", power: "cura", icon: "🧘" },
      { text: "Fugindo para reavaliar e voltar mais forte", power: "velocidade", icon: "🏃" }
    ]
  },
  {
    question: "Se pudesse escolher um superpoder real?",
    options: [
      { text: "Controlar a luz e a energia", power: "luz", icon: "💡" },
      { text: "Criar campos de força impenetráveis", power: "escudo", icon: "🔮" },
      { text: "Curar qualquer doença ou ferida", power: "cura", icon: "🌟" },
      { text: "Mover-se na velocidade da luz", power: "velocidade", icon: "🌠" }
    ]
  }
];

// Descrições dos poderes
const powerDescriptions = {
  luz: {
    title: "Manipulação de Luz",
    description: "Você tem a capacidade de iluminar o caminho mesmo nas situações mais escuras. Como Matilda, você enfrenta seus medos de frente e usa sua presença para inspirar outros. Sua luz interior é inegável.",
    icon: "💡",
    color: "#ffee00"
  },
  cura: {
    title: "Cura Luminosa",
    description: "Sua empatia e compaixão são seus superpoderes. Você tem o dom de confortar, restaurar e transformar a dor dos outros em força. Assim como Matilda aprendeu, curar é um ato de coragem.",
    icon: "✨",
    color: "#00ff41"
  },
  velocidade: {
    title: "Velocidade da Luz",
    description: "Sua mente rápida e instintos afiados permitem que você reaja instantaneamente às situações. Você acredita que a ação rápida pode salvar vidas e nunca hesita quando alguém precisa de ajuda.",
    icon: "⚡",
    color: "#00d9ff"
  },
  escudo: {
    title: "Escudo de Fótons",
    description: "Proteger quem você ama é sua prioridade máxima. Você cria barreiras não apenas físicas, mas emocionais, mantendo seus entes queridos seguros. Sua força está na lealdade e determinação.",
    icon: "🛡️",
    color: "#bd00ff"
  }
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initNavigation();
  initScrollAnimations();
  initParallax();
  initPowerSelector();
  initMouseEffects();
});

// Loading Screen
function initLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  
  // Simula carregamento de recursos
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    // Inicia animações após loading
    animateHeroElements();
  }, 2500);
}

// Animação dos elementos do Hero
function animateHeroElements() {
  const heroContent = document.querySelector('.hero-content');
  heroContent.style.opacity = '0';
  heroContent.style.transform = 'translateY(30px)';
  
  setTimeout(() => {
    heroContent.style.transition = 'all 1s ease';
    heroContent.style.opacity = '1';
    heroContent.style.transform = 'translateY(0)';
  }, 100);
}

// Navegação
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const progressDots = document.querySelectorAll('.progress-dot');
  
  // Mostra/esconde navbar no scroll
  let lastScroll = 0;
  window.addEventListener('scroll', { passive: true }, (e) => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.classList.add('visible');
    } else {
      navbar.classList.remove('visible');
    }
    
    lastScroll = currentScroll;
    
    // Atualiza progresso
    updateProgressIndicator();
  });
  
  // Click nos dots de progresso
  progressDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const section = dot.dataset.section;
      scrollToSection(section);
    });
  });
}

// Atualiza indicador de progresso
function updateProgressIndicator() {
  const sections = document.querySelectorAll('section[id]');
  const dots = document.querySelectorAll('.progress-dot');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute('id');
    }
  });
  
  dots.forEach(dot => {
    dot.classList.remove('active');
    if (dot.dataset.section === current) {
      dot.classList.add('active');
    }
  });
  
  state.currentSection = current;
}

// Scroll suave para seção
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const offset = 80;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = section.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Animações de Scroll (Intersection Observer)
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Animação especial para cards de poder
        if (entry.target.classList.contains('power-card')) {
          entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
        }
      }
    });
  }, observerOptions);
  
  // Observa elementos para revelar
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .power-card');
  revealElements.forEach(el => observer.observe(el));
}

// Efeito Parallax suave
function initParallax() {
  const heroImage = document.querySelector('.hero-image-container');
  const glowOrbs = document.querySelectorAll('.glow-orb');
  
  let ticking = false;
  
  window.addEventListener('scroll', { passive: true }, () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        if (heroImage && scrolled < window.innerHeight) {
          heroImage.style.transform = `translateY(${rate}px)`;
        }
        
        // Move orbs em velocidades diferentes
        glowOrbs.forEach((orb, index) => {
          const speed = (index + 1) * 0.1;
          orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        ticking = false;
      });
      
      ticking = true;
    }
  });
}

// Efeitos de Mouse (mousemove)
function initMouseEffects() {
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  if (isTouchDevice) return;
  
  const cards = document.querySelectorAll('.power-card, .story-image-container');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
}

// Seletor de Poderes
function initPowerSelector() {
  window.selectPower = function(card) {
    // Remove seleção anterior
    document.querySelectorAll('.power-card').forEach(c => {
      c.classList.remove('selected');
    });
    
    // Adiciona seleção atual
    card.classList.add('selected');
    
    const power = card.dataset.power;
    const resultDiv = document.getElementById('power-result');
    const titleEl = document.getElementById('power-title');
    const descEl = document.getElementById('power-description');
    
    const info = powerDescriptions[power];
    
    titleEl.textContent = `${info.icon} ${info.title}`;
    titleEl.style.color = info.color;
    descEl.textContent = info.description;
    
    resultDiv.classList.remove('hidden');
    
    // Scroll para o resultado
    setTimeout(() => {
      resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
    
    showToast(`Poder selecionado: ${info.title}`, 'success');
  };
  
  window.resetPower = function() {
    document.querySelectorAll('.power-card').forEach(c => {
      c.classList.remove('selected');
    });
    document.getElementById('power-result').classList.add('hidden');
  };
}

// Sistema de Quiz
window.startQuiz = function() {
  state.quizAnswers = [];
  state.isQuizActive = true;
  
  document.getElementById('quiz-start').classList.add('hidden');
  document.getElementById('quiz-questions').classList.remove('hidden');
  document.getElementById('quiz-result').classList.add('hidden');
  
  showQuestion(0);
};

function showQuestion(index) {
  const question = quizData[index];
  const progressBar = document.getElementById('progress-bar');
  const counter = document.getElementById('question-counter');
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');
  
  // Atualiza progresso
  const progress = ((index + 1) / quizData.length) * 100;
  progressBar.style.width = `${progress}%`;
  counter.textContent = `Pergunta ${index + 1} de ${quizData.length}`;
  
  // Animação de fade
  questionText.style.opacity = '0';
  setTimeout(() => {
    questionText.textContent = question.question;
    questionText.style.opacity = '1';
  }, 200);
  
  // Renderiza opções
  optionsContainer.innerHTML = '';
  question.options.forEach((option, i) => {
    const button = document.createElement('button');
    button.className = 'quiz-option';
    button.innerHTML = `<span>${option.icon}</span> ${option.text}`;
    button.style.animationDelay = `${i * 0.1}s`;
    button.onclick = () => selectAnswer(index, option.power, button);
    optionsContainer.appendChild(button);
  });
}

function selectAnswer(questionIndex, power, buttonElement) {
  // Desabilita todas as opções
  const allOptions = document.querySelectorAll('.quiz-option');
  allOptions.forEach(opt => opt.disabled = true);
  
  // Marca como selecionada
  buttonElement.classList.add('selected');
  
  // Salva resposta
  state.quizAnswers.push(power);
  
  // Próxima pergunta ou resultado
  setTimeout(() => {
    if (questionIndex < quizData.length - 1) {
      showQuestion(questionIndex + 1);
    } else {
      showResult();
    }
  }, 800);
}

function showResult() {
  document.getElementById('quiz-questions').classList.add('hidden');
  const resultDiv = document.getElementById('quiz-result');
  resultDiv.classList.remove('hidden');
  
  // Calcula resultado mais frequente
  const counts = {};
  state.quizAnswers.forEach(answer => {
    counts[answer] = (counts[answer] || 0) + 1;
  });
  
  const resultPower = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  const info = powerDescriptions[resultPower];
  
  // Animação de entrada
  resultDiv.style.opacity = '0';
  resultDiv.style.transform = 'scale(0.9)';
  
  setTimeout(() => {
    document.getElementById('result-icon').textContent = info.icon;
    document.getElementById('result-title').textContent = info.title;
    document.getElementById('result-description').textContent = info.description;
    document.getElementById('result-title').style.color = info.color;
    
    resultDiv.style.transition = 'all 0.5s ease';
    resultDiv.style.opacity = '1';
    resultDiv.style.transform = 'scale(1)';
    
    // Efeito de confete simples
    createConfetti();
  }, 100);
}

window.restartQuiz = function() {
  document.getElementById('quiz-result').classList.add('hidden');
  document.getElementById('quiz-start').classList.remove('hidden');
  state.quizAnswers = [];
  state.isQuizActive = false;
};

window.shareResult = function() {
  const title = document.getElementById('result-title').textContent;
  const text = `Descobri meu poder em Lumen - A Heroína da Zona Sul! Meu poder é: ${title}. Descubra o seu também!`;
  
  if (navigator.share) {
    navigator.share({
      title: 'Lumen - A Heroína da Zona Sul',
      text: text,
      url: window.location.href
    }).catch(err => console.log('Erro ao compartilhar:', err));
  } else {
    // Fallback: copia para clipboard
    navigator.clipboard.writeText(text).then(() => {
      showToast('Resultado copiado para a área de transferência!', 'success');
    });
  }
};

// Efeito de confete simples
function createConfetti() {
  const colors = ['#00ff41', '#00d9ff', '#ff003c', '#bd00ff', '#ffee00'];
  const container = document.getElementById('quiz-result');
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'absolute';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.opacity = '0';
    
    container.appendChild(confetti);
    
    const duration = 1 + Math.random() * 2;
    const delay = Math.random() * 0.5;
    
    confetti.animate([
      { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
      { transform: `translateY(${200 + Math.random() * 300}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], {
      duration: duration * 1000,
      delay: delay * 1000,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => confetti.remove();
  }
}

// Sistema de Toast Notifications
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  container.appendChild(toast);
  
  // Remove após animação
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Utilitários
window.scrollToSection = scrollToSection;

// Prevenção de comportamentos indesejados
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && state.isQuizActive) {
    if (confirm('Deseja realmente sair do quiz? Seu progresso será perdido.')) {
      window.restartQuiz();
    }
  }
});

// Service Worker para PWA (opcional, preparado para futuro)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Descomente quando tiver um service worker
    // navigator.serviceWorker.register('/sw.js');
  });
}

// Análise de performance (opcional)
window.addEventListener('load', () => {
  const perfData = window.performance.timing;
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
  console.log(`⏱️ Tempo de carregamento: ${pageLoadTime}ms`);
  
  if (pageLoadTime > 3000) {
    console.warn('⚠️ Página lenta detectada. Considere otimizar imagens.');
  }
});