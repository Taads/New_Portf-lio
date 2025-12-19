// Animações baseadas em scroll usando IntersectionObserver
const sections = document.querySelectorAll("[data-section]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.18,
  }
);

sections.forEach((section) => observer.observe(section));

// Dados dinâmicos dos projetos
const projectsData = [
  {
    title: "Fluxo Transporte",
    type: "Web App",
    description: "Plataforma de Fluxo onde o usuário pode ver e análise a otimização de redes de transporte urbano, distribuição de recursos e infraestrutura crítica.",
    image: "imagens/Fluxo.png",
    tags: ["HTML5", "CSS3", "JavaScript"],
    live: "https://luttudo.github.io/Fluxo/",
    repo: "https://github.com/Taads/Fluxo_Transporte.git",
  },
  {
    title: "Nébula SaaS",
    type: "Dashboard",
    description: "Painel para métricas de produto com personalização por squads e alertas inteligentes.",
    image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1600",
    tags: ["Next.js", "Zustand", "Framer Motion", "Design System"],
    live: "https://seuprojeto.com/nebula",
    repo: "https://github.com/seuusuario/nebula-saas",
  },
  {
    title: "Pulse Fit",
    type: "Landing Page",
    description: "Lançamento de app fitness com storytelling, vídeo hero e provas sociais animadas.",
    image: "https://images.pexels.com/photos/3763878/pexels-photo-3763878.jpeg?auto=compress&cs=tinysrgb&w=1600",
    tags: ["HTML", "CSS Animations", "GSAP"],
    live: "https://seuprojeto.com/pulse-fit",
    repo: "https://github.com/seuusuario/pulse-fit",
  },
  {
    title: "CinemaFrame",
    type: "Portfolio",
    description: "Portfólio cinematográfico com parallax, áudio ambiente e cards inclinando no scroll.",
    image: "https://images.pexels.com/photos/6898856/pexels-photo-6898856.jpeg?auto=compress&cs=tinysrgb&w=1600",
    tags: ["Vanilla JS", "Scroll Animations", "Motion"],
    live: "https://seuprojeto.com/cinemaframe",
    repo: "https://github.com/seuusuario/cinemaframe",
  },
  {
    title: "MarketOps",
    type: "E-commerce",
    description: "Experiência de compra com personalização, sugestões com IA leve e checkout fluido.",
    image: "https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=1600",
    tags: ["Next.js", "Tailwind", "API Routes"],
    live: "https://seuprojeto.com/marketops",
    repo: "https://github.com/seuusuario/marketops",
  },
];

// Elementos DOM
const projectsGrid = document.getElementById("projects-grid");
const projectFocus = document.getElementById("project-focus");
const surpriseButton = document.getElementById("surprise-project");
const focusImg = document.getElementById("focus-image");
const focusTitle = document.getElementById("focus-title");
const focusType = document.getElementById("focus-type");
const focusDescription = document.getElementById("focus-description");
const focusTags = document.getElementById("focus-tags");
const focusLive = document.getElementById("focus-live");
const focusRepo = document.getElementById("focus-repo");
const focusClose = document.querySelector(".focus-close");
const glow = document.querySelector(".body-glow");

// Renderiza projetos
function renderProjects() {
  if (!projectsGrid) return;
  projectsGrid.innerHTML = projectsData
    .map(
      (project, index) => `
      <article class="project-card" data-scroll-tilt data-project-index="${index}">
        <div class="project-image-wrapper">
          <img src="${project.image}" alt="${project.title}" class="project-image" />
          <div class="project-gradient"></div>
          <span class="project-label">${project.type}</span>
        </div>
        <div class="project-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-meta">
            ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
          </div>
          <div class="project-links">
            <a href="${project.live}" target="_blank" rel="noreferrer">Ver projeto</a>
            <a href="${project.repo}" target="_blank" rel="noreferrer">Código no GitHub</a>
          </div>
        </div>
      </article>
    `
    )
    .join("");
  initTilt();
}

// Efeito parallax suave
const parallaxEls = document.querySelectorAll("[data-parallax]");
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY || window.pageYOffset;
  const viewportHeight = window.innerHeight;
  parallaxEls.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const offset = (rect.top - viewportHeight / 2) / viewportHeight;
    const translateY = -offset * 18;
    const rotate = -offset * 4;
    el.style.transform = `translateY(${translateY}px) rotate3d(0, 1, 0, ${rotate}deg)`;
  });
});

// Tilt nos cards de projeto
let tiltCards = [];
function handleTilt() {
  const scrollY = window.scrollY || window.pageYOffset;
  tiltCards.forEach((card, index) => {
    const speed = 0.05 + index * 0.02;
    const tilt = Math.sin(scrollY * speed * 0.02) * 4;
    card.style.transform = `rotate3d(1, 0, 0, ${tilt}deg) translateY(${tilt * -0.4}px)`;
  });
}
function initTilt() {
  tiltCards = Array.from(document.querySelectorAll("[data-scroll-tilt]"));
  handleTilt();
}
window.addEventListener("scroll", handleTilt);

