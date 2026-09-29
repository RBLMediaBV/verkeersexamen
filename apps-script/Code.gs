/**
 * Verkeersexamen: ontvangt een toetsresultaat, schrijft het als rij in een
 * Google Sheet en mailt een samenvatting.
 *
 * Instellen (zie ook README.md):
 *  1. Zet hieronder je eigen geheime sleutel en het mailadres goed.
 *  2. Koppel dit script aan een Google Sheet (of laat het er zelf een maken).
 *  3. Deploy als web-app: Implementeren > Nieuwe implementatie > Web-app,
 *     "Uitvoeren als: ikzelf", "Wie heeft toegang: Iedereen".
 *  4. Zet dezelfde sleutel en de web-app-URL in js/app.js.
 */

// === Instellingen ===
var GEHEIME_SLEUTEL = "PLAK_HIER_DEZELFDE_GEHEIME_SLEUTEL"; // exact gelijk aan js/app.js
var MAIL_NAAR = "rnblefebvre@gmail.com";
var TABBLAD = "Resultaten";

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonUit({ ok: false, fout: "Geen gegevens ontvangen" });
    }

    var data = JSON.parse(e.postData.contents);

    // Beveiliging: alleen verzoeken met de juiste sleutel worden geaccepteerd.
    if (String(data.sleutel) !== GEHEIME_SLEUTEL) {
      return jsonUit({ ok: false, fout: "Verkeerde sleutel" });
    }

    var id = String(data.id || "");
    var sheet = geefSheet();

    // Dubbele inzending? (bijvoorbeeld na opnieuw versturen uit de wachtrij) overslaan.
    if (id && idBestaat(sheet, id)) {
      return jsonUit({ ok: true, dubbel: true });
    }

    var naam = String(data.naam || "onbekend");
    var tijd = String(data.tijdstipTekst || new Date().toLocaleString("nl-NL"));
    var modus = String(data.modus || "");
    var goed = Number(data.aantalGoed || 0);
    var totaal = Number(data.aantalTotaal || 0);
    var perc = totaal ? Math.round((goed / totaal) * 100) : 0;
    var fouten = Array.isArray(data.fouten) ? data.fouten : [];

    // Fouten leesbaar maken voor in de cel.
    var foutenTekst = fouten.map(function (f, i) {
      return (i + 1) + ". " + f.vraag +
        "  | gegeven: " + f.gegeven +
        "  | goed: " + f.juist;
    }).join("\n");

    // In de Sheet schrijven.
    sheet.appendRow([
      new Date(),      // moment van ontvangst
      tijd,            // tijd volgens de iPad
      naam,
      modus,
      goed,
      totaal,
      perc + "%",
      fouten.length,
      foutenTekst,
      id
    ]);

    // Mail sturen.
    stuurMail(naam, tijd, modus, goed, totaal, perc, fouten);

    return jsonUit({ ok: true });
  } catch (err) {
    return jsonUit({ ok: false, fout: String(err) });
  }
}

// Simpele controle in de browser: open de web-app-URL zonder POST.
function doGet() {
  return jsonUit({ ok: true, status: "Verkeersexamen endpoint werkt." });
}

function geefSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    // Geen gekoppelde Sheet? Maak er zelf een aan en onthoud hem.
    var props = PropertiesService.getScriptProperties();
    var id = props.getProperty("SHEET_ID");
    if (id) {
      ss = SpreadsheetApp.openById(id);
    } else {
      ss = SpreadsheetApp.create("Verkeersexamen resultaten");
      props.setProperty("SHEET_ID", ss.getId());
    }
  }
  var sheet = ss.getSheetByName(TABBLAD);
  if (!sheet) {
    sheet = ss.insertSheet(TABBLAD);
    sheet.appendRow([
      "Ontvangen", "Tijd (iPad)", "Naam", "Modus",
      "Goed", "Totaal", "Percentage", "Aantal fout", "Foute vragen", "Id"
    ]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Controleert of een id al in de Id-kolom (kolom 10) staat.
function idBestaat(sheet, id) {
  var laatste = sheet.getLastRow();
  if (laatste < 2) return false;
  var waarden = sheet.getRange(2, 10, laatste - 1, 1).getValues();
  for (var i = 0; i < waarden.length; i++) {
    if (String(waarden[i][0]) === id) return true;
  }
  return false;
}

function stuurMail(naam, tijd, modus, goed, totaal, perc, fouten) {
  var onderwerp = "Verkeersexamen: " + naam + " scoorde " + goed + "/" + totaal + " (" + perc + "%)";

  var regels = [];
  regels.push("Naam: " + naam);
  regels.push("Tijd: " + tijd);
  regels.push("Modus: " + modus);
  regels.push("Score: " + goed + " van " + totaal + " (" + perc + "%)");
  regels.push("");

  if (fouten.length === 0) {
    regels.push("Alles goed, geen fouten!");
  } else {
    regels.push("Foute antwoorden:");
    fouten.forEach(function (f, i) {
      regels.push("");
      regels.push((i + 1) + ". " + f.vraag);
      regels.push("   Gegeven antwoord: " + f.gegeven);
      regels.push("   Goede antwoord: " + f.juist);
    });
  }

  MailApp.sendEmail(MAIL_NAAR, onderwerp, regels.join("\n"));
}

function jsonUit(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
