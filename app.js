const userClaimed = {};
const validVoucher = "2026MAXWIN";
const historyContainer = document.getElementById('historyContainer');

// Generate 20 user acak untuk riwayat
let historyData = [];
for(let i=0;i<20;i++){
  const userId = "user"+Math.floor(Math.random()*1000);
  const freebet = Math.floor(Math.random()*(200000-20000+1)/1000)*1000;
  historyData.push({userId, freebet});
}

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

function getRandomFreebet(){
  return Math.floor(Math.random()*(200000-20000+1)/1000)*1000;
}

function claimFreebet(){
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

  progressContainer.style.display="block";
  progressBar.style.width="0%";
  messageEl.textContent="";

  let width=0;
  const interval=setInterval(()=>{
    width++;
    progressBar.style.width=width+"%";
    if(width>=100){
      clearInterval(interval);
      const freebet=getRandomFreebet();
      userClaimed[userId]=freebet;

      historyData.unshift({userId, freebet});
      if(historyData.length>20) historyData.pop();
      renderHistory();

      document.getElementById("popupMessage").innerHTML=
        `User ID: <strong>${userId}</strong><br>Freebet: <strong>${freebet.toLocaleString('id-ID')}</strong><br>Silahkan screenshot dan kirim ke Admin.`;

      document.getElementById("popupModal").style.display="flex";
    }
  },20);
}

function closePopup(){
  document.getElementById("popupModal").style.display="none";
}
