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
    if (!projectContainer) return;
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

// 4. Share Portfolio Functionality
const shareBtn = document.getElementById('share-btn');
if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
        const shareData = {
            title: 'Portfolio | Dulanjali Sewwandi',
            text: 'Check out this Full-Stack Developer portfolio!',
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Share canceled');
            }
        } else {
            // Fallback for browsers that don't support Web Share API
            navigator.clipboard.writeText(window.location.href);
            alert('Portfolio link copied to clipboard!');
        }
    });
}

// 5. Like Button Functionality
const likeBtn = document.getElementById('like-btn');
const likeCount = document.getElementById('like-count');

if (likeBtn && likeCount) {
    let likes = parseInt(localStorage.getItem('portfolio-likes')) || 0;
    let isLiked = localStorage.getItem('portfolio-is-liked') === 'true';

    likeCount.textContent = likes;
    updateLikeStyles(isLiked);

    likeBtn.addEventListener('click', () => {
        if (isLiked) {
            likes--;
            isLiked = false;
        } else {
            likes++;
            isLiked = true;
        }
        localStorage.setItem('portfolio-likes', likes);
        localStorage.setItem('portfolio-is-liked', isLiked);
        likeCount.textContent = likes;
        updateLikeStyles(isLiked);
    });
}

function updateLikeStyles(isLiked) {
    const icon = likeBtn.querySelector('i');
    if (isLiked) {
        icon.classList.replace('far', 'fas');
        likeBtn.style.backgroundColor = '#ff4d4d';
        likeBtn.style.borderColor = '#ff4d4d';
    } else {
        icon.classList.replace('fas', 'far');
        likeBtn.style.backgroundColor = 'transparent';
        likeBtn.style.borderColor = 'var(--primary)';
    }
}

// 6. Follow Button Functionality
const followBtn = document.getElementById('follow-btn');
if (followBtn) {
    let isFollowing = localStorage.getItem('portfolio-following') === 'true';
    updateFollowText(isFollowing);

    followBtn.addEventListener('click', () => {
        isFollowing = !isFollowing;
        localStorage.setItem('portfolio-following', isFollowing);
        updateFollowText(isFollowing);
    });
}

function updateFollowText(isFollowing) {
    if (isFollowing) {
        followBtn.innerHTML = '<i class="fas fa-check"></i> Following';
        followBtn.classList.replace('btn-outline', 'btn-primary');
    } else {
        followBtn.innerHTML = '<i class="fas fa-plus"></i> Follow';
        followBtn.classList.replace('btn-primary', 'btn-outline');
    }
}

// 7. Comment System
const commentForm = document.getElementById('comment-form');
const commentsList = document.getElementById('comments-list');

if (commentForm && commentsList) {
    let comments = JSON.parse(localStorage.getItem('portfolio-comments')) || [];
    renderComments();

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('comment-name').value;
        const text = document.getElementById('comment-text').value;
        const date = new Date().toLocaleDateString();

        const newComment = { name, text, date };
        comments.unshift(newComment);
        localStorage.setItem('portfolio-comments', JSON.stringify(comments));
        
        renderComments();
        e.target.reset();
    });

    function renderComments() {
        commentsList.innerHTML = comments.map(c => `
            <div class="comment-item">
                <div class="comment-header">
                    <strong>${c.name}</strong>
                    <span>${c.date}</span>
                </div>
                <p>${c.text}</p>
            </div>
        `).join('');
    }
}

// Initialize
window.onload = loadProjects;
