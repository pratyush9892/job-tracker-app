// Selecting elements
const addJobBtn = document.getElementById("addJobBtn");
const jobModal = document.getElementById("jobModal");
const closeModal = document.getElementById("closeModal");
const jobForm = document.getElementById("jobForm");
const jobList = document.getElementById("jobList");

// Open Modal
addJobBtn.addEventListener("click", () => {
  jobModal.classList.remove("hidden");
});

// Close Modal
closeModal.addEventListener("click", () => {
  jobModal.classList.add("hidden");
});
// LocalStorage se jobs uthana
let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

// Form Submit Event
jobForm.addEventListener("submit", function (e) {
  e.preventDefault();
console.log("submitted");
  const job = {
    id: Date.now(),
    company: document.getElementById("company").value,
    role: document.getElementById("role").value,
    location: document.getElementById("location").value,
    status: document.getElementById("jobstatus").value,
    date: document.getElementById("date").value,
  };

  jobs.push(job);
  localStorage.setItem("jobs", JSON.stringify(jobs));

  jobForm.reset();
  jobModal.classList.add("hidden");

  renderJobs(); // Show on screen
});
function renderJobs(filterStatus = "all") {
  jobList.innerHTML = "";

  const filteredJobs =
    filterStatus === "all"
      ? jobs
      : jobs.filter((job) => job.status === filterStatus);

  filteredJobs.forEach((job) => {
    const jobCard = document.createElement("div");
    jobCard.className = "job-card";
    jobCard.innerHTML = `
      <h4>${job.company}</h4>
      <p><strong>Role:</strong> ${job.role}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <p class="status"><strong>Status:</strong> ${job.status}</p>
      <p><strong>Date:</strong> ${job.date}</p>
<button class="delete-btn" data-id="${job.id}">Delete</button>

    `;
    jobList.appendChild(jobCard);
  });
}

// Initial render
renderJobs();
const statusFilter = document.getElementById("statusFilter");

statusFilter.addEventListener("change", (e) => {
  renderJobs(e.target.value);
});


// Delete Job Handler
jobList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const jobId = e.target.getAttribute("data-id");
    jobs = jobs.filter((job) => job.id != jobId);
    localStorage.setItem("jobs", JSON.stringify(jobs));
    renderJobs();
  }
});

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // Optional: Store theme preference
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// On load, apply stored theme
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
});
