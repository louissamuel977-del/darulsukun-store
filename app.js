/* ============================================================
   DAR-UL-SUKUN STORE MANAGEMENT SYSTEM
   Powered by Nexora Digital Marketing Agency | Built by Louis Samuel
   Data layer: browser localStorage (works fully offline)
   ============================================================ */

const DB_KEY = "dus_store_db_v1";
const CATS = {
  household: { label: "Household", badge: "badge-hh", prefix: "HH" },
  stationery: { label: "Stationery", badge: "badge-st", prefix: "ST" },
  dietfood:   { label: "Diet & Food", badge: "badge-df", prefix: "DF" },
  diapers:    { label: "Diapers", badge: "badge-dp", prefix: "DP" }
};

const ICONS = {
  dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>',
  items: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 7 12 3 4 7v10l8 4 8-4V7Z"/><path d="M4 7l8 4 8-4M12 11v10"/></svg>',
  incoming: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>',
  outgoing: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
  reports: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19V5a1 1 0 0 1 1-1h9l6 6v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"/><path d="M14 4v6h6M9 13v4M12 11v6M15 15v2"/></svg>',
  departments: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21V8l9-5 9 5v13M9 21v-6h6v6M3 8l9 5 9-5"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 5v14M5 12h14"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>',
  diaper: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h16M4 5c0 7 1.5 11 8 14 6.5-3 8-7 8-14M9 11c1 1.5 2 2 3 2s2-.5 3-2"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>',
  scrap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6M10 11v6M14 11v6"/></svg>',
  undo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7v6h6M3 13a9 9 0 1 0 3-6.7L3 9"/></svg>',
  maintenance: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L2 19l3 3 7.3-7.3a4 4 0 0 0 5.4-5.4l-2.8 2.8-2-2 2.8-2.8Z"/></svg>',
  finance: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18M7 15l4-5 3 3 5-7"/></svg>'
};

function defaultDB(){
  return {
    users: [
      { username: "admin", name: "Administrator", role: "admin", pass: "admin123" }
    ],
    departments: ["Special Children Section","Kitchen / Dastarkhwan","Medical Room","Admin Office","Boys Hostel","Girls Hostel","Laundry","Maintenance"],
    locationGroups: [
      { name:"Head Office", departments:["Laundry Department","Kitchen Department","Clinic (H.E.U)","Management Office","Rehabilitation","Finance Department","Front Desk (F.D.O) Gate No 2","Maintenance Department","Sister's Room","House Keeping Department","Caregivers","Al-Ameen House","Family Sport"], allowCustom:false },
      { name:"Lemons Home", departments:[], allowCustom:false },
      { name:"Dugout", departments:[], allowCustom:false },
      { name:"Rashdabad", departments:[], allowCustom:false },
      { name:"Other", departments:["Christ the King Church","Christ the King School","Rosary Convent","Sangard Convent","Baldia Convent","Digroad Convent"], allowCustom:true }
    ],
    dormRooms: Array.from({length:12}, (_,i)=>({ id:"room_"+(i+1), name:"Room "+(i+1), caregiver:"" })),
    items: [],
    incoming: [],
    outgoing: [],
    scrap: [],
    maintenance: [],
    deletionLog: [],
    auditPin: "1955",
    seq: { item: 0, incoming: 0, outgoing: 0, scrap: 0, maintenance: 0 }
  };
}

/* Guards against Firebase Realtime Database quirks: it drops empty arrays/objects
   entirely on save, and can convert sparse arrays into keyed objects on read.
   This normalizes any loaded data back into the shape the app expects, so a
   round-trip through Firebase (or a partial/corrupt localStorage value) can
   never crash the app. */
function toArray(val){
  if(Array.isArray(val)) return val.filter(x => x !== null && x !== undefined);
  if(val && typeof val === "object") return Object.values(val).filter(x => x !== null && x !== undefined);
  return [];
}
function sanitizeDB(raw){
  const base = defaultDB();
  if(!raw || typeof raw !== "object") return base;
  const db = {
    users: toArray(raw.users).length ? toArray(raw.users) : base.users,
    departments: toArray(raw.departments).length ? toArray(raw.departments) : base.departments,
    locationGroups: toArray(raw.locationGroups).length ? toArray(raw.locationGroups) : base.locationGroups,
    dormRooms: toArray(raw.dormRooms).length ? toArray(raw.dormRooms) : base.dormRooms,
    items: toArray(raw.items),
    incoming: toArray(raw.incoming),
    outgoing: toArray(raw.outgoing),
    scrap: toArray(raw.scrap),
    maintenance: toArray(raw.maintenance),
    deletionLog: toArray(raw.deletionLog),
    auditPin: (typeof raw.auditPin === "string" && raw.auditPin) ? raw.auditPin : base.auditPin,
    seq: (raw.seq && typeof raw.seq === "object") ? {
      item: Number(raw.seq.item)||0,
      incoming: Number(raw.seq.incoming)||0,
      outgoing: Number(raw.seq.outgoing)||0,
      scrap: Number(raw.seq.scrap)||0,
      maintenance: Number(raw.seq.maintenance)||0
    } : base.seq
  };
  // Drop any item/entry that isn't a valid object, and fix unknown categories
  // instead of letting a bad record crash every page that reads it.
  db.items = db.items.filter(it => it && typeof it === "object" && it.id).map(it => ({
    ...it,
    category: CATS[it.category] ? it.category : "household"
  }));
  db.incoming = db.incoming.filter(r => r && typeof r === "object" && r.id);
  db.outgoing = db.outgoing.filter(r => r && typeof r === "object" && r.id);
  db.scrap = db.scrap.filter(r => r && typeof r === "object" && r.id);
  db.maintenance = db.maintenance.filter(r => r && typeof r === "object" && r.id);
  // Deep-validate locationGroups: every group must have a name and a departments
  // array, or a stale/partial sync (e.g. from a device on an older cached
  // version) could crash every screen that reads it.
  db.locationGroups = (Array.isArray(db.locationGroups) ? db.locationGroups : [])
    .filter(g => g && typeof g === "object" && typeof g.name === "string")
    .map(g => ({ name: g.name, departments: Array.isArray(g.departments) ? g.departments.filter(d=>typeof d==="string") : [], allowCustom: !!g.allowCustom }));
  if(db.locationGroups.length === 0) db.locationGroups = base.locationGroups;
  return db;
}

function loadDB(){
  let raw = localStorage.getItem(DB_KEY);
  if(!raw){
    const db = defaultDB();
    localStorage.setItem(DB_KEY, JSON.stringify(db));
    return db;
  }
  try{ return sanitizeDB(JSON.parse(raw)); }catch(e){ return defaultDB(); }
}
function saveDB(db){
  localStorage.setItem(DB_KEY, JSON.stringify(db)); // always cache locally (offline safety)
  if(FIREBASE_ENABLED && fbRef){
    SUPPRESS_NEXT_REMOTE = true; // avoid re-rendering from our own write
    fbRef.set(db).catch(err=>{ console.error(err); setSyncStatus("error"); });
  }
}

/* ---------------- FIREBASE REAL-TIME SYNC ---------------- */
let FIREBASE_ENABLED = false;
let fbRef = null;
let SUPPRESS_NEXT_REMOTE = false;

function initFirebase(){
  try{
    if(typeof firebaseConfig === "undefined" || firebaseConfig.apiKey === "YOUR_API_KEY"){
      setSyncStatus("offline-only");
      return;
    }
    firebase.initializeApp(firebaseConfig);
    fbRef = firebase.database().ref("dus_store");
    FIREBASE_ENABLED = true;
    setSyncStatus("connecting");

    fbRef.once("value").then(snap=>{
      const remote = snap.val();
      if(!remote){
        fbRef.set(DB);
      } else {
        DB = sanitizeDB(remote);
        localStorage.setItem(DB_KEY, JSON.stringify(DB));
      }
      setSyncStatus("online");
      if(CURRENT_USER) goTo(currentPage);
    });

    fbRef.on("value", snap=>{
      if(SUPPRESS_NEXT_REMOTE){ SUPPRESS_NEXT_REMOTE = false; return; }
      const remote = snap.val();
      if(!remote) return;
      DB = sanitizeDB(remote);
      localStorage.setItem(DB_KEY, JSON.stringify(DB));
      setSyncStatus("online");
      if(CURRENT_USER) goTo(currentPage);
    });

    firebase.database().ref(".info/connected").on("value", snap=>{
      if(FIREBASE_ENABLED) setSyncStatus(snap.val() ? "online" : "reconnecting");
    });
  }catch(err){
    console.error("Firebase init failed:", err);
    setSyncStatus("offline-only");
  }
}
function setSyncStatus(state){
  const el = document.getElementById("syncStatus");
  if(!el) return;
  const map = {
    "online": `<span style="width:7px;height:7px;border-radius:50%;background:var(--ok);box-shadow:0 0 6px var(--ok);"></span><span style="color:var(--ok);">Live sync connected</span>`,
    "connecting": `<span style="width:7px;height:7px;border-radius:50%;background:var(--warn);"></span><span style="color:var(--warn);">Connecting...</span>`,
    "reconnecting": `<span style="width:7px;height:7px;border-radius:50%;background:var(--warn);"></span><span style="color:var(--warn);">Reconnecting...</span>`,
    "error": `<span style="width:7px;height:7px;border-radius:50%;background:var(--danger);"></span><span style="color:var(--danger);">Sync error — saved locally</span>`,
    "offline-only": `<span style="width:7px;height:7px;border-radius:50%;background:var(--ink-faint);"></span><span style="color:var(--ink-faint);">Offline mode (this device only)</span>`
  };
  el.innerHTML = map[state] || "";
}

let DB = loadDB();
let CURRENT_USER = JSON.parse(sessionStorage.getItem("dus_session") || "null");
let currentPage = "dashboard";
initFirebase();

/* ---------------- AUTH ---------------- */
function handleLogin(){
  const username = document.getElementById("loginUsername").value.trim().toLowerCase();
  const pass = document.getElementById("loginPass").value;

  if(!username){ toast("Please enter your username", true); return; }
  const acct = DB.users.find(u => u.username.toLowerCase() === username);
  if(!acct || acct.pass !== pass){ toast("Incorrect username or password", true); return; }

  CURRENT_USER = { name: acct.name, role: acct.role, username: acct.username };
  sessionStorage.setItem("dus_session", JSON.stringify(CURRENT_USER));
  enterApp();
}
function logout(){
  sessionStorage.removeItem("dus_session");
  CURRENT_USER = null;
  document.getElementById("app").style.display = "none";
  document.getElementById("loginScreen").style.display = "flex";
}
function showForgotPassword(){
  openModal(`
    <div class="modal-head"><div class="modal-title">Forgot Password</div><button class="modal-close" onclick="closeModal()">&times;</button></div>
    <p style="font-size:13.5px;color:var(--ink-dim);line-height:1.7;margin-bottom:14px;">
      Passwords in this system are reset by your Admin — there is no email or SMS in this offline-friendly system, so nothing is sent automatically.
    </p>
    <p style="font-size:13.5px;color:var(--ink-dim);line-height:1.7;margin-bottom:14px;">
      Ask your Admin to open <b>Settings &rarr; User Accounts</b>, find your name, and set a new password for you.
    </p>
    <p style="font-size:13.5px;color:var(--ink-dim);line-height:1.7;">
      If you are the only Admin and are locked out, contact Nexora Digital Marketing Agency for assistance.
    </p>
    <div class="form-actions"><button class="btn btn-ghost" onclick="closeModal()">Close</button></div>
  `);
}
function enterApp(){
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("app").style.display = "block";
  document.getElementById("userAvatar").textContent = CURRENT_USER.name.charAt(0).toUpperCase();
  document.getElementById("userNameLabel").textContent = CURRENT_USER.name;
  document.getElementById("userRoleLabel").textContent = CURRENT_USER.role.replace("storekeeper","Store Keeper").replace("admin","Admin").replace("supervisor","Supervisor").replace("auditor","Auditor");
  renderNav();
  goTo("dashboard");
}
if(CURRENT_USER){ window.addEventListener("DOMContentLoaded", enterApp); }

/* ---------------- NAV ---------------- */
const NAV_ITEMS = [
  { id:"dashboard", label:"Dashboard", icon:"dashboard" },
  { id:"items", label:"Item Master", icon:"items" },
  { id:"incoming", label:"Inward Entry", icon:"incoming" },
  { id:"outgoing", label:"Outward Entry", icon:"outgoing" },
  { id:"diapers", label:"Diaper Issue", icon:"diaper" },
  { id:"scrap", label:"Scrap / Wastage", icon:"scrap" },
  { id:"maintenance", label:"Maintenance", icon:"maintenance" },
  { id:"finance", label:"Finance", icon:"finance" },
  { id:"reports", label:"Reports", icon:"reports" },
  { id:"departments", label:"Departments", icon:"departments" },
  { id:"settings", label:"Settings", icon:"settings" }
];
function renderNav(){
  const nav = document.getElementById("navList");
  nav.innerHTML = NAV_ITEMS.map(it => `
    <div class="nav-item ${currentPage===it.id?'active':''}" onclick="goTo('${it.id}')">
      ${ICONS[it.icon]}<span>${it.label}</span>
    </div>`).join("");
}
function goTo(page){
  currentPage = page;
  renderNav();
  document.getElementById("sidebar").classList.remove("open");
  const map = {
    dashboard: renderDashboard,
    items: renderItems,
    incoming: renderIncoming,
    outgoing: renderOutgoing,
    diapers: renderDiaperIssue,
    scrap: renderScrap,
    maintenance: renderMaintenance,
    finance: renderFinance,
    reports: renderReports,
    departments: renderDepartments,
    settings: renderSettings
  };
  try{
    (map[page] || renderDashboard)();
  }catch(err){
    console.error("Render error on page:", page, err);
    document.getElementById("mainContent").innerHTML = `
      ${topbarHtml("Something went wrong","This page hit an unexpected error")}
      <div class="panel">
        <p style="color:var(--ink-dim);font-size:13.5px;line-height:1.6;margin-bottom:14px;">
          The app recovered from an error and your data is safe. Try refreshing the page.
          If this keeps happening, open Settings and export a backup, then let Louis know.
        </p>
        <div style="font-family:var(--font-mono);font-size:11.5px;color:var(--ink-faint);background:var(--purple-950);padding:10px;border-radius:6px;">${escHtml(err.message)}</div>
        <div class="form-actions"><button class="btn btn-gold btn-sm" onclick="location.reload()">Refresh Page</button></div>
      </div>`;
  }
}

