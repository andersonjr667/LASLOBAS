// JavaScript para a Landing Page do Grupo Terapêutico

document.addEventListener('DOMContentLoaded', function() {
    
    // Formulário de Inscrição
    const inscriptionForm = document.getElementById('inscriptionForm');
    if (inscriptionForm) {
        inscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Pegar os dados do formulário
            const formData = {
                nome: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                telefone: document.getElementById('telefone').value,
                mensagem: document.getElementById('mensagem').value || 'Não informado'
            };
            
            // Formatar mensagem para WhatsApp
            const mensagemWhatsApp = `Olá! Gostaria de participar do Grupo Terapêutico "O Despertar da Mulher Loba".%0A%0A` +
                `*Nome:* ${formData.nome}%0A` +
                `*E-mail:* ${formData.email}%0A` +
                `*Telefone:* ${formData.telefone}%0A%0A` +
                `*Mensagem:* ${formData.mensagem}`;
            
            // Redirecionar para WhatsApp
            const whatsappURL = `https://api.whatsapp.com/send?phone=5531999999999&text=${mensagemWhatsApp}`;
            
            // Feedback visual
            const submitBtn = inscriptionForm.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Enviando...</span>';
            submitBtn.disabled = true;
            
            // Simular envio e redirecionar
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
                
                // Resetar formulário
                inscriptionForm.reset();
                submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Enviado com sucesso!</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #25D366, #128C7E)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1000);
        });
        
        // Máscara para telefone
        const telefoneInput = document.getElementById('telefone');
        if (telefoneInput) {
            telefoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 11) value = value.slice(0, 11);
                
                if (value.length >= 11) {
                    value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                } else if (value.length >= 7) {
                    value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
                } else if (value.length >= 3) {
                    value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
                }
                
                e.target.value = value;
            });
        }
    }
    
    // Formulário do Workshop
    const workshopForm = document.getElementById('workshopForm');
    if (workshopForm) {
        workshopForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                nome: document.getElementById('nome-workshop').value,
                email: document.getElementById('email-workshop').value,
                telefone: document.getElementById('telefone-workshop').value,
                opcao: document.getElementById('opcao-workshop').value
            };
            
            // Determinar opção selecionada
            const opcaoTexto = formData.opcao === 'workshop' ? 
                'Workshop Individual - R$ 97' : 
                'Workshop + Grupo Terapêutico - R$ 347';
            
            // Formatar mensagem para WhatsApp
            const mensagemWhatsApp = `Olá! Gostaria de me inscrever no Workshop "Contos de Fadas e a Psique Feminina".%0A%0A` +
                `*Nome:* ${formData.nome}%0A` +
                `*E-mail:* ${formData.email}%0A` +
                `*Telefone:* ${formData.telefone}%0A` +
                `*Opção escolhida:* ${opcaoTexto}`;
            
            const whatsappURL = `https://api.whatsapp.com/send?phone=5531999999999&text=${mensagemWhatsApp}`;
            
            const submitBtn = workshopForm.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Processando...</span>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
                workshopForm.reset();
                submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Inscrição enviada!</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #25D366, #128C7E)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1000);
        });
        
        const telefoneWorkshop = document.getElementById('telefone-workshop');
        if (telefoneWorkshop) {
            telefoneWorkshop.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 11) value = value.slice(0, 11);
                
                if (value.length >= 11) {
                    value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                } else if (value.length >= 7) {
                    value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
                } else if (value.length >= 3) {
                    value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
                }
                
                e.target.value = value;
            });
        }
    }
    
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
            
            // Add aria attributes for accessibility
            const isExpanded = navLinks.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu when clicking on a link
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // Smooth scroll para links internos
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Offset para header fixo
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação de entrada dos elementos quando entram na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Remove o observer após a animação
            }
        });
    }, observerOptions);

    // Elementos para animar
    const animateElements = document.querySelectorAll(
        '.benefit-card, .testimonial-card, .detail-item, .price-card, .about-content, .program-content'
    );
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Efeito parallax suave no hero
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-section');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }

    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestParallaxUpdate);

    // Contador animado para o preço
    function animateCounter(element, target, duration = 1000) {
        const start = 0;
        const increment = target / (duration / 16); // 60 FPS
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // Observador para animar o preço quando entrar na viewport
    const priceElement = document.querySelector('.amount');
    if (priceElement) {
        const priceObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetValue = parseInt(entry.target.textContent);
                    entry.target.textContent = '0';
                    animateCounter(entry.target, targetValue, 1500);
                    priceObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        priceObserver.observe(priceElement);
    }

    // Efeito de digitação removido para evitar bugs com HTML
    // O título agora aparece diretamente sem efeito de digitação

    // Botão de voltar ao topo
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(scrollToTopBtn);

    // Mostrar/esconder botão de voltar ao topo
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    // Funcionalidade do botão de voltar ao topo
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Validação e feedback do WhatsApp
    const whatsappButtons = document.querySelectorAll('a[href*="whatsapp"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Adicionar analytics/tracking aqui se necessário
            console.log('WhatsApp button clicked');
            
            // Feedback visual
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> <span>Redirecionando...</span>';
            this.style.background = 'linear-gradient(135deg, #25D366, #128C7E)';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = '';
            }, 2000);
        });
    });

    // Animação dos cards de benefícios
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateY(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0)';
        });
    });

    // Efeito de hover nos depoimentos
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Loading state para melhor experiência
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Remover loading se existir
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.fadeOut();
        }
    });

    // Preloader simples
    function createPreloader() {
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = `
            <div class="preloader-content">
                <div class="preloader-spinner"></div>
                <p>Carregando experiência transformadora...</p>
            </div>
        `;
        document.body.prepend(preloader);
        
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, 1000);
        });
    }

    // Verificar se é a primeira visita
    if (!sessionStorage.getItem('visited')) {
        createPreloader();
        sessionStorage.setItem('visited', 'true');
    }

    // Funcionalidade de compartilhamento
    if (navigator.share) {
        const shareBtn = document.createElement('button');
        shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> Compartilhar';
        shareBtn.className = 'share-btn';
        shareBtn.addEventListener('click', async function() {
            try {
                await navigator.share({
                    title: 'Grupo Terapêutico: O Despertar da Mulher Loba',
                    text: 'Desperte sua essência feminina através dos Contos de Fadas',
                    url: window.location.href
                });
            } catch (err) {
                console.log('Erro ao compartilhar:', err);
            }
        });
        
        // Adicionar botão em local apropriado
        const ctaSection = document.querySelector('.cta-section .container');
        if (ctaSection) {
            ctaSection.appendChild(shareBtn);
        }
    }

    // Lazy loading para imagens
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Adicionar efeitos de micro-interação
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Adicionar indicador de progresso de leitura
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        
        progressBar.style.width = progress + '%';
    });

});

