/* ============================================================
   FIREBASE CONFIGURATION — Dar-ul-Sukun Store System
   Powered by Nexora Digital Marketing Agency

   HOW TO SET THIS UP (5 minutes, one-time, free):

   1. Go to https://console.firebase.google.com
   2. Click "Add Project" → name it e.g. "darulsukun-store" → create it
      (you can turn OFF Google Analytics, not needed)
   3. In the left menu, click "Build" → "Realtime Database" → "Create Database"
      → choose a location close to Pakistan (e.g. Singapore / asia-southeast1)
      → start in "Test Mode" for now (you can secure it later)
   4. In the left menu, click the gear icon → "Project settings"
   5. Scroll down to "Your apps" → click the "</>" (Web) icon → give it a
      nickname (e.g. "store-app") → click "Register app"
   6. Firebase will show you a code block with firebaseConfig = {...}
      Copy those values and paste them below, replacing the placeholders.
   7. Save this file, re-upload it alongside index.html and app.js to
      wherever you're hosting them (or just keep all 3 files together
      if running locally / on GitHub Pages).

   If you leave the placeholders as-is, the app will automatically run in
   OFFLINE-ONLY mode (localStorage on this device only) — nothing breaks.
   ============================================================ */

const firebaseConfig = {
  apiKey: "AIzaSyBgOEzlVbKjIEzHqvOzUt_wks70a59woT0",
  authDomain: "darulsukun-store.firebaseapp.com",
  databaseURL: "https://darulsukun-store-default-rtdb.firebaseio.com",
  projectId: "darulsukun-store",
  storageBucket: "darulsukun-store.firebasestorage.app",
  messagingSenderId: "206573324333",
  appId: "1:206573324333:web:3a1e820ec3cc2ca197d0a4"
};
