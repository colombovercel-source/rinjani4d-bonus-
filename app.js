const claimBtn = document.getElementById("claimBtn");
const userIdInput = document.getElementById("userId");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupMessage = document.getElementById("popupMessage");
const historyList = document.getElementById("historyList");

// Nominal bulat: 25.000 – 200.000 (kelipatan 5.000)
const BONUS_LIST = [];
for (let i = 25000; i <= 200000; i += 5000) {
  BONUS_LIST.push(i);
}

// Storage
let claimedUsers = JSON.parse(localStorage.getItem("claimedUsers")) || {};
let historyData = JSON.parse(localStorage.getItem("historyData")) || [];

// Buat 20 riwayat acak (HANYA JIKA KOSONG)
if (historyData.length === 0) {
  for (let i = 0; i < 20; i++) {
    historyData.push(generateRandomHistory());
  }
  saveHistory();
}

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

  const bonus = randomBonus();

  claimedUsers[userId] = true;
  historyData.unshift({
    user: userId,
    bonus: bonus,
    time: Date.now()
  });

  historyData = historyData.slice(0, 20);

  localStorage.setItem("claimedUsers", JSON.stringify(claimedUsers));
  saveHistory();

  showPopup(
    "💖 Selamat !! 💖",
    `User ID <b>${maskUser(userId)}</b> mendapatkan bonus <b>Rp ${bonus.toLocaleString("id-ID")}</b>`
  );

  userIdInput.value = "";
  renderHistory();
});

// ================= FUNCTIONS =================

function renderHistory() {
  historyList.innerHTML = "";

  historyData.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<b>${maskUser(item.user)}</b> — Rp ${item.bonus.toLocaleString("id-ID")}`;
    historyList.appendChild(li);
  });
}

function maskUser(user) {
  if (user.length <= 4) return user;
  return user.slice(0, 4) + "***" + user.slice(-3);
}

function randomBonus() {
  return BONUS_LIST[Math.floor(Math.random() * BONUS_LIST.length)];
}

function generateRandomHistory() {
  return {
    user: "user" + Math.floor(Math.random() * 9000 + 1000),
    bonus: randomBonus(),
    time: Date.now()
  };
}

function saveHistory() {
  localStorage.setItem("historyData", JSON.stringify(historyData));
}

function showPopup(title, message) {
  popupTitle.innerHTML = title;
  popupMessage.innerHTML = message;
  popup.style.display = "flex";
}

function closePopup() {
  popup.style.display = "none";
}
