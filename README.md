# Verkeersexamen oefentool (groep 8)

Een kleine, statische website waarmee je zoon kan oefenen voor het verkeersexamen.
Werkt op de iPad in Safari, is te installeren via "Zet op beginscherm", en stuurt na
elke toets de resultaten naar een Google Sheet met een mailtje naar jou.

Geen accounts, geen tracking, geen externe scripts. De verkeersborden zijn de echte
Nederlandse RVV-borden (publiek domein, van Wikimedia Commons) en zitten als bestand
in de map, zodat alles ook zonder internet werkt.

## Wat zit erin

- `index.html`, `css/`, `js/` : de oefentool zelf.
- `js/vragen.js` : de lesstof, de borden en de vragenbank. Hier pas je vragen aan of voeg je ze toe.
- `icons/` : de app-iconen en de bordbestanden.
- `manifest.webmanifest`, `sw.js` : maken de tool installeerbaar en offline bruikbaar.
- `apps-script/Code.gs` : het Google Apps Script dat de resultaten opslaat en mailt.

## Modi

- **Per les**: alle vragen van die les.
- **Gemengde ronde**: 20 willekeurige vragen uit alle lessen.

Na elke vraag krijg je meteen te zien of het goed was, met uitleg. Aan het eind zie je
je score en welke vragen fout gingen.

---

## Stap A. Op GitHub Pages zetten

1. Maak op GitHub een nieuwe repository, bijvoorbeeld `verkeersexamen` (public).
2. Zet de inhoud van deze map (`verkeersexamen`) in de repository. Let op: de bestanden
   moeten in de hoofdmap van de repository staan, dus `index.html` bovenaan.
   Via de command line:

```bash
cd "verkeersexamen"
git init
git add .
git commit -m "Verkeersexamen oefentool"
git branch -M main
git remote add origin https://github.com/JOUW-NAAM/verkeersexamen.git
git push -u origin main
```

3. Ga in de repository naar **Settings > Pages**.
4. Bij **Build and deployment > Source** kies je **Deploy from a branch**, branch `main`, map `/ (root)`. Opslaan.
5. Na een minuut staat de site op `https://JOUW-NAAM.github.io/verkeersexamen/`.

---

## Stap B. Google Apps Script en Sheet opzetten

1. Ga naar https://script.google.com en klik op **Nieuw project**.
2. Verwijder de voorbeeldcode en plak de volledige inhoud van `apps-script/Code.gs`.
3. Bovenaan het script zet je twee dingen goed:
   - `GEHEIME_SLEUTEL` : verzin een lange, willekeurige tekst (zie stap C).
   - `MAIL_NAAR` : staat al op `rnblefebvre@gmail.com`.
4. Sla op (het Sheet maakt het script zelf de eerste keer aan; je vindt hem later terug
   in je Google Drive als "Verkeersexamen resultaten").
5. Klik rechtsboven op **Implementeren > Nieuwe implementatie**.
6. Bij het tandwiel kies je type **Web-app**.
7. Zet:
   - **Beschrijving**: verkeersexamen
   - **Uitvoeren als**: ikzelf
   - **Wie heeft toegang**: **Iedereen**
8. Klik **Implementeren**. De eerste keer vraagt Google om toestemming (voor Sheet en
   Gmail). Sta dat toe met je eigen account.
9. Kopieer de **web-app-URL** (eindigt op `/exec`). Die heb je bij stap C nodig.

> Wil je later de code aanpassen, kies dan **Beheer implementaties** en maak een nieuwe
> versie van dezelfde implementatie, zodat de URL hetzelfde blijft.

Controle: open de web-app-URL gewoon in de browser. Je hoort te zien:
`{"ok":true,"status":"Verkeersexamen endpoint werkt."}`

---

## Stap C. Sleutel en URL invullen in de tool

Open `js/app.js` en pas bovenaan het `CONFIG`-blok aan:

```javascript
const CONFIG = {
  ENDPOINT: "https://script.google.com/macros/s/..../exec",
  SLEUTEL: "verzin-hier-een-lange-willekeurige-tekst"
};
```

- `ENDPOINT` : de web-app-URL uit stap B.
- `SLEUTEL` : exact dezelfde tekst als `GEHEIME_SLEUTEL` in `Code.gs`.

Commit en push daarna opnieuw naar GitHub, zodat de site de juiste instellingen krijgt.

---

## Stap D. Op de iPad zetten (Zet op beginscherm)

1. Open op de iPad in **Safari** de GitHub Pages-URL.
2. Tik op de deelknop en kies **Zet op beginscherm**.
3. Er komt een icoon op het beginscherm. Getikt start de tool schermvullend, als een app.
4. De eerste keer even met internet openen, daarna werkt oefenen ook offline. Het
   versturen van resultaten gebeurt zodra er weer internet is (zie hieronder).

Dit werkt op het gastennetwerk, want de tool heeft alleen internet naar GitHub en
Google nodig, niet naar jouw thuisnetwerk.

---

## Offline en opnieuw versturen

Lukt het versturen niet (geen internet), dan bewaart de tool het resultaat op de iPad
zelf. Bij de eerstvolgende keer dat de tool opent met internet, of zodra de iPad weer
online komt, worden de bewaarde resultaten alsnog verstuurd. Elk resultaat heeft een
uniek id, zodat er nooit een dubbele rij in de Sheet komt, ook niet na opnieuw versturen.

---

## Over de geheime sleutel (eerlijk)

De sleutel voorkomt dat iemand die alleen de web-app-URL vindt, zomaar rijen kan
toevoegen: zonder de juiste sleutel weigert het script het verzoek. Dat is precies wat
je vroeg (een minimale bescherming).

Wees je wel bewust van dit: omdat het een statische site is, staat de sleutel in de
JavaScript die iedereen kan bekijken via "bron bekijken". Iemand die de site echt
uitpluist, kan de sleutel dus vinden. Voor een oefentool voor je zoon is dat prima, maar
gebruik dezelfde sleutel niet voor iets gevoeligs. Wil je het steviger, dan is een echte
server met een verborgen sleutel nodig; dat past niet bij een gratis statische site op
GitHub Pages. Zeg het als je die kant op wilt, dan bouw ik dat.

---

## Vragen aanpassen of toevoegen

Alles staat in `js/vragen.js`:
- `LESSEN` : de lesteksten en de borden.
- `VRAGEN` : de vragen. Elke vraag heeft `les`, `vraag`, `opties` (drie stuks),
  `juist` (0, 1 of 2 = welke optie goed is) en `uitleg`. Met `toonBord` laat je een
  bord bij de vraag zien.

De volgorde van de antwoorden wordt bij elke toets door elkaar gehusseld, zodat je zoon
niet de letters uit z'n hoofd leert.

Pas je bestanden aan, verhoog dan het versienummer bovenin `sw.js` (`verkeersexamen-v1`
naar `-v2`), anders blijft de iPad de oude versie uit de offline-cache gebruiken.
