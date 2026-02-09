// JavaScript para o Site Las Lobas - SOULLOBA

// Controla a visibilidade da página de Workshop
const SHOW_WORKSHOP_PAGE = window.SHOW_WORKSHOP_PAGE ?? false;

document.addEventListener('DOMContentLoaded', function() {
    // Carrossel de depoimentos
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    if (testimonialCarousel) {
        const cardsWrapper = testimonialCarousel.querySelector('.testimonial-cards-wrapper');
        const leftArrow = testimonialCarousel.querySelector('.testimonial-arrow-left');
        const rightArrow = testimonialCarousel.querySelector('.testimonial-arrow-right');
        const dotsContainer = testimonialCarousel.querySelector('.testimonial-dots');
        
        const testimonialsData = [
            {
                nome: 'Fernanda Sampaio',
                texto: 'O conto que mais me marcou foi o do Terno de Sz Szabó, trazendo o insight de que eu não preciso me moldar para caber ou ser aceita. Esse entendimento me trouxe clareza sobre a necessidade de exercitar uma postura mais verdadeira comigo mesma.',
                foto: '',
            },
            {
                nome: 'Silvana Ribeiro',
                texto: 'O trabalho com os contos, símbolos e arquétipos me surpreendeu profundamente. Eu não tinha expectativas, e me vi refletida neles, aprendendo a me observar e a me inspirar. A forma como a Mara conduz esse trabalho é poética, leve e encantadora.',
                foto: '',
            },
            {
                nome: 'Ellen Martins',
                texto: 'O trabalho com os contos, símbolos e arquétipos foi essencial para me ajudar a identificar, acolher e cuidar do que precisava ser curado em mim. A forma como os encontros são conduzidos cria uma conexão profunda, é como se estivéssemos dentro do conto, vivendo a experiência de forma muito real.',
                foto: '',
            },
            {
                nome: 'Patrícia Santos',
                texto: 'A principal virada de chave foi o trabalho da intuição através dos contos. Esse contato me trouxe a oportunidade de pausar, me ouvir e exercitar consultas internas antes de agir. Aprendi a não me apertar, a reduzir a autocobrança e a respeitar mais o meu tempo.',
                foto: '',
            },
            {
                nome: 'Ana Maria Lucena',
                texto: 'Foi uma experiência quase mágica: depois de cada encontro, as coisas começavam a aparecer e ‘pipocar’ ao longo da semana, me convidando a viver tudo com mais consciência. Se eu tivesse que resumir minha jornada, diria que foi um caminho de aprender sobre mim e aprender a me amar.',
                foto: '',
            },
            {
                nome: 'Fernanda Rodrigues',
                texto: 'Ao final desse ciclo, celebro principalmente o fato de ter voltado meu olhar para mim. Esse movimento me fez reconhecer o quanto sou forte e potente, trazendo mais confiança para enfrentar desafios. Sinto que as pessoas passaram a me respeitar mais e a maior conquista interna foi, sem dúvida, ter nutrido esse amor-próprio.',
                foto: '',
            },
            {
                nome: 'Gabi Faustino',
                texto: 'A condução da Mara é diferenciada. Ela cria um espaço seguro, prepara o campo, respeita o tempo interno e nos convida a refletir e respirar. É um trabalho feito com consciência e presença, que desperta profundidade interna e promove verdadeiras transformações.',
                foto: '',
            },
            {
                nome: 'Valéria Bontempo',
                texto: 'Os momentos que mais me marcaram foram aqueles em que pude me deparar com as minhas próprias sombras. A maior virada de chave foi ter coragem para enxergar o que precisava ser visto, entendendo que adiar esse olhar cobra um preço alto mais adiante.',
                foto: '',
            },
            {
                nome: 'Rosana Lima',
                texto: 'O conto que mais me marcou foi o da Vasalisa, especialmente o encontro com a minha Baba Yaga interna. A grande virada de chave foi aceitar que, às vezes, preciso ser a "megera", colocar limites, dizer não e sustentar a minha verdade, mesmo que isso desagrade os outros.',
                foto: '',
            },
        ];
        
        let currentGroup = 0;
        const groupSize = 3;
        let testimonialInterval = null;

        function renderCards() {
            cardsWrapper.innerHTML = '';
            const start = currentGroup * groupSize;
            const cards = testimonialsData.slice(start, start + groupSize);
            
            cards.forEach(dep => {
                const card = document.createElement('div');
                card.className = 'testimonial-card';
                card.innerHTML = `
                    <div class="testimonial-photo-wrapper">
                        <img src="${dep.foto}" alt="${dep.nome}" class="testimonial-photo" loading="lazy">
                    </div>
                    <div class="testimonial-name-wrapper">
                        <span class="testimonial-name">${dep.nome}</span>
                    </div>
                    <div class="testimonial-stars">
                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                    </div>
                    <div class="testimonial-text">${dep.texto}</div>
                `;
                cardsWrapper.appendChild(card);
            });
        }

        function renderDots() {
            dotsContainer.innerHTML = '';
            const totalGroups = Math.ceil(testimonialsData.length / groupSize);
            
            for (let i = 0; i < totalGroups; i++) {
                const dot = document.createElement('button');
                dot.className = 'testimonial-dot' + (i === currentGroup ? ' active' : '');
                dot.setAttribute('aria-label', `Grupo ${i + 1}`);
                dot.addEventListener('click', () => showGroup(i));
                dotsContainer.appendChild(dot);
            }
        }

        function showGroup(idx) {
            currentGroup = idx;
            renderCards();
            renderDots();
        }

        function nextGroup() {
            const totalGroups = Math.ceil(testimonialsData.length / groupSize);
            let next = (currentGroup + 1) % totalGroups;
            showGroup(next);
        }
        
        function prevGroup() {
            const totalGroups = Math.ceil(testimonialsData.length / groupSize);
            let prev = (currentGroup - 1 + totalGroups) % totalGroups;
            showGroup(prev);
        }

        function startTestimonialCarousel() {
            if (testimonialInterval) clearInterval(testimonialInterval);
            testimonialInterval = setInterval(nextGroup, 5000);
        }

        leftArrow.addEventListener('click', prevGroup);
        rightArrow.addEventListener('click', nextGroup);
        testimonialCarousel.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
        testimonialCarousel.addEventListener('mouseleave', startTestimonialCarousel);

        // Inicializa
        renderCards();
        renderDots();
        startTestimonialCarousel();
    }

    // Ocultar página de workshop se configurado
    if (!SHOW_WORKSHOP_PAGE) {
        document.querySelectorAll('a[href="workshop.html"], a[href="./workshop.html"]').forEach(link => {
            const item = link.closest('li');
            if (item) {
                item.remove();
            } else {
                link.remove();
            }
        });
    }

    if (!SHOW_WORKSHOP_PAGE && window.location.pathname.toLowerCase().includes('workshop.html')) {
        window.location.href = 'index.html';
        return;
    }
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !nav.contains(e.target)) {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    const icon = mobileMenuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(55, 57, 33, 0.99)';
                header.style.boxShadow = '0 6px 25px rgba(55, 57, 33, 0.5)';
            } else {
                header.style.background = 'rgba(55, 57, 33, 0.97)';
                header.style.boxShadow = '0 4px 20px rgba(55, 57, 33, 0.4)';
            }
        });
    }

    // Smooth Scroll para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Fechar menu mobile se estiver aberto
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    const icon = mobileMenuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    
    // Formulário de Contato
    const contatoForm = document.querySelector('.contato-form');
    if (contatoForm) {
        contatoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Pegar os dados do formulário
            const formData = {
                nome: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                telefone: document.getElementById('telefone') ? document.getElementById('telefone').value : '',
                mensagem: document.getElementById('mensagem').value
            };
            
            // Formatar mensagem para WhatsApp
            let mensagemWhatsApp = `Olá! Gostaria de saber mais sobre o Grupo Terapêutico Las Lobas.%0A%0A` +
                `*Nome:* ${formData.nome}%0A` +
                `*E-mail:* ${formData.email}%0A`;
            
            if (formData.telefone) {
                mensagemWhatsApp += `*Telefone:* ${formData.telefone}%0A`;
            }
            
            mensagemWhatsApp += `%0A*Mensagem:* ${formData.mensagem}`;
            
            // Redirecionar para WhatsApp (substitua pelo número real)
            const whatsappURL = `https://api.whatsapp.com/send?phone=5531999999999&text=${mensagemWhatsApp}`;
            
            // Feedback visual
            const submitBtn = contatoForm.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Simular envio e redirecionar
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
                
                // Resetar formulário
                contatoForm.reset();
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
                submitBtn.style.background = '#4caf50';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1000);
        });
    }

    // Animação de fade-in nos elementos quando aparecem na tela
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar seções de conteúdo
    document.querySelectorAll('.content-section, .benefit-card, .info-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Lazy loading para imagens
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Adicionar efeito hover nos cards
    const cards = document.querySelectorAll('.benefit-card, .info-card, .workshop-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});