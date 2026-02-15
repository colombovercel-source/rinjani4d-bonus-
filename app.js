// ================= MEMBER =================
const claimBtn = document.getElementById("claimBtn");
const historyList = document.getElementById("historyList");
const resultBox = document.getElementById("result");

let historyData = JSON.parse(localStorage.getItem("history")) || [];

function renderHistory() {
  if (!historyList) return;
  historyList.innerHTML = "";
  historyData.slice(0, 5).forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.user} berhasil klaim bonus`;
    historyList.appendChild(li);
  });
}

if (claimBtn) {
  renderHistory();

  claimBtn.onclick = () => {
    const userId = document.getElementById("userId").value.trim();
    if (!userId) {
      alert("User ID wajib diisi");
      return;
    }

    if (localStorage.getItem("claimed_" + userId)) {
      alert("User ID ini sudah pernah klaim bonus");
      return;
    }

    localStorage.setItem("claimed_" + userId, "true");
    historyData.unshift({ user: userId });
    localStorage.setItem("history", JSON.stringify(historyData));

    resultBox.classList.remove("hidden");
    resultBox.innerHTML = `
      <h3>🎉 Selamat!</h3>
      <p>User ID <b>${userId}</b> berhasil klaim bonus.</p>
      <p>Silakan screenshot dan kirim ke CS.</p>
      <button onclick="window.open('https://rinjanipuncak.com','_blank')">
        HUBUNGI CS
      </button>
    `;

    renderHistory();
  };
}

// ================= ADMIN =================
function adminLogin() {
  const user = document.getElementById("adminUser").value;
  const pass = document.getElementById("adminPass").value;

  if (user === "admin" && pass === "admin123") {
    localStorage.setItem("admin_login", "true");
    showDashboard();
  } else {
    alert("Login admin gagal");
  }
}

function showDashboard() {
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");

  const list = document.getElementById("adminData");
  list.innerHTML = "";

  historyData.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.user;
    list.appendChild(li);
  });
}

function logout() {
  localStorage.removeItem("admin_login");
  location.reload();
}

if (localStorage.getItem("admin_login")) {
  showDashboard();
}
