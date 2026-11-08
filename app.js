let balance = parseFloat(localStorage.getItem('flip_balance')||'0');
let tier = parseInt(localStorage.getItem('flip_tier')||'0');
let selectedBank = 'FNB';

function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-'+id).classList.add('active');
  updateUI();
  window.scrollTo(0,0);
}
function updateUI(){
  document.getElementById('balance').textContent = balance.toFixed(2);
  document.querySelectorAll('.bal-mirror').forEach(e=>e.textContent = balance.toFixed(2));
  document.getElementById('fica-badge').textContent = tier===0 ? 'FICA Tier 0 • Demo' : tier===1 ? 'FICA Tier 1 • Verified' : 'FICA Tier 2 • Verified';
  document.getElementById('fica-status').textContent = tier===0 ? 'Tier 0 — Demo' : 'Tier '+tier+' — Verified';
  document.getElementById('tier-limit').textContent = tier===0 ? 'Limit R0 • Verify to unlock' : tier===1 ? 'Limit R3,000' : 'Limit R25,000';
  document.getElementById('admin-your-flips').textContent = localStorage.getItem('flip_count')||'0';
}
function setTab(t){
  document.getElementById('tab-e').classList.toggle('active',t==='e');
  document.getElementById('tab-a').classList.toggle('active',t==='a');
}
function selectBank(btn){
  document.querySelectorAll('.bank-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active'); selectedBank=btn.textContent;
}
function flipNow(){
  let pin=document.getElementById('pin-input').value;
  let ref=document.getElementById('ref-input').value;
  let amt=parseFloat(document.getElementById('amount-input').value);
  if(pin.length<10||ref.length<10){alert('PIN and Reference must be 10 digits');return;}
  if(!amt||amt<=0){alert('Enter amount');return;}
  balance+=amt;
  let c=parseInt(localStorage.getItem('flip_count')||'0')+1;
  localStorage.setItem('flip_count',c);
  localStorage.setItem('flip_balance',balance);
  let act=document.getElementById('activity');
  if(act.querySelector('.empty')) act.innerHTML='';
  act.innerHTML=`<div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #222"><span>✅ Flipped ${selectedBank} Voucher</span><b>+R${amt.toFixed(2)}</b></div>`+act.innerHTML;
  document.getElementById('pin-input').value='';document.getElementById('ref-input').value='';document.getElementById('amount-input').value='';
  updateUI(); showScreen('home'); alert(`Success! R${amt.toFixed(2)} added to your FLIP Wallet`);
}
function flipTo(type){
  if(balance<=0){alert('Load a voucher first');showScreen('load');return;}
  if(type==='data'){let fee=balance*0.02;let net=balance-fee;balance=0;localStorage.setItem('flip_balance',balance);updateUI();alert(`Data bought! Fee R${fee.toFixed(2)}. You got R${net.toFixed(2)} in data.`);}
  if(type==='bank'){if(balance<=2.5){alert('Need more than R2.50');return;}let send=balance-2.5;balance=0;localStorage.setItem('flip_balance',balance);updateUI();alert(`R${send.toFixed(2)} sent to your bank. Fee R2.50`);}
  if(type==='cashout'){let amt=balance;balance=0;localStorage.setItem('flip_balance',balance);updateUI();alert(`Cash Out QR generated for R${amt.toFixed(2)}. Show at Shoprite till.`);}
  updateUI();
}
function verifyTier1(){
  let id=document.getElementById('id-input').value;
  if(id.length!==13){alert('ID must be 13 digits');return;}
  tier=1;localStorage.setItem('flip_tier',tier);updateUI();alert('Tier 1 Verified! Limit R3,000 unlocked. In live mode, partner verifies this.');showScreen('home');
}
function verifyTier2(){
  tier=2;localStorage.setItem('flip_tier',tier);updateUI();alert('Tier 2 Started! In live mode, partner will ask for selfie + proof of address. Demo: upgraded.');showScreen('home');
}
function toggleCard(){alert('Card Frozen / Unfrozen — Demo');}
updateUI();