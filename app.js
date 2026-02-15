document.addEventListener("DOMContentLoaded", function(){

const userClaimed = {};
const validVoucher = "2026MAXWIN";
const historyContainer = document.getElementById('historyContainer');

// Generate 20 riwayat awal acak (lebih formal)
let historyData = [
  {userId:"RJP84921", freebet:12500},
  {userId:"MAX77103", freebet:25000},
  {userId:"JPX66219", freebet:18000},
  {userId:"WIN90452", freebet:10000},
  {userId:"RIN33481", freebet:50000},
  {userId:"SPN72819", freebet:15000},
  {userId:"GAC55302", freebet:22000},
  {userId:"RTP90117", freebet:30000},
  {userId:"BET66741", freebet:12000},
  {userId:"LUX88190", freebet:75000},
  {userId:"VIP20418", freebet:20000},
  {userId:"JPQ44771", freebet:14000},
  {userId:"MAX99812", freebet:100000},
  {userId:"SPN30177", freebet:16500},
  {userId:"RJP77564", freebet:28000},
  {userId:"GOL66291", freebet:35000},
  {userId:"RTP42018", freebet:19000},
  {userId:"BET90331", freebet:45000},
  {userId:"WIN11872", freebet:11000},
  {userId:"VIP77205", freebet:60000}
];

function renderHistory(){
  historyContainer.innerHTML="";
  historyData.forEach(item=>{
    const div = document.createElement("div");
    div.className="history-item";
    div.innerHTML = `<span>${item.userId}</span><span>IDR ${item.freebet.toLocaleString('id-ID')}</span>`;
    historyContainer.appendChild(div);
  });
}
renderHistory();

window.claimFreebet = function(){
  const userId = document.getElementById('userId').value.trim();
  const voucher = document.getElementById('voucher').value.trim();
  const messageEl = document.getElementById('message');
  const progressContainer = document.getElementById('progressContainer');
  const progressBar = document.getElementById('progressBar');

  if(!userId || !voucher){
    messageEl.style.color="red";
    messageEl.textContent="❌ User ID dan kode voucher wajib diisi.";
    return;
  }
  if(voucher!==validVoucher){
    messageEl.style.color="red";
    messageEl.textContent="❌ Kode tidak valid.";
    return;
  }
  if(userClaimed[userId]){
    messageEl.style.color="red";
    messageEl.textContent="❌ Anda sudah klaim kode ini sebelumnya.";
    return;
  }

  // tampilkan progress bar sebelum popup
  progressContainer.style.display="block";
  progressBar.style.width="0%";
  messageEl.textContent="";

  let width = 0;
  const interval = setInterval(()=>{
    width++;
    progressBar.style.width = width + "%";
    if(width >= 100){
      clearInterval(interval);

      const freebet = Math.floor(Math.random()*(200000-20000+1)/1000)*1000;
      userClaimed[userId] = freebet;

      // update riwayat
      historyData.unshift({userId, freebet});
      if(historyData.length>20) historyData.pop();
      renderHistory();

      // tampilkan popup
      document.getElementById("popupMessage").innerHTML=
        `User ID: <strong>${userId}</strong><br>Freebet: <strong>${freebet.toLocaleString('id-ID')}</strong><br>Silahkan screenshot dan kirim ke Admin.`;
      document.getElementById("popupModal").style.display="flex";

      // sembunyikan progress bar
      progressContainer.style.display="none";
    }
  },20);
}

window.closePopup = function(){
  document.getElementById("popupModal").style.display="none";
}