/* ---------------- HELPERS ---------------- */
function uid(kind){
  DB.seq[kind] = (DB.seq[kind]||0)+1;
  saveDB(DB);
  return DB.seq[kind];
}
function itemCode(cat, seqNum){
  return `${CATS[cat].prefix}-${String(seqNum).padStart(3,"0")}`;
}
function fmtMoney(n){
  return "Rs " + Number(n||0).toLocaleString("en-PK",{maximumFractionDigits:2});
}
function fmtDate(d){
  if(!d) return "—";
  const dt = new Date(d);
  if(isNaN(dt)) return d;
  return dt.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"});
}
function daysUntil(d){
  if(!d) return null;
  const dt = new Date(d);
  const now = new Date();
  dt.setHours(0,0,0,0); now.setHours(0,0,0,0);
  return Math.round((dt-now)/(1000*60*60*24));
}
function getItem(id){ return DB.items.find(i=>i.id===id); }
function stockOf(itemId){
  const inn = DB.incoming.filter(r=>r.itemId===itemId).reduce((s,r)=>s+Number(r.qty),0);
  const out = DB.outgoing.filter(r=>r.itemId===itemId).reduce((s,r)=>s+Number(r.qty),0);
  const scr = DB.scrap.filter(r=>r.itemId===itemId).reduce((s,r)=>s+Number(r.qty),0);
  return inn - out - scr;
}
function toast(msg, isError, undoFn){
  const host = document.getElementById("toastHost");
  const el = document.createElement("div");
  el.className = "toast";
  if(isError) el.style.borderColor = "var(--danger)";
  if(undoFn){
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "space-between";
    el.style.gap = "14px";
    const span = document.createElement("span");
    span.textContent = msg;
    const btn = document.createElement("button");
    btn.textContent = "Undo";
    btn.style.cssText = "background:var(--gold-500);color:var(--purple-950);border:none;padding:5px 12px;border-radius:6px;font-weight:700;font-size:12px;cursor:pointer;flex-shrink:0;";
    btn.onclick = ()=>{ undoFn(); el.remove(); };
    el.appendChild(span);
    el.appendChild(btn);
    setTimeout(()=>{ el.remove(); }, 8000);
  } else {
    el.textContent = msg;
    setTimeout(()=>{ el.remove(); }, 3200);
  }
  host.appendChild(el);
}
function openModal(html){
  document.getElementById("modalBody").innerHTML = html;
  document.getElementById("modalOverlay").classList.add("active");
}
function closeModal(){ document.getElementById("modalOverlay").classList.remove("active"); }
function escHtml(s){
  return String(s??"").replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function canEdit(){ return CURRENT_USER.role === "admin" || CURRENT_USER.role === "storekeeper"; }
function isAdmin(){ return CURRENT_USER.role === "admin"; }

function downloadCSV(filename, rows){
  const csv = rows.map(r => r.map(c => `"${String(c??"").replace(/"/g,'""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], {type:"text/csv;charset=utf-8;"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ============================================================
   DASHBOARD
   ============================================================ */
function renderDashboard(){
  const main = document.getElementById("mainContent");
  const counts = { household:0, stationery:0, dietfood:0 };
  const diaperCounts = { JXL:0, M:0, XL:0 };
  let totalValue = 0;
  DB.items.forEach(it=>{
    const stock = stockOf(it.id);
    if(it.category === "diapers"){
      const sizeMatch = DIAPER_SIZES.find(s => it.name.trim().toLowerCase() === ("diapers "+s).toLowerCase());
      if(sizeMatch) diaperCounts[sizeMatch] += stock;
    } else {
      counts[it.category] += stock;
    }
  });
  DB.incoming.forEach(r=>{ totalValue += Number(r.total||0); });
  DB.outgoing.forEach(r=>{
    const item = getItem(r.itemId);
    if(item){
      const avgRate = (()=>{
        const inRows = DB.incoming.filter(x=>x.itemId===item.id && Number(x.rate)>0);
        if(!inRows.length) return 0;
        return inRows.reduce((s,x)=>s+Number(x.rate),0)/inRows.length;
      })();
      totalValue -= avgRate * Number(r.qty);
    }
  });

  const lowStock = DB.items.filter(it => stockOf(it.id) <= Number(it.reorderLevel||0));
  const expiring = DB.incoming.filter(r=>{
    const d = daysUntil(r.expiryDate);
    return r.expiryDate && d !== null && d <= 30;
  }).sort((a,b)=> daysUntil(a.expiryDate) - daysUntil(b.expiryDate));

  const recentIn = [...DB.incoming].sort((a,b)=> new Date(b.date)-new Date(a.date)).slice(0,5);
  const recentOut = [...DB.outgoing]
    .filter(r => { const it = getItem(r.itemId); return !it || it.category !== "diapers"; })
    .sort((a,b)=> new Date(b.date)-new Date(a.date)).slice(0,5);

  main.innerHTML = `
    ${topbarHtml("Dashboard","Overview of stock, alerts, and recent activity")}
    <div class="grid grid-4" style="margin-bottom:20px;">
      ${statCard("Household Stock","bar-hh",counts.household,"units in store")}
      ${statCard("Stationery Stock","bar-st",counts.stationery,"units in store")}
      ${statCard("Diet & Food Stock","bar-df",counts.dietfood,"units in store")}
      ${statCard("Diapers — JXL","bar-dp",diaperCounts.JXL,"units in store")}
      ${statCard("Diapers — M","bar-dp",diaperCounts.M,"units in store")}
      ${statCard("Diapers — XL","bar-dp",diaperCounts.XL,"units in store")}
    </div>
    <div class="grid grid-2">
      <div class="panel">
        <div class="panel-head">
          <div class="panel-title">Low Stock Alerts <span class="count">${lowStock.length}</span></div>
        </div>
        ${lowStock.length===0 ? emptyState("All items are above reorder level.") :
          lowStock.map(it=>`
            <div class="alert-item">
              <div class="alert-left">
                <span class="alert-dot dot-danger"></span>
                <div><b>${escHtml(it.name)}</b> <span class="text-dim">(${itemCode(it.category,it.seq)})</span></div>
              </div>
              <div class="mono">${stockOf(it.id)} left · reorder at ${it.reorderLevel}</div>
            </div>`).join("")}
      </div>
      <div class="panel">
        <div class="panel-head">
          <div class="panel-title">Expiry Alerts (30 days) <span class="count">${expiring.length}</span></div>
        </div>
        ${expiring.length===0 ? emptyState("Nothing expiring soon.") :
          expiring.slice(0,8).map(r=>{
            const item = getItem(r.itemId);
            const d = daysUntil(r.expiryDate);
            return `<div class="alert-item">
              <div class="alert-left">
                <span class="alert-dot ${d<=7?'dot-danger':'dot-warn'}"></span>
                <div><b>${escHtml(item?item.name:'Unknown')}</b> <span class="text-dim">Batch ${escHtml(r.batchNo||'-')}</span></div>
              </div>
              <div class="mono">${d<0?'Expired':d+' days'} · ${fmtDate(r.expiryDate)}</div>
            </div>`;
          }).join("")}
      </div>
    </div>
    <div class="grid grid-2">
      <div class="panel">
        <div class="panel-head"><div class="panel-title">Recent Inward</div></div>
        ${recentIn.length===0?emptyState("No incoming entries yet."):`
        <div class="table-wrap"><table><thead><tr><th>Date</th><th>Item</th><th>Qty</th><th>Source</th></tr></thead><tbody>
        ${recentIn.map(r=>{const item=getItem(r.itemId);return `<tr><td>${fmtDate(r.date)}</td><td>${escHtml(item?item.name:'-')}</td><td>${r.qty}</td><td><span class="badge ${r.sourceType==='Donation'?'badge-ok':'badge-warn'}">${r.sourceType}</span></td></tr>`}).join("")}
        </tbody></table></div>`}
      </div>
      <div class="panel">
        <div class="panel-head"><div class="panel-title">Recent Outward</div></div>
        ${recentOut.length===0?emptyState("No outgoing entries yet."):`
        <div class="table-wrap"><table><thead><tr><th>Date</th><th>Item</th><th>Qty</th><th>Department</th></tr></thead><tbody>
        ${recentOut.map(r=>{const item=getItem(r.itemId);return `<tr><td>${fmtDate(r.date)}</td><td>${escHtml(item?item.name:'-')}</td><td>${r.qty}</td><td>${escHtml(r.department)}</td></tr>`}).join("")}
        </tbody></table></div>`}
      </div>
    </div>
  `;
}
function statCard(label, barClass, value, delta){
  return `<div class="stat-card"><div class="bar ${barClass}"></div>
    <div class="label">${label}</div>
    <div class="value">${value}</div>
    <div class="delta">${delta}</div>
  </div>`;
}
function emptyState(msg){ return `<div class="empty-state">${msg}</div>`; }
function topbarHtml(title, sub, actionsHtml){
  return `<div class="topbar">
    <button class="mobile-toggle icon-btn" onclick="document.getElementById('sidebar').classList.toggle('open')" style="margin-right:10px;">☰</button>
    <div><div class="page-title">${title}</div><div class="page-sub">${sub||""}</div></div>
    <div class="topbar-actions">${actionsHtml||""}</div>
  </div>`;
}

/* ============================================================
   ITEM MASTER
   ============================================================ */
let itemFilter = { cat:"", q:"" };
function renderItems(){
  const main = document.getElementById("mainContent");
  main.innerHTML = `
    ${topbarHtml("Item Master","Manage all store items across categories", canEdit()?`<button class="btn btn-gold btn-sm" onclick="openBulkItems()">${ICONS.plus}New Item</button>`:"")}
    <div class="panel">
      <div class="filter-bar">
        <div class="field"><label>Category</label>
          <select id="itemFilterCat" onchange="itemFilter.cat=this.value;renderItems()">
            <option value="">All Categories</option>
            ${Object.entries(CATS).map(([k,v])=>`<option value="${k}" ${itemFilter.cat===k?'selected':''}>${v.label}</option>`).join("")}
          </select>
        </div>
        <div class="field" style="flex:1;"><label>Search</label>
          <input type="text" placeholder="Search item name..." value="${escHtml(itemFilter.q)}" oninput="itemFilter.q=this.value;renderItems()">
        </div>
      </div>
      <div class="table-wrap">
      <table>
        <thead><tr><th>Code</th><th>Name</th><th>Category</th><th>Unit</th><th>Current Stock</th><th>Reorder Level</th><th>Status</th>${isAdmin()?'<th>Actions</th>':''}</tr></thead>
        <tbody>
          ${itemsRows()}
        </tbody>
      </table>
      </div>
    </div>
  `;
}
function itemsRows(){
  let list = DB.items.filter(it =>
    (!itemFilter.cat || it.category===itemFilter.cat) &&
    (!itemFilter.q || it.name.toLowerCase().includes(itemFilter.q.toLowerCase()))
  );
  if(list.length===0) return `<tr><td colspan="8">${emptyState("No items found. Add your first item.")}</td></tr>`;
  return list.map(it=>{
    const stock = stockOf(it.id);
    const low = stock <= Number(it.reorderLevel||0);
    return `<tr>
      <td class="mono">${itemCode(it.category,it.seq)}</td>
      <td><b>${escHtml(it.name)}</b></td>
      <td><span class="badge ${CATS[it.category].badge}">${CATS[it.category].label}</span></td>
      <td>${escHtml(it.unit)}</td>
      <td class="mono">${stock}</td>
      <td class="mono">${it.reorderLevel}</td>
      <td>${low?'<span class="badge badge-danger">Low Stock</span>':'<span class="badge badge-ok">OK</span>'}</td>
      ${isAdmin()?`<td class="row-actions">
        <button class="icon-btn" onclick="openItemForm('${it.id}')">${ICONS.edit}</button>
        ${isAdmin()?`<button class="icon-btn" onclick="deleteItem('${it.id}')">${ICONS.trash}</button>`:''}
      </td>`:''}
    </tr>`;
  }).join("");
}
function openItemForm(id){
  const item = id ? getItem(id) : null;
  openModal(`
    <div class="modal-head"><div class="modal-title">${item?'Edit Item':'Add New Item'}</div><button class="modal-close" onclick="closeModal()">&times;</button></div>
    <div class="field" style="margin-bottom:14px;"><label>Item Name</label>
      <input type="text" id="f_name" value="${item?escHtml(item.name):''}" placeholder="e.g. Cooking Oil 5L"></div>
    <div class="form-grid" style="margin-bottom:14px;">
      <div class="field"><label>Category</label>
        <select id="f_cat">${Object.entries(CATS).map(([k,v])=>`<option value="${k}" ${item&&item.category===k?'selected':''}>${v.label}</option>`).join("")}</select>
      </div>
      <div class="field"><label>Unit</label>
        <select id="f_unit">
          ${["pcs","kg","g","litre","ml","packet","box","carton","bottle","dozen"].map(u=>`<option value="${u}" ${item&&item.unit===u?'selected':''}>${u}</option>`).join("")}
        </select>
      </div>
      <div class="field"><label>Reorder Level</label>
        <input type="number" id="f_reorder" value="${item?item.reorderLevel:0}" min="0"></div>
    </div>
    <div class="form-actions">
      <button class="btn btn-gold btn-sm" onclick="saveItem('${id||''}')">Save Item</button>
      <button class="btn btn-ghost btn-sm" onclick="closeModal()">Cancel</button>
    </div>
  `);
}
function saveItem(id){
  const name = document.getElementById("f_name").value.trim();
  const category = document.getElementById("f_cat").value;
  const unit = document.getElementById("f_unit").value;
  const reorderLevel = Number(document.getElementById("f_reorder").value)||0;
  if(!name){ toast("Item name is required", true); return; }

  if(id){
    const item = getItem(id);
    Object.assign(item, {name, category, unit, reorderLevel});
    toast("Item updated");
  } else {
    const seq = uid("item");
    DB.items.push({ id:"itm_"+Date.now(), seq, name, category, unit, reorderLevel });
    toast("Item added");
  }
  saveDB(DB);
  closeModal();
  renderItems();
}
/* ============================================================
   HIDDEN AUDIT LOG — deletion history, only reachable via a
   keyboard shortcut (Ctrl+Alt+D) and a PIN. Not linked anywhere
   in the visible UI on purpose.
   ============================================================ */
document.addEventListener("keydown", function(e){
  if(e.ctrlKey && e.altKey && (e.key==="d" || e.key==="D")){
    if(CURRENT_USER) openAuditPinPrompt();
  }
});
function openAuditPinPrompt(){
  openModal(`
    <div class="modal-head"><div class="modal-title">Audit Access</div><button class="modal-close" onclick="closeModal()">&times;</button></div>
    <div class="field" style="margin-bottom:14px;"><label>Enter PIN</label>
      <input type="password" id="auditPinInput" placeholder="••••" onkeydown="if(event.key==='Enter')checkAuditPin()"></div>
    <div class="form-actions">
      <button class="btn btn-gold btn-sm" onclick="checkAuditPin()">Unlock</button>
      <button class="btn btn-ghost btn-sm" onclick="closeModal()">Cancel</button>
    </div>
  `);
  setTimeout(()=>document.getElementById("auditPinInput")?.focus(), 50);
}
function checkAuditPin(){
  const val = document.getElementById("auditPinInput").value;
  if(val !== DB.auditPin){ toast("Incorrect PIN", true); return; }
  renderAuditLog();
}
function renderAuditLog(){
  const log = [...DB.deletionLog].sort((a,b)=> new Date(b.deletedAt)-new Date(a.deletedAt));
  const counts = { item:0, incoming:0, outgoing:0, scrap:0 };
  log.forEach(l=>{ if(counts[l.type]!==undefined) counts[l.type]++; });

  document.getElementById("modalBody").innerHTML = `
    <div class="modal-head"><div class="modal-title">Deletion Audit Log</div><button class="modal-close" onclick="closeModal()">&times;</button></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;">
      <span class="badge badge-hh">Items: ${counts.item}</span>
      <span class="badge badge-ok">Inward: ${counts.incoming}</span>
      <span class="badge badge-warn">Outward: ${counts.outgoing}</span>
      <span class="badge badge-danger">Scrap: ${counts.scrap}</span>
      <span class="badge" style="background:rgba(212,175,55,0.15);color:var(--gold-400);">Total: ${log.length}</span>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;">
      <button class="btn btn-ghost btn-sm" onclick="printAuditLog()">${ICONS.download} Print</button>
      <button class="btn btn-ghost btn-sm" onclick="exportAuditLog()">${ICONS.download} Export CSV</button>
    </div>
    ${isAdmin()?`
    <div class="field" style="margin-bottom:14px;"><label>Change Audit PIN</label>
      <div style="display:flex;gap:8px;">
        <input type="text" id="newAuditPin" placeholder="New PIN">
        <button class="btn btn-ghost btn-sm" onclick="changeAuditPin()">Update</button>
      </div>
    </div>` : ""}
    <div style="max-height:45vh;overflow-y:auto;">
    ${log.length===0 ? emptyState("No deletions recorded yet.") : log.map(l=>`
      <div class="alert-item" style="align-items:flex-start;flex-direction:column;gap:6px;">
        <div style="display:flex;justify-content:space-between;width:100%;gap:10px;">
          <span class="badge ${l.type==='item'?'badge-hh':l.type==='incoming'?'badge-ok':l.type==='scrap'?'badge-danger':'badge-warn'}">${l.type.toUpperCase()}</span>
          <span class="mono text-dim" style="font-size:11px;white-space:nowrap;">${new Date(l.deletedAt).toLocaleString("en-GB")}</span>
        </div>
        <div style="font-size:12.5px;">${describeDeletedRecord(l)}</div>
        <div style="display:flex;justify-content:space-between;width:100%;align-items:center;">
          <div style="font-size:11.5px;color:var(--ink-faint);">Deleted by: ${escHtml(l.deletedBy)}</div>
          ${isAdmin()?`<button class="btn btn-ghost btn-sm" onclick="restoreDeletedRecord('${l.id}')">${ICONS.undo} Undo</button>`:''}
        </div>
      </div>
    `).join("")}
    </div>
    <div class="form-actions"><button class="btn btn-ghost btn-sm" onclick="closeModal()">Close</button></div>
  `;
}
function undoMultiple(logIds){
  return function(){
    logIds.forEach(id => restoreDeletedRecord(id, true));
  };
}
function restoreDeletedRecord(logId, fromToast){
  const log = DB.deletionLog.find(l=>l.id===logId);
  if(!log) return;
  if(!fromToast && !confirm(`Restore this ${log.type} record?`)) return;

  if(log.type==="item") DB.items.push(log.data);
  else if(log.type==="incoming") DB.incoming.push(log.data);
  else if(log.type==="outgoing") DB.outgoing.push(log.data);
  else if(log.type==="scrap") DB.scrap.push(log.data);
  else if(log.type==="maintenance") DB.maintenance.push(log.data);

  DB.deletionLog = DB.deletionLog.filter(l=>l.id!==logId);
  saveDB(DB);
  toast("Record restored");
  if(fromToast){ goTo(currentPage); }
  else { renderAuditLog(); }
}
function exportAuditLog(){
  const log = [...DB.deletionLog].sort((a,b)=> new Date(b.deletedAt)-new Date(a.deletedAt));
  const rows = [["Type","Details","Deleted By","Deleted At"]];
  log.forEach(l=>{
    const desc = describeDeletedRecord(l).replace(/<[^>]*>/g,"");
    rows.push([l.type, desc, l.deletedBy, new Date(l.deletedAt).toLocaleString("en-GB")]);
  });
  downloadCSV(`dus-store-audit-log-${todayStr()}.csv`, rows);
  toast("Audit log exported");
}
function printAuditLog(){
  const log = [...DB.deletionLog].sort((a,b)=> new Date(b.deletedAt)-new Date(a.deletedAt));
  const logoUrl = location.origin + location.pathname.replace(/[^/]*$/, "") + "logo.jpg";
  const rowsHtml = log.map(l=>`
    <tr>
      <td>${l.type.toUpperCase()}</td>
      <td>${describeDeletedRecord(l).replace(/<[^>]*>/g,"")}</td>
      <td>${escHtml(l.deletedBy)}</td>
      <td>${new Date(l.deletedAt).toLocaleString("en-GB")}</td>
    </tr>`).join("");
  const win = window.open("", "_blank");
  win.document.write(`
    <html><head><title>Deletion Audit Log</title>
    <style>
      body{font-family:Arial,sans-serif;padding:30px;color:#000;}
      .header{display:flex;align-items:center;gap:16px;border-bottom:3px solid #B8860B;padding-bottom:14px;margin-bottom:20px;}
      .header img{width:56px;height:56px;border-radius:50%;}
      h1{font-size:19px;margin:0;}
      .sub{font-size:11px;color:#555;margin-top:2px;}
      table{width:100%;border-collapse:collapse;font-size:12px;margin-top:16px;}
      th,td{text-align:left;padding:8px;border-bottom:1px solid #ccc;}
      th{background:#f2f2f2;}
      .meta{font-size:11px;color:#555;margin-top:4px;}
    </style></head>
    <body>
      <div class="header">
        <img src="${logoUrl}">
        <div>
          <h1>Dar-ul-Sukun Head Office Store — Deletion Audit Log</h1>
          <div class="sub">Powered by Nexora Digital Marketing Agency</div>
        </div>
      </div>
      <div class="meta">Generated: ${new Date().toLocaleString("en-GB")} · Total records: ${log.length}</div>
      <table><thead><tr><th>Type</th><th>Details</th><th>Deleted By</th><th>Deleted At</th></tr></thead>
      <tbody>${rowsHtml || '<tr><td colspan="4">No deletions recorded.</td></tr>'}</tbody></table>
    </body></html>
  `);
  win.document.close();
  setTimeout(()=>win.print(), 400);
}
function describeDeletedRecord(l){
  const d = l.data;
  if(l.type==="item") return `<b>${escHtml(d.name)}</b> — ${CATS[d.category]?CATS[d.category].label:d.category}, unit: ${escHtml(d.unit)}`;
  if(l.type==="incoming"){
    const itemName = getItem(d.itemId)?.name || d.itemId;
    return `<b>${escHtml(itemName)}</b> — ${d.sourceType}, qty ${d.qty}, ${fmtDate(d.date)}${d.donorVendor?', from '+escHtml(d.donorVendor):''}`;
  }
  if(l.type==="outgoing"){
    const itemName = getItem(d.itemId)?.name || d.itemId;
    return `<b>${escHtml(itemName)}</b> — qty ${d.qty}, to ${escHtml(d.department)}, receiver ${escHtml(d.receiverName)}, ${fmtDate(d.date)}`;
  }
  if(l.type==="scrap"){
    const itemName = getItem(d.itemId)?.name || d.description || d.itemId;
    return `<b>${escHtml(itemName)}</b> — qty ${d.qty}, reason: ${escHtml(d.reason)}, ${fmtDate(d.date)}`;
  }
  if(l.type==="maintenance"){
    return `<b>${escHtml(d.itemName)}</b> — ${escHtml(d.category)}, ${fmtMoney(d.total)}, ${fmtDate(d.date)}`;
  }
  return "Unknown record";
}
function changeAuditPin(){
  const val = document.getElementById("newAuditPin").value.trim();
  if(!val){ toast("PIN cannot be empty", true); return; }
  DB.auditPin = val;
  saveDB(DB);
  toast("Audit PIN updated");
  renderAuditLog();
}
function logDeletion(type, data){
  const entry = {
    id: "del_"+Date.now()+"_"+Math.random().toString(36).slice(2,7),
    type, data,
    deletedBy: CURRENT_USER.name,
    deletedAt: new Date().toISOString()
  };
  DB.deletionLog.push(entry);
  return entry.id;
}
function deleteItem(id){
  const item = getItem(id);
  const relatedIncoming = DB.incoming.filter(r=>r.itemId===id);
  const relatedOutgoing = DB.outgoing.filter(r=>r.itemId===id);
  const relatedScrap = DB.scrap.filter(r=>r.itemId===id);
  const relatedCount = relatedIncoming.length + relatedOutgoing.length + relatedScrap.length;

  const msg = relatedCount>0
    ? `Delete this item? It has ${relatedIncoming.length} inward, ${relatedOutgoing.length} outward, and ${relatedScrap.length} scrap record(s) — these will be deleted too. This cannot be undone.`
    : "Delete this item? This cannot be undone.";
  if(!confirm(msg)) return;

  const logIds = [];
  if(item) logIds.push(logDeletion("item", item));
  relatedIncoming.forEach(r=>logIds.push(logDeletion("incoming", r)));
  relatedOutgoing.forEach(r=>logIds.push(logDeletion("outgoing", r)));
  relatedScrap.forEach(r=>logIds.push(logDeletion("scrap", r)));

  DB.items = DB.items.filter(i=>i.id!==id);
  DB.incoming = DB.incoming.filter(r=>r.itemId!==id);
  DB.outgoing = DB.outgoing.filter(r=>r.itemId!==id);
  DB.scrap = DB.scrap.filter(r=>r.itemId!==id);
  saveDB(DB);
  toast(relatedCount>0 ? `Item and ${relatedCount} related record(s) deleted` : "Item deleted", false, undoMultiple(logIds));
  renderItems();
}

/* ============================================================
   BULK ITEM ENTRY — add many new items at once, row by row.
   ============================================================ */
let bulkItemRows = [];
function freshBulkItemRow(){ return { name:"", category:"household", unit:"pcs", reorderLevel:0 }; }
function resetBulkItemRows(n){ bulkItemRows = Array.from({length:n}, freshBulkItemRow); }

function openBulkItems(){
  resetBulkItemRows(1);
  renderBulkItems();
}
function renderBulkItems(){
  const main = document.getElementById("mainContent");
  const UNITS = ["pcs","kg","g","litre","ml","packet","box","carton","bottle","dozen"];
  main.innerHTML = `
    ${topbarHtml("New Item","Add items to Item Master — click + Add Row for each item", `<button class="btn btn-ghost btn-sm" onclick="renderItems()">← Back to Item Master</button>`)}
    <div class="panel">
      <div class="table-wrap">
      <table>
        <thead><tr><th style="min-width:200px;">Item Name</th><th>Category</th><th>Unit</th><th>Reorder Level</th><th></th></tr></thead>
        <tbody>
          ${bulkItemRows.map((r,i)=>`
            <tr>
              <td><input type="text" id="bi_name_${i}" value="${escHtml(r.name)}" oninput="bulkItemRows[${i}].name=this.value" placeholder="e.g. Cooking Oil 5L" style="min-width:190px;padding:6px 8px;"></td>
              <td><select id="bi_cat_${i}" onchange="bulkItemRows[${i}].category=this.value">
                ${Object.entries(CATS).map(([k,v])=>`<option value="${k}" ${r.category===k?'selected':''}>${v.label}</option>`).join("")}
              </select></td>
              <td><select id="bi_unit_${i}" onchange="bulkItemRows[${i}].unit=this.value">
                ${UNITS.map(u=>`<option value="${u}" ${r.unit===u?'selected':''}>${u}</option>`).join("")}
              </select></td>
              <td><input type="number" id="bi_reorder_${i}" value="${r.reorderLevel}" min="0" style="width:90px;padding:6px 8px;" oninput="bulkItemRows[${i}].reorderLevel=this.value"></td>
              <td><button class="icon-btn" onclick="removeBulkItemRow(${i})">${ICONS.trash}</button></td>
            </tr>`).join("")}
        </tbody>
      </table>
      </div>
      <div style="margin:14px 0;">
        <button class="btn btn-gold btn-sm" onclick="addBulkItemRows(1)">${ICONS.plus} Add Row</button>
      </div>
      <div style="margin-bottom:16px;font-size:13px;color:var(--ink-dim);">${bulkItemRows.filter(r=>r.name.trim()).length} item(s) ready to save</div>
      <div class="form-actions">
        <button class="btn btn-gold btn-sm" onclick="saveBulkItems()">${ICONS.check} Save All Items</button>
        <button class="btn btn-ghost btn-sm" onclick="renderItems()">Cancel</button>
      </div>
    </div>
  `;
}
function addBulkItemRows(n){
  for(let k=0;k<n;k++) bulkItemRows.push(freshBulkItemRow());
  renderBulkItems();
}
function removeBulkItemRow(i){
  bulkItemRows.splice(i,1);
  renderBulkItems();
}
function saveBulkItems(){
  let savedCount = 0;
  bulkItemRows.forEach(r=>{
    const name = r.name.trim();
    if(!name) return;
    const seq = uid("item");
    DB.items.push({
      id: "itm_"+Date.now()+"_"+savedCount,
      seq,
      name,
      category: r.category,
      unit: r.unit,
      reorderLevel: Number(r.reorderLevel)||0
    });
    savedCount++;
  });
  if(savedCount===0){ toast("No item names entered — nothing saved", true); return; }
  saveDB(DB);
  toast(`${savedCount} item(s) added`);
  renderItems();
}

/* ============================================================
   INCOMING ENTRY (Purchasing + Donations)
   ============================================================ */
let incomingFilter = { cat:"", source:"", from:"", to:"", q:"" };
function renderIncoming(){
  const main = document.getElementById("mainContent");
  main.innerHTML = `
    ${topbarHtml("Inward Entry","Record purchases and donations received", canEdit()?`<button class="btn btn-gold btn-sm" onclick="openBulkInward()">${ICONS.plus}New Entry</button>`:"")}
    <div class="panel">
      <div class="filter-bar">
        <div class="field"><label>Category</label>
          <select onchange="incomingFilter.cat=this.value;renderIncoming()">
            <option value="">All</option>
            ${Object.entries(CATS).map(([k,v])=>`<option value="${k}" ${incomingFilter.cat===k?'selected':''}>${v.label}</option>`).join("")}
          </select>
        </div>
        <div class="field"><label>Source</label>
          <select onchange="incomingFilter.source=this.value;renderIncoming()">
            <option value="">All</option>
            <option value="Purchasing" ${incomingFilter.source==='Purchasing'?'selected':''}>Purchasing</option>
            <option value="Donation" ${incomingFilter.source==='Donation'?'selected':''}>Donation</option>
          </select>
        </div>
        <div class="field"><label>From</label><input type="date" value="${incomingFilter.from}" onchange="incomingFilter.from=this.value;renderIncoming()"></div>
        <div class="field"><label>To</label><input type="date" value="${incomingFilter.to}" onchange="incomingFilter.to=this.value;renderIncoming()"></div>
        <div class="field" style="flex:1;min-width:200px;"><label>Search</label><input type="text" placeholder="Search item or donor/vendor..." value="${escHtml(incomingFilter.q)}" oninput="incomingFilter.q=this.value;renderIncoming()"></div>
      </div>
      <div class="table-wrap">
      <table>
        <thead><tr><th>Date</th><th>Item</th><th>Category</th><th>Source</th><th>Donor/Vendor</th><th>Qty</th><th>Rate</th><th>Total</th><th>Expiry</th>${isAdmin()?'<th>Actions</th>':''}</tr></thead>
        <tbody>${incomingRows()}</tbody>
      </table>
      </div>
    </div>
  `;
}
function incomingRows(){
  let list = [...DB.incoming].sort((a,b)=>new Date(b.date)-new Date(a.date)).filter(r=>{
    const item = getItem(r.itemId);
    if(incomingFilter.cat && (!item || item.category!==incomingFilter.cat)) return false;
    if(incomingFilter.source && r.sourceType!==incomingFilter.source) return false;
    if(incomingFilter.from && r.date < incomingFilter.from) return false;
    if(incomingFilter.to && r.date > incomingFilter.to) return false;
    if(incomingFilter.q){
      const q = incomingFilter.q.toLowerCase();
      const matchesItem = item && item.name.toLowerCase().includes(q);
      const matchesDonor = r.donorVendor && r.donorVendor.toLowerCase().includes(q);
      if(!matchesItem && !matchesDonor) return false;
    }
    return true;
  });
  if(list.length===0) return `<tr><td colspan="10">${emptyState("No incoming entries found.")}</td></tr>`;
  return list.map(r=>{
    const item = getItem(r.itemId);
    const d = daysUntil(r.expiryDate);
    return `<tr>
      <td>${fmtDate(r.date)}</td>
      <td><b>${item?escHtml(item.name):'(deleted item)'}</b></td>
      <td>${item?`<span class="badge ${CATS[item.category].badge}">${CATS[item.category].label}</span>`:'-'}</td>
      <td><span class="badge ${r.sourceType==='Donation'?'badge-ok':'badge-warn'}">${r.sourceType}</span></td>
      <td>${escHtml(r.donorVendor||'-')}</td>
      <td class="mono">${r.qty}</td>
      <td class="mono">${r.rate?fmtMoney(r.rate):'-'}</td>
      <td class="mono">${r.total?fmtMoney(r.total):'-'}</td>
      <td>${r.expiryDate?`${fmtDate(r.expiryDate)} ${d!==null&&d<=30?`<span class="badge ${d<=7?'badge-danger':'badge-warn'}">${d<0?'expired':d+'d'}</span>`:''}`:'—'}</td>
      ${isAdmin()?`<td class="row-actions">
        <button class="icon-btn" onclick="openIncomingForm('${r.id}')">${ICONS.edit}</button>
        ${isAdmin()?`<button class="icon-btn" onclick="deleteIncoming('${r.id}')">${ICONS.trash}</button>`:''}
      </td>`:''}
    </tr>`;
  }).join("");
}
function itemOptions(selectedId){
  if(DB.items.length===0) return `<option value="">No items — add one in Item Master first</option>`;
  return Object.entries(CATS).map(([k,v])=>{
    const opts = DB.items.filter(i=>i.category===k);
    if(!opts.length) return "";
    return `<optgroup label="${v.label}">${opts.map(i=>`<option value="${i.id}" ${selectedId===i.id?'selected':''}>${escHtml(i.name)}</option>`).join("")}</optgroup>`;
  }).join("");
}
function openIncomingForm(id){
  const row = id ? DB.incoming.find(r=>r.id===id) : null;
  openModal(`
    <div class="modal-head"><div class="modal-title">${row?'Edit Inward Entry':'New Inward Entry'}</div><button class="modal-close" onclick="closeModal()">&times;</button></div>
    <div class="form-grid" style="margin-bottom:14px;">
      <div class="field"><label>Date</label><input type="date" id="f_date" value="${row?row.date:todayStr()}"></div>
      <div class="field"><label>Source Type</label>
        <select id="f_source" onchange="toggleRateField()">
          <option value="Purchasing" ${row&&row.sourceType==='Purchasing'?'selected':''}>Purchasing</option>
          <option value="Donation" ${row&&row.sourceType==='Donation'?'selected':''}>Donation</option>
        </select>
      </div>
      <div class="field"><label id="f_donorLabel">Vendor / Donor Name</label><input type="text" id="f_donor" value="${row?escHtml(row.donorVendor||''):''}"></div>
    </div>
    <div class="field" style="margin-bottom:14px;"><label>Item</label>
      <select id="f_item">${itemOptions(row?row.itemId:null)}</select>
    </div>
    <div class="form-grid" style="margin-bottom:14px;">
      <div class="field"><label>Qty</label><input type="number" id="f_qty" value="${row?row.qty:''}" min="0" oninput="calcTotal()"></div>
      <div class="field"><label>Rate (per unit)</label><input type="number" id="f_rate" value="${row?row.rate:''}" min="0" oninput="calcTotal()"></div>
      <div class="field"><label>Total Amount</label><input type="text" id="f_total" value="${row?fmtMoney(row.total):'Rs 0'}" disabled></div>
    </div>
    <div class="form-grid" style="margin-bottom:14px;">
      <div class="field"><label>Expiry Date (if applicable)</label><input type="date" id="f_expiry" value="${row?row.expiryDate||'':''}"></div>
      <div class="field"><label>Batch / Lot No.</label><input type="text" id="f_batch" value="${row?escHtml(row.batchNo||''):''}"></div>
      <div class="field"><label>Invoice / Receipt No.</label><input type="text" id="f_invoice" value="${row?escHtml(row.invoiceNo||''):''}"></div>
    </div>
    <div class="field" style="margin-bottom:14px;"><label>Remarks</label><input type="text" id="f_remarks" value="${row?escHtml(row.remarks||''):''}"></div>
    <div class="form-actions">
      <button class="btn btn-gold btn-sm" onclick="saveIncoming('${id||''}')">Save Entry</button>
      <button class="btn btn-ghost btn-sm" onclick="closeModal()">Cancel</button>
    </div>
  `);
  calcTotal();
}
function todayStr(){ return new Date().toISOString().slice(0,10); }
function calcTotal(){
  const qty = Number(document.getElementById("f_qty").value)||0;
  const rate = Number(document.getElementById("f_rate").value)||0;
  document.getElementById("f_total").value = fmtMoney(qty*rate);
}
function toggleRateField(){
  const src = document.getElementById("f_source").value;
  document.getElementById("f_donorLabel").textContent = src==="Donation" ? "Donor Name" : "Vendor Name";
}
function saveIncoming(id){
  const itemId = document.getElementById("f_item").value;
  if(!itemId){ toast("Please select an item", true); return; }
  const qty = Number(document.getElementById("f_qty").value)||0;
  if(qty<=0){ toast("Qty must be greater than 0", true); return; }
  const data = {
    date: document.getElementById("f_date").value || todayStr(),
    sourceType: document.getElementById("f_source").value,
    donorVendor: document.getElementById("f_donor").value.trim(),
    itemId,
    qty,
    rate: Number(document.getElementById("f_rate").value)||0,
    total: qty * (Number(document.getElementById("f_rate").value)||0),
    expiryDate: document.getElementById("f_expiry").value,
    batchNo: document.getElementById("f_batch").value.trim(),
    invoiceNo: document.getElementById("f_invoice").value.trim(),
    remarks: document.getElementById("f_remarks").value.trim(),
    enteredBy: CURRENT_USER.name
  };
  if(id){
    const row = DB.incoming.find(r=>r.id===id);
    Object.assign(row, data);
    toast("Inward entry updated");
  } else {
    uid("incoming");
    DB.incoming.push({ id:"in_"+Date.now(), ...data });
    toast("Inward entry saved");
  }
  saveDB(DB);
  closeModal();
  renderIncoming();
}
function deleteIncoming(id){
  if(!confirm("Delete this incoming entry?")) return;
  const row = DB.incoming.find(r=>r.id===id);
  const logId = row ? logDeletion("incoming", row) : null;
  DB.incoming = DB.incoming.filter(r=>r.id!==id);
  saveDB(DB);
  toast("Entry deleted", false, logId ? undoMultiple([logId]) : null);
  renderIncoming();
}

/* ============================================================
   BULK INWARD ENTRY — one vendor/donor supplying many items in
   a single delivery (e.g. 200+ items from one market run).
   Shared date/source/vendor entered once; each row is one item.
   ============================================================ */
let bulkShared = { date: todayStr(), sourceType: "Purchasing", vendor: "", invoiceNo: "" };
let bulkRows = [];
function freshBulkRow(){ return { itemId:"", qty:"", rate:"", expiryDate:"", batchNo:"" }; }
function resetBulkRows(n){ bulkRows = Array.from({length:n}, freshBulkRow); }

function openBulkInward(){
  resetBulkRows(1);
  bulkShared = { date: todayStr(), sourceType: "Purchasing", vendor: "", invoiceNo: "" };
  renderBulkInward();
}
function renderBulkInward(){
  const main = document.getElementById("mainContent");
  const grandTotal = bulkRows.reduce((s,r)=> s + (Number(r.qty)||0)*(Number(r.rate)||0), 0);
  main.innerHTML = `
    ${topbarHtml("New Inward Entry","Add items received — click + Add Row for each item", `<button class="btn btn-ghost btn-sm" onclick="renderIncoming()">← Back to Inward List</button>`)}
    <div class="panel">
      <div class="form-grid" style="margin-bottom:18px;max-width:750px;">
        <div class="field"><label>Date</label><input type="date" id="bulk_date" value="${bulkShared.date}" onchange="bulkShared.date=this.value"></div>
        <div class="field"><label>Source Type</label>
          <select id="bulk_source" onchange="bulkShared.sourceType=this.value">
            <option value="Purchasing" ${bulkShared.sourceType==='Purchasing'?'selected':''}>Purchasing</option>
            <option value="Donation" ${bulkShared.sourceType==='Donation'?'selected':''}>Donation</option>
          </select>
        </div>
        <div class="field"><label>Vendor / Donor Name</label><input type="text" id="bulk_vendor" value="${escHtml(bulkShared.vendor)}" oninput="bulkShared.vendor=this.value" placeholder="e.g. Imtiaz Market"></div>
        <div class="field"><label>Invoice / Receipt No.</label><input type="text" id="bulk_invoice" value="${escHtml(bulkShared.invoiceNo)}" oninput="bulkShared.invoiceNo=this.value"></div>
      </div>
      <div class="table-wrap">
      <table>
        <thead><tr><th style="min-width:220px;">Item</th><th>Qty</th><th>Rate</th><th>Total</th><th>Expiry Date</th><th>Batch No.</th><th></th></tr></thead>
        <tbody>
          ${bulkRows.map((r,i)=>`
            <tr>
              <td><select id="bulk_item_${i}" onchange="bulkRows[${i}].itemId=this.value" style="min-width:210px;">
                <option value="">-- Select item --</option>
                ${itemOptions(r.itemId)}
              </select></td>
              <td><input type="number" id="bulk_qty_${i}" value="${r.qty}" min="0" style="width:70px;padding:6px 8px;" oninput="bulkRows[${i}].qty=this.value;updateBulkRowTotal(${i})"></td>
              <td><input type="number" id="bulk_rate_${i}" value="${r.rate}" min="0" style="width:80px;padding:6px 8px;" oninput="bulkRows[${i}].rate=this.value;updateBulkRowTotal(${i})"></td>
              <td class="mono" id="bulk_total_${i}" style="font-weight:600;color:var(--gold-400);">${fmtMoney((Number(r.qty)||0)*(Number(r.rate)||0))}</td>
              <td><input type="date" id="bulk_expiry_${i}" value="${r.expiryDate}" style="padding:6px 8px;" onchange="bulkRows[${i}].expiryDate=this.value"></td>
              <td><input type="text" id="bulk_batch_${i}" value="${escHtml(r.batchNo)}" style="width:90px;padding:6px 8px;" oninput="bulkRows[${i}].batchNo=this.value"></td>
              <td><button class="icon-btn" onclick="removeBulkRow(${i})">${ICONS.trash}</button></td>
            </tr>`).join("")}
        </tbody>
      </table>
      </div>
      <div style="display:flex;gap:10px;margin:14px 0;flex-wrap:wrap;">
        <button class="btn btn-gold btn-sm" onclick="addBulkRows(1)">${ICONS.plus} Add Row</button>
      </div>
      <div style="margin-bottom:16px;font-size:14px;color:var(--ink);">Grand Total: <b style="color:var(--gold-400);font-size:17px;">${fmtMoney(grandTotal)}</b> · <span class="text-dim">${bulkRows.filter(r=>r.itemId && Number(r.qty)>0).length} item(s) ready to save</span></div>
      <div class="form-actions">
        <button class="btn btn-gold btn-sm" onclick="saveBulkInward()">${ICONS.check} Save All Entries</button>
        <button class="btn btn-ghost btn-sm" onclick="renderIncoming()">Cancel</button>
      </div>
    </div>
  `;
}
function updateBulkRowTotal(i){
  const qty = Number(document.getElementById(`bulk_qty_${i}`).value)||0;
  const rate = Number(document.getElementById(`bulk_rate_${i}`).value)||0;
  document.getElementById(`bulk_total_${i}`).textContent = fmtMoney(qty*rate);
  const grandTotal = bulkRows.reduce((s,r,idx)=>{
    const q = idx===i ? qty : (Number(r.qty)||0);
    const rt = idx===i ? rate : (Number(r.rate)||0);
    return s + q*rt;
  }, 0);
}
function addBulkRows(n){
  for(let k=0;k<n;k++) bulkRows.push(freshBulkRow());
  renderBulkInward();
}
function removeBulkRow(i){
  bulkRows.splice(i,1);
  renderBulkInward();
}
function saveBulkInward(){
  const date = bulkShared.date || todayStr();
  const sourceType = bulkShared.sourceType;
  const vendor = bulkShared.vendor.trim();
  const invoiceNo = bulkShared.invoiceNo.trim();
  if(!vendor){ toast(`${sourceType==='Donation'?'Donor':'Vendor'} name is required`, true); return; }

  let savedCount = 0;
  bulkRows.forEach(r=>{
    const itemId = r.itemId;
    const qty = Number(r.qty)||0;
    if(!itemId || qty<=0) return;
    const rate = Number(r.rate)||0;
    uid("incoming");
    DB.incoming.push({
      id: "in_"+Date.now()+"_"+savedCount,
      date, sourceType,
      donorVendor: vendor,
      itemId, qty, rate,
      total: qty*rate,
      expiryDate: r.expiryDate || "",
      batchNo: r.batchNo || "",
      invoiceNo,
      remarks: "",
      enteredBy: CURRENT_USER.name
    });
    savedCount++;
  });

  if(savedCount===0){ toast("No rows had both an item and a qty — nothing saved", true); return; }
  saveDB(DB);
  toast(`${savedCount} inward entries saved from ${vendor}`);
  renderIncoming();
}

/* ============================================================
   OUTGOING ENTRY (Issuance)
   ============================================================ */
let outgoingFilter = { dept:"", from:"", to:"", q:"" };
function renderOutgoing(){
  const main = document.getElementById("mainContent");
  main.innerHTML = `
    ${topbarHtml("Outward Entry","Record items issued to departments", canEdit()?`<button class="btn btn-gold btn-sm" onclick="openBulkOutward()">${ICONS.plus}New Entry</button>`:"")}
    <div class="panel">
      <div class="filter-bar">
        <div class="field"><label>Department</label>
          <select onchange="outgoingFilter.dept=this.value;renderOutgoing()">
            <option value="">All</option>
            ${DB.locationGroups.map(g=>`<optgroup label="${escHtml(g.name)}">${(Array.isArray(g.departments)?g.departments:[]).map(d=>`<option value="${escHtml(d)}" ${outgoingFilter.dept===d?'selected':''}>${escHtml(d)}</option>`).join("")}</optgroup>`).join("")}
          </select>
        </div>
        <div class="field"><label>From</label><input type="date" value="${outgoingFilter.from}" onchange="outgoingFilter.from=this.value;renderOutgoing()"></div>
        <div class="field"><label>To</label><input type="date" value="${outgoingFilter.to}" onchange="outgoingFilter.to=this.value;renderOutgoing()"></div>
        <div class="field" style="flex:1;min-width:200px;"><label>Search</label><input type="text" placeholder="Search item or receiver..." value="${escHtml(outgoingFilter.q)}" oninput="outgoingFilter.q=this.value;renderOutgoing()"></div>
      </div>
      <div class="table-wrap">
      <table>
        <thead><tr><th>Date</th><th>Item</th><th>Qty</th><th>Department</th><th>Receiver</th><th>Approved By</th><th>Received</th>${isAdmin()?'<th>Actions</th>':''}</tr></thead>
        <tbody>${outgoingRows()}</tbody>
      </table>
      </div>
    </div>
  `;
}
function outgoingRows(){
  let list = [...DB.outgoing].sort((a,b)=>new Date(b.date)-new Date(a.date)).filter(r=>{
    if(outgoingFilter.dept && r.department!==outgoingFilter.dept) return false;
    if(outgoingFilter.from && r.date < outgoingFilter.from) return false;
    if(outgoingFilter.to && r.date > outgoingFilter.to) return false;
    if(outgoingFilter.q){
      const q = outgoingFilter.q.toLowerCase();
      const item = getItem(r.itemId);
      const matchesItem = item && item.name.toLowerCase().includes(q);
      const matchesReceiver = r.receiverName && r.receiverName.toLowerCase().includes(q);
      if(!matchesItem && !matchesReceiver) return false;
    }
    return true;
  });
  if(list.length===0) return `<tr><td colspan="8">${emptyState("No outgoing entries found.")}</td></tr>`;
  return list.map(r=>{
    const item = getItem(r.itemId);
    return `<tr>
      <td>${fmtDate(r.date)}</td>
      <td><b>${item?escHtml(item.name):'(deleted item)'}</b></td>
      <td class="mono">${r.qty}</td>
      <td>${escHtml(r.department)}</td>
      <td>${escHtml(r.receiverName)}</td>
      <td>${escHtml(r.approvedBy||'-')}</td>
      <td>${r.received?'<span class="badge badge-ok">Yes</span>':'<span class="badge badge-warn">Pending</span>'}</td>
      ${isAdmin()?`<td class="row-actions">
        <button class="icon-btn" onclick="openOutgoingForm('${r.id}')">${ICONS.edit}</button>
        ${isAdmin()?`<button class="icon-btn" onclick="deleteOutgoing('${r.id}')">${ICONS.trash}</button>`:''}
      </td>`:''}
    </tr>`;
  }).join("");
}
function openOutgoingForm(id){
  const row = id ? DB.outgoing.find(r=>r.id===id) : null;
  openModal(`
    <div class="modal-head"><div class="modal-title">${row?'Edit Outward Entry':'New Outward Entry'}</div><button class="modal-close" onclick="closeModal()">&times;</button></div>
    <div class="form-grid" style="margin-bottom:14px;">
      <div class="field"><label>Date</label><input type="date" id="f_date" value="${row?row.date:todayStr()}"></div>
      <div class="field" style="grid-column:span 2;"><label>Item</label>
        <select id="f_item" onchange="outgoingItemChanged()">${itemOptions(row?row.itemId:null)}</select>
      </div>
    </div>
    <div class="form-grid" style="margin-bottom:6px;">
      <div class="field"><label>Qty Issued</label><input type="number" id="f_qty" value="${row?row.qty:''}" min="0" oninput="showStockHint()"></div>
      <div class="field"><label>Location</label>
        <select id="f_locgroup" onchange="updateDeptOptions()">
          ${DB.locationGroups.map((g,gi)=>`<option value="${gi}">${escHtml(g.name)}</option>`).join("")}
        </select>
      </div>
      <div class="field"><label>Department</label>
        <select id="f_dept" onchange="toggleDeptCustom()"></select>
      </div>
    </div>
    <div class="field" id="f_dept_custom_wrap" style="display:none;margin-bottom:14px;"><label>Type Department / Institution Name</label><input type="text" id="f_dept_custom" placeholder="e.g. a new convent or partner name"></div>
    <div class="field" style="margin-bottom:14px;"><label>Receiver Name</label><input type="text" id="f_receiver" value="${row?escHtml(row.receiverName||''):''}"></div>
    <div id="stockHint" style="font-size:12px;color:var(--ink-faint);margin-bottom:14px;"></div>
    <div class="form-grid" style="margin-bottom:14px;">
      <div class="field"><label>Purpose / Reason</label><input type="text" id="f_purpose" value="${row?escHtml(row.purpose||''):''}"></div>
      <div class="field"><label>Approved By</label><input type="text" id="f_approved" value="${row?escHtml(row.approvedBy||''):''}"></div>
      <div class="field"><label>Received Confirmation</label>
        <select id="f_received"><option value="0" ${row&&!row.received?'selected':''}>Pending</option><option value="1" ${row&&row.received?'selected':''}>Confirmed Received</option></select>
      </div>
    </div>
    <div class="form-actions">
      <button class="btn btn-gold btn-sm" onclick="saveOutgoing('${id||''}')">Save Entry</button>
      <button class="btn btn-ghost btn-sm" onclick="closeModal()">Cancel</button>
    </div>
  `);
  showStockHint();
  initOutgoingDeptFields(row ? row.department : null);
}
function findGroupForDept(deptName){
  for(let gi=0; gi<DB.locationGroups.length; gi++){
    if(DB.locationGroups[gi].departments.includes(deptName)) return gi;
  }
  return -1;
}
function populateDeptSelect(groupIndex, selectedDept){
  const group = DB.locationGroups[groupIndex];
  const deptList = (group && Array.isArray(group.departments)) ? group.departments : [];
  let opts = deptList.map(d=>`<option value="${escHtml(d)}" ${selectedDept===d?'selected':''}>${escHtml(d)}</option>`).join("");
  if(group && group.allowCustom){
    opts += `<option value="__custom__">+ Type a new name...</option>`;
  }
  if(!opts){
    opts = `<option value="__custom__">+ Type a name...</option>`;
  }
  document.getElementById("f_dept").innerHTML = opts;
}
function updateDeptOptions(){
  const gi = Number(document.getElementById("f_locgroup").value);
  populateDeptSelect(gi, null);
  toggleDeptCustom();
}
function toggleDeptCustom(){
  const val = document.getElementById("f_dept").value;
  const wrap = document.getElementById("f_dept_custom_wrap");
  wrap.style.display = val==="__custom__" ? "block" : "none";
}
function initOutgoingDeptFields(currentDept){
  let gi = currentDept ? findGroupForDept(currentDept) : 0;
  let isCustom = false;
  if(currentDept && gi<0){
    gi = DB.locationGroups.findIndex(g=>g.allowCustom);
    if(gi<0) gi = 0;
    isCustom = true;
  }
  if(gi<0) gi = 0;
  document.getElementById("f_locgroup").value = gi;
  populateDeptSelect(gi, isCustom ? null : currentDept);
  if(isCustom){
    document.getElementById("f_dept").value = "__custom__";
    document.getElementById("f_dept_custom_wrap").style.display = "block";
    document.getElementById("f_dept_custom").value = currentDept;
  } else {
    toggleDeptCustom();
  }
}
function outgoingItemChanged(){
  const itemId = document.getElementById("f_item").value;
  const item = getItem(itemId);
  if(item){
    const stock = stockOf(item.id);
    if(stock<=0){
      toast(`"${item.name}" is not in stock`, true);
    }
    const expiredBatch = DB.incoming.find(r=>r.itemId===item.id && r.expiryDate && daysUntil(r.expiryDate)<0);
    if(expiredBatch){
      toast(`"${item.name}" has an expired batch (expired ${fmtDate(expiredBatch.expiryDate)})`, true);
    }
  }
  showStockHint();
}
function estimateStockoutDate(itemId, currentStock){
  const since = new Date(); since.setDate(since.getDate()-30);
  const sinceStr = since.toISOString().slice(0,10);
  const recentOutQty = DB.outgoing.filter(r=>r.itemId===itemId && r.date>=sinceStr).reduce((s,r)=>s+Number(r.qty),0);
  if(recentOutQty<=0) return null;
  const avgDaily = recentOutQty/30;
  if(avgDaily<=0) return null;
  const daysLeft = Math.floor(currentStock/avgDaily);
  const d = new Date(); d.setDate(d.getDate()+daysLeft);
  return d.toISOString().slice(0,10);
}
function showStockHint(){
  const itemId = document.getElementById("f_item").value;
  const qty = Number(document.getElementById("f_qty").value)||0;
  const item = getItem(itemId);
  const hint = document.getElementById("stockHint");
  if(!item){ hint.innerHTML=""; return; }
  const stock = stockOf(item.id);
  let html = `Available stock: <b style="color:var(--gold-400)">${stock} ${escHtml(item.unit)}</b>`;
  if(qty>stock) html += ` — <span style="color:var(--danger)">exceeds available stock!</span>`;
  if(stock<=0){
    html += `<br><span style="color:var(--danger);">⚠ This item is not currently in stock.</span>`;
  } else {
    const stockoutDate = estimateStockoutDate(item.id, stock);
    if(stockoutDate){
      html += `<br><span style="color:var(--warn);">At current usage rate, stock may run out around ${fmtDate(stockoutDate)}.</span>`;
    }
  }
  const expiredBatch = DB.incoming.find(r=>r.itemId===item.id && r.expiryDate && daysUntil(r.expiryDate)<0);
  if(expiredBatch){
    html += `<br><span style="color:var(--danger);">⚠ This item has an expired batch (expired ${fmtDate(expiredBatch.expiryDate)}).</span>`;
  }
  hint.innerHTML = html;
}
function saveOutgoing(id){
  const itemId = document.getElementById("f_item").value;
  if(!itemId){ toast("Please select an item", true); return; }
  const qty = Number(document.getElementById("f_qty").value)||0;
  if(qty<=0){ toast("Qty must be greater than 0", true); return; }
  const item = getItem(itemId);
  const currentStock = stockOf(itemId) + (id ? Number(DB.outgoing.find(r=>r.id===id).qty) : 0);
  if(qty > currentStock){
    if(!confirm(`Warning: only ${currentStock} ${item.unit} in stock. Issue anyway?`)) return;
  }
  const deptSelectVal = document.getElementById("f_dept").value;
  let department = deptSelectVal;
  if(deptSelectVal === "__custom__"){
    department = document.getElementById("f_dept_custom").value.trim();
    if(!department){ toast("Please type a department/institution name", true); return; }
    const gi = Number(document.getElementById("f_locgroup").value);
    const group = DB.locationGroups[gi];
    if(group && !group.departments.includes(department)){
      group.departments.push(department);
    }
  }
  const data = {
    date: document.getElementById("f_date").value || todayStr(),
    itemId,
    qty,
    department,
    receiverName: document.getElementById("f_receiver").value.trim(),
    purpose: document.getElementById("f_purpose").value.trim(),
    approvedBy: document.getElementById("f_approved").value.trim(),
    received: document.getElementById("f_received").value === "1",
    enteredBy: CURRENT_USER.name
  };
  if(!data.receiverName){ toast("Receiver name is required", true); return; }
  if(id){
    const row = DB.outgoing.find(r=>r.id===id);
    Object.assign(row, data);
    toast("Outward entry updated");
  } else {
    uid("outgoing");
    DB.outgoing.push({ id:"out_"+Date.now(), ...data });
    toast("Outward entry saved");
  }
  saveDB(DB);
  closeModal();
  renderOutgoing();
}
function deleteOutgoing(id){
  if(!confirm("Delete this outgoing entry?")) return;
  const row = DB.outgoing.find(r=>r.id===id);
  const logId = row ? logDeletion("outgoing", row) : null;
  DB.outgoing = DB.outgoing.filter(r=>r.id!==id);
  saveDB(DB);
  toast("Entry deleted", false, logId ? undoMultiple([logId]) : null);
  renderOutgoing();
}

/* ============================================================
   BULK OUTWARD ENTRY — one department/receiver getting many
   items issued at once. Shared date/location/department/receiver
   entered once; each row is one item.
   ============================================================ */
let bulkOutShared = { date: todayStr(), locGroupIndex: 0, department: "", deptCustom: "", receiverName: "", purpose: "", approvedBy: "", received: false };
let bulkOutRows = [];
function freshBulkOutRow(){ return { itemId:"", qty:"" }; }
function resetBulkOutRows(n){ bulkOutRows = Array.from({length:n}, freshBulkOutRow); }

function openBulkOutward(){
  resetBulkOutRows(1);
  bulkOutShared = { date: todayStr(), locGroupIndex: 0, department: "", deptCustom: "", receiverName: "", purpose: "", approvedBy: "", received: false };
  renderBulkOutward();
}
function renderBulkOutward(){
  const main = document.getElementById("mainContent");
  main.innerHTML = `
    ${topbarHtml("New Outward Entry","Add items issued — click + Add Row for each item", `<button class="btn btn-ghost btn-sm" onclick="renderOutgoing()">← Back to Outward List</button>`)}
    <div class="panel">
      <div class="form-grid" style="margin-bottom:14px;max-width:900px;">
        <div class="field"><label>Date</label><input type="date" id="bout_date" value="${bulkOutShared.date}" onchange="bulkOutShared.date=this.value"></div>
        <div class="field"><label>Location</label>
          <select id="bout_locgroup" onchange="bulkOutUpdateDeptOptions()">
            ${DB.locationGroups.map((g,gi)=>`<option value="${gi}" ${bulkOutShared.locGroupIndex===gi?'selected':''}>${escHtml(g.name)}</option>`).join("")}
          </select>
        </div>
        <div class="field"><label>Department</label>
          <select id="bout_dept" onchange="bulkOutToggleDeptCustom()"></select>
        </div>
        <div class="field" id="bout_dept_custom_wrap" style="display:none;"><label>Type Name</label><input type="text" id="bout_dept_custom" oninput="bulkOutShared.deptCustom=this.value" placeholder="e.g. new convent name"></div>
        <div class="field"><label>Receiver Name</label><input type="text" id="bout_receiver" value="${escHtml(bulkOutShared.receiverName)}" oninput="bulkOutShared.receiverName=this.value"></div>
        <div class="field"><label>Purpose / Reason</label><input type="text" id="bout_purpose" value="${escHtml(bulkOutShared.purpose)}" oninput="bulkOutShared.purpose=this.value"></div>
        <div class="field"><label>Approved By</label><input type="text" id="bout_approved" value="${escHtml(bulkOutShared.approvedBy)}" oninput="bulkOutShared.approvedBy=this.value"></div>
        <div class="field"><label>Received Confirmation</label>
          <select id="bout_received" onchange="bulkOutShared.received=this.value==='1'">
            <option value="0" ${!bulkOutShared.received?'selected':''}>Pending</option>
            <option value="1" ${bulkOutShared.received?'selected':''}>Confirmed Received</option>
          </select>
        </div>
      </div>
      <div class="table-wrap">
      <table>
        <thead><tr><th style="min-width:220px;">Item</th><th>Qty Issued</th><th>Available Stock</th><th></th></tr></thead>
        <tbody>
          ${bulkOutRows.map((r,i)=>{
            const item = getItem(r.itemId);
            const stock = item ? stockOf(item.id) : null;
            return `
            <tr>
              <td><select id="bout_item_${i}" onchange="bulkOutRows[${i}].itemId=this.value;renderBulkOutward()" style="min-width:210px;">
                <option value="">-- Select item --</option>
                ${itemOptions(r.itemId)}
              </select></td>
              <td><input type="number" id="bout_qty_${i}" value="${r.qty}" min="0" style="width:80px;padding:6px 8px;" oninput="bulkOutRows[${i}].qty=this.value"></td>
              <td class="mono">${item?`<span style="color:${stock<=0?'var(--danger)':'var(--gold-400)'};">${stock} ${escHtml(item.unit)}</span>`:'-'}</td>
              <td><button class="icon-btn" onclick="removeBulkOutRow(${i})">${ICONS.trash}</button></td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>
      </div>
      <div style="display:flex;gap:10px;margin:14px 0;flex-wrap:wrap;">
        <button class="btn btn-gold btn-sm" onclick="addBulkOutRows(1)">${ICONS.plus} Add Row</button>
      </div>
      <div style="margin-bottom:16px;font-size:13px;color:var(--ink-dim);">${bulkOutRows.filter(r=>r.itemId && Number(r.qty)>0).length} item(s) ready to save</div>
      <div class="form-actions">
        <button class="btn btn-gold btn-sm" onclick="saveBulkOutward()">${ICONS.check} Save All Entries</button>
        <button class="btn btn-ghost btn-sm" onclick="renderOutgoing()">Cancel</button>
      </div>
    </div>
  `;
  bulkOutInitDeptFields();
}
function bulkOutPopulateDeptSelect(groupIndex, selectedDept){
  const group = DB.locationGroups[groupIndex];
  const deptList = (group && Array.isArray(group.departments)) ? group.departments : [];
  let opts = deptList.map(d=>`<option value="${escHtml(d)}" ${selectedDept===d?'selected':''}>${escHtml(d)}</option>`).join("");
  if(group && group.allowCustom) opts += `<option value="__custom__">+ Type a new name...</option>`;
  if(!opts) opts = `<option value="__custom__">+ Type a name...</option>`;
  document.getElementById("bout_dept").innerHTML = opts;
}
function bulkOutUpdateDeptOptions(){
  const gi = Number(document.getElementById("bout_locgroup").value);
  bulkOutShared.locGroupIndex = gi;
  bulkOutPopulateDeptSelect(gi, null);
  bulkOutToggleDeptCustom();
}
function bulkOutToggleDeptCustom(){
  const val = document.getElementById("bout_dept").value;
  bulkOutShared.department = val;
  document.getElementById("bout_dept_custom_wrap").style.display = val==="__custom__" ? "block" : "none";
}
function bulkOutInitDeptFields(){
  const gi = bulkOutShared.locGroupIndex || 0;
  document.getElementById("bout_locgroup").value = gi;
  bulkOutPopulateDeptSelect(gi, bulkOutShared.department);
  if(bulkOutShared.department === "__custom__"){
    document.getElementById("bout_dept").value = "__custom__";
    document.getElementById("bout_dept_custom_wrap").style.display = "block";
    document.getElementById("bout_dept_custom").value = bulkOutShared.deptCustom;
  }
}
function addBulkOutRows(n){
  for(let k=0;k<n;k++) bulkOutRows.push(freshBulkOutRow());
  renderBulkOutward();
}
function removeBulkOutRow(i){
  bulkOutRows.splice(i,1);
  renderBulkOutward();
}
function saveBulkOutward(){
  const date = bulkOutShared.date || todayStr();
  let department = bulkOutShared.department;
  if(department === "__custom__"){
    department = bulkOutShared.deptCustom.trim();
    if(!department){ toast("Please type a department/institution name", true); return; }
    const group = DB.locationGroups[bulkOutShared.locGroupIndex];
    if(group && !group.departments.includes(department)) group.departments.push(department);
  }
  if(!department){ toast("Please select a department", true); return; }
  const receiverName = bulkOutShared.receiverName.trim();
  if(!receiverName){ toast("Receiver name is required", true); return; }

  let savedCount = 0, skippedStock = 0;
  bulkOutRows.forEach(r=>{
    const itemId = r.itemId;
    const qty = Number(r.qty)||0;
    if(!itemId || qty<=0) return;
    const item = getItem(itemId);
    if(item && qty > stockOf(itemId)) skippedStock++;
    uid("outgoing");
    DB.outgoing.push({
      id: "out_"+Date.now()+"_"+savedCount,
      date, itemId, qty,
      department,
      receiverName,
      purpose: bulkOutShared.purpose.trim(),
      approvedBy: bulkOutShared.approvedBy.trim(),
      received: bulkOutShared.received,
      enteredBy: CURRENT_USER.name
    });
    savedCount++;
  });

  if(savedCount===0){ toast("No rows had both an item and a qty — nothing saved", true); return; }
  saveDB(DB);
  toast(`${savedCount} outward entries saved to ${department}${skippedStock>0?` (${skippedStock} exceeded available stock)`:''}`);
  renderOutgoing();
}

/* ============================================================
   DIAPER ISSUE — QUICK TICK-SHEET FOR 12 DORMITORY ROOMS
   Rooms and caregiver names are pre-fed once; daily use is just
   ticking which rooms need diapers, picking a size, and saving.
   ============================================================ */
const DIAPER_SIZES = ["JXL","M","XL"];
let diaperDate = todayStr();
let diaperTime = new Date().toTimeString().slice(0,5);

function findOrCreateDiaperItem(size){
  let item = DB.items.find(i => i.category==="diapers" && i.name.trim().toLowerCase() === ("diapers "+size).toLowerCase());
  if(item) return item;
  const seq = uid("item");
  item = { id:"itm_"+Date.now()+"_"+size, seq, name:"Diapers "+size, category:"diapers", unit:"pcs", reorderLevel:20 };
  DB.items.push(item);
  return item;
}

function renderDiaperIssue(){
  const main = document.getElementById("mainContent");
  main.innerHTML = `
    ${topbarHtml("Diaper Issue","Quick tick-sheet for the 12 dormitory rooms")}
    <div class="panel">
      <div class="form-grid" style="margin-bottom:18px;max-width:500px;">
        <div class="field"><label>Date</label><input type="date" id="dp_date" value="${diaperDate}" onchange="diaperDate=this.value"></div>
        <div class="field"><label>Time</label><input type="time" id="dp_time" value="${diaperTime}" onchange="diaperTime=this.value"></div>
      </div>
      <div class="table-wrap">
      <table>
        <thead><tr><th style="width:40px;">Issue</th><th>Room</th><th>Caregiver Name</th><th>JXL Qty</th><th>M Qty</th><th>XL Qty</th><th>Total</th></tr></thead>
        <tbody>
          ${DB.dormRooms.map((r,i)=>`
            <tr>
              <td><input type="checkbox" id="dp_tick_${i}" style="width:15px;height:15px;accent-color:var(--gold-500);cursor:pointer;"></td>
              <td>${canEdit()?`<input type="text" id="dp_room_${i}" value="${escHtml(r.name)}" style="width:120px;padding:6px 8px;">`:`<b>${escHtml(r.name)}</b>`}</td>
              <td><input type="text" id="dp_caregiver_${i}" value="${escHtml(r.caregiver||'')}" placeholder="Caregiver name" style="width:150px;padding:6px 8px;"></td>
              <td><input type="number" id="dp_qty_JXL_${i}" value="0" min="0" style="width:60px;padding:6px 8px;" oninput="updateDiaperRowTotal(${i})"></td>
              <td><input type="number" id="dp_qty_M_${i}" value="0" min="0" style="width:60px;padding:6px 8px;" oninput="updateDiaperRowTotal(${i})"></td>
              <td><input type="number" id="dp_qty_XL_${i}" value="0" min="0" style="width:60px;padding:6px 8px;" oninput="updateDiaperRowTotal(${i})"></td>
              <td class="mono" id="dp_total_${i}" style="font-weight:700;color:var(--gold-400);">0</td>
            </tr>`).join("")}
        </tbody>
      </table>
      </div>
      ${canEdit()?`<div class="form-actions"><button class="btn btn-gold btn-sm" onclick="saveDiaperIssue()">${ICONS.check} Save Ticked Rooms</button></div>`:
        `<p class="text-dim" style="font-size:12.5px;margin-top:14px;">You have view-only access — ask a Store Keeper or Admin to save issues.</p>`}
    </div>
    <div class="panel">
      <div class="panel-head"><div class="panel-title">Diaper Issues on ${fmtDate(diaperDate)}</div></div>
      ${todayDiaperRows()}
    </div>
  `;
}
function todayDiaperRows(){
  const diaperItems = DB.items.filter(i=>i.category==="diapers");
  const diaperItemIds = diaperItems.map(i=>i.id);
  const rows = DB.outgoing.filter(r => r.date===diaperDate && diaperItemIds.includes(r.itemId) && r.purpose==="Diaper Issue - Dormitory");
  if(rows.length===0) return emptyState("No diaper issues recorded for this date yet.");

  // Group into one line per issue: prefer batchId (new entries); fall back to
  // date+time+room+caregiver for older entries saved before batching existed.
  const groups = {};
  rows.forEach(r=>{
    const key = r.batchId || `${r.date}|${r.time||''}|${r.department}|${r.receiverName}`;
    if(!groups[key]) groups[key] = { date:r.date, time:r.time||'-', department:r.department, receiverName:r.receiverName, JXL:0, M:0, XL:0 };
    const item = diaperItems.find(it=>it.id===r.itemId);
    const size = item ? item.name.replace("Diapers ","").trim() : "";
    if(groups[key][size] !== undefined) groups[key][size] += Number(r.qty);
  });
  const list = Object.values(groups).sort((a,b)=> (b.time||"").localeCompare(a.time||""));

  return `<div class="table-wrap"><table><thead><tr><th>Date</th><th>Time</th><th>Room</th><th>Caregiver</th><th>JXL</th><th>M</th><th>XL</th><th>Total</th></tr></thead>
    <tbody>${list.map(g=>{
      const total = g.JXL+g.M+g.XL;
      return `<tr><td>${fmtDate(g.date)}</td><td>${escHtml(g.time)}</td><td>${escHtml(g.department)}</td><td>${escHtml(g.receiverName)}</td><td class="mono">${g.JXL||'-'}</td><td class="mono">${g.M||'-'}</td><td class="mono">${g.XL||'-'}</td><td class="mono"><b>${total}</b></td></tr>`;
    }).join("")}</tbody></table></div>`;
}
function updateDiaperRowTotal(i){
  const jxl = Number(document.getElementById(`dp_qty_JXL_${i}`).value)||0;
  const m = Number(document.getElementById(`dp_qty_M_${i}`).value)||0;
  const xl = Number(document.getElementById(`dp_qty_XL_${i}`).value)||0;
  document.getElementById(`dp_total_${i}`).textContent = jxl+m+xl;
}
function saveDiaperIssue(){
  const date = document.getElementById("dp_date").value || todayStr();
  const time = document.getElementById("dp_time").value || new Date().toTimeString().slice(0,5);
  let savedCount = 0;

  DB.dormRooms.forEach((room, i)=>{
    const tick = document.getElementById(`dp_tick_${i}`).checked;
    const roomNameInput = document.getElementById(`dp_room_${i}`);
    const roomName = roomNameInput ? roomNameInput.value.trim() : room.name;
    const caregiver = document.getElementById(`dp_caregiver_${i}`).value.trim();
    const sizeQtys = {
      JXL: Number(document.getElementById(`dp_qty_JXL_${i}`).value)||0,
      M: Number(document.getElementById(`dp_qty_M_${i}`).value)||0,
      XL: Number(document.getElementById(`dp_qty_XL_${i}`).value)||0
    };

    // Persist room name / caregiver edits either way, so they're pre-filled next time.
    room.name = roomName || room.name;
    room.caregiver = caregiver;

    if(!tick) return;
    const totalQty = sizeQtys.JXL + sizeQtys.M + sizeQtys.XL;
    if(totalQty<=0) return;
    if(!caregiver){ toast(`${roomName}: caregiver name is required to issue`, true); return; }

    const batchId = "batch_"+Date.now()+"_"+i;
    DIAPER_SIZES.forEach(size=>{
      const qty = sizeQtys[size];
      if(qty<=0) return;
      const item = findOrCreateDiaperItem(size);
      uid("outgoing");
      DB.outgoing.push({
        id: "out_"+Date.now()+"_"+i+"_"+size,
        date, time,
        itemId: item.id,
        qty,
        department: roomName,
        receiverName: caregiver,
        purpose: "Diaper Issue - Dormitory",
        batchId,
        approvedBy: CURRENT_USER.name,
        received: true,
        enteredBy: CURRENT_USER.name
      });
    });
    savedCount++;
  });

  saveDB(DB);
  if(savedCount>0){ toast(`${savedCount} room(s) recorded`); }
  else { toast("No rooms were ticked, or all quantities were 0", true); }
  renderDiaperIssue();
}

/* ============================================================
   SCRAP / WASTAGE — write off damaged, expired, spoiled, lost,
   or broken stock. Reduces stock like an outward issue, but is
   tracked separately from department issuance for clean reporting.
   ============================================================ */
const SCRAP_REASONS = ["Damaged","Expired","Spoiled","Broken","Lost","Other"];
let scrapFilter = { reason:"", from:"", to:"", q:"" };

function renderScrap(){
  const main = document.getElementById("mainContent");
  main.innerHTML = `
    ${topbarHtml("Scrap / Wastage","Write off damaged, expired, or lost stock", canEdit()?`<button class="btn btn-gold btn-sm" onclick="openScrapForm()">${ICONS.plus}New Scrap Entry</button>`:"")}
    <div class="panel">
      <div class="filter-bar">
        <div class="field"><label>Reason</label>
          <select onchange="scrapFilter.reason=this.value;renderScrap()">
            <option value="">All</option>
            ${SCRAP_REASONS.map(r=>`<option value="${r}" ${scrapFilter.reason===r?'selected':''}>${r}</option>`).join("")}
          </select>
        </div>
        <div class="field"><label>From</label><input type="date" value="${scrapFilter.from}" onchange="scrapFilter.from=this.value;renderScrap()"></div>
        <div class="field"><label>To</label><input type="date" value="${scrapFilter.to}" onchange="scrapFilter.to=this.value;renderScrap()"></div>
        <div class="field" style="flex:1;min-width:200px;"><label>Search</label><input type="text" placeholder="Search item..." value="${escHtml(scrapFilter.q)}" oninput="scrapFilter.q=this.value;renderScrap()"></div>
      </div>
      <div class="table-wrap">
      <table>
        <thead><tr><th>Date</th><th>Time</th><th>Item</th><th>Category</th><th>Qty</th><th>Reason</th><th>Sold</th><th>Approved By</th>${isAdmin()?'<th>Actions</th>':''}</tr></thead>
        <tbody>${scrapRows()}</tbody>
      </table>
      </div>
    </div>
  `;
}
function scrapRows(){
  let list = [...DB.scrap].sort((a,b)=>new Date(b.date)-new Date(a.date)).filter(r=>{
    const item = getItem(r.itemId);
    const name = item ? item.name : (r.description||"");
    if(scrapFilter.reason && r.reason!==scrapFilter.reason) return false;
    if(scrapFilter.from && r.date < scrapFilter.from) return false;
    if(scrapFilter.to && r.date > scrapFilter.to) return false;
    if(scrapFilter.q && !name.toLowerCase().includes(scrapFilter.q.toLowerCase())) return false;
    return true;
  });
  if(list.length===0) return `<tr><td colspan="9">${emptyState("No scrap/wastage records found.")}</td></tr>`;
  return list.map(r=>{
    const item = getItem(r.itemId);
    const displayName = item ? item.name : (r.description || "(no description)");
    return `<tr>
      <td>${fmtDate(r.date)}</td>
      <td>${escHtml(r.time||'-')}</td>
      <td><b>${escHtml(displayName)}</b></td>
      <td>${item?`<span class="badge ${CATS[item.category].badge}">${CATS[item.category].label}</span>`:'<span class="text-dim">Not tracked</span>'}</td>
      <td class="mono">${r.qty}</td>
      <td><span class="badge badge-danger">${escHtml(r.reason)}</span></td>
      <td>${r.sold?`<span class="badge badge-ok">Sold: ${fmtMoney(r.sellAmount)}</span>`:'<span class="text-dim">-</span>'}</td>
      <td>${escHtml(r.approvedBy||'-')}</td>
      ${isAdmin()?`<td class="row-actions">
        <button class="icon-btn" onclick="openScrapForm('${r.id}')">${ICONS.edit}</button>
        <button class="icon-btn" onclick="deleteScrap('${r.id}')">${ICONS.trash}</button>
      </td>`:''}
    </tr>`;
  }).join("");
}
function openScrapForm(id){
  const row = id ? DB.scrap.find(r=>r.id===id) : null;
  openModal(`
    <div class="modal-head"><div class="modal-title">${row?'Edit Scrap Entry':'New Scrap Entry'}</div><button class="modal-close" onclick="closeModal()">&times;</button></div>
    <div class="form-grid" style="margin-bottom:14px;">
      <div class="field"><label>Date</label><input type="date" id="s_date" value="${row?row.date:todayStr()}"></div>
      <div class="field"><label>Time</label><input type="time" id="s_time" value="${row?row.time||'':new Date().toTimeString().slice(0,5)}"></div>
      <div class="field"><label>Item (from Item Master)</label>
        <select id="s_item" onchange="showScrapStockHint()">
          <option value="">-- Not in Item Master --</option>
          ${itemOptions(row?row.itemId:null)}
        </select>
      </div>
    </div>
    <div class="field" style="margin-bottom:14px;"><label>Item / Scrap Description (type freely if not in Item Master)</label>
      <input type="text" id="s_desc" value="${row?escHtml(row.description||''):''}" placeholder="e.g. broken chairs, empty sacks, scrap metal"></div>
    <div class="form-grid" style="margin-bottom:6px;">
      <div class="field"><label>Qty</label><input type="number" id="s_qty" value="${row?row.qty:''}" min="1" oninput="showScrapStockHint()"></div>
      <div class="field"><label>Reason</label>
        <select id="s_reason">${SCRAP_REASONS.map(r=>`<option value="${r}" ${row&&row.reason===r?'selected':''}>${r}</option>`).join("")}</select>
      </div>
      <div class="field"><label>Approved By</label><input type="text" id="s_approved" value="${row?escHtml(row.approvedBy||''):CURRENT_USER.name}"></div>
    </div>
    <div id="scrapStockHint" style="font-size:12px;color:var(--ink-faint);margin-bottom:14px;"></div>

    <div class="field" style="margin-bottom:14px;">
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
        <input type="checkbox" id="s_sold" ${row&&row.sold?'checked':''} onchange="toggleScrapSoldFields()"> Sold as scrap?
      </label>
    </div>
    <div id="scrapSoldFields" class="form-grid" style="margin-bottom:14px;display:${row&&row.sold?'grid':'none'};">
      <div class="field"><label>Sell Amount (Rs)</label><input type="number" id="s_sellAmount" value="${row?row.sellAmount||'':''}" min="0"></div>
      <div class="field" style="grid-column:span 2;"><label>Buyer / Kabari Name</label><input type="text" id="s_buyer" value="${row?escHtml(row.buyerName||''):''}" placeholder="e.g. Ali Scrap Traders"></div>
    </div>

    <div class="field" style="margin-bottom:14px;"><label>Remarks</label><input type="text" id="s_remarks" value="${row?escHtml(row.remarks||''):''}" placeholder="e.g. bag torn during handling"></div>
    <div class="form-actions">
      <button class="btn btn-gold btn-sm" onclick="saveScrap('${id||''}')">Save Entry</button>
      <button class="btn btn-ghost btn-sm" onclick="closeModal()">Cancel</button>
    </div>
  `);
  showScrapStockHint();
}
function toggleScrapSoldFields(){
  const checked = document.getElementById("s_sold").checked;
  document.getElementById("scrapSoldFields").style.display = checked ? "grid" : "none";
}
function showScrapStockHint(){
  const itemId = document.getElementById("s_item").value;
  const qty = Number(document.getElementById("s_qty").value)||0;
  const item = getItem(itemId);
  const hint = document.getElementById("scrapStockHint");
  if(!item){ hint.innerHTML = `<span class="text-dim">Not linked to an inventory item — stock will not be reduced.</span>`; return; }
  const stock = stockOf(item.id);
  hint.innerHTML = `Available stock: <b style="color:var(--gold-400)">${stock} ${escHtml(item.unit)}</b>` +
    (qty>stock ? ` — <span style="color:var(--danger)">exceeds available stock!</span>` : "");
}
function saveScrap(id){
  const itemId = document.getElementById("s_item").value;
  const description = document.getElementById("s_desc").value.trim();
  if(!itemId && !description){ toast("Select an item or type a description", true); return; }
  const qty = Number(document.getElementById("s_qty").value)||0;
  if(qty<=0){ toast("Qty must be greater than 0", true); return; }
  const sold = document.getElementById("s_sold").checked;
  const sellAmount = sold ? (Number(document.getElementById("s_sellAmount").value)||0) : 0;

  const data = {
    date: document.getElementById("s_date").value || todayStr(),
    time: document.getElementById("s_time").value || new Date().toTimeString().slice(0,5),
    itemId: itemId || null,
    description,
    qty,
    reason: document.getElementById("s_reason").value,
    sold,
    sellAmount,
    buyerName: sold ? document.getElementById("s_buyer").value.trim() : "",
    approvedBy: document.getElementById("s_approved").value.trim(),
    remarks: document.getElementById("s_remarks").value.trim(),
    enteredBy: CURRENT_USER.name
  };
  if(id){
    const row = DB.scrap.find(r=>r.id===id);
    Object.assign(row, data);
    toast("Scrap entry updated");
  } else {
    uid("scrap");
    DB.scrap.push({ id:"scr_"+Date.now(), ...data });
    toast("Scrap entry saved");
  }
  saveDB(DB);
  closeModal();
  renderScrap();
}
function deleteScrap(id){
  if(!confirm("Delete this scrap entry?")) return;
  const row = DB.scrap.find(r=>r.id===id);
  const logId = row ? logDeletion("scrap", row) : null;
  DB.scrap = DB.scrap.filter(r=>r.id!==id);
  saveDB(DB);
  toast("Entry deleted", false, logId ? undoMultiple([logId]) : null);
  renderScrap();
}

/* ============================================================
   MAINTENANCE — repairs, servicing, and upkeep spending. Not
   tied to store stock; tracks its own costs, vendors, and status.
   ============================================================ */
const MAINT_CATEGORIES = ["Electrical","Plumbing","AC / HVAC","Generator","Building / Civil","Furniture","Vehicle","IT / Equipment","Other"];
let maintFilter = { category:"", status:"", from:"", to:"", q:"" };

function renderMaintenance(){
  const main = document.getElementById("mainContent");
  const pending = DB.maintenance.filter(r=>r.status==="Pending");
  const totalSpend = DB.maintenance.reduce((s,r)=>s+Number(r.total||0),0);
  main.innerHTML = `
    ${topbarHtml("Maintenance","Repairs, servicing, and upkeep expenses", canEdit()?`<button class="btn btn-gold btn-sm" onclick="openMaintenanceForm()">${ICONS.plus}New Maintenance Entry</button>`:"")}
    <div class="grid grid-4" style="margin-bottom:20px;">
      ${statCard("Total Records","bar-hh",DB.maintenance.length,"maintenance entries")}
      ${statCard("Total Spend","bar-df",fmtMoney(totalSpend),"all time")}
      ${statCard("Pending Work","bar-dp",pending.length,"not yet completed")}
      ${statCard("This Month","bar-st",fmtMoney(DB.maintenance.filter(r=>r.date && r.date.slice(0,7)===todayStr().slice(0,7)).reduce((s,r)=>s+Number(r.total||0),0)),"current month spend")}
    </div>
    <div class="panel">
      <div class="filter-bar">
        <div class="field"><label>Category</label>
          <select onchange="maintFilter.category=this.value;renderMaintenance()">
            <option value="">All</option>
            ${MAINT_CATEGORIES.map(c=>`<option value="${c}" ${maintFilter.category===c?'selected':''}>${c}</option>`).join("")}
          </select>
        </div>
        <div class="field"><label>Status</label>
          <select onchange="maintFilter.status=this.value;renderMaintenance()">
            <option value="">All</option>
            <option value="Completed" ${maintFilter.status==='Completed'?'selected':''}>Completed</option>
            <option value="Pending" ${maintFilter.status==='Pending'?'selected':''}>Pending</option>
          </select>
        </div>
        <div class="field"><label>From</label><input type="date" value="${maintFilter.from}" onchange="maintFilter.from=this.value;renderMaintenance()"></div>
        <div class="field"><label>To</label><input type="date" value="${maintFilter.to}" onchange="maintFilter.to=this.value;renderMaintenance()"></div>
        <div class="field" style="flex:1;min-width:180px;"><label>Search</label><input type="text" placeholder="Search item/work..." value="${escHtml(maintFilter.q)}" oninput="maintFilter.q=this.value;renderMaintenance()"></div>
      </div>
      <div class="table-wrap">
      <table>
        <thead><tr><th>Date</th><th>Category</th><th>Item / Work</th><th>Vendor</th><th>Qty</th><th>Rate</th><th>Total</th><th>Status</th><th>Approved By</th>${isAdmin()?'<th>Actions</th>':''}</tr></thead>
        <tbody>${maintenanceRows()}</tbody>
      </table>
      </div>
    </div>
  `;
}
function maintenanceRows(){
  let list = [...DB.maintenance].sort((a,b)=>new Date(b.date)-new Date(a.date)).filter(r=>{
    if(maintFilter.category && r.category!==maintFilter.category) return false;
    if(maintFilter.status && r.status!==maintFilter.status) return false;
    if(maintFilter.from && r.date < maintFilter.from) return false;
    if(maintFilter.to && r.date > maintFilter.to) return false;
    if(maintFilter.q && !r.itemName.toLowerCase().includes(maintFilter.q.toLowerCase())) return false;
    return true;
  });
  if(list.length===0) return `<tr><td colspan="10">${emptyState("No maintenance records found.")}</td></tr>`;
  return list.map(r=>`
    <tr>
      <td>${fmtDate(r.date)}</td>
      <td><span class="badge badge-hh">${escHtml(r.category)}</span></td>
      <td><b>${escHtml(r.itemName)}</b></td>
      <td>${escHtml(r.vendor||'-')}</td>
      <td class="mono">${r.qty}</td>
      <td class="mono">${fmtMoney(r.rate)}</td>
      <td class="mono"><b>${fmtMoney(r.total)}</b></td>
      <td>${r.status==='Completed'?'<span class="badge badge-ok">Completed</span>':'<span class="badge badge-warn">Pending</span>'}</td>
      <td>${escHtml(r.approvedBy||'-')}</td>
      ${isAdmin()?`<td class="row-actions">
        <button class="icon-btn" onclick="openMaintenanceForm('${r.id}')">${ICONS.edit}</button>
        <button class="icon-btn" onclick="deleteMaintenance('${r.id}')">${ICONS.trash}</button>
      </td>`:''}
    </tr>`).join("");
}
function openMaintenanceForm(id){
  const row = id ? DB.maintenance.find(r=>r.id===id) : null;
  openModal(`
    <div class="modal-head"><div class="modal-title">${row?'Edit Maintenance Entry':'New Maintenance Entry'}</div><button class="modal-close" onclick="closeModal()">&times;</button></div>
    <div class="form-grid" style="margin-bottom:14px;">
      <div class="field"><label>Date</label><input type="date" id="m_date" value="${row?row.date:todayStr()}"></div>
      <div class="field"><label>Category</label>
        <select id="m_category">${MAINT_CATEGORIES.map(c=>`<option value="${c}" ${row&&row.category===c?'selected':''}>${c}</option>`).join("")}</select>
      </div>
      <div class="field"><label>Status</label>
        <select id="m_status">
          <option value="Completed" ${!row||row.status==='Completed'?'selected':''}>Completed</option>
          <option value="Pending" ${row&&row.status==='Pending'?'selected':''}>Pending</option>
        </select>
      </div>
    </div>
    <div class="field" style="margin-bottom:14px;"><label>Item / Work Description</label>
      <input type="text" id="m_itemName" value="${row?escHtml(row.itemName):''}" placeholder="e.g. AC gas refill, generator servicing, plumbing repair"></div>
    <div class="form-grid" style="margin-bottom:6px;">
      <div class="field"><label>Qty</label><input type="number" id="m_qty" value="${row?row.qty:1}" min="1" oninput="calcMaintTotal()"></div>
      <div class="field"><label>Rate (per unit)</label><input type="number" id="m_rate" value="${row?row.rate:''}" min="0" oninput="calcMaintTotal()"></div>
      <div class="field"><label>Total Amount</label><input type="text" id="m_total" value="${row?fmtMoney(row.total):'Rs 0'}" disabled></div>
    </div>
    <div class="form-grid" style="margin:10px 0 14px;">
      <div class="field"><label>Vendor / Contractor</label><input type="text" id="m_vendor" value="${row?escHtml(row.vendor||''):''}"></div>
      <div class="field"><label>Invoice / Receipt No.</label><input type="text" id="m_invoice" value="${row?escHtml(row.invoiceNo||''):''}"></div>
      <div class="field"><label>Approved By</label><input type="text" id="m_approved" value="${row?escHtml(row.approvedBy||''):CURRENT_USER.name}"></div>
    </div>
    <div class="field" style="margin-bottom:14px;"><label>Next Due Date (for recurring maintenance, optional)</label><input type="date" id="m_nextDue" value="${row?row.nextDue||'':''}"></div>
    <div class="field" style="margin-bottom:14px;"><label>Remarks</label><input type="text" id="m_remarks" value="${row?escHtml(row.remarks||''):''}"></div>
    <div class="form-actions">
      <button class="btn btn-gold btn-sm" onclick="saveMaintenance('${id||''}')">Save Entry</button>
      <button class="btn btn-ghost btn-sm" onclick="closeModal()">Cancel</button>
    </div>
  `);
  calcMaintTotal();
}
function calcMaintTotal(){
  const qty = Number(document.getElementById("m_qty").value)||0;
  const rate = Number(document.getElementById("m_rate").value)||0;
  document.getElementById("m_total").value = fmtMoney(qty*rate);
}
function saveMaintenance(id){
  const itemName = document.getElementById("m_itemName").value.trim();
  if(!itemName){ toast("Item / work description is required", true); return; }
  const qty = Number(document.getElementById("m_qty").value)||0;
  if(qty<=0){ toast("Qty must be greater than 0", true); return; }
  const rate = Number(document.getElementById("m_rate").value)||0;

  const data = {
    date: document.getElementById("m_date").value || todayStr(),
    category: document.getElementById("m_category").value,
    status: document.getElementById("m_status").value,
    itemName,
    qty, rate,
    total: qty*rate,
    vendor: document.getElementById("m_vendor").value.trim(),
    invoiceNo: document.getElementById("m_invoice").value.trim(),
    approvedBy: document.getElementById("m_approved").value.trim(),
    nextDue: document.getElementById("m_nextDue").value,
    remarks: document.getElementById("m_remarks").value.trim(),
    enteredBy: CURRENT_USER.name
  };
  if(id){
    const row = DB.maintenance.find(r=>r.id===id);
    Object.assign(row, data);
    toast("Maintenance entry updated");
  } else {
    uid("maintenance");
    DB.maintenance.push({ id:"mnt_"+Date.now(), ...data });
    toast("Maintenance entry saved");
  }
  saveDB(DB);
  closeModal();
  renderMaintenance();
}
function deleteMaintenance(id){
  if(!confirm("Delete this maintenance entry?")) return;
  const row = DB.maintenance.find(r=>r.id===id);
  const logId = row ? logDeletion("maintenance", row) : null;
  DB.maintenance = DB.maintenance.filter(r=>r.id!==id);
  saveDB(DB);
  toast("Entry deleted", false, logId ? undoMultiple([logId]) : null);
  renderMaintenance();
}

/* ============================================================
   FINANCE — purchasing spend across time periods, with trends
   and comparisons. Read-only view, built from Inward records.
   ============================================================ */
function sumPurchases(rows){ return rows.reduce((s,r)=>s+Number(r.total||0),0); }
function purchasesInDateRange(fromStr, toStr){
  return DB.incoming.filter(r=>r.sourceType==="Purchasing" && r.date>=fromStr && r.date<=toStr);
}
function dateNDaysAgo(n){
  const d = new Date(); d.setDate(d.getDate()-n);
  return d.toISOString().slice(0,10);
}
function pctChange(current, previous){
  if(previous<=0) return current>0 ? 100 : 0;
  return Math.round(((current-previous)/previous)*100);
}
function trendBadge(pct){
  if(pct>0) return `<span style="color:var(--ok);">▲ ${pct}%</span>`;
  if(pct<0) return `<span style="color:var(--danger);">▼ ${Math.abs(pct)}%</span>`;
  return `<span style="color:var(--ink-faint);">— 0%</span>`;
}

function renderFinance(){
  const main = document.getElementById("mainContent");
  const today = todayStr();

  // Today vs yesterday
  const todayTotal = sumPurchases(purchasesInDateRange(today, today));
  const yesterday = dateNDaysAgo(1);
  const yesterdayTotal = sumPurchases(purchasesInDateRange(yesterday, yesterday));

  // This week (rolling last 7 days) vs previous 7 days
  const weekStart = dateNDaysAgo(6);
  const weekTotal = sumPurchases(purchasesInDateRange(weekStart, today));
  const prevWeekEnd = dateNDaysAgo(7);
  const prevWeekStart = dateNDaysAgo(13);
  const prevWeekTotal = sumPurchases(purchasesInDateRange(prevWeekStart, prevWeekEnd));

  // This month vs last month
  const monthStart = today.slice(0,8)+"01";
  const monthTotal = sumPurchases(purchasesInDateRange(monthStart, today));
  const lastMonthDate = new Date(); lastMonthDate.setDate(1); lastMonthDate.setMonth(lastMonthDate.getMonth()-1);
  const lastMonthStart = lastMonthDate.toISOString().slice(0,8)+"01";
  const lastMonthEndDate = new Date(lastMonthDate.getFullYear(), lastMonthDate.getMonth()+1, 0);
  const lastMonthEnd = lastMonthEndDate.toISOString().slice(0,10);
  const lastMonthTotal = sumPurchases(purchasesInDateRange(lastMonthStart, lastMonthEnd));

  // This year vs last year
  const yearStart = today.slice(0,4)+"-01-01";
  const yearTotal = sumPurchases(purchasesInDateRange(yearStart, today));
  const lastYear = String(Number(today.slice(0,4))-1);
  const lastYearTotal = sumPurchases(purchasesInDateRange(lastYear+"-01-01", lastYear+"-12-31"));

  // Daily trend, last 14 days
  const dailyTrend = [];
  for(let i=13;i>=0;i--){
    const d = dateNDaysAgo(i);
    dailyTrend.push({ label: d.slice(8,10)+"/"+d.slice(5,7), total: sumPurchases(purchasesInDateRange(d,d)) });
  }
  const maxDaily = Math.max(1, ...dailyTrend.map(d=>d.total));

  // Monthly trend, last 12 months
  const monthlyTrend = [];
  for(let i=11;i>=0;i--){
    const d = new Date(); d.setDate(1); d.setMonth(d.getMonth()-i);
    const mStart = d.toISOString().slice(0,8)+"01";
    const mEndDate = new Date(d.getFullYear(), d.getMonth()+1, 0);
    const mEnd = mEndDate.toISOString().slice(0,10);
    monthlyTrend.push({ label: d.toLocaleDateString("en-GB",{month:"short"}), total: sumPurchases(purchasesInDateRange(mStart,mEnd)) });
  }
  const maxMonthly = Math.max(1, ...monthlyTrend.map(m=>m.total));

  // Category breakdown, this month
  const monthRows = purchasesInDateRange(monthStart, today);
  const catSpend = { household:0, stationery:0, dietfood:0, diapers:0 };
  monthRows.forEach(r=>{ const item = getItem(r.itemId); if(item) catSpend[item.category] += Number(r.total||0); });

  // Top vendors this month
  const vendorSpend = {};
  monthRows.forEach(r=>{ const v = r.donorVendor||"Unknown"; vendorSpend[v] = (vendorSpend[v]||0) + Number(r.total||0); });
  const topVendors = Object.entries(vendorSpend).sort((a,b)=>b[1]-a[1]).slice(0,5);

  main.innerHTML = `
    ${topbarHtml("Finance","Purchasing spend across time periods")}
    <div class="grid grid-4" style="margin-bottom:10px;">
      ${statCard("Today","bar-hh",fmtMoney(todayTotal),"")}
      ${statCard("This Week","bar-st",fmtMoney(weekTotal),"")}
      ${statCard("This Month","bar-df",fmtMoney(monthTotal),"")}
      ${statCard("This Year","bar-dp",fmtMoney(yearTotal),"")}
    </div>
    <div class="grid grid-4" style="margin-bottom:20px;">
      <div class="text-dim" style="font-size:12px;">vs yesterday: ${trendBadge(pctChange(todayTotal,yesterdayTotal))}</div>
      <div class="text-dim" style="font-size:12px;">vs previous week: ${trendBadge(pctChange(weekTotal,prevWeekTotal))}</div>
      <div class="text-dim" style="font-size:12px;">vs last month: ${trendBadge(pctChange(monthTotal,lastMonthTotal))}</div>
      <div class="text-dim" style="font-size:12px;">vs last year: ${trendBadge(pctChange(yearTotal,lastYearTotal))}</div>
    </div>

    <div class="panel">
      <div class="panel-head"><div class="panel-title">Daily Purchasing — Last 14 Days</div></div>
      <div style="display:flex;align-items:flex-end;gap:6px;height:140px;padding:10px 4px 0;">
        ${dailyTrend.map(d=>`
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;" title="${d.label}: ${fmtMoney(d.total)}">
            <div style="width:100%;max-width:26px;background:linear-gradient(180deg,var(--gold-400),var(--gold-500));border-radius:4px 4px 0 0;height:${Math.max(3,(d.total/maxDaily)*100)}%;"></div>
            <div style="font-size:9.5px;color:var(--ink-faint);margin-top:6px;white-space:nowrap;">${d.label}</div>
          </div>`).join("")}
      </div>
    </div>

    <div class="panel">
      <div class="panel-head"><div class="panel-title">Monthly Purchasing — Last 12 Months</div></div>
      <div style="display:flex;align-items:flex-end;gap:8px;height:140px;padding:10px 4px 0;">
        ${monthlyTrend.map(m=>`
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;" title="${m.label}: ${fmtMoney(m.total)}">
            <div style="width:100%;max-width:34px;background:linear-gradient(180deg,var(--purple-500),var(--purple-600));border-radius:4px 4px 0 0;height:${Math.max(3,(m.total/maxMonthly)*100)}%;"></div>
            <div style="font-size:10px;color:var(--ink-faint);margin-top:6px;">${m.label}</div>
          </div>`).join("")}
      </div>
    </div>

    <div class="grid grid-2">
      <div class="panel">
        <div class="panel-head"><div class="panel-title">This Month — By Category</div></div>
        ${Object.values(catSpend).every(v=>v===0) ? emptyState("No purchases recorded this month.") :
          Object.entries(catSpend).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]).map(([cat,amt])=>`
          <div class="alert-item">
            <div class="alert-left"><span class="badge ${CATS[cat].badge}">${CATS[cat].label}</span></div>
            <div class="mono"><b>${fmtMoney(amt)}</b></div>
          </div>`).join("")}
      </div>
      <div class="panel">
        <div class="panel-head"><div class="panel-title">Top Vendors This Month</div></div>
        ${topVendors.length===0 ? emptyState("No purchases recorded this month.") :
          topVendors.map(([vendor,amt])=>`
          <div class="alert-item">
            <div class="alert-left">${escHtml(vendor)}</div>
            <div class="mono"><b>${fmtMoney(amt)}</b></div>
          </div>`).join("")}
      </div>
    </div>
  `;
}

/* ============================================================
   REPORTS
   ============================================================ */
let reportTab = "daily";
let reportRange = { from: todayStr(), to: todayStr() };
function renderReports(){
  const main = document.getElementById("mainContent");
  main.innerHTML = `
    ${topbarHtml("Reports","Generate and export store records")}
    <div class="panel">
      <div class="filter-bar">
        <div class="field"><label>Report Type</label>
          <select onchange="reportTab=this.value;renderReports()">
            <option value="masteraudit" ${reportTab==='masteraudit'?'selected':''}>★ Master Audit Report (Full)</option>
            <option value="financereport" ${reportTab==='financereport'?'selected':''}>Finance Report (Purchasing Trends)</option>
            <option value="daily" ${reportTab==='daily'?'selected':''}>Daily Entry Report</option>
            <option value="consumption" ${reportTab==='consumption'?'selected':''}>Monthly Consumption (by Department)</option>
            <option value="donation" ${reportTab==='donation'?'selected':''}>Donation Report</option>
            <option value="purchasing" ${reportTab==='purchasing'?'selected':''}>Purchasing Report</option>
            <option value="expiry" ${reportTab==='expiry'?'selected':''}>Expired / Near-Expiry Report</option>
            <option value="scrapreport" ${reportTab==='scrapreport'?'selected':''}>Scrap / Wastage Report</option>
            <option value="maintreport" ${reportTab==='maintreport'?'selected':''}>Maintenance Report</option>
            <option value="stockregister" ${reportTab==='stockregister'?'selected':''}>Full Stock Register</option>
            <option value="diaperreport" ${reportTab==='diaperreport'?'selected':''}>Diaper Issue Report (by Size)</option>
          </select>
        </div>
        <div class="field"><label>From</label><input type="date" value="${reportRange.from}" onchange="reportRange.from=this.value;renderReports()"></div>
        <div class="field"><label>To</label><input type="date" value="${reportRange.to}" onchange="reportRange.to=this.value;renderReports()"></div>
        <button class="btn btn-ghost btn-sm" onclick="exportReport()">${ICONS.download} Export CSV</button>
        <button class="btn btn-ghost btn-sm" onclick="window.print()">Print</button>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
        <button class="btn btn-ghost btn-sm" onclick="setReportRangePreset('today')">Today</button>
        <button class="btn btn-ghost btn-sm" onclick="setReportRangePreset('week')">This Week</button>
        <button class="btn btn-ghost btn-sm" onclick="setReportRangePreset('month')">This Month</button>
        <button class="btn btn-ghost btn-sm" onclick="setReportRangePreset('year')">This Year</button>
        <button class="btn btn-ghost btn-sm" onclick="setReportRangePreset('last7')">Last 7 Days</button>
        <button class="btn btn-ghost btn-sm" onclick="setReportRangePreset('last30')">Last 30 Days</button>
        <button class="btn btn-ghost btn-sm" onclick="setReportRangePreset('all')">All Time</button>
      </div>
      <div id="reportBody"></div>
    </div>
  `;
  document.getElementById("reportBody").innerHTML = buildReport();
}
function setReportRangePreset(preset){
  const today = todayStr();
  if(preset==="today"){ reportRange.from = today; reportRange.to = today; }
  else if(preset==="week"){ reportRange.from = dateNDaysAgo(6); reportRange.to = today; }
  else if(preset==="month"){ reportRange.from = today.slice(0,8)+"01"; reportRange.to = today; }
  else if(preset==="year"){ reportRange.from = today.slice(0,4)+"-01-01"; reportRange.to = today; }
  else if(preset==="last7"){ reportRange.from = dateNDaysAgo(6); reportRange.to = today; }
  else if(preset==="last30"){ reportRange.from = dateNDaysAgo(29); reportRange.to = today; }
  else if(preset==="all"){ reportRange.from = "2020-01-01"; reportRange.to = today; }
  renderReports();
}
function inRange(dateStr){
  return (!reportRange.from || dateStr>=reportRange.from) && (!reportRange.to || dateStr<=reportRange.to);
}
function buildReport(){
  if(reportTab==="masteraudit"){
    return buildMasterAuditReport();
  }
  if(reportTab==="financereport"){
    return buildFinanceReport();
  }
  if(reportTab==="daily"){
    const inc = DB.incoming.filter(r=>inRange(r.date));
    const out = DB.outgoing.filter(r=>inRange(r.date));
    return `
      <div class="panel-title" style="margin-bottom:10px;">Inward (${inc.length})</div>
      <div class="table-wrap"><table><thead><tr><th>Date</th><th>Item</th><th>Source</th><th>Qty</th><th>Total</th></tr></thead>
      <tbody>${inc.length?inc.map(r=>`<tr><td>${fmtDate(r.date)}</td><td>${escHtml(getItem(r.itemId)?.name||'-')}</td><td>${r.sourceType}</td><td>${r.qty}</td><td>${fmtMoney(r.total)}</td></tr>`).join(""):`<tr><td colspan="5">${emptyState("No records")}</td></tr>`}</tbody></table></div>
      <div class="panel-title" style="margin:18px 0 10px;">Outward (${out.length})</div>
      <div class="table-wrap"><table><thead><tr><th>Date</th><th>Item</th><th>Qty</th><th>Department</th><th>Receiver</th></tr></thead>
      <tbody>${out.length?out.map(r=>`<tr><td>${fmtDate(r.date)}</td><td>${escHtml(getItem(r.itemId)?.name||'-')}</td><td>${r.qty}</td><td>${escHtml(r.department)}</td><td>${escHtml(r.receiverName)}</td></tr>`).join(""):`<tr><td colspan="5">${emptyState("No records")}</td></tr>`}</tbody></table></div>
    `;
  }
  if(reportTab==="consumption"){
    const out = DB.outgoing.filter(r=>inRange(r.date));
    const byDept = {};
    out.forEach(r=>{
      byDept[r.department] = byDept[r.department] || {};
      const item = getItem(r.itemId);
      const key = item?item.name:'Unknown';
      byDept[r.department][key] = (byDept[r.department][key]||0) + Number(r.qty);
    });
    const depts = Object.keys(byDept);
    if(!depts.length) return emptyState("No consumption records in this range.");
    return depts.map(d=>`
      <div class="panel-title" style="margin:14px 0 8px;">${escHtml(d)}</div>
      <div class="table-wrap"><table><thead><tr><th>Item</th><th>Total Qty Issued</th></tr></thead>
      <tbody>${Object.entries(byDept[d]).map(([n,q])=>`<tr><td>${escHtml(n)}</td><td class="mono">${q}</td></tr>`).join("")}</tbody></table></div>
    `).join("");
  }
  if(reportTab==="donation"){
    const rows = DB.incoming.filter(r=>r.sourceType==="Donation" && inRange(r.date));
    return `<div class="table-wrap"><table><thead><tr><th>Date</th><th>Item</th><th>Donor</th><th>Qty</th></tr></thead>
      <tbody>${rows.length?rows.map(r=>`<tr><td>${fmtDate(r.date)}</td><td>${escHtml(getItem(r.itemId)?.name||'-')}</td><td>${escHtml(r.donorVendor||'-')}</td><td>${r.qty}</td></tr>`).join(""):`<tr><td colspan="4">${emptyState("No donations in this range")}</td></tr>`}</tbody></table></div>`;
  }
  if(reportTab==="purchasing"){
    const rows = DB.incoming.filter(r=>r.sourceType==="Purchasing" && inRange(r.date));
    const total = rows.reduce((s,r)=>s+Number(r.total||0),0);
    return `<div style="margin-bottom:10px;color:var(--gold-400);font-weight:600;">Total Spend: ${fmtMoney(total)}</div>
      <div class="table-wrap"><table><thead><tr><th>Date</th><th>Item</th><th>Vendor</th><th>Qty</th><th>Rate</th><th>Total</th><th>Invoice #</th></tr></thead>
      <tbody>${rows.length?rows.map(r=>`<tr><td>${fmtDate(r.date)}</td><td>${escHtml(getItem(r.itemId)?.name||'-')}</td><td>${escHtml(r.donorVendor||'-')}</td><td>${r.qty}</td><td>${fmtMoney(r.rate)}</td><td>${fmtMoney(r.total)}</td><td>${escHtml(r.invoiceNo||'-')}</td></tr>`).join(""):`<tr><td colspan="7">${emptyState("No purchases in this range")}</td></tr>`}</tbody></table></div>`;
  }
  if(reportTab==="expiry"){
    const rows = DB.incoming.filter(r=>r.expiryDate).sort((a,b)=>new Date(a.expiryDate)-new Date(b.expiryDate));
    return `<div class="table-wrap"><table><thead><tr><th>Item</th><th>Batch</th><th>Expiry Date</th><th>Status</th></tr></thead>
      <tbody>${rows.length?rows.map(r=>{
        const d = daysUntil(r.expiryDate);
        const status = d<0?'<span class="badge badge-danger">Expired</span>':d<=30?'<span class="badge badge-warn">Expiring Soon</span>':'<span class="badge badge-ok">OK</span>';
        return `<tr><td>${escHtml(getItem(r.itemId)?.name||'-')}</td><td>${escHtml(r.batchNo||'-')}</td><td>${fmtDate(r.expiryDate)}</td><td>${status}</td></tr>`;
      }).join(""):`<tr><td colspan="4">${emptyState("No items with expiry dates")}</td></tr>`}</tbody></table></div>`;
  }
  if(reportTab==="scrapreport"){
    const rows = DB.scrap.filter(r=>inRange(r.date)).sort((a,b)=>new Date(b.date)-new Date(a.date));
    if(!rows.length) return emptyState("No scrap/wastage records in this date range.");
    const byReason = {};
    let totalSaleAmount = 0;
    rows.forEach(r=>{ byReason[r.reason] = (byReason[r.reason]||0) + Number(r.qty); if(r.sold) totalSaleAmount += Number(r.sellAmount||0); });
    return `
      <div style="margin-bottom:14px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
        ${Object.entries(byReason).map(([reason,qty])=>`<span class="badge badge-danger">${escHtml(reason)}: ${qty}</span>`).join("")}
        <span class="badge badge-ok">Total from Scrap Sales: ${fmtMoney(totalSaleAmount)}</span>
      </div>
      <div class="table-wrap"><table><thead><tr><th>Date</th><th>Time</th><th>Item</th><th>Category</th><th>Qty</th><th>Reason</th><th>Sold</th><th>Amount</th><th>Buyer</th><th>Approved By</th><th>Remarks</th></tr></thead>
      <tbody>${rows.map(r=>{
        const item = getItem(r.itemId);
        const name = item ? item.name : (r.description || "-");
        return `<tr><td>${fmtDate(r.date)}</td><td>${escHtml(r.time||'-')}</td><td>${escHtml(name)}</td><td>${item?CATS[item.category].label:'<span class="text-dim">Not tracked</span>'}</td><td class="mono">${r.qty}</td><td><span class="badge badge-danger">${escHtml(r.reason)}</span></td><td>${r.sold?'Yes':'No'}</td><td class="mono">${r.sold?fmtMoney(r.sellAmount):'-'}</td><td>${escHtml(r.buyerName||'-')}</td><td>${escHtml(r.approvedBy||'-')}</td><td>${escHtml(r.remarks||'-')}</td></tr>`;
      }).join("")}</tbody></table></div>`;
  }
  if(reportTab==="maintreport"){
    const rows = DB.maintenance.filter(r=>inRange(r.date)).sort((a,b)=>new Date(b.date)-new Date(a.date));
    if(!rows.length) return emptyState("No maintenance records in this date range.");
    const byCategory = {};
    let totalSpend = 0;
    rows.forEach(r=>{ byCategory[r.category] = (byCategory[r.category]||0) + Number(r.total); totalSpend += Number(r.total); });
    const pendingCount = rows.filter(r=>r.status==="Pending").length;
    return `
      <div style="margin-bottom:14px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
        ${Object.entries(byCategory).map(([cat,amt])=>`<span class="badge badge-hh">${escHtml(cat)}: ${fmtMoney(amt)}</span>`).join("")}
        <span class="badge badge-ok">Total Spend: ${fmtMoney(totalSpend)}</span>
        ${pendingCount>0?`<span class="badge badge-warn">${pendingCount} Pending</span>`:''}
      </div>
      <div class="table-wrap"><table><thead><tr><th>Date</th><th>Category</th><th>Item / Work</th><th>Vendor</th><th>Qty</th><th>Rate</th><th>Total</th><th>Status</th><th>Approved By</th></tr></thead>
      <tbody>${rows.map(r=>`<tr><td>${fmtDate(r.date)}</td><td><span class="badge badge-hh">${escHtml(r.category)}</span></td><td>${escHtml(r.itemName)}</td><td>${escHtml(r.vendor||'-')}</td><td class="mono">${r.qty}</td><td class="mono">${fmtMoney(r.rate)}</td><td class="mono"><b>${fmtMoney(r.total)}</b></td><td>${r.status==='Completed'?'<span class="badge badge-ok">Completed</span>':'<span class="badge badge-warn">Pending</span>'}</td><td>${escHtml(r.approvedBy||'-')}</td></tr>`).join("")}</tbody></table></div>`;
  }
  if(reportTab==="stockregister"){
    if(!DB.items.length) return emptyState("No items in Item Master yet.");
    return `<div class="table-wrap"><table><thead><tr><th>Code</th><th>Item</th><th>Category</th><th>Unit</th><th>Current Stock</th><th>Reorder Level</th></tr></thead>
      <tbody>${DB.items.map(it=>`<tr><td class="mono">${itemCode(it.category,it.seq)}</td><td>${escHtml(it.name)}</td><td>${CATS[it.category].label}</td><td>${escHtml(it.unit)}</td><td class="mono">${stockOf(it.id)}</td><td class="mono">${it.reorderLevel}</td></tr>`).join("")}</tbody></table></div>`;
  }
  if(reportTab==="diaperreport"){
    return buildDiaperReportTable();
  }
  return "";
}
function buildMasterAuditReport(){
  const purchases = DB.incoming.filter(r=>r.sourceType==="Purchasing" && inRange(r.date));
  const donations = DB.incoming.filter(r=>r.sourceType==="Donation" && inRange(r.date));
  const totalPurchaseAmt = purchases.reduce((s,r)=>s+Number(r.total||0),0);
  const totalDonationQty = donations.reduce((s,r)=>s+Number(r.qty||0),0);
  const scrapInRange = DB.scrap.filter(r=>inRange(r.date));
  const totalScrapIncome = scrapInRange.filter(r=>r.sold).reduce((s,r)=>s+Number(r.sellAmount||0),0);
  const maintInRange = DB.maintenance.filter(r=>inRange(r.date));
  const totalMaintSpend = maintInRange.reduce((s,r)=>s+Number(r.total||0),0);
  const netOutflow = totalPurchaseAmt + totalMaintSpend - totalScrapIncome;

  const outInRange = DB.outgoing.filter(r=>inRange(r.date));
  const deletionsInRange = DB.deletionLog.filter(l=>{
    const d = l.deletedAt.slice(0,10);
    return inRange(d);
  });
  const delCounts = { item:0, incoming:0, outgoing:0, scrap:0, maintenance:0 };
  deletionsInRange.forEach(l=>{ if(delCounts[l.type]!==undefined) delCounts[l.type]++; });

  const catStock = { household:0, stationery:0, dietfood:0, diapers:0 };
  DB.items.forEach(it=>{ catStock[it.category] += stockOf(it.id); });

  return `
    <div style="margin-bottom:22px;padding:14px 16px;background:var(--purple-950);border-radius:8px;border:1px solid var(--line);">
      <div style="font-size:13px;color:var(--ink-dim);">Report Period: <b style="color:var(--gold-400);">${fmtDate(reportRange.from)} — ${fmtDate(reportRange.to)}</b></div>
      <div style="font-size:12px;color:var(--ink-faint);margin-top:4px;">Generated: ${new Date().toLocaleString("en-GB")} · By: ${escHtml(CURRENT_USER.name)} (${CURRENT_USER.role})</div>
    </div>

    <div class="panel-title" style="margin-bottom:12px;">1. Financial Summary</div>
    <div class="grid grid-4" style="margin-bottom:22px;">
      ${statCard("Total Purchases","bar-df",fmtMoney(totalPurchaseAmt),purchases.length+" purchase entries")}
      ${statCard("Donations Received","bar-hh",totalDonationQty,donations.length+" donation entries")}
      ${statCard("Scrap Sale Income","bar-st",fmtMoney(totalScrapIncome),scrapInRange.filter(r=>r.sold).length+" items sold")}
      ${statCard("Maintenance Spend","bar-dp",fmtMoney(totalMaintSpend),maintInRange.length+" work orders")}
    </div>
    <div style="margin-bottom:22px;padding:14px 16px;background:rgba(212,175,55,0.08);border:1px solid var(--gold-500);border-radius:8px;">
      <span style="font-size:13.5px;color:var(--ink);">Net Cash Outflow (Purchases + Maintenance − Scrap Income): </span>
      <b style="color:var(--gold-400);font-size:16px;">${fmtMoney(netOutflow)}</b>
    </div>

    <div class="panel-title" style="margin-bottom:12px;">2. Current Stock Position (as of today, all categories)</div>
    <div class="grid grid-4" style="margin-bottom:22px;">
      ${statCard("Household","bar-hh",catStock.household,"units in store")}
      ${statCard("Stationery","bar-st",catStock.stationery,"units in store")}
      ${statCard("Diet & Food","bar-df",catStock.dietfood,"units in store")}
      ${statCard("Diapers","bar-dp",catStock.diapers,"units in store")}
    </div>

    <div class="panel-title" style="margin-bottom:12px;">3. Full Stock Reconciliation</div>
    <div class="table-wrap" style="margin-bottom:22px;"><table><thead><tr><th>Code</th><th>Item</th><th>Category</th><th>Total In</th><th>Total Out</th><th>Total Scrapped</th><th>Current Stock</th></tr></thead>
      <tbody>${DB.items.length?DB.items.map(it=>{
        const inn = DB.incoming.filter(r=>r.itemId===it.id).reduce((s,r)=>s+Number(r.qty),0);
        const out = DB.outgoing.filter(r=>r.itemId===it.id).reduce((s,r)=>s+Number(r.qty),0);
        const scr = DB.scrap.filter(r=>r.itemId===it.id).reduce((s,r)=>s+Number(r.qty),0);
        return `<tr><td class="mono">${itemCode(it.category,it.seq)}</td><td>${escHtml(it.name)}</td><td>${CATS[it.category].label}</td><td class="mono">${inn}</td><td class="mono">${out}</td><td class="mono">${scr}</td><td class="mono"><b>${stockOf(it.id)}</b></td></tr>`;
      }).join(""):`<tr><td colspan="7">${emptyState("No items in Item Master")}</td></tr>`}</tbody></table></div>

    <div class="panel-title" style="margin-bottom:12px;">4. Transactions in Period</div>
    <div class="grid grid-4" style="margin-bottom:22px;">
      ${statCard("Inward Entries","bar-hh",purchases.length+donations.length,"purchases + donations")}
      ${statCard("Outward Entries","bar-warn",outInRange.length,"issued to departments")}
      ${statCard("Scrap Entries","bar-df",scrapInRange.length,"written off")}
      ${statCard("Maintenance Entries","bar-dp",maintInRange.length,"work orders")}
    </div>

    <div class="panel-title" style="margin-bottom:12px;">5. Data Integrity — Record Deletions in Period</div>
    <div style="margin-bottom:10px;font-size:12.5px;color:var(--ink-dim);">This system logs every deletion for accountability. Counts below are for this period only.</div>
    <div class="grid grid-4" style="margin-bottom:10px;">
      ${statCard("Items Deleted","bar-hh",delCounts.item,"")}
      ${statCard("Inward Deleted","bar-st",delCounts.incoming,"")}
      ${statCard("Outward Deleted","bar-warn",delCounts.outgoing,"")}
      ${statCard("Scrap/Maint. Deleted","bar-dp",delCounts.scrap+delCounts.maintenance,"")}
    </div>
  `;
}
function buildFinanceReport(){
  const today = todayStr();
  const todayTotal = sumPurchases(purchasesInDateRange(today, today));
  const weekTotal = sumPurchases(purchasesInDateRange(dateNDaysAgo(6), today));
  const monthStart = today.slice(0,8)+"01";
  const monthTotal = sumPurchases(purchasesInDateRange(monthStart, today));
  const yearStart = today.slice(0,4)+"-01-01";
  const yearTotal = sumPurchases(purchasesInDateRange(yearStart, today));

  const rangeRows = purchasesInDateRange(reportRange.from, reportRange.to).sort((a,b)=>new Date(b.date)-new Date(a.date));
  const rangeTotal = sumPurchases(rangeRows);

  const catSpend = { household:0, stationery:0, dietfood:0, diapers:0 };
  rangeRows.forEach(r=>{ const item = getItem(r.itemId); if(item) catSpend[item.category] += Number(r.total||0); });
  const vendorSpend = {};
  rangeRows.forEach(r=>{ const v = r.donorVendor||"Unknown"; vendorSpend[v] = (vendorSpend[v]||0) + Number(r.total||0); });
  const topVendors = Object.entries(vendorSpend).sort((a,b)=>b[1]-a[1]).slice(0,5);

  return `
    <div class="grid grid-4" style="margin-bottom:20px;">
      ${statCard("Today","bar-hh",fmtMoney(todayTotal),"")}
      ${statCard("This Week","bar-st",fmtMoney(weekTotal),"")}
      ${statCard("This Month","bar-df",fmtMoney(monthTotal),"")}
      ${statCard("This Year","bar-dp",fmtMoney(yearTotal),"")}
    </div>
    <div style="margin-bottom:14px;padding:12px 16px;background:rgba(212,175,55,0.08);border:1px solid var(--gold-500);border-radius:8px;">
      Selected Range (${fmtDate(reportRange.from)} — ${fmtDate(reportRange.to)}): <b style="color:var(--gold-400);">${fmtMoney(rangeTotal)}</b> · ${rangeRows.length} purchase entries
    </div>
    <div class="grid grid-2" style="margin-bottom:20px;">
      <div class="panel">
        <div class="panel-title" style="margin-bottom:10px;">By Category (selected range)</div>
        ${Object.values(catSpend).every(v=>v===0) ? emptyState("No purchases in this range.") :
          Object.entries(catSpend).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]).map(([cat,amt])=>`
          <div class="alert-item"><div class="alert-left"><span class="badge ${CATS[cat].badge}">${CATS[cat].label}</span></div><div class="mono"><b>${fmtMoney(amt)}</b></div></div>`).join("")}
      </div>
      <div class="panel">
        <div class="panel-title" style="margin-bottom:10px;">Top Vendors (selected range)</div>
        ${topVendors.length===0 ? emptyState("No purchases in this range.") :
          topVendors.map(([vendor,amt])=>`
          <div class="alert-item"><div class="alert-left">${escHtml(vendor)}</div><div class="mono"><b>${fmtMoney(amt)}</b></div></div>`).join("")}
      </div>
    </div>
    <div class="panel-title" style="margin-bottom:10px;">Purchase Detail (selected range)</div>
    <div class="table-wrap"><table><thead><tr><th>Date</th><th>Item</th><th>Category</th><th>Vendor</th><th>Qty</th><th>Rate</th><th>Total</th></tr></thead>
    <tbody>${rangeRows.length?rangeRows.map(r=>{
      const item = getItem(r.itemId);
      return `<tr><td>${fmtDate(r.date)}</td><td>${item?escHtml(item.name):'-'}</td><td>${item?CATS[item.category].label:'-'}</td><td>${escHtml(r.donorVendor||'-')}</td><td class="mono">${r.qty}</td><td class="mono">${fmtMoney(r.rate)}</td><td class="mono">${fmtMoney(r.total)}</td></tr>`;
    }).join(""):`<tr><td colspan="7">${emptyState("No purchases in this range")}</td></tr>`}</tbody></table></div>
  `;
}
function diaperReportData(){
  const diaperItems = DB.items.filter(i=>i.category==="diapers");
  const rows = DB.outgoing.filter(r => inRange(r.date) && diaperItems.some(it=>it.id===r.itemId));
  const byDate = {};
  rows.forEach(r=>{
    const item = diaperItems.find(it=>it.id===r.itemId);
    const size = item ? item.name.replace("Diapers ","").trim() : "?";
    byDate[r.date] = byDate[r.date] || { JXL:0, M:0, XL:0 };
    if(byDate[r.date][size] !== undefined) byDate[r.date][size] += Number(r.qty);
  });
  return Object.keys(byDate).sort().reverse().map(date => ({
    date, ...byDate[date],
    total: byDate[date].JXL + byDate[date].M + byDate[date].XL
  }));
}
function diaperDetailData(){
  const diaperItems = DB.items.filter(i=>i.category==="diapers");
  const diaperItemIds = diaperItems.map(i=>i.id);
  const rows = DB.outgoing.filter(r => inRange(r.date) && diaperItemIds.includes(r.itemId) && r.purpose==="Diaper Issue - Dormitory");
  const groups = {};
  rows.forEach(r=>{
    const key = r.batchId || `${r.date}|${r.time||''}|${r.department}|${r.receiverName}`;
    if(!groups[key]) groups[key] = { date:r.date, time:r.time||'-', department:r.department, receiverName:r.receiverName, JXL:0, M:0, XL:0 };
    const item = diaperItems.find(it=>it.id===r.itemId);
    const size = item ? item.name.replace("Diapers ","").trim() : "";
    if(groups[key][size] !== undefined) groups[key][size] += Number(r.qty);
  });
  return Object.values(groups)
    .map(g => ({...g, total: g.JXL+g.M+g.XL}))
    .sort((a,b)=> (b.date+b.time).localeCompare(a.date+a.time));
}
function buildDiaperReportTable(){
  const data = diaperReportData();
  const detail = diaperDetailData();
  if(!data.length) return emptyState("No diaper issues recorded in this date range.");
  const grandTotal = data.reduce((s,d)=>s+d.total,0);
  return `
    <div style="margin-bottom:10px;color:var(--gold-400);font-weight:600;">Total Diapers Issued: ${grandTotal}</div>
    <div class="table-wrap"><table><thead><tr><th>Date</th><th>JXL Qty</th><th>M Qty</th><th>XL Qty</th><th>Total Qty</th></tr></thead>
    <tbody>${data.map(d=>`<tr><td>${fmtDate(d.date)}</td><td class="mono">${d.JXL}</td><td class="mono">${d.M}</td><td class="mono">${d.XL}</td><td class="mono"><b>${d.total}</b></td></tr>`).join("")}</tbody></table></div>
    <div class="panel-title" style="margin:22px 0 12px;">Detailed Log (by Room)</div>
    <div class="table-wrap"><table><thead><tr><th>Date</th><th>Time</th><th>Room</th><th>Caregiver</th><th>JXL</th><th>M</th><th>XL</th><th>Total</th></tr></thead>
    <tbody>${detail.map(g=>`<tr><td>${fmtDate(g.date)}</td><td>${escHtml(g.time)}</td><td>${escHtml(g.department)}</td><td>${escHtml(g.receiverName)}</td><td class="mono">${g.JXL||'-'}</td><td class="mono">${g.M||'-'}</td><td class="mono">${g.XL||'-'}</td><td class="mono"><b>${g.total}</b></td></tr>`).join("")}</tbody></table></div>`;
}
function exportReport(){
  let rows = [];
  if(reportTab==="masteraudit"){
    const purchases = DB.incoming.filter(r=>r.sourceType==="Purchasing" && inRange(r.date));
    const donations = DB.incoming.filter(r=>r.sourceType==="Donation" && inRange(r.date));
    const totalPurchaseAmt = purchases.reduce((s,r)=>s+Number(r.total||0),0);
    const scrapInRange = DB.scrap.filter(r=>inRange(r.date));
    const totalScrapIncome = scrapInRange.filter(r=>r.sold).reduce((s,r)=>s+Number(r.sellAmount||0),0);
    const maintInRange = DB.maintenance.filter(r=>inRange(r.date));
    const totalMaintSpend = maintInRange.reduce((s,r)=>s+Number(r.total||0),0);
    rows.push(["MASTER AUDIT REPORT"]);
    rows.push(["Period", fmtDate(reportRange.from), "to", fmtDate(reportRange.to)]);
    rows.push([]); rows.push(["FINANCIAL SUMMARY"]);
    rows.push(["Total Purchases (Rs)", totalPurchaseAmt]);
    rows.push(["Total Donations (Qty)", donations.reduce((s,r)=>s+Number(r.qty||0),0)]);
    rows.push(["Total Scrap Sale Income (Rs)", totalScrapIncome]);
    rows.push(["Total Maintenance Spend (Rs)", totalMaintSpend]);
    rows.push(["Net Cash Outflow (Rs)", totalPurchaseAmt + totalMaintSpend - totalScrapIncome]);
    rows.push([]); rows.push(["STOCK RECONCILIATION"]);
    rows.push(["Code","Item","Category","Total In","Total Out","Total Scrapped","Current Stock"]);
    DB.items.forEach(it=>{
      const inn = DB.incoming.filter(r=>r.itemId===it.id).reduce((s,r)=>s+Number(r.qty),0);
      const out = DB.outgoing.filter(r=>r.itemId===it.id).reduce((s,r)=>s+Number(r.qty),0);
      const scr = DB.scrap.filter(r=>r.itemId===it.id).reduce((s,r)=>s+Number(r.qty),0);
      rows.push([itemCode(it.category,it.seq), it.name, CATS[it.category].label, inn, out, scr, stockOf(it.id)]);
    });
    downloadCSV(`dus-store-master-audit-${todayStr()}.csv`, rows);
    toast("Master audit report exported");
    return;
  }
  if(reportTab==="financereport"){
    const today = todayStr();
    rows.push(["FINANCE REPORT"]);
    rows.push(["Today", fmtMoney(sumPurchases(purchasesInDateRange(today, today)))]);
    rows.push(["This Week", fmtMoney(sumPurchases(purchasesInDateRange(dateNDaysAgo(6), today)))]);
    rows.push(["This Month", fmtMoney(sumPurchases(purchasesInDateRange(today.slice(0,8)+"01", today)))]);
    rows.push(["This Year", fmtMoney(sumPurchases(purchasesInDateRange(today.slice(0,4)+"-01-01", today)))]);
    rows.push([]); rows.push(["PURCHASE DETAIL", fmtDate(reportRange.from), "to", fmtDate(reportRange.to)]);
    rows.push(["Date","Item","Category","Vendor","Qty","Rate","Total"]);
    purchasesInDateRange(reportRange.from, reportRange.to).forEach(r=>{
      const item = getItem(r.itemId);
      rows.push([r.date, item?item.name:'', item?CATS[item.category].label:'', r.donorVendor||'', r.qty, r.rate, r.total]);
    });
    downloadCSV(`dus-store-finance-report-${todayStr()}.csv`, rows);
    toast("Finance report exported");
    return;
  }
  if(reportTab==="daily"){
    rows.push(["INCOMING"]);
    rows.push(["Date","Item","Source","Donor/Vendor","Qty","Rate","Total"]);
    DB.incoming.filter(r=>inRange(r.date)).forEach(r=>rows.push([r.date,getItem(r.itemId)?.name||'',r.sourceType,r.donorVendor||'',r.qty,r.rate,r.total]));
    rows.push([]); rows.push(["OUTGOING"]);
    rows.push(["Date","Item","Qty","Department","Receiver","Approved By"]);
    DB.outgoing.filter(r=>inRange(r.date)).forEach(r=>rows.push([r.date,getItem(r.itemId)?.name||'',r.qty,r.department,r.receiverName,r.approvedBy||'']));
  } else if(reportTab==="stockregister"){
    rows.push(["Code","Item","Category","Unit","Current Stock","Reorder Level"]);
    DB.items.forEach(it=>rows.push([itemCode(it.category,it.seq),it.name,CATS[it.category].label,it.unit,stockOf(it.id),it.reorderLevel]));
  } else if(reportTab==="diaperreport"){
    rows.push(["SUMMARY BY DATE"]);
    rows.push(["Date","JXL Qty","M Qty","XL Qty","Total Qty"]);
    diaperReportData().forEach(d=>rows.push([d.date,d.JXL,d.M,d.XL,d.total]));
    rows.push([]); rows.push(["DETAILED LOG BY ROOM"]);
    rows.push(["Date","Time","Room","Caregiver","JXL","M","XL","Total"]);
    diaperDetailData().forEach(g=>rows.push([g.date,g.time,g.department,g.receiverName,g.JXL,g.M,g.XL,g.total]));
  } else if(reportTab==="donation"){
    rows.push(["Date","Item","Donor","Qty"]);
    DB.incoming.filter(r=>r.sourceType==="Donation"&&inRange(r.date)).forEach(r=>rows.push([r.date,getItem(r.itemId)?.name||'',r.donorVendor||'',r.qty]));
  } else if(reportTab==="purchasing"){
    rows.push(["Date","Item","Vendor","Qty","Rate","Total","Invoice #"]);
    DB.incoming.filter(r=>r.sourceType==="Purchasing"&&inRange(r.date)).forEach(r=>rows.push([r.date,getItem(r.itemId)?.name||'',r.donorVendor||'',r.qty,r.rate,r.total,r.invoiceNo||'']));
  } else if(reportTab==="expiry"){
    rows.push(["Item","Batch","Expiry Date"]);
    DB.incoming.filter(r=>r.expiryDate).forEach(r=>rows.push([getItem(r.itemId)?.name||'',r.batchNo||'',r.expiryDate]));
  } else if(reportTab==="scrapreport"){
    rows.push(["Date","Time","Item","Category","Qty","Reason","Sold","Amount","Buyer","Approved By","Remarks"]);
    DB.scrap.filter(r=>inRange(r.date)).forEach(r=>{
      const item = getItem(r.itemId);
      const name = item ? item.name : (r.description || "");
      rows.push([r.date, r.time||'', name, item?CATS[item.category].label:'', r.qty, r.reason, r.sold?'Yes':'No', r.sold?r.sellAmount:'', r.buyerName||'', r.approvedBy||'', r.remarks||'']);
    });
  } else if(reportTab==="maintreport"){
    rows.push(["Date","Category","Item/Work","Vendor","Qty","Rate","Total","Status","Approved By","Invoice #","Remarks"]);
    DB.maintenance.filter(r=>inRange(r.date)).forEach(r=>rows.push([r.date,r.category,r.itemName,r.vendor||'',r.qty,r.rate,r.total,r.status,r.approvedBy||'',r.invoiceNo||'',r.remarks||'']));
  } else if(reportTab==="consumption"){
    rows.push(["Department","Item","Total Qty Issued"]);
    const byDept={};
    DB.outgoing.filter(r=>inRange(r.date)).forEach(r=>{
      byDept[r.department]=byDept[r.department]||{};
      const n=getItem(r.itemId)?.name||'Unknown';
      byDept[r.department][n]=(byDept[r.department][n]||0)+Number(r.qty);
    });
    Object.entries(byDept).forEach(([d,items])=>Object.entries(items).forEach(([n,q])=>rows.push([d,n,q])));
  }
  downloadCSV(`dus-store-${reportTab}-${todayStr()}.csv`, rows);
  toast("Report exported");
}

/* ============================================================
   DEPARTMENTS
   ============================================================ */
let deptFilter = { q: "" };
function renderDepartments(){
  const main = document.getElementById("mainContent");
  main.innerHTML = `
    ${topbarHtml("Departments","Head Office, other homes, and partner institutions", isAdmin()?`<button class="btn btn-gold btn-sm" onclick="addLocationGroup()">${ICONS.plus}Add Location</button>`:"")}
    ${DB.locationGroups.map((g, gi) => `
      <div class="panel">
        <div class="panel-head">
          <div class="panel-title">${escHtml(g.name)} <span class="count">${g.departments.length}</span></div>
          ${isAdmin()?`<div style="display:flex;gap:8px;">
            <button class="btn btn-ghost btn-sm" onclick="addSubDepartment(${gi})">${ICONS.plus}Add Item</button>
            <button class="icon-btn" onclick="removeLocationGroup(${gi})">${ICONS.trash}</button>
          </div>`:''}
        </div>
        ${g.departments.length===0 ? emptyState("No departments listed here yet.") : `
        <div class="table-wrap"><table><thead><tr><th>Name</th>${isAdmin()?'<th>Actions</th>':''}</tr></thead>
        <tbody>
          ${g.departments.map((d,di)=>`<tr><td>${escHtml(d)}</td>${isAdmin()?`<td class="row-actions"><button class="icon-btn" onclick="removeSubDepartment(${gi},${di})">${ICONS.trash}</button></td>`:''}</tr>`).join("")}
        </tbody></table></div>`}
        ${g.allowCustom ? `<p class="text-dim" style="font-size:12px;margin-top:10px;">Staff can also type a new name directly at the point of issue (e.g. a new convent or partner not listed here).</p>` : ""}
      </div>
    `).join("")}
  `;
}
function addLocationGroup(){
  const name = prompt("Enter new location/home name (e.g. a new branch or home):");
  if(!name || !name.trim()) return;
  DB.locationGroups.push({ name: name.trim(), departments: [], allowCustom: false });
  saveDB(DB);
  toast("Location added");
  renderDepartments();
}
function removeLocationGroup(gi){
  if(!confirm(`Remove "${DB.locationGroups[gi].name}" and all its departments?`)) return;
  DB.locationGroups.splice(gi,1);
  saveDB(DB);
  toast("Location removed");
  renderDepartments();
}
function addSubDepartment(gi){
  const name = prompt(`Enter department/institution name to add under "${DB.locationGroups[gi].name}":`);
  if(!name || !name.trim()) return;
  DB.locationGroups[gi].departments.push(name.trim());
  saveDB(DB);
  toast("Added");
  renderDepartments();
}
function removeSubDepartment(gi, di){
  if(!confirm("Remove this entry?")) return;
  DB.locationGroups[gi].departments.splice(di,1);
  saveDB(DB);
  toast("Removed");
  renderDepartments();
}

/* ============================================================
   SETTINGS
   ============================================================ */
function renderSettings(){
  const main = document.getElementById("mainContent");
  main.innerHTML = `
    ${topbarHtml("Settings","Backup, restore, and account management")}
    <div class="grid grid-2">
      <div class="panel">
        <div class="panel-title" style="margin-bottom:14px;">Data Backup</div>
        <p class="text-dim" style="font-size:13px;margin-bottom:16px;line-height:1.6;">
          Export a full backup of your store data (items, incoming, outgoing, departments).
          Save this file safely — you can restore it anytime, or move it to another computer.
        </p>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button class="btn btn-gold btn-sm" onclick="exportBackup()">${ICONS.download} Export Backup</button>
          <label class="btn btn-ghost btn-sm" style="cursor:pointer;">${ICONS.upload} Import Backup
            <input type="file" accept=".json" style="display:none;" onchange="importBackup(event)">
          </label>
        </div>
      </div>
      ${isAdmin()?`
      <div class="panel">
        <div class="panel-head">
          <div class="panel-title">User Accounts <span class="count">${DB.users.length}</span></div>
          <button class="btn btn-gold btn-sm" onclick="openUserForm()">${ICONS.plus}Add User</button>
        </div>
        <div class="table-wrap"><table><thead><tr><th>Name</th><th>Username</th><th>Role</th><th>Actions</th></tr></thead>
        <tbody>
          ${DB.users.map(u=>`<tr>
            <td><b>${escHtml(u.name)}</b></td>
            <td class="mono">${escHtml(u.username)}</td>
            <td><span class="badge ${u.role==='auditor'?'badge-warn':'badge-ok'}">${u.role.replace('storekeeper','Store Keeper').replace('admin','Admin').replace('supervisor','Supervisor').replace('auditor','Auditor')}</span></td>
            <td class="row-actions">
              <button class="icon-btn" onclick="openUserForm('${u.username}')">${ICONS.edit}</button>
              ${u.username!==CURRENT_USER.username?`<button class="icon-btn" onclick="deleteUser('${u.username}')">${ICONS.trash}</button>`:''}
            </td>
          </tr>`).join("")}
        </tbody></table></div>
      </div>` : ""}
    </div>
    ${isAdmin()?`
    <div class="panel">
      <div class="panel-title" style="margin-bottom:10px;">Data Cleanup</div>
      <p class="text-dim" style="font-size:13px;margin-bottom:14px;line-height:1.6;">
        If an item was deleted before entries were auto-cleaned (older records), leftover Inward/Outward
        entries pointing to it can show as "-". This finds and removes those orphaned records.
      </p>
      <button class="btn btn-ghost btn-sm" onclick="cleanupOrphanedRecords()">Find & Remove Orphaned Records</button>
    </div>` : ""}
    ${isAdmin()?`
    <div class="panel" style="border-color:var(--danger);">
      <div class="panel-title" style="margin-bottom:10px;color:#F08A87;">Danger Zone</div>
      <p class="text-dim" style="font-size:13px;margin-bottom:14px;">Permanently erase all store data and start fresh. This cannot be undone — export a backup first.</p>
      <button class="btn btn-danger btn-sm" onclick="resetAllData()">Reset All Data</button>
    </div>` : ""}
  `;
}
function openUserForm(username){
  const user = username ? DB.users.find(u=>u.username===username) : null;
  openModal(`
    <div class="modal-head"><div class="modal-title">${user?'Edit User':'Add New User'}</div><button class="modal-close" onclick="closeModal()">&times;</button></div>
    <div class="field" style="margin-bottom:14px;"><label>Full Name</label>
      <input type="text" id="u_name" value="${user?escHtml(user.name):''}" placeholder="e.g. Ali Raza"></div>
    <div class="field" style="margin-bottom:14px;"><label>Username</label>
      <input type="text" id="u_username" value="${user?escHtml(user.username):''}" placeholder="e.g. ali.raza" ${user?'disabled':''}></div>
    <div class="form-grid" style="margin-bottom:14px;">
      <div class="field"><label>Role</label>
        <select id="u_role">
          <option value="admin" ${user&&user.role==='admin'?'selected':''}>Admin</option>
          <option value="storekeeper" ${user&&user.role==='storekeeper'?'selected':''}>Store Keeper</option>
          <option value="supervisor" ${user&&user.role==='supervisor'?'selected':''}>Supervisor</option>
          <option value="auditor" ${user&&user.role==='auditor'?'selected':''}>Auditor (external, view-only)</option>
        </select>
      </div>
      <div class="field"><label>${user?'New Password (leave blank to keep current)':'Password'}</label>
        <input type="text" id="u_pass" placeholder="${user?'••••••':'Set a password'}"></div>
    </div>
    <div class="form-actions">
      <button class="btn btn-gold btn-sm" onclick="saveUser('${username||''}')">Save User</button>
      <button class="btn btn-ghost btn-sm" onclick="closeModal()">Cancel</button>
    </div>
  `);
}
function saveUser(existingUsername){
  const name = document.getElementById("u_name").value.trim();
  const username = document.getElementById("u_username").value.trim().toLowerCase();
  const role = document.getElementById("u_role").value;
  const pass = document.getElementById("u_pass").value;

  if(!name){ toast("Full name is required", true); return; }
  if(!username){ toast("Username is required", true); return; }
  if(!/^[a-z0-9._-]+$/.test(username)){ toast("Username: letters, numbers, dots, dashes only", true); return; }

  if(existingUsername){
    const user = DB.users.find(u=>u.username===existingUsername);
    user.name = name; user.role = role;
    if(pass) user.pass = pass;
    toast("User updated");
  } else {
    if(DB.users.some(u=>u.username===username)){ toast("Username already exists", true); return; }
    if(!pass){ toast("Password is required for a new user", true); return; }
    DB.users.push({ username, name, role, pass });
    toast("User created");
  }
  saveDB(DB);
  closeModal();
  renderSettings();
}
function deleteUser(username){
  if(DB.users.filter(u=>u.role==='admin').length<=1 && DB.users.find(u=>u.username===username)?.role==='admin'){
    toast("Cannot delete the last Admin account", true); return;
  }
  if(!confirm("Delete this user account?")) return;
  DB.users = DB.users.filter(u=>u.username!==username);
  saveDB(DB);
  toast("User deleted");
  renderSettings();
}
function exportBackup(){
  const blob = new Blob([JSON.stringify(DB,null,2)], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `dus-store-backup-${todayStr()}.json`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast("Backup exported");
}
function importBackup(evt){
  const file = evt.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try{
      const data = JSON.parse(e.target.result);
      if(!data.items || !data.incoming || !data.outgoing){ toast("Invalid backup file", true); return; }
      if(!confirm("This will replace all current data with the backup. Continue?")) return;
      DB = data;
      saveDB(DB);
      toast("Backup restored");
      renderSettings();
    }catch(err){ toast("Failed to read backup file", true); }
  };
  reader.readAsText(file);
}
function cleanupOrphanedRecords(){
  const validItemIds = new Set(DB.items.map(i=>i.id));
  const orphanedIncoming = DB.incoming.filter(r=>!validItemIds.has(r.itemId));
  const orphanedOutgoing = DB.outgoing.filter(r=>!validItemIds.has(r.itemId));
  const orphanedScrap = DB.scrap.filter(r=>!validItemIds.has(r.itemId));
  const total = orphanedIncoming.length + orphanedOutgoing.length + orphanedScrap.length;

  if(total===0){ toast("No orphaned records found — everything is clean"); return; }
  if(!confirm(`Found ${orphanedIncoming.length} orphaned inward, ${orphanedOutgoing.length} orphaned outward, and ${orphanedScrap.length} orphaned scrap record(s) pointing to deleted items. Remove them permanently?`)) return;

  orphanedIncoming.forEach(r=>logDeletion("incoming", r));
  orphanedOutgoing.forEach(r=>logDeletion("outgoing", r));
  orphanedScrap.forEach(r=>logDeletion("scrap", r));
  DB.incoming = DB.incoming.filter(r=>validItemIds.has(r.itemId));
  DB.outgoing = DB.outgoing.filter(r=>validItemIds.has(r.itemId));
  DB.scrap = DB.scrap.filter(r=>validItemIds.has(r.itemId));
  saveDB(DB);
  toast(`${total} orphaned record(s) removed`);
  renderSettings();
}
function resetAllData(){
  if(!confirm("This will delete ALL items, entries, and records permanently. Are you sure?")) return;
  if(!confirm("Really sure? This cannot be undone.")) return;
  DB = defaultDB();
  saveDB(DB);
  toast("All data has been reset");
  goTo("dashboard");
}
