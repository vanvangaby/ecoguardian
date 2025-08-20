const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

const projectsData = [
    {
        id: 1,
        name: "Reflorestamento Urbano",
        description: "Plantio de árvores nativas em áreas urbanas para melhorar a qualidade do ar e criar corredores ecológicos.",
        status: "active",
        icon: "fas fa-tree"
    },
    {
        id: 2,
        name: "Reciclagem Inteligente",
        description: "Sistema de coleta seletiva com IoT para otimizar rotas e aumentar a eficiência da reciclagem.",
        status: "active",
        icon: "fas fa-recycle"
    },
    {
        id: 3,
        name: "Energia Solar Comunitária",
        description: "Instalação de painéis solares em comunidades carentes para democratizar o acesso à energia limpa.",
        status: "planning",
        icon: "fas fa-solar-panel"
    },
    {
        id: 4,
        name: "Monitoramento de Qualidade da Água",
        description: "Sensores IoT para monitoramento em tempo real da qualidade da água em rios e lagos urbanos.",
        status: "completed",
        icon: "fas fa-tint"
    },
    {
        id: 5,
        name: "Hortas Verticais",
        description: "Implementação de hortas verticais em escolas e centros comunitários para educação ambiental.",
        status: "active",
        icon: "fas fa-seedling"
    },
    {
        id: 6,
        name: "Compostagem Digital",
        description: "App para conectar produtores de resíduos orgânicos com centros de compostagem locais.",
        status: "planning",
        icon: "fas fa-leaf"
    }
];

const blogData = [
    {
        id: 1,
        title: "5 Dicas para Reduzir o Lixo Plástico em Casa",
        excerpt: "Pequenas mudanças no dia a dia podem fazer uma grande diferença para o meio ambiente.",
        category: "sustentabilidade",
        date: "2024-01-15",
        icon: "fas fa-home"
    },
    {
        id: 2,
        title: "Como a IoT Está Revolucionando o Monitoramento Ambiental",
        excerpt: "Sensores inteligentes permitem acompanhar em tempo real a saúde dos ecossistemas.",
        category: "tecnologia",
        date: "2024-01-10",
        icon: "fas fa-microchip"
    },
    {
        id: 3,
        title: "Projeto Reflorestamento: 500 Árvores Plantadas",
        excerpt: "Celebramos mais um marco importante em nosso projeto de reflorestamento urbano.",
        category: "projetos",
        date: "2024-01-05",
        icon: "fas fa-tree"
    },
    {
        id: 4,
        title: "Energia Solar: O Futuro é Agora",
        excerpt: "Entenda como a energia solar pode transformar comunidades e reduzir custos.",
        category: "sustentabilidade",
        date: "2024-01-01",
        icon: "fas fa-sun"
    },
    {
        id: 5,
        title: "Inteligência Artificial na Conservação",
        excerpt: "Como a IA está ajudando a proteger espécies ameaçadas e monitorar biodiversidade.",
        category: "tecnologia",
        date: "2023-12-28",
        icon: "fas fa-robot"
    },
    {
        id: 6,
        title: "Hortas Urbanas: Alimentação Sustentável",
        excerpt: "Descubra como criar sua própria horta urbana e contribuir para um futuro mais verde.",
        category: "sustentabilidade",
        date: "2023-12-25",
        icon: "fas fa-carrot"
    }
];

