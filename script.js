// 1. Theme Management (Week 4)
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
});

// 2. Dynamic Projects Array (Week 6)
const projectData = [
    {
        title: "E-Commerce Dashboard",
        tech: "React, Node.js",
        description: "Full-scale admin panel with real-time sales tracking."
    },
    {
        title: "HealthCare App",
        tech: "PHP, MySQL",
        description: "Patient appointment system with secure login (Week 10 CRUD)."
    },
    {
        title: "Portfolio v1",
        tech: "HTML, CSS, JS",
        description: "Responsive website following modern UI principles."
    }
];

const projectContainer = document.getElementById('project-container');

function loadProjects() {
    projectContainer.innerHTML = projectData.map(project => `
        <div class="project-card">
            <h3>${project.title}</h3>
            <p><strong>${project.tech}</strong></p>
            <p>${project.description}</p>
            <a href="#" style="color:var(--primary); text-decoration:none; margin-top:1rem; display:block;">Case Study →</a>
        </div>
    `).join('');
}

// 3. Form Handling (Week 5)
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent successfully.");
    e.target.reset();
});

// Initialize
window.onload = loadProjects;
