// Dark Mode
const themeBtn = document.getElementById('theme-toggle');
themeBtn.onclick = () => {
    document.body.classList.toggle('dark-mode');
    themeBtn.innerText = document.body.classList.contains('dark-mode') ? "🌙" : "🌞";
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? "dark" : "light");
};
if(localStorage.getItem("theme") === "dark") document.body.classList.add('dark-mode');

// Projects
const projects = [
    { title: "EMG Signal Processing", description: "Analyzing EMG signals from muscles." },
    { title: "Digital Electronics Lab", description: "Logic circuits using 7400 series ICs." },
    { title: "MATLAB Image Processing", description: "Cropping, filtering, and histograms." },
    { title: "Project One", description: "Simple website layout." },
    { title: "Project Two", description: "Interactive JS app." },
    { title: "Project Three", description: "CSS design project." }
];
const projectsContainer = document.getElementById("projects-container");
projects.forEach(proj => {
    const card = document.createElement("div");
    card.classList.add("project-card");
    card.innerHTML = <h3>${proj.title}</h3><p>${proj.description}</p>;
    projectsContainer.appendChild(card);
});

// Contact & Admin CRUD
const contactForm = document.getElementById('contact-form');
const tableBody = document.getElementById('admin-table-body');
const submitBtn = document.getElementById('submit-btn');
const editIndexField = document.getElementById('edit-index');

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('contacts')) || [];
    tableBody.innerHTML = '';
    messages.forEach((msg, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${msg.name}</td>
                <td>${msg.email}</td>
                <td>${msg.message}</td>
                <td>
                    <button class="btn-edit" onclick="editMsg(${index})">Edit</button>
                    <button class="btn-del" onclick="deleteMsg(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

contactForm.onsubmit = (e) => {
    e.preventDefault();
    const messages = JSON.parse(localStorage.getItem('contacts')) || [];
    const newMsg = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    const editIndex = editIndexField.value;
    if(editIndex === "") messages.push(newMsg);
    else { messages[editIndex] = newMsg; editIndexField.value = ""; submitBtn.innerText="Send Message (Create)"; }
    localStorage.setItem('contacts', JSON.stringify(messages));
    contactForm.reset();
    loadMessages();
};

window.deleteMsg = (index) => {
    const messages = JSON.parse(localStorage.getItem('contacts'));
    messages.splice(index,1);
    localStorage.setItem('contacts', JSON.stringify(messages));
    loadMessages();
};

window.editMsg = (index) => {
    const messages = JSON.parse(localStorage.getItem('contacts'));
    const msg = messages[index];
    document.getElementById('name').value = msg.name;
    document.getElementById('email').value = msg.email;
    document.getElementById('message').value = msg.message;
    editIndexField.value = index;
    submitBtn.innerText="Update Message (Update)";
    window.scrollTo({top:0, behavior:'smooth'});
};

window.onload = loadMessage