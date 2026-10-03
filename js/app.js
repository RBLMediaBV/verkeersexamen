// Verkeersexamen oefentool. Geen framework, alleen deze JavaScript.

// === Instellingen: pas deze twee regels aan na het opzetten van het Apps Script ===
const CONFIG = {
  // De web-app-URL van je Google Apps Script (eindigt op /exec).
  ENDPOINT: "https://script.google.com/macros/s/AKfycbzQM1nkT7cVfcbJQ4wQcXDXeYnM7kvIn_kG1xBjq8vHXoWtFYjlbGi4ZP33jPlnOEMV/exec",
  // Dezelfde geheime sleutel die ook in Code.gs staat.
  SLEUTEL: "QNJsrbcoslHikes9AbdSoF8fQXoOd"
};

// === Opslagsleutels ===
const KEY_NAAM = "ve_naam";
const KEY_NIVEAU = "ve_niveau";
const KEY_WACHTRIJ = "ve_wachtrij"; // resultaten die nog verstuurd moeten worden

// === Niveaus ===
// Elke vraag heeft niveau 1 (beginner), 2 (midden) of 3 (expert).
// Een gekozen niveau pakt alle vragen tot en met dat niveau (expert = alles).
const NIVEAU_MAX = { beginner: 1, midden: 2, expert: 3 };
const NIVEAU_LABEL = { beginner: "Beginner", midden: "Midden", expert: "Expert" };
const GEMENGD_LENGTE = { beginner: 10, midden: 20, expert: 25 };
const NIVEAU_UITLEG = {
  beginner: "De makkelijke basisvragen.",
  midden: "Basis plus wat lastigere vragen.",
  expert: "Alle vragen, ook de moeilijke strik- en situatievragen."
};

// === Hulpjes ===
const $ = (sel) => document.querySelector(sel);
const maak = (tag, klasse, tekst) => {
  const el = document.createElement(tag);
  if (klasse) el.className = klasse;
  if (tekst != null) el.textContent = tekst;
  return el;
};
function schud(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function maakId() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return "id-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10);
}
function nu() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return {
    iso: d.toISOString(),
    tekst: `${p(d.getDate())}-${p(d.getMonth() + 1)}-${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`
  };
}

// === Toestand van de lopende toets ===
let toets = null;

// === Schermen wisselen ===
function toon(schermId) {
  document.querySelectorAll(".scherm").forEach((s) => s.classList.remove("actief"));
  $("#" + schermId).classList.add("actief");
  window.scrollTo(0, 0);
}

// === Naam ===
function getNaam() { try { return localStorage.getItem(KEY_NAAM) || ""; } catch (e) { return ""; } }
function setNaam(n) { try { localStorage.setItem(KEY_NAAM, n); } catch (e) {} }

// === Niveau ===
function getNiveau() {
  try { return localStorage.getItem(KEY_NIVEAU) || "midden"; } catch (e) { return "midden"; }
}
function setNiveau(n) { try { localStorage.setItem(KEY_NIVEAU, n); } catch (e) {} }

// Vragen die bij het gekozen niveau horen (tot en met dat niveau), evt. voor een les.
function vragenVoorNiveau(lesId) {
  const max = NIVEAU_MAX[getNiveau()] || 2;
  return VRAGEN.filter((v) => v.niveau <= max && (lesId == null || v.les === lesId));
}

// === Beginscherm ===
function bouwStart() {
  const naam = getNaam();
  $("#naam-invoer").value = naam;
  $("#begroeting").textContent = naam ? `Hoi ${naam}!` : "Welkom!";
  werkWachtrijMeldingBij();
}

// === Lessenlijst opbouwen (voor Leren of voor Oefenen) ===
function vulLessen(containerId, modus) {
  const lijst = $("#" + containerId);
  lijst.innerHTML = "";
  LESSEN.forEach((les) => {
    const knop = maak("button", "leskaart");
    let meta;
    if (modus === "leren") {
      meta = "Lees de uitleg";
    } else {
      const aantal = vragenVoorNiveau(les.id).length;
      meta = `${aantal} ${aantal === 1 ? "vraag" : "vragen"}`;
    }
    knop.innerHTML = `<span class="lesnr">Les ${les.id}</span>
      <span class="lestitel">${les.titel}</span>
      <span class="lesmeta">${meta}</span>`;
    if (modus === "leren") knop.addEventListener("click", () => toonLes(les.id));
    else knop.addEventListener("click", () => startToets("les", les.id));
    lijst.appendChild(knop);
  });
}

// === Niveau-knoppen op het oefenscherm ===
function werkNiveauUI() {
  const niveau = getNiveau();
  document.querySelectorAll("#niveauKeuze button").forEach((b) => {
    b.classList.toggle("actief", b.dataset.niveau === niveau);
  });
  $("#niveauUitleg").textContent = NIVEAU_UITLEG[niveau];
  const lengte = Math.min(GEMENGD_LENGTE[niveau], vragenVoorNiveau().length);
  $("#start-gemengd").textContent = `Gemengde ronde (${lengte} vragen)`;
  vulLessen("oefen-knoppen", "oefenen");
}

// === Lesstof tonen ===
function toonLes(lesId) {
  const les = LESSEN.find((l) => l.id === lesId);
  const box = $("#les-inhoud");
  box.innerHTML = "";
  box.appendChild(maak("h2", "les-hoofd", `Les ${les.id}. ${les.titel}`));

  les.tekst.forEach((deel) => {
    if (deel.kop) box.appendChild(maak("h3", null, deel.kop));
    box.appendChild(maak("p", null, deel.body));
  });

  if (les.borden && les.borden.length) {
    const grid = maak("div", "borden-grid");
    les.borden.forEach((b) => {
      const kaart = maak("div", "bordkaart");
      const fig = maak("div", "bordfig");
      fig.innerHTML = `<img class="bord-img" src="${BORDEN[b.svg]}" alt="${b.naam}">`;
      kaart.appendChild(fig);
      kaart.appendChild(maak("strong", null, b.naam));
      kaart.appendChild(maak("span", "borduitleg", b.uitleg));
      grid.appendChild(kaart);
    });
    box.appendChild(grid);
  }

  const onthoud = maak("div", "onthoud");
  onthoud.innerHTML = `<strong>Onthoud:</strong> ${les.onthoud}`;
  box.appendChild(onthoud);

  const aantal = vragenVoorNiveau(les.id).length;
  const startKnop = maak("button", "primair groot", `Oefen deze les (${aantal} vragen, niveau ${NIVEAU_LABEL[getNiveau()].toLowerCase()})`);
  startKnop.addEventListener("click", () => startToets("les", les.id));
  box.appendChild(startKnop);

  toon("scherm-les");
}

// === Toets voorbereiden ===
function maakVraagKopie(v) {
  const paren = v.opties.map((tekst, i) => ({ tekst, juist: i === v.juist }));
  const geschud = schud(paren);
  return {
    vraag: v.vraag,
    toonBord: v.toonBord || null,
    opties: geschud,
    juisteIndex: geschud.findIndex((p) => p.juist),
    uitleg: v.uitleg,
    les: v.les
  };
}

function startToets(modus, lesId) {
  if (!getNaam()) { toon("scherm-start"); $("#naam-invoer").focus(); return; }
  const niveau = getNiveau();
  let bron;
  let modusTekst;
  if (modus === "les") {
    bron = vragenVoorNiveau(lesId);
    const les = LESSEN.find((l) => l.id === lesId);
    modusTekst = `Les ${lesId}: ${les.titel}`;
  } else {
    const lengte = GEMENGD_LENGTE[niveau];
    bron = schud(vragenVoorNiveau()).slice(0, lengte);
    modusTekst = "Gemengde ronde";
  }
  if (!bron.length) return;
  const vragen = schud(bron).map(maakVraagKopie);
  toets = {
    modus: `${modusTekst} (niveau ${NIVEAU_LABEL[niveau].toLowerCase()})`,
    vragen, index: 0, antwoorden: []
  };
  toonVraag();
  toon("scherm-toets");
}

// === Vraag tonen ===
function toonVraag() {
  const v = toets.vragen[toets.index];
  const totaal = toets.vragen.length;

  $("#voortgang").textContent = `Vraag ${toets.index + 1} van ${totaal}`;
  const goedTot = toets.antwoorden.filter((a) => a.goed).length;
  $("#tussenscore").textContent = `${goedTot} goed`;
  $("#voortgangsbalk-vol").style.width = `${(toets.index / totaal) * 100}%`;

  const box = $("#vraag-box");
  box.innerHTML = "";

  if (v.toonBord) {
    const fig = maak("div", "vraag-bord");
    fig.innerHTML = `<img class="bord-img" src="${BORDEN[v.toonBord]}" alt="Verkeersbord">`;
    box.appendChild(fig);
  }

  box.appendChild(maak("h2", "vraagtekst", v.vraag));

  const opties = maak("div", "opties");
  v.opties.forEach((opt, i) => {
    const knop = maak("button", "optie", opt.tekst);
    knop.addEventListener("click", () => kiesAntwoord(i, knop));
    opties.appendChild(knop);
  });
  box.appendChild(opties);

  const feedback = maak("div", "feedback verborgen");
  feedback.id = "feedback";
  box.appendChild(feedback);
}

function kiesAntwoord(gekozenIndex, gekozenKnop) {
  const v = toets.vragen[toets.index];
  const optieKnoppen = document.querySelectorAll("#vraag-box .optie");
  optieKnoppen.forEach((k) => (k.disabled = true));

  const goed = gekozenIndex === v.juisteIndex;
  optieKnoppen[v.juisteIndex].classList.add("goed");
  if (!goed) gekozenKnop.classList.add("fout");

  toets.antwoorden.push({
    goed,
    vraag: v.vraag,
    gegeven: v.opties[gekozenIndex].tekst,
    juist: v.opties[v.juisteIndex].tekst
  });

  const fb = $("#feedback");
  fb.classList.remove("verborgen");
  fb.classList.add(goed ? "fb-goed" : "fb-fout");
  fb.innerHTML = `<strong>${goed ? "Goed!" : "Helaas."}</strong> ${v.uitleg}`;

  const laatste = toets.index === toets.vragen.length - 1;
  const volgende = maak("button", "primair groot", laatste ? "Bekijk je resultaat" : "Volgende vraag");
  volgende.addEventListener("click", () => {
    if (laatste) rondAf();
    else { toets.index++; toonVraag(); }
  });
  fb.appendChild(volgende);
}

// === Afronden ===
function rondAf() {
  const totaal = toets.vragen.length;
  const goed = toets.antwoorden.filter((a) => a.goed).length;
  const fouten = toets.antwoorden.filter((a) => !a.goed);
  const tijd = nu();

  const resultaat = {
    id: maakId(),
    naam: getNaam(),
    tijdstipISO: tijd.iso,
    tijdstipTekst: tijd.tekst,
    modus: toets.modus,
    aantalGoed: goed,
    aantalTotaal: totaal,
    fouten: fouten.map((f) => ({ vraag: f.vraag, gegeven: f.gegeven, juist: f.juist }))
  };

  toonResultaat(resultaat);
  bewaarInWachtrij(resultaat);
  flushWachtrij();
}

function toonResultaat(r) {
  const perc = Math.round((r.aantalGoed / r.aantalTotaal) * 100);
  const box = $("#resultaat-box");
  box.innerHTML = "";

  const cirkel = maak("div", "score-cirkel");
  cirkel.innerHTML = `<span class="score-groot">${r.aantalGoed}</span><span class="score-klein">van ${r.aantalTotaal}</span>`;
  if (perc >= 85) cirkel.classList.add("score-top");
  else if (perc >= 60) cirkel.classList.add("score-ok");
  else cirkel.classList.add("score-laag");
  box.appendChild(cirkel);

  let boodschap;
  if (perc >= 85) boodschap = "Heel goed gedaan!";
  else if (perc >= 60) boodschap = "Goed bezig, oefen nog even door.";
  else boodschap = "Lees de les nog eens en probeer het opnieuw.";
  box.appendChild(maak("p", "score-boodschap", `${boodschap} (${perc}%)`));

  if (r.fouten.length) {
    box.appendChild(maak("h3", null, "Wat ging er mis?"));
    r.fouten.forEach((f) => {
      const kaart = maak("div", "foutkaart");
      kaart.appendChild(maak("p", "fout-vraag", f.vraag));
      const jouw = maak("p", "fout-regel");
      jouw.innerHTML = `Jouw antwoord: <span class="fout-x">${f.gegeven}</span>`;
      kaart.appendChild(jouw);
      const goedR = maak("p", "fout-regel");
      goedR.innerHTML = `Goed antwoord: <span class="goed-v">${f.juist}</span>`;
      kaart.appendChild(goedR);
      box.appendChild(kaart);
    });
  } else {
    box.appendChild(maak("p", "alles-goed", "Alles goed, geen fouten!"));
  }

  $("#verstuur-status").textContent = "";
  toon("scherm-resultaat");
}

// === Versturen en wachtrij ===
function leesWachtrij() {
  try { return JSON.parse(localStorage.getItem(KEY_WACHTRIJ) || "[]"); } catch (e) { return []; }
}
function schrijfWachtrij(arr) {
  try { localStorage.setItem(KEY_WACHTRIJ, JSON.stringify(arr)); } catch (e) {}
}
function bewaarInWachtrij(r) {
  const rij = leesWachtrij();
  rij.push(r);
  schrijfWachtrij(rij);
  werkWachtrijMeldingBij();
}

async function verstuurEen(resultaat) {
  const body = JSON.stringify(Object.assign({ sleutel: CONFIG.SLEUTEL }, resultaat));
  const resp = await fetch(CONFIG.ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body,
    redirect: "follow"
  });
  if (!resp.ok) throw new Error("HTTP " + resp.status);
  const data = await resp.json();
  if (!data || !data.ok) throw new Error("Server weigerde het resultaat");
  return true;
}

async function flushWachtrij() {
  const status = $("#verstuur-status");
  if (CONFIG.ENDPOINT.startsWith("PLAK_HIER")) {
    if (status) status.textContent = "Versturen staat nog niet ingesteld. Het resultaat is wel lokaal bewaard.";
    return;
  }
  let rij = leesWachtrij();
  if (!rij.length) return;
  if (status) status.textContent = "Bezig met versturen...";

  const overgebleven = [];
  for (const r of rij) {
    try { await verstuurEen(r); }
    catch (e) { overgebleven.push(r); }
  }
  schrijfWachtrij(overgebleven);
  werkWachtrijMeldingBij();

  if (status) {
    if (overgebleven.length === 0) status.textContent = "Resultaat verstuurd naar papa en mama.";
    else status.textContent = "Geen internet. Het resultaat is bewaard en wordt later automatisch verstuurd.";
  }
}

function werkWachtrijMeldingBij() {
  const rij = leesWachtrij();
  const melding = $("#wachtrij-melding");
  if (!melding) return;
  if (rij.length > 0) {
    melding.classList.remove("verborgen");
    melding.textContent = `${rij.length} resultaat${rij.length > 1 ? "en" : ""} wacht nog op internet om verstuurd te worden.`;
  } else {
    melding.classList.add("verborgen");
  }
}

// === Opstarten ===
document.addEventListener("DOMContentLoaded", () => {
  bouwStart();

  $("#naam-opslaan").addEventListener("click", () => {
    const n = $("#naam-invoer").value.trim();
    if (n) { setNaam(n); bouwStart(); }
  });
  $("#naam-invoer").addEventListener("keydown", (e) => {
    if (e.key === "Enter") $("#naam-opslaan").click();
  });

  $("#ga-leren").addEventListener("click", () => {
    vulLessen("leren-knoppen", "leren");
    toon("scherm-leren");
  });
  $("#ga-oefenen").addEventListener("click", () => {
    if (!getNaam()) { $("#naam-invoer").focus(); return; }
    werkNiveauUI();
    toon("scherm-oefenen");
  });

  document.querySelectorAll("#niveauKeuze button").forEach((b) => {
    b.addEventListener("click", () => { setNiveau(b.dataset.niveau); werkNiveauUI(); });
  });

  $("#start-gemengd").addEventListener("click", () => {
    if (!getNaam()) { toon("scherm-start"); $("#naam-invoer").focus(); return; }
    startToets("gemengd");
  });

  document.querySelectorAll("[data-naar]").forEach((k) => {
    k.addEventListener("click", () => {
      const naar = k.getAttribute("data-naar");
      if (naar === "start") bouwStart();
      toon("scherm-" + naar);
    });
  });

  $("#opnieuw-knop").addEventListener("click", () => { bouwStart(); toon("scherm-start"); });

  flushWachtrij();
  window.addEventListener("online", flushWachtrij);

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
});