function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = '';
   
    projectsData.forEach(project => {
        const statusClass = `status-${project.status}`;
        const statusText = {
            'active': 'Em Andamento',
            'completed': 'Concluído',
            'planning': 'Em Planejamento'
        };

        const projectCard = document.createElement('div');
        projectCard.className = 'project-card fade-in-up';
        projectCard.innerHTML = `
            <div class="project-image">
                <i class="${project.icon}"></i>
            </div>
            <div class="project-content">
                <span class="project-status ${statusClass}">${statusText[project.status]}</span>
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <button class="btn btn-primary" onclick="openProjectDetails(${project.id})">Saiba mais</button>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

function loadBlogPosts(category = 'all') {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;

    blogGrid.innerHTML = '';
   
    const filteredPosts = category === 'all' ? blogData : blogData.filter(post => post.category === category);
   
    filteredPosts.forEach(post => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card fade-in-up';
        blogCard.innerHTML = `
            <div class="blog-image">
                <i class="${post.icon}"></i>
            </div>
            <div class="blog-content">
                <span class="blog-category">${post.category}</span>
                <h3>${post.title}</h3>
                <div class="blog-date">${formatDate(post.date)}</div>
                <p>${post.excerpt}</p>
                <a href="#" class="read-more">Ler mais →</a>
            </div>
        `;
        blogGrid.appendChild(blogCard);
    });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadBlogPosts(btn.dataset.category);
    });
});

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
   
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
       
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
       
        updateCounter();
    });
}
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
           
            if (entry.target.id === 'impact') {
                animateCounters();
            }
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});

function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    const map = L.map('map').setView([-23.5505, -46.6333], 10); // São Paulo coordinates

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const projectLocations = [
        {
            lat: -23.5505,
            lng: -46.6333,
            title: "Reflorestamento Urbano - Centro",
            description: "Plantio de 200 árvores nativas no centro da cidade"
        },
        {
            lat: -23.5629,
            lng: -46.6544,
            title: "Hortas Verticais - Zona Sul",
            description: "Implementação de hortas em 5 escolas da região"
        },
        {
            lat: -23.5329,
            lng: -46.6395,
            title: "Energia Solar - Zona Norte",
            description: "Instalação de painéis solares em centro comunitário"
        },
        {
            lat: -23.5489,
            lng: -46.6388,
            title: "Monitoramento de Água - Rio Tietê",
            description: "Sensores de qualidade da água instalados"
        }
    ];

    projectLocations.forEach(location => {
        const marker = L.marker([location.lat, location.lng]).addTo(map);
        marker.bindPopup(`
            <div style="text-align: center;">
                <h4 style="color: #2d5a27; margin-bottom: 10px;">${location.title}</h4>
                <p style="margin-bottom: 10px;">${location.description}</p>
                <button style="background: #2d5a27; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Ver detalhes</button>
            </div>
        `);
    });
}

let selectedAmount = 0;

document.querySelectorAll('.amount-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedAmount = parseInt(btn.dataset.amount);
        document.getElementById('customAmount').value = '';
    });
});

document.getElementById('customAmount').addEventListener('input', (e) => {
    document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
    selectedAmount = parseInt(e.target.value) || 0;
});

function processDonation() {
    const frequency = document.querySelector('input[name="frequency"]:checked').value;
   
    if (selectedAmount <= 0) {
        alert('Por favor, selecione um valor para doação.');
        return;
    }

    alert(`Obrigado por sua doação de R$ ${selectedAmount}! ${frequency === 'monthly' ? '(Doação mensal)' : '(Doação única)'}\n\nEm breve você será redirecionado para o pagamento.`);
}
function openVolunteerForm() {
    document.getElementById('volunteerModal').style.display = 'block';
}

function openPartnerForm() {
    alert('Formulário de parceria será aberto em breve. Entre em contato conosco pelo e-mail contato@ecoguardian.org');
}

function openDonationForm() {
    document.getElementById('donate').scrollIntoView({ behavior: 'smooth' });
}

function openProjectDetails(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (project) {
        alert(`Detalhes do projeto: ${project.name}\n\n${project.description}\n\nEm breve teremos uma página dedicada para cada projeto!`);
    }
}

document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        closeBtn.closest('.modal').style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    e.target.reset();
});

document.getElementById('volunteerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Cadastro realizado com sucesso! Entraremos em contato em breve.');
    document.getElementById('volunteerModal').style.display = 'none';
    e.target.reset();
});

document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Inscrição realizada com sucesso! Você receberá nossas novidades por e-mail.');
    e.target.reset();
});

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    loadBlogPosts();
   
    setTimeout(initMap, 100);
   
    const elements = document.querySelectorAll('.project-card, .blog-card, .participate-card, .icon-card');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('fade-in-up');
        }, index * 100);
    });
});

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    if (scrollTop > 500) {
        if (!document.querySelector('.scroll-to-top')) {
            const scrollBtn = document.createElement('button');
            scrollBtn.className = 'scroll-to-top';
            scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                z-index: 1000;
                transition: all 0.3s ease;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            `;
            scrollBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            document.body.appendChild(scrollBtn);
        }
    } else {
        const scrollBtn = document.querySelector('.scroll-to-top');
        if (scrollBtn) {
            scrollBtn.remove();
        }
    }
});
