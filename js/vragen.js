// Vragenbank en lesstof voor het verkeersexamen (groep 8).
// Bron: het meegeleverde bestand Verkeersregels-groep8.pdf.
// De 20 officiele oefentoetsvragen staan er letterlijk in (bron: "toets").
// De extra oefenvragen zijn per les samengesteld uit de lesstof zelf (bron: "lesstof").

// Echte Nederlandse RVV-verkeersborden (officiele SVG's van Wikimedia Commons, publiek domein).
// Als bestand meegeleverd in icons/borden/, zodat ze ook offline werken.
const BORDEN = {
  voorrang_verlenen: "icons/borden/voorrang_verlenen.svg",   // B6
  stop: "icons/borden/stop.svg",                             // B7
  voorrangsweg: "icons/borden/voorrangsweg.svg",             // B1
  verplicht_fietspad: "icons/borden/verplicht_fietspad.svg", // G11
  gesloten_alle: "icons/borden/gesloten_alle.svg",           // C1
  verboden_fietsers: "icons/borden/verboden_fietsers.svg",   // C14
  inrijden_verboden: "icons/borden/inrijden_verboden.svg",   // C2
  rotonde: "icons/borden/rotonde.svg"                        // D1
};

const LESSEN = [
  {
    id: 1, titel: "Waar fiets je?",
    onthoud: "Fietspad of fietsstrook? Gebruiken. Anders rechts op de weg.",
    tekst: [
      { kop: "", body: "Als fietser mag je niet overal rijden. De regel is: gebruik het fietspad of de fietsstrook als die er is." },
      { kop: "Fietspad", body: "Een apart pad alleen voor fietsers (soms ook brommers). Staat er een rond blauw bord met een fiets? Dan moet je dat pad gebruiken." },
      { kop: "Fietsstrook", body: "Een strook op de gewone weg, vaak rood geverfd en met een witte streep ernaast. Ook die moet je gebruiken als hij er is." },
      { kop: "Geen fietspad of strook?", body: "Dan fiets je op de rijbaan, zo veel mogelijk rechts. Nooit op de stoep: die is voor voetgangers." },
      { kop: "Naast elkaar", body: "Je mag met z'n tweeen naast elkaar fietsen, niet met meer. Houd je daarmee ander verkeer op, ga dan achter elkaar fietsen." }
    ]
  },
  {
    id: 2, titel: "Voorrang: wie mag eerst?",
    onthoud: "Agent, verkeerslicht, bord of haaientanden, dan pas rechts gaat voor.",
    tekst: [
      { kop: "", body: "Voorrang hebben betekent: jij mag eerst. Voorrang verlenen betekent: jij wacht en laat de ander eerst gaan." },
      { kop: "Stap 1: agenten en verkeerslichten", body: "Staat er een verkeersregelaar of agent? Die gaat boven alles. Daarna komen verkeerslichten, dan borden, en pas als die er niet zijn de gewone regels." },
      { kop: "Stap 2: borden en haaientanden", body: "Haaientanden zijn witte driehoekjes op de weg met de punt naar jou toe. Zie je ze bij jouw kant? Dan moet jij voorrang verlenen aan de bestuurders op de weg die je kruist." },
      { kop: "Stap 3: rechts gaat voor", body: "Op een kruispunt zonder borden en haaientanden heeft verkeer dat van rechts komt voorrang. Een auto van rechts mag dus eerst, ook als jij op de fiets zit." },
      { kop: "Uitzonderingen", body: "Een tram heeft op een gewoon kruispunt altijd voorrang, ook van links. Kom je uit een uitrit, zandweg of woonerf, dan laat je iedereen voorgaan, ook voetgangers. Wil je afslaan, dan laat je verkeer dat rechtdoor gaat eerst gaan." }
    ]
  },
  {
    id: 3, titel: "Verkeersborden",
    onthoud: "Rode rand = verboden. Blauw rond = moet. Driehoek = pas op.",
    tekst: [
      { kop: "", body: "Aan de vorm en kleur zie je meteen wat voor bord het is. Rond met rode rand: iets is verboden. Rond en blauw: iets moet (een gebod). Driehoek met rode rand en punt omhoog: waarschuwing. Rechthoekig blauw: informatie." }
    ],
    borden: [
      { svg: "voorrang_verlenen", naam: "Voorrang verlenen", uitleg: "Wacht op verkeer van beide kanten." },
      { svg: "stop", naam: "Stop", uitleg: "Helemaal stilstaan, dan voorrang verlenen." },
      { svg: "voorrangsweg", naam: "Voorrangsweg", uitleg: "Jij rijdt op de weg met voorrang." },
      { svg: "verplicht_fietspad", naam: "Verplicht fietspad", uitleg: "Hier moet je fietsen." },
      { svg: "gesloten_alle", naam: "Gesloten voor alle verkeer", uitleg: "Hier mag je niet in." },
      { svg: "verboden_fietsers", naam: "Verboden voor fietsers", uitleg: "Hier mag je niet fietsen." },
      { svg: "inrijden_verboden", naam: "Inrijden verboden", uitleg: "Vaak bij een eenrichtingsweg." },
      { svg: "rotonde", naam: "Rotonde", uitleg: "Rondgaand verkeer." }
    ]
  },
  {
    id: 4, titel: "Verkeerslichten en agenten",
    onthoud: "Rood en oranje: stoppen. Een agent gaat boven het licht.",
    tekst: [
      { kop: "Rood", body: "Stoppen en wachten, ook als er niemand aankomt." },
      { kop: "Oranje (geel)", body: "Stoppen. Alleen als je al zo dichtbij bent dat je niet meer veilig kunt stoppen, rijd je door." },
      { kop: "Groen", body: "Je mag gaan, maar kijk of het veilig is. Wie afslaat moet nog steeds voorrang geven aan verkeer dat rechtdoor gaat." },
      { kop: "Fietslicht", body: "Veel kruispunten hebben een apart fietslicht met een fietsje erin. Dat licht is voor jou, niet het licht voor de auto's." },
      { kop: "Agent", body: "Wijst een agent of verkeersregelaar iets aan? Dan doe je wat hij zegt, ook als het verkeerslicht iets anders laat zien." }
    ]
  },
  {
    id: 5, titel: "Afslaan",
    onthoud: "Kijken, arm uit, voorsorteren, voorrang geven, afslaan.",
    tekst: [
      { kop: "Rechtsaf", body: "Kijk achterom of er iemand naast of achter je zit. Steek je rechterarm uit. Laat voetgangers en fietsers die rechtdoor gaan eerst. Sla dan af." },
      { kop: "Linksaf (moeilijker)", body: "Kijk achterom over je linkerschouder. Steek je linkerarm uit. Ga naar het midden van de weg of in het vak voor linksaf (voorsorteren). Laat tegemoetkomend verkeer dat rechtdoor gaat eerst gaan. Sla af met je arm weer aan het stuur." }
    ]
  },
  {
    id: 6, titel: "De rotonde",
    onthoud: "Rechtsom rijden, haaientanden bepalen de voorrang, arm uit bij eraf gaan.",
    tekst: [
      { kop: "", body: "Je rijdt een rotonde altijd rechtsom (tegen de klok in) op." },
      { kop: "Voorrang", body: "Wie voorrang heeft zie je aan de haaientanden. Staan ze bij jouw kant, dan laat je het verkeer op de rotonde eerst gaan." },
      { kop: "Fietspad rond de rotonde", body: "Binnen de bebouwde kom hebben fietsers daar meestal voorrang, buiten de bebouwde kom meestal niet. Kijk dus altijd naar de haaientanden." },
      { kop: "Eraf gaan", body: "Steek je rechterarm uit als je de rotonde verlaat." }
    ]
  },
  {
    id: 7, titel: "Oversteken en voetgangers",
    onthoud: "Zebrapad: voetgangers gaan voor. Lopend naast je fiets ben je voetganger.",
    tekst: [
      { kop: "Zebrapad", body: "Een voetganger op of vlak bij een zebrapad die wil oversteken, moet je laten gaan. Wil jij met je fiets oversteken op een zebrapad, dan heb je alleen voorrang als je naast je fiets loopt. Dan ben je voetganger." },
      { kop: "Oversteken zonder zebrapad", body: "Zoek een plek waar je ver kunt kijken, niet tussen geparkeerde auto's. Kijk links, rechts en weer links. Steek recht over, niet schuin, en ga pas als het echt vrij is." },
      { kop: "Bus bij de halte", body: "Binnen de bebouwde kom moet je een bus die bij de halte wegrijdt en richting aangeeft laten vertrekken." }
    ]
  },
  {
    id: 8, titel: "Gevaren",
    onthoud: "Nooit rechts naast een vrachtwagen. Telefoon weg tijdens het fietsen.",
    tekst: [
      { kop: "Dode hoek", body: "Een vrachtwagen- of buschauffeur kan je rechts naast en vlak voor zijn wagen niet zien. Ga dus nooit rechts naast een vrachtwagen staan bij een kruispunt. Blijf erachter en houd een paar meter afstand." },
      { kop: "Telefoon", body: "Een telefoon vasthouden tijdens het fietsen is verboden. Ook appen of bellen met je telefoon in je hand mag niet. Je krijgt er een boete voor." },
      { kop: "Portier", body: "Fiets je langs geparkeerde auto's? Houd een beetje afstand, want er kan zomaar een autodeur opengaan." }
    ]
  },
  {
    id: 9, titel: "Je fiets in orde",
    onthoud: "Remmen, bel, lichten, reflectoren. Check ze samen met je vader of moeder.",
    tekst: [
      { kop: "", body: "Voor het praktijkexamen wordt je fiets gecontroleerd. Deze dingen moeten goed zijn:" },
      { kop: "Op de fiets", body: "Minstens een rem die goed werkt. Een bel die je goed hoort. Een wit of geel lampje voor en een rood lampje achter, dat werkt. Een rode reflector achter. Gele reflectoren op de trappers. Reflectie in de wielen of op de banden aan de zijkant. Goede banden en een stuur dat vastzit." },
      { kop: "Lichten aan", body: "In het donker en bij slecht zicht moeten je lampjes aan." }
    ]
  }
];

// De vragen. juist = index (0, 1 of 2) in de opties.
const VRAGEN = [
  // Les 1
  { les: 1, bron: "toets", vraag: "Er ligt een fietsstrook op de weg. Mag je gewoon op de rijbaan fietsen?", opties: ["Ja, dat mag altijd", "Nee, je moet de fietsstrook gebruiken", "Alleen als het druk is"], juist: 1, uitleg: "Is er een fietspad of fietsstrook, dan moet je die gebruiken." },
  { les: 1, bron: "toets", vraag: "Met hoeveel mag je naast elkaar fietsen?", opties: ["Twee", "Drie", "Zoveel als je wilt"], juist: 0, uitleg: "Maximaal twee naast elkaar. Houd je ander verkeer op, ga dan achter elkaar." },
  { les: 1, bron: "toets", vraag: "Er is geen fietspad en geen fietsstrook. Waar fiets je?", opties: ["Op de stoep", "Op de rijbaan, zo veel mogelijk rechts", "In het midden van de weg"], juist: 1, uitleg: "Zonder fietspad of strook fiets je rechts op de rijbaan. De stoep is voor voetgangers." },
  { les: 1, bron: "lesstof", vraag: "Er staat een rond blauw bord met een witte fiets. Wat moet je doen?", opties: ["Op de rijbaan blijven", "Het fietspad gebruiken", "Afstappen"], juist: 1, uitleg: "Een rond blauw bord met een fiets betekent verplicht fietspad: hier moet je fietsen." },
  { les: 1, bron: "lesstof", vraag: "Mag je op de stoep fietsen als het druk is op de weg?", opties: ["Ja", "Nee, de stoep is voor voetgangers", "Alleen heel langzaam"], juist: 1, uitleg: "De stoep is voor voetgangers. Je fietst op het fietspad of rechts op de rijbaan." },
  { les: 1, bron: "lesstof", vraag: "Je fietst naast een vriend en jullie houden auto's achter je op. Wat doe je?", opties: ["Naast elkaar blijven", "Achter elkaar gaan fietsen", "Sneller fietsen"], juist: 1, uitleg: "Twee naast elkaar mag, maar hou je ander verkeer op, ga dan achter elkaar." },
  { les: 1, bron: "lesstof", vraag: "Aan welke kant van de rijbaan fiets je als er geen fietspad is?", opties: ["Zo veel mogelijk links", "In het midden", "Zo veel mogelijk rechts"], juist: 2, uitleg: "Zonder fietspad of strook fiets je zo veel mogelijk rechts op de rijbaan." },

  // Les 2
  { les: 2, bron: "toets", vraag: "Je fietst op een kruispunt zonder borden, haaientanden of verkeerslichten. Een auto komt van rechts. Wie mag eerst?", opties: ["Ik, want ik ben op de fiets", "De auto, want die komt van rechts", "Wie het eerst bij het kruispunt is"], juist: 1, uitleg: "Zonder borden en haaientanden geldt: verkeer van rechts heeft voorrang, ook auto's." },
  { les: 2, bron: "toets", vraag: "Wat betekenen haaientanden aan jouw kant van de weg?", opties: ["Ik heb voorrang", "Ik moet voorrang verlenen", "Hier mag ik niet fietsen"], juist: 1, uitleg: "Haaientanden met de punt naar jou toe: jij verleent voorrang aan het verkeer op de kruisende weg." },
  { les: 2, bron: "toets", vraag: "Je komt uit een parkeerplaats (een uitrit). Wie moet je voor laten gaan?", opties: ["Alleen auto's", "Alleen verkeer van rechts", "Iedereen, ook voetgangers"], juist: 2, uitleg: "Wie uit een uitrit, van een zandweg of uit een woonerf komt, laat al het verkeer voorgaan, ook voetgangers." },
  { les: 2, bron: "toets", vraag: "Je slaat linksaf. Er komt een fietser tegemoet die rechtdoor gaat. Wie mag eerst?", opties: ["Ik, ik gaf richting aan", "De fietser die rechtdoor gaat", "Wie het snelst is"], juist: 1, uitleg: "Wie afslaat, laat verkeer op dezelfde weg dat rechtdoor gaat eerst gaan." },
  { les: 2, bron: "toets", vraag: "Een tram komt van links op een kruispunt zonder borden. Wie heeft voorrang?", opties: ["Ik, want ik kom van rechts", "De tram", "Niemand"], juist: 1, uitleg: "Een tram heeft op een gewoon kruispunt voorrang, ook als hij van links komt." },
  { les: 2, bron: "toets", vraag: "Je slaat rechtsaf een zijstraat in. Een voetganger steekt die zijstraat over. Wat doe je?", opties: ["Bellen en doorrijden", "De voetganger eerst laten gaan", "Om de voetganger heen fietsen"], juist: 1, uitleg: "Wie afslaat, laat het verkeer op dezelfde weg dat rechtdoor gaat eerst gaan. Daar hoort deze voetganger ook bij." },
  { les: 2, bron: "lesstof", vraag: "Wat is de juiste volgorde om te bepalen wie voorrang heeft?", opties: ["Rechts, dan bord, dan agent", "Agent, dan verkeerslicht, dan bord of haaientanden, dan rechts", "Wie het grootst is gaat voor"], juist: 1, uitleg: "Eerst de agent, dan het verkeerslicht, dan borden of haaientanden, en pas daarna geldt rechts gaat voor." },
  { les: 2, bron: "lesstof", vraag: "Jij komt van rechts, iemand anders komt van links, geen borden. Wie mag eerst?", opties: ["Ik", "De ander", "Tegelijk"], juist: 0, uitleg: "Verkeer van rechts gaat voor. Jij komt van rechts, dus jij mag eerst." },
  { les: 2, bron: "lesstof", vraag: "Wat betekent voorrang verlenen?", opties: ["Ik mag eerst", "Ik wacht en laat de ander eerst gaan", "Ik toeter"], juist: 1, uitleg: "Voorrang verlenen betekent: jij wacht en laat de ander eerst gaan." },

  // Les 3
  { les: 3, bron: "toets", vraag: "Een rond bord met een rode rand betekent meestal...", opties: ["Iets is verboden", "Iets moet", "Pas op, gevaar"], juist: 0, uitleg: "Rond met rode rand = verbod. Rond en blauw = gebod. Driehoek = waarschuwing." },
  { les: 3, bron: "toets", vraag: "Een rond blauw bord met een witte fiets betekent...", opties: ["Hier mag je niet fietsen", "Verplicht fietspad", "Fietsenstalling"], juist: 1, uitleg: "Blauw rond is een gebod: hier moet je fietsen." },
  { les: 3, bron: "lesstof", vraag: "Een driehoekig bord met een rode rand en de punt omhoog betekent...", opties: ["Verbod", "Waarschuwing, pas op", "Informatie"], juist: 1, uitleg: "Een driehoek met rode rand en punt omhoog is een waarschuwingsbord." },
  { les: 3, bron: "lesstof", vraag: "Een rechthoekig blauw bord betekent meestal...", opties: ["Informatie", "Verbod", "Gebod"], juist: 0, uitleg: "Rechthoekig blauw is een informatiebord." },
  { les: 3, bron: "lesstof", vraag: "Een rond en blauw bord betekent...", opties: ["Iets is verboden", "Iets moet (een gebod)", "Pas op"], juist: 1, uitleg: "Rond en blauw is een gebod: iets moet." },
  { les: 3, bron: "lesstof", toonBord: "voorrang_verlenen", vraag: "Welk bord is dit?", opties: ["Stop", "Voorrang verlenen", "Rotonde"], juist: 1, uitleg: "Een omgekeerde driehoek met rode rand: voorrang verlenen. Wacht op verkeer van beide kanten." },
  { les: 3, bron: "lesstof", toonBord: "verboden_fietsers", vraag: "Welk bord is dit?", opties: ["Verplicht fietspad", "Verboden voor fietsers", "Fietsenstalling"], juist: 1, uitleg: "Een rode rand betekent een verbod. Hier mag je niet fietsen." },
  { les: 3, bron: "lesstof", toonBord: "voorrangsweg", vraag: "Welk bord is dit?", opties: ["Voorrangsweg", "Waarschuwing", "Gesloten voor alle verkeer"], juist: 0, uitleg: "De gele ruit betekent: jij rijdt op de voorrangsweg." },
  { les: 3, bron: "lesstof", toonBord: "rotonde", vraag: "Welk bord is dit?", opties: ["Inrijden verboden", "Rotonde, rondgaand verkeer", "Verplicht fietspad"], juist: 1, uitleg: "Rond en blauw met pijlen in een cirkel: een rotonde met rondgaand verkeer." },
  { les: 3, bron: "lesstof", toonBord: "inrijden_verboden", vraag: "Welk bord is dit?", opties: ["Inrijden verboden", "Stop", "Voorrangsweg"], juist: 0, uitleg: "Rode cirkel met witte balk: inrijden verboden, vaak bij een eenrichtingsweg." },

  // Les 4
  { les: 4, bron: "toets", vraag: "Een agent zegt dat je moet doorrijden, maar het verkeerslicht is rood. Wat doe je?", opties: ["Ik wacht op groen", "Ik doe wat de agent zegt", "Ik stap af en loop"], juist: 1, uitleg: "Aanwijzingen van een agent of verkeersregelaar gaan boven verkeerslichten, borden en regels." },
  { les: 4, bron: "toets", vraag: "Het verkeerslicht springt op oranje. Je bent nog een flink stuk van de streep. Wat doe je?", opties: ["Snel doorfietsen", "Stoppen", "Rechts afslaan"], juist: 1, uitleg: "Bij oranje stop je. Alleen als je niet meer veilig kunt stoppen, rijd je door." },
  { les: 4, bron: "lesstof", vraag: "Het licht is rood en er komt niemand aan. Wat doe je?", opties: ["Doorfietsen", "Stoppen en wachten", "Alleen kijken en gaan"], juist: 1, uitleg: "Bij rood stop je en wacht je, ook als er niemand aankomt." },
  { les: 4, bron: "lesstof", vraag: "Het is groen en jij wilt afslaan. Wat moet je nog doen?", opties: ["Meteen afslaan", "Voorrang geven aan verkeer dat rechtdoor gaat", "Toeteren"], juist: 1, uitleg: "Wie afslaat moet voorrang geven aan verkeer dat rechtdoor gaat, ook bij groen." },
  { les: 4, bron: "lesstof", vraag: "Er hangt een apart licht met een fietsje erin. Voor wie is dat?", opties: ["Voor de auto's", "Voor jou als fietser", "Voor voetgangers"], juist: 1, uitleg: "Een fietslicht met een fietsje erin is voor jou, niet het licht voor de auto's." },

  // Les 5
  { les: 5, bron: "toets", vraag: "Je wilt linksaf. Wat doe je als eerste?", opties: ["Arm uitsteken", "Achterom kijken", "Meteen afslaan"], juist: 1, uitleg: "Eerst achterom kijken of het veilig is, dan arm uit, voorsorteren, voorrang geven en afslaan." },
  { les: 5, bron: "lesstof", vraag: "Je slaat rechtsaf. Welke arm steek je uit?", opties: ["De linkerarm", "De rechterarm", "Geen arm"], juist: 1, uitleg: "Bij rechtsaf steek je je rechterarm uit." },
  { les: 5, bron: "lesstof", vraag: "Je slaat linksaf. Welke arm steek je uit?", opties: ["De rechterarm", "De linkerarm", "Beide armen"], juist: 1, uitleg: "Bij linksaf steek je je linkerarm uit." },
  { les: 5, bron: "lesstof", vraag: "Wat betekent voorsorteren?", opties: ["Harder gaan fietsen", "Naar het midden of het vak voor linksaf gaan", "Op de stoep gaan rijden"], juist: 1, uitleg: "Voorsorteren is naar het midden van de weg of in het vak voor linksaf gaan." },
  { les: 5, bron: "lesstof", vraag: "Wat is de goede volgorde bij afslaan?", opties: ["Afslaan, dan kijken", "Kijken, arm uit, voorsorteren, voorrang geven, afslaan", "Arm uit en meteen afslaan"], juist: 1, uitleg: "Onthoud: kijken, arm uit, voorsorteren, voorrang geven, afslaan." },

  // Les 6
  { les: 6, bron: "toets", vraag: "Hoe rijd je een rotonde op?", opties: ["Linksom", "Rechtsom (tegen de klok in)", "Dat maakt niet uit"], juist: 1, uitleg: "Je gaat altijd rechtsom de rotonde rond." },
  { les: 6, bron: "toets", vraag: "Waaraan zie je bij een rotonde wie voorrang heeft?", opties: ["Aan de haaientanden", "Aan de grootte van de auto", "Wie links rijdt"], juist: 0, uitleg: "Haaientanden laten zien wie moet wachten. Kijk er altijd naar." },
  { les: 6, bron: "lesstof", vraag: "Wanneer steek je je rechterarm uit op een rotonde?", opties: ["Als je de rotonde op gaat", "Als je de rotonde verlaat", "Nooit"], juist: 1, uitleg: "Je steekt je rechterarm uit als je de rotonde verlaat." },
  { les: 6, bron: "lesstof", vraag: "Haaientanden staan bij jouw kant van de rotonde. Wat doe je?", opties: ["Doorrijden, ik heb voorrang", "Het verkeer op de rotonde eerst laten gaan", "Toeteren"], juist: 1, uitleg: "Staan de haaientanden bij jouw kant, dan laat je het verkeer op de rotonde eerst gaan." },

  // Les 7
  { les: 7, bron: "toets", vraag: "Je fietst over een zebrapad. Heb je dan voorrang op auto's?", opties: ["Ja, altijd", "Nee, alleen als je naast je fiets loopt", "Alleen 's avonds"], juist: 1, uitleg: "Op een zebrapad hebben voetgangers voorrang. Loop je naast je fiets, dan ben je voetganger." },
  { les: 7, bron: "lesstof", vraag: "Een voetganger wil oversteken bij een zebrapad. Wat doe je?", opties: ["Doorrijden", "De voetganger laten gaan", "Bellen"], juist: 1, uitleg: "Een voetganger op of vlak bij een zebrapad die wil oversteken, moet je laten gaan." },
  { les: 7, bron: "lesstof", vraag: "Waar steek je het beste over als er geen zebrapad is?", opties: ["Tussen geparkeerde auto's", "Op een plek waar je ver kunt kijken", "Op een bocht"], juist: 1, uitleg: "Zoek een plek waar je ver kunt kijken, niet tussen geparkeerde auto's." },
  { les: 7, bron: "lesstof", vraag: "In welke volgorde kijk je bij het oversteken?", opties: ["Rechts, links", "Links, rechts en weer links", "Alleen vooruit"], juist: 1, uitleg: "Kijk links, rechts en weer links voordat je oversteekt." },
  { les: 7, bron: "lesstof", vraag: "Binnen de bebouwde kom rijdt een bus weg bij de halte en geeft richting aan. Wat doe je?", opties: ["Ik ga eerst", "Ik laat de bus vertrekken", "Ik toeter"], juist: 1, uitleg: "Binnen de bebouwde kom laat je een bus die bij de halte wegrijdt en richting aangeeft vertrekken." },

  // Les 8
  { les: 8, bron: "toets", vraag: "Waar kan een vrachtwagenchauffeur je niet zien?", opties: ["Ver achter de vrachtwagen", "Rechts naast de vrachtwagen", "Aan de overkant van de weg"], juist: 1, uitleg: "Rechts naast en vlak voor een vrachtwagen zit de dode hoek. Blijf erachter." },
  { les: 8, bron: "toets", vraag: "Mag je je telefoon vasthouden tijdens het fietsen?", opties: ["Ja, als je niet belt", "Nee, dat is verboden", "Alleen op een fietspad"], juist: 1, uitleg: "Een telefoon vasthouden tijdens het fietsen is verboden." },
  { les: 8, bron: "lesstof", vraag: "Je staat bij een kruispunt naast een vrachtwagen. Wat is veilig?", opties: ["Rechts naast de vrachtwagen blijven", "Erachter blijven met een paar meter afstand", "Er vlak voor gaan staan"], juist: 1, uitleg: "Ga nooit rechts naast een vrachtwagen staan. Blijf erachter en houd afstand." },
  { les: 8, bron: "lesstof", vraag: "Je fietst langs geparkeerde auto's. Waar moet je op letten?", opties: ["Dat er een deur opengaat, dus afstand houden", "Niks, gewoon dichtbij blijven", "Sneller gaan"], juist: 0, uitleg: "Er kan zomaar een autodeur opengaan. Houd een beetje afstand van geparkeerde auto's." },

  // Les 9
  { les: 9, bron: "toets", vraag: "Welke kleur lamp moet achter op je fiets?", opties: ["Wit", "Geel", "Rood"], juist: 2, uitleg: "Achter een rood licht, voor een wit of geel licht." },
  { les: 9, bron: "lesstof", vraag: "Welke kleur lamp mag voor op je fiets?", opties: ["Rood", "Wit of geel", "Blauw"], juist: 1, uitleg: "Voor op je fiets hoort een wit of geel lampje." },
  { les: 9, bron: "lesstof", vraag: "Hoeveel remmen die goed werken moet je fiets minstens hebben?", opties: ["Geen", "Minstens een", "Precies drie"], juist: 1, uitleg: "Je fiets moet minstens een rem hebben die goed werkt." },
  { les: 9, bron: "lesstof", vraag: "Wat moet je op je fiets goed kunnen horen?", opties: ["De bel", "De radio", "De ketting"], juist: 0, uitleg: "Een bel die je goed hoort hoort bij een goedgekeurde fiets." },
  { les: 9, bron: "lesstof", vraag: "Welke kleur hebben de reflectoren op de trappers?", opties: ["Rood", "Geel", "Wit"], juist: 1, uitleg: "Op de trappers horen gele reflectoren." },
  { les: 9, bron: "lesstof", vraag: "Wanneer moeten je fietslampjes aan?", opties: ["Alleen overdag", "In het donker en bij slecht zicht", "Nooit"], juist: 1, uitleg: "In het donker en bij slecht zicht moeten je lampjes aan." }
];
