const claimBtn = document.getElementById("claimBtn");
const userIdInput = document.getElementById("userId");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupMessage = document.getElementById("popupMessage");
const historyList = document.getElementById("historyList");

let claimedUsers = JSON.parse(localStorage.getItem("claimedUsers")) || {};

renderHistory();

claimBtn.addEventListener("click", () => {
  const userId = userIdInput.value.trim();

  if (!userId) {
    showPopup("⚠️ Perhatian", "Silakan masukkan User ID.");
    return;
  }

  if (claimedUsers[userId]) {
    showPopup(
      "❌ Sudah Klaim",
      `User ID <b>${maskUser(userId)}</b> sudah pernah klaim bonus.`
    );
    return;
  }

  const bonus = Math.floor(Math.random() * (200000 - 25000 + 1)) + 25000;

  claimedUsers[userId] = {
    bonus,
    time: Date.now()
  };

  localStorage.setItem("claimedUsers", JSON.stringify(claimedUsers));

  showPopup(
    "🎉 Selamat!",
    `User ID <b>${maskUser(userId)}</b> mendapatkan bonus <b>Rp ${bonus.toLocaleString("id-ID")}</b>`
  );

  userIdInput.value = "";
  renderHistory();
});

function renderHistory() {
  historyList.innerHTML = "";

  const entries = Object.entries(claimedUsers)
    .sort((a, b) => b[1].time - a[1].time)
    .slice(0, 20);

  if (entries.length === 0) {
    historyList.innerHTML = "<li>Belum ada klaim</li>";
    return;
  }

  entries.forEach(([user, data]) => {
    const li = document.createElement("li");
    li.innerHTML = `<b>${maskUser(user)}</b> — Rp ${data.bonus.toLocaleString("id-ID")}`;
    historyList.appendChild(li);
  });
}

function maskUser(userId) {
  if (userId.length <= 4) return userId;
  return userId.slice(0, 4) + "***" + userId.slice(-3);
}

function showPopup(title, message) {
  popupTitle.innerHTML = title;
  popupMessage.innerHTML = message;
  popup.style.display = "flex";
}

function closePopup() {
  popup.style.display = "none";
}