// Modal de projeto
function openProjectFocus(project, card) {
  if (!projectFocus) return;
  document.querySelectorAll(".project-card.is-selected").forEach((c) => c.classList.remove("is-selected"));
  if (card) card.classList.add("is-selected");

  focusImg.src = project.image;
  focusImg.alt = project.title;
  focusTitle.textContent = project.title;
  focusType.textContent = project.type;
  focusDescription.textContent = project.description;
  focusTags.innerHTML = project.tags.map((tag) => `<span class="chip">${tag}</span>`).join("");
  focusLive.href = project.live;
  focusRepo.href = project.repo;

  projectFocus.classList.add("is-open");
  projectFocus.setAttribute("aria-hidden", "false");
}
function closeProjectFocus() {
  if (!projectFocus) return;
  projectFocus.classList.remove("is-open");
  projectFocus.setAttribute("aria-hidden", "true");
}
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeProjectFocus(); });
if (projectFocus) {
  projectFocus.addEventListener("click", (e) => {
    if (e.target === projectFocus || e.target.classList.contains("focus-backdrop")) closeProjectFocus();
  });
}
focusClose?.addEventListener("click", closeProjectFocus);
projectsGrid?.addEventListener("click", (e) => {
  const card = e.target.closest(".project-card");
  if (!card) return;
  const index = Number(card.dataset.projectIndex);
  const project = projectsData[index];
  if (project) openProjectFocus(project, card);
});
surpriseButton?.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * projectsData.length);
  const project = projectsData[randomIndex];
  const card = document.querySelector(`[data-project-index="${randomIndex}"]`);
  if (project) {
    openProjectFocus(project, card);
    surpriseButton.classList.add("is-pressed");
    setTimeout(() => surpriseButton.classList.remove("is-pressed"), 160);
  }
});

renderProjects();

// Fundo reage ao scroll
window.addEventListener("scroll", () => {
  if (!glow) return;
  const y = window.scrollY || 0;
  glow.style.transform = `translate3d(${y * -0.02}px, ${y * -0.06}px, 0) scale(1.02)`;
});

// Ano no footer
document.getElementById("year").textContent = new Date().getFullYear();

// Animação de montagem do título "Desenvolvedor Full Stack"
function animateTitle() {
  const titleElement = document.getElementById("animated-title");
  if (!titleElement) return;

  // Verifica se já foi animado (usando sessionStorage)
  const hasAnimated = sessionStorage.getItem("titleAnimated");
  if (hasAnimated) {
    // Se já animou antes, apenas mostra o texto normalmente
    titleElement.textContent = "Desenvolvedor Full Stack";
    return;
  }

  const text = "Desenvolvedor Full Stack";
  const letters = text.split("");
  
  // Limpa o conteúdo
  titleElement.innerHTML = "";
  
  // Cria spans para cada letra
  letters.forEach((letter, index) => {
    const span = document.createElement("span");
    if (letter === " ") {
      span.className = "space";
      span.innerHTML = "&nbsp;";
    } else {
      span.className = "letter";
      span.textContent = letter;
      // Delay escalonado para cada letra (mais rápido no início, mais lento no final)
      span.style.animationDelay = `${index * 0.08}s`;
    }
    titleElement.appendChild(span);
  });

  // Marca como animado
  sessionStorage.setItem("titleAnimated", "true");
}

// Executa a animação quando o DOM estiver pronto
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", animateTitle);
} else {
  animateTitle();
}

// Mouse glow
const mouseGlow = document.createElement('div');
mouseGlow.classList.add('mouse-glow');
document.body.appendChild(mouseGlow);
document.addEventListener('mousemove', (e) => {
  mouseGlow.style.left = `${e.clientX}px`;
  mouseGlow.style.top = `${e.clientY}px`;
});
document.addEventListener('mouseenter', () => mouseGlow.style.opacity = '0.8');
document.addEventListener('mouseleave', () => mouseGlow.style.opacity = '0');

// === ESTRELAS E METEOROS ===
const starsContainer = document.createElement('div');
starsContainer.classList.add('stars');
document.body.insertBefore(starsContainer, document.body.firstChild);

// 150 estrelas piscando
for (let i = 0; i < 150; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.width = `${Math.random() * 1.8 + 0.6}px`;
  star.style.height = star.style.width;
  star.style.animationDelay = `${Math.random() * 6}s`;
  star.style.animationDuration = `${Math.random() * 3 + 2}s`;
  starsContainer.appendChild(star);
}

// Meteoro com rastro
function createMeteor() {
  const meteor = document.createElement('div');
  meteor.classList.add('meteor');
  meteor.style.left = `${Math.random() * 80 + 10}%`;
  meteor.style.top = `${Math.random() * 70 + 10}%`;
  const angle = Math.random() * 40 - 60;
  meteor.style.transform = `rotate(${angle}deg)`;
  const duration = Math.random() * 0.8 + 1.2;
  meteor.style.animationDuration = `${duration}s`;
  document.body.appendChild(meteor);
  meteor.addEventListener('animationend', () => meteor.remove());
}

function triggerMeteor() {
  createMeteor();
  const nextDelay = Math.random() * 20000 + 10000;
  setTimeout(triggerMeteor, nextDelay);
}
triggerMeteor();

// === NOVO: Formulário de contato com feedback visual ===
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm && formSuccess) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = this.querySelector('.contact-submit');

    // Mostra estado de envio
    submitBtn.innerHTML = '<span>Enviando...</span>';
    submitBtn.disabled = true;

    // Simula envio (1.5s)
    setTimeout(() => {
      // Fade out do formulário
      contactForm.style.opacity = '0';
      contactForm.style.transition = 'opacity 0.6s ease';

      setTimeout(() => {
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        formSuccess.style.opacity = '0';
        formSuccess.style.transition = 'opacity 0.8s ease';

        // Fade in da mensagem de sucesso
        requestAnimationFrame(() => {
          formSuccess.style.opacity = '1';
        });
      }, 600);
    }, 1500);
  });
}