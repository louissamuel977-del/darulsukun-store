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
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>'
};

function defaultDB(){
  return {
    users: [
      { username: "admin", name: "Administrator", role: "admin", pass: "admin123" },
      { username: "storekeeper", name: "Store Keeper", role: "storekeeper", pass: "store123" },
      { username: "supervisor", name: "Supervisor", role: "supervisor", pass: "super123" }
    ],
    departments: ["Special Children Section","Kitchen / Dastarkhwan","Medical Room","Admin Office","Boys Hostel","Girls Hostel","Laundry","Maintenance"],
    items: [],
    incoming: [],
    outgoing: [],
    seq: { item: 0, incoming: 0, outgoing: 0 }
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
    items: toArray(raw.items),
    incoming: toArray(raw.incoming),
    outgoing: toArray(raw.outgoing),
    seq: (raw.seq && typeof raw.seq === "object") ? {
      item: Number(raw.seq.item)||0,
      incoming: Number(raw.seq.incoming)||0,
      outgoing: Number(raw.seq.outgoing)||0
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
  const role = document.getElementById("loginRole").value;
  const name = document.getElementById("loginName").value.trim();
  const pass = document.getElementById("loginPass").value;

  if(!name){ toast("Please enter your name", true); return; }
  const acct = DB.users.find(u => u.role === role);
  if(!acct || acct.pass !== pass){ toast("Incorrect access code", true); return; }

  CURRENT_USER = { name, role, username: acct.username };
  sessionStorage.setItem("dus_session", JSON.stringify(CURRENT_USER));
  enterApp();
}
function logout(){
  sessionStorage.removeItem("dus_session");
  CURRENT_USER = null;
  document.getElementById("app").style.display = "none";
  document.getElementById("loginScreen").style.display = "flex";
}
function enterApp(){
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("app").style.display = "block";
  document.getElementById("userAvatar").textContent = CURRENT_USER.name.charAt(0).toUpperCase();
  document.getElementById("userNameLabel").textContent = CURRENT_USER.name;
  document.getElementById("userRoleLabel").textContent = CURRENT_USER.role.replace("storekeeper","Store Keeper").replace("admin","Admin").replace("supervisor","Supervisor");
  renderNav();
  goTo("dashboard");
}
if(CURRENT_USER){ window.addEventListener("DOMContentLoaded", enterApp); }

/* ---------------- NAV ---------------- */
const NAV_ITEMS = [
  { id:"dashboard", label:"Dashboard", icon:"dashboard" },
  { id:"items", label:"Item Master", icon:"items" },
  { id:"incoming", label:"Incoming Entry", icon:"incoming" },
  { id:"outgoing", label:"Outgoing Entry", icon:"outgoing" },
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
  return inn - out;
}
function toast(msg, isError){
  const host = document.getElementById("toastHost");
  const el = document.createElement("div");
  el.className = "toast";
  if(isError) el.style.borderColor = "var(--danger)";
  el.textContent = msg;
  host.appendChild(el);
  setTimeout(()=>{ el.remove(); }, 3200);
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
  const counts = { household:0, stationery:0, dietfood:0, diapers:0 };
  let totalValue = 0;
  DB.items.forEach(it=>{
    const stock = stockOf(it.id);
    counts[it.category] += stock;
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
  const recentOut = [...DB.outgoing].sort((a,b)=> new Date(b.date)-new Date(a.date)).slice(0,5);

  main.innerHTML = `
    ${topbarHtml("Dashboard","Overview of stock, alerts, and recent activity")}
    <div class="grid grid-4" style="margin-bottom:20px;">
      ${statCard("Household Stock","bar-hh",counts.household,"units in store")}
      ${statCard("Stationery Stock","bar-st",counts.stationery,"units in store")}
      ${statCard("Diet & Food Stock","bar-df",counts.dietfood,"units in store")}
      ${statCard("Diapers Stock","bar-dp",counts.diapers,"units in store")}
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
        <div class="panel-head"><div class="panel-title">Recent Incoming</div></div>
        ${recentIn.length===0?emptyState("No incoming entries yet."):`
        <div class="table-wrap"><table><thead><tr><th>Date</th><th>Item</th><th>Qty</th><th>Source</th></tr></thead><tbody>
        ${recentIn.map(r=>{const item=getItem(r.itemId);return `<tr><td>${fmtDate(r.date)}</td><td>${escHtml(item?item.name:'-')}</td><td>${r.qty}</td><td><span class="badge ${r.sourceType==='Donation'?'badge-ok':'badge-warn'}">${r.sourceType}</span></td></tr>`}).join("")}
        </tbody></table></div>`}
      </div>
      <div class="panel">
        <div class="panel-head"><div class="panel-title">Recent Outgoing</div></div>
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
    ${topbarHtml("Item Master","Manage all store items across categories", canEdit()?`<button class="btn btn-gold btn-sm" onclick="openItemForm()">${ICONS.plus}Add Item</button>`:"")}
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
        <thead><tr><th>Code</th><th>Name</th><th>Category</th><th>Unit</th><th>Current Stock</th><th>Reorder Level</th><th>Status</th>${canEdit()?'<th>Actions</th>':''}</tr></thead>
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
      ${canEdit()?`<td class="row-actions">
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
      <button class="btn btn-gold" onclick="saveItem('${id||''}')">Save Item</button>
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
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
function deleteItem(id){
  if(!confirm("Delete this item? This cannot be undone.")) return;
  DB.items = DB.items.filter(i=>i.id!==id);
  saveDB(DB);
  toast("Item deleted");
  renderItems();
}

/* ============================================================
   INCOMING ENTRY (Purchasing + Donations)
   ============================================================ */
let incomingFilter = { cat:"", source:"", from:"", to:"" };
function renderIncoming(){
  const main = document.getElementById("mainContent");
  main.innerHTML = `
    ${topbarHtml("Incoming Entry","Record purchases and donations received", canEdit()?`<button class="btn btn-gold btn-sm" onclick="openIncomingForm()">${ICONS.plus}New Incoming Entry</button>`:"")}
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
      </div>
      <div class="table-wrap">
      <table>
        <thead><tr><th>Date</th><th>Item</th><th>Category</th><th>Source</th><th>Donor/Vendor</th><th>Qty</th><th>Rate</th><th>Total</th><th>Expiry</th>${canEdit()?'<th>Actions</th>':''}</tr></thead>
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
      ${canEdit()?`<td class="row-actions">
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
    <div class="modal-head"><div class="modal-title">${row?'Edit Incoming Entry':'New Incoming Entry'}</div><button class="modal-close" onclick="closeModal()">&times;</button></div>
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
      <button class="btn btn-gold" onclick="saveIncoming('${id||''}')">Save Entry</button>
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
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
    toast("Incoming entry updated");
  } else {
    uid("incoming");
    DB.incoming.push({ id:"in_"+Date.now(), ...data });
    toast("Incoming entry saved");
  }
  saveDB(DB);
  closeModal();
  renderIncoming();
}
function deleteIncoming(id){
  if(!confirm("Delete this incoming entry?")) return;
  DB.incoming = DB.incoming.filter(r=>r.id!==id);
  saveDB(DB);
  toast("Entry deleted");
  renderIncoming();
}

/* ============================================================
   OUTGOING ENTRY (Issuance)
   ============================================================ */
let outgoingFilter = { dept:"", from:"", to:"" };
function renderOutgoing(){
  const main = document.getElementById("mainContent");
  main.innerHTML = `
    ${topbarHtml("Outgoing Entry","Record items issued to departments", canEdit()?`<button class="btn btn-gold btn-sm" onclick="openOutgoingForm()">${ICONS.plus}New Outgoing Entry</button>`:"")}
    <div class="panel">
      <div class="filter-bar">
        <div class="field"><label>Department</label>
          <select onchange="outgoingFilter.dept=this.value;renderOutgoing()">
            <option value="">All</option>
            ${DB.departments.map(d=>`<option value="${escHtml(d)}" ${outgoingFilter.dept===d?'selected':''}>${escHtml(d)}</option>`).join("")}
          </select>
        </div>
        <div class="field"><label>From</label><input type="date" value="${outgoingFilter.from}" onchange="outgoingFilter.from=this.value;renderOutgoing()"></div>
        <div class="field"><label>To</label><input type="date" value="${outgoingFilter.to}" onchange="outgoingFilter.to=this.value;renderOutgoing()"></div>
      </div>
      <div class="table-wrap">
      <table>
        <thead><tr><th>Date</th><th>Item</th><th>Qty</th><th>Department</th><th>Receiver</th><th>Approved By</th><th>Received</th>${canEdit()?'<th>Actions</th>':''}</tr></thead>
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
      ${canEdit()?`<td class="row-actions">
        <button class="icon-btn" onclick="openOutgoingForm('${r.id}')">${ICONS.edit}</button>
        ${isAdmin()?`<button class="icon-btn" onclick="deleteOutgoing('${r.id}')">${ICONS.trash}</button>`:''}
      </td>`:''}
    </tr>`;
  }).join("");
}
function openOutgoingForm(id){
  const row = id ? DB.outgoing.find(r=>r.id===id) : null;
  openModal(`
    <div class="modal-head"><div class="modal-title">${row?'Edit Outgoing Entry':'New Outgoing Entry'}</div><button class="modal-close" onclick="closeModal()">&times;</button></div>
    <div class="form-grid" style="margin-bottom:14px;">
      <div class="field"><label>Date</label><input type="date" id="f_date" value="${row?row.date:todayStr()}"></div>
      <div class="field" style="grid-column:span 2;"><label>Item</label>
        <select id="f_item" onchange="showStockHint()">${itemOptions(row?row.itemId:null)}</select>
      </div>
    </div>
    <div class="form-grid" style="margin-bottom:6px;">
      <div class="field"><label>Qty Issued</label><input type="number" id="f_qty" value="${row?row.qty:''}" min="0" oninput="showStockHint()"></div>
      <div class="field"><label>Department</label>
        <select id="f_dept">${DB.departments.map(d=>`<option value="${escHtml(d)}" ${row&&row.department===d?'selected':''}>${escHtml(d)}</option>`).join("")}</select>
      </div>
      <div class="field"><label>Receiver Name</label><input type="text" id="f_receiver" value="${row?escHtml(row.receiverName||''):''}"></div>
    </div>
    <div id="stockHint" style="font-size:12px;color:var(--ink-faint);margin-bottom:14px;"></div>
    <div class="form-grid" style="margin-bottom:14px;">
      <div class="field"><label>Purpose / Reason</label><input type="text" id="f_purpose" value="${row?escHtml(row.purpose||''):''}"></div>
      <div class="field"><label>Approved By</label><input type="text" id="f_approved" value="${row?escHtml(row.approvedBy||''):''}"></div>
      <div class="field"><label>Received Confirmation</label>
        <select id="f_received"><option value="0" ${row&&!row.received?'selected':''}>Pending</option><option value="1" ${row&&row.received?'selected':''}>Confirmed Received</option></select>
      </div>
    </div>
    <div class="form-actions">
      <button class="btn btn-gold" onclick="saveOutgoing('${id||''}')">Save Entry</button>
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
    </div>
  `);
  showStockHint();
}
function showStockHint(){
  const itemId = document.getElementById("f_item").value;
  const qty = Number(document.getElementById("f_qty").value)||0;
  const item = getItem(itemId);
  const hint = document.getElementById("stockHint");
  if(!item){ hint.textContent=""; return; }
  const stock = stockOf(item.id);
  hint.innerHTML = `Available stock: <b style="color:var(--gold-400)">${stock} ${escHtml(item.unit)}</b>` +
    (qty>stock ? ` — <span style="color:var(--danger)">exceeds available stock!</span>` : "");
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
  const data = {
    date: document.getElementById("f_date").value || todayStr(),
    itemId,
    qty,
    department: document.getElementById("f_dept").value,
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
    toast("Outgoing entry updated");
  } else {
    uid("outgoing");
    DB.outgoing.push({ id:"out_"+Date.now(), ...data });
    toast("Outgoing entry saved");
  }
  saveDB(DB);
  closeModal();
  renderOutgoing();
}
function deleteOutgoing(id){
  if(!confirm("Delete this outgoing entry?")) return;
  DB.outgoing = DB.outgoing.filter(r=>r.id!==id);
  saveDB(DB);
  toast("Entry deleted");
  renderOutgoing();
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
            <option value="daily" ${reportTab==='daily'?'selected':''}>Daily Entry Report</option>
            <option value="consumption" ${reportTab==='consumption'?'selected':''}>Monthly Consumption (by Department)</option>
            <option value="donation" ${reportTab==='donation'?'selected':''}>Donation Report</option>
            <option value="purchasing" ${reportTab==='purchasing'?'selected':''}>Purchasing Report</option>
            <option value="expiry" ${reportTab==='expiry'?'selected':''}>Expired / Near-Expiry Report</option>
            <option value="stockregister" ${reportTab==='stockregister'?'selected':''}>Full Stock Register</option>
          </select>
        </div>
        <div class="field"><label>From</label><input type="date" value="${reportRange.from}" onchange="reportRange.from=this.value;renderReports()"></div>
        <div class="field"><label>To</label><input type="date" value="${reportRange.to}" onchange="reportRange.to=this.value;renderReports()"></div>
        <button class="btn btn-ghost btn-sm" onclick="exportReport()">${ICONS.download} Export CSV</button>
        <button class="btn btn-ghost btn-sm" onclick="window.print()">Print</button>
      </div>
      <div id="reportBody"></div>
    </div>
  `;
  document.getElementById("reportBody").innerHTML = buildReport();
}
function inRange(dateStr){
  return (!reportRange.from || dateStr>=reportRange.from) && (!reportRange.to || dateStr<=reportRange.to);
}
function buildReport(){
  if(reportTab==="daily"){
    const inc = DB.incoming.filter(r=>inRange(r.date));
    const out = DB.outgoing.filter(r=>inRange(r.date));
    return `
      <div class="panel-title" style="margin-bottom:10px;">Incoming (${inc.length})</div>
      <div class="table-wrap"><table><thead><tr><th>Date</th><th>Item</th><th>Source</th><th>Qty</th><th>Total</th></tr></thead>
      <tbody>${inc.length?inc.map(r=>`<tr><td>${fmtDate(r.date)}</td><td>${escHtml(getItem(r.itemId)?.name||'-')}</td><td>${r.sourceType}</td><td>${r.qty}</td><td>${fmtMoney(r.total)}</td></tr>`).join(""):`<tr><td colspan="5">${emptyState("No records")}</td></tr>`}</tbody></table></div>
      <div class="panel-title" style="margin:18px 0 10px;">Outgoing (${out.length})</div>
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
  if(reportTab==="stockregister"){
    if(!DB.items.length) return emptyState("No items in Item Master yet.");
    return `<div class="table-wrap"><table><thead><tr><th>Code</th><th>Item</th><th>Category</th><th>Unit</th><th>Current Stock</th><th>Reorder Level</th></tr></thead>
      <tbody>${DB.items.map(it=>`<tr><td class="mono">${itemCode(it.category,it.seq)}</td><td>${escHtml(it.name)}</td><td>${CATS[it.category].label}</td><td>${escHtml(it.unit)}</td><td class="mono">${stockOf(it.id)}</td><td class="mono">${it.reorderLevel}</td></tr>`).join("")}</tbody></table></div>`;
  }
  return "";
}
function exportReport(){
  let rows = [];
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
  } else if(reportTab==="donation"){
    rows.push(["Date","Item","Donor","Qty"]);
    DB.incoming.filter(r=>r.sourceType==="Donation"&&inRange(r.date)).forEach(r=>rows.push([r.date,getItem(r.itemId)?.name||'',r.donorVendor||'',r.qty]));
  } else if(reportTab==="purchasing"){
    rows.push(["Date","Item","Vendor","Qty","Rate","Total","Invoice #"]);
    DB.incoming.filter(r=>r.sourceType==="Purchasing"&&inRange(r.date)).forEach(r=>rows.push([r.date,getItem(r.itemId)?.name||'',r.donorVendor||'',r.qty,r.rate,r.total,r.invoiceNo||'']));
  } else if(reportTab==="expiry"){
    rows.push(["Item","Batch","Expiry Date"]);
    DB.incoming.filter(r=>r.expiryDate).forEach(r=>rows.push([getItem(r.itemId)?.name||'',r.batchNo||'',r.expiryDate]));
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
function renderDepartments(){
  const main = document.getElementById("mainContent");
  main.innerHTML = `
    ${topbarHtml("Departments","Manage department list used in Outgoing Entry", isAdmin()?`<button class="btn btn-gold btn-sm" onclick="addDepartment()">${ICONS.plus}Add Department</button>`:"")}
    <div class="panel">
      <div class="table-wrap"><table><thead><tr><th>Department Name</th>${isAdmin()?'<th>Actions</th>':''}</tr></thead>
      <tbody>
        ${DB.departments.map((d,i)=>`<tr><td>${escHtml(d)}</td>${isAdmin()?`<td class="row-actions"><button class="icon-btn" onclick="removeDepartment(${i})">${ICONS.trash}</button></td>`:''}</tr>`).join("")}
      </tbody></table></div>
    </div>
  `;
}
function addDepartment(){
  const name = prompt("Enter department name:");
  if(!name || !name.trim()) return;
  DB.departments.push(name.trim());
  saveDB(DB);
  toast("Department added");
  renderDepartments();
}
function removeDepartment(i){
  if(!confirm("Remove this department?")) return;
  DB.departments.splice(i,1);
  saveDB(DB);
  toast("Department removed");
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
        <div class="panel-title" style="margin-bottom:14px;">Access Codes</div>
        ${DB.users.map(u=>`
          <div class="field" style="margin-bottom:12px;">
            <label>${u.role.replace('storekeeper','Store Keeper').replace('admin','Admin').replace('supervisor','Supervisor')} Code</label>
            <div style="display:flex;gap:8px;">
              <input type="text" id="pass_${u.username}" value="${escHtml(u.pass)}">
              <button class="btn btn-ghost btn-sm" onclick="updatePass('${u.username}')">Save</button>
            </div>
          </div>
        `).join("")}
      </div>` : ""}
    </div>
    ${isAdmin()?`
    <div class="panel" style="border-color:var(--danger);">
      <div class="panel-title" style="margin-bottom:10px;color:#F08A87;">Danger Zone</div>
      <p class="text-dim" style="font-size:13px;margin-bottom:14px;">Permanently erase all store data and start fresh. This cannot be undone — export a backup first.</p>
      <button class="btn btn-danger btn-sm" onclick="resetAllData()">Reset All Data</button>
    </div>` : ""}
  `;
}
function updatePass(username){
  const val = document.getElementById("pass_"+username).value.trim();
  if(!val){ toast("Code cannot be empty", true); return; }
  const u = DB.users.find(x=>x.username===username);
  u.pass = val;
  saveDB(DB);
  toast("Access code updated");
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
function resetAllData(){
  if(!confirm("This will delete ALL items, entries, and records permanently. Are you sure?")) return;
  if(!confirm("Really sure? This cannot be undone.")) return;
  DB = defaultDB();
  saveDB(DB);
  toast("All data has been reset");
  goTo("dashboard");
}