// CSS adicional para os novos elementos via JavaScript
const additionalStyles = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }

    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .scroll-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #d4af37, #b8860b);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
    }

    .scroll-to-top.show {
        opacity: 1;
        visibility: visible;
    }

    .scroll-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
    }

    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #2c1810, #6b5b73);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    }

    .preloader-content {
        text-align: center;
        color: white;
    }

    .preloader-spinner {
        width: 50px;
        height: 50px;
        border: 3px solid rgba(212, 175, 55, 0.3);
        border-top: 3px solid #d4af37;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .share-btn {
        background: linear-gradient(135deg, #25D366, #128C7E);
        color: white;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
        margin-top: 1rem;
        transition: all 0.3s ease;
    }

    .share-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
    }

    .reading-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #d4af37, #ffd700);
        z-index: 9999;
        transition: width 0.3s ease;
    }

    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }

    .benefit-card {
        transition: all 0.3s ease;
    }

    .testimonial-card {
        transition: all 0.3s ease;
    }

    @media (max-width: 768px) {
        .scroll-to-top {
            bottom: 15px;
            right: 15px;
            width: 45px;
            height: 45px;
            font-size: 1rem;
        }
    }
`;

// Adicionar os estilos ao documento
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Formulário de Contato
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            nome: document.getElementById('nome-contato').value,
            email: document.getElementById('email-contato').value,
            telefone: document.getElementById('telefone-contato').value,
            assunto: document.getElementById('assunto').value,
            mensagem: document.getElementById('mensagem-contato').value
        };
        
        // Determinar texto do assunto
        const assuntoTexto = {
            'grupo': 'Grupo Terapêutico',
            'workshop': 'Workshop',
            'atendimento': 'Atendimento Individual',
            'parceria': 'Parcerias/Palestras',
            'outro': 'Outro assunto'
        }[formData.assunto] || formData.assunto;
        
        // Formatar mensagem para WhatsApp
        const mensagemWhatsApp = `Olá! Gostaria de entrar em contato.%0A%0A` +
            `*Nome:* ${formData.nome}%0A` +
            `*E-mail:* ${formData.email}%0A` +
            `*Telefone:* ${formData.telefone}%0A` +
            `*Assunto:* ${assuntoTexto}%0A%0A` +
            `*Mensagem:*%0A${formData.mensagem}`;
        
        const whatsappURL = `https://api.whatsapp.com/send?phone=5531999999999&text=${mensagemWhatsApp}`;
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Enviando...</span>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            window.open(whatsappURL, '_blank');
            contactForm.reset();
            submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Mensagem enviada!</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #25D366, #128C7E)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 1000);
    });
    
    const telefoneContato = document.getElementById('telefone-contato');
    if (telefoneContato) {
        telefoneContato.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length >= 11) {
                value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 7) {
                value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
            }
            
            e.target.value = value;
        });
    }
}

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Fechar todos os outros
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Abrir o clicado se não estava ativo
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});