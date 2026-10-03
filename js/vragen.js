// Vragenbank en lesstof voor het verkeersexamen (groep 8).
// Bron lesstof: Verkeersregels-groep8.pdf + de officiele VVN-stof (verkeersregels.vvn.nl,
// examen.vvn.nl). Het echte theoretisch verkeersexamen is 25 vragen (16 goed = geslaagd),
// vanuit de rol van fietser, voetganger en passagier.
//
// Elke vraag heeft een "niveau": 1 = beginner, 2 = midden, 3 = expert.
// De oefentool laat je een niveau kiezen. Beginner = alleen niveau 1. Midden = niveau 1 + 2.
// Expert = alles (1 + 2 + 3), inclusief de moeilijke strik- en situatievragen.
//
// De 20 vragen uit de oefentoets van de PDF staan er letterlijk in (bron "toets").

// Echte Nederlandse RVV-verkeersborden (officiele SVG's van Wikimedia Commons, publiek domein),
// als bestand in icons/borden/, zodat ze ook offline werken.
const BORDEN = {
  voorrang_verlenen: "icons/borden/voorrang_verlenen.svg",       // B6
  stop: "icons/borden/stop.svg",                                 // B7
  voorrangsweg: "icons/borden/voorrangsweg.svg",                 // B1
  verplicht_fietspad: "icons/borden/verplicht_fietspad.svg",     // G11
  onverplicht_fietspad: "icons/borden/onverplicht_fietspad.svg", // G13
  bromfietspad: "icons/borden/bromfietspad.svg",                 // G12a
  gesloten_alle: "icons/borden/gesloten_alle.svg",               // C1
  verboden_fietsers: "icons/borden/verboden_fietsers.svg",       // C14
  inrijden_verboden: "icons/borden/inrijden_verboden.svg",       // C2
  rotonde: "icons/borden/rotonde.svg",                           // D1
  bebouwde_kom: "icons/borden/bebouwde_kom.svg",                 // H1
  einde_bebouwde_kom: "icons/borden/einde_bebouwde_kom.svg",     // H2
  zone30: "icons/borden/zone30.svg",                             // A1 zone 30
  oversteekplaats: "icons/borden/oversteekplaats.svg",           // L2 (zebrapad)
  waarschuwing_voetgangers: "icons/borden/waarschuwing_voetgangers.svg", // J23
  waarschuwing_kinderen: "icons/borden/waarschuwing_kinderen.svg"        // J21
};

const LESSEN = [
  {
    id: 1, titel: "Waar fiets je?",
    onthoud: "Fietspad of fietsstrook? Gebruiken. Anders rechts op de rijbaan. Nooit op de stoep.",
    tekst: [
      { kop: "", body: "Als fietser mag je niet overal rijden. De hoofdregel is: gebruik het fietspad of de fietsstrook als die er is." },
      { kop: "Verplicht fietspad", body: "Een rond blauw bord met een witte fiets betekent verplicht fietspad: hier moet je fietsen. Je mag dan niet op de rijbaan." },
      { kop: "Onverplicht fietspad", body: "Een rechthoekig bord met het woord FIETSPAD is een onverplicht fietspad. Je mag er fietsen, maar het hoeft niet; je mag ook op de rijbaan." },
      { kop: "Fietsstrook", body: "Een strook op de gewone weg, vaak rood geverfd en met een witte streep (soms een onderbroken streep) ernaast. Is die er, dan gebruik je die." },
      { kop: "Bromfietspad", body: "Een rond blauw bord met een fiets en een bromfiets is een fiets/bromfietspad: daar rijden fietsers en bromfietsers samen. Let dan extra op bromfietsers." },
      { kop: "Geen fietspad of strook?", body: "Dan fiets je op de rijbaan, zo veel mogelijk rechts. Nooit op de stoep: die is voor voetgangers." },
      { kop: "Naast elkaar", body: "Je mag met z'n tweeen naast elkaar fietsen, niet met meer. Houd je daarmee ander verkeer op, ga dan achter elkaar fietsen." }
    ],
    borden: [
      { svg: "verplicht_fietspad", naam: "Verplicht fietspad", uitleg: "Rond en blauw met een fiets: hier moet je fietsen." },
      { svg: "onverplicht_fietspad", naam: "Onverplicht fietspad", uitleg: "Rechthoekig bord FIETSPAD: fietsen mag, hoeft niet." },
      { svg: "bromfietspad", naam: "Fiets/bromfietspad", uitleg: "Fietsers en bromfietsers samen op dit pad." },
      { svg: "verboden_fietsers", naam: "Verboden voor fietsers", uitleg: "Hier mag je juist niet fietsen." }
    ]
  },
  {
    id: 2, titel: "Binnen en buiten de bebouwde kom",
    onthoud: "Blauw bord met plaatsnaam = begin bebouwde kom (binnen 50). Doorgestreept = einde (buiten 80).",
    tekst: [
      { kop: "", body: "Veel regels zijn anders binnen de bebouwde kom (in het dorp of de stad) dan erbuiten (op de weg tussen plaatsen). Je ziet aan een bord waar je bent." },
      { kop: "Begin bebouwde kom", body: "Een blauw rechthoekig bord met de plaatsnaam erop (bord H1) betekent: hier begint de bebouwde kom. Vanaf dat bord ben je binnen de bebouwde kom. Auto's mogen er meestal niet harder dan 50 km per uur." },
      { kop: "Einde bebouwde kom", body: "Hetzelfde bord, maar met de plaatsnaam er met een rode streep doorheen (bord H2), betekent: hier eindigt de bebouwde kom. Daarna ben je buiten de bebouwde kom. Auto's mogen er meestal 80 km per uur, dus ze rijden harder. Let daar extra op." },
      { kop: "Zone 30", body: "In een woonwijk zie je vaak een bord met 30 in een zone. Daar mag je nog langzamer en spelen er vaak kinderen. Extra opletten dus." },
      { kop: "Wat is er anders?", body: "Binnen de bebouwde kom: je moet een bus bij de halte die wegrijdt en richting aangeeft laten voorgaan. Op een rotonde met een fietspad eromheen hebben fietsers er meestal voorrang. Buiten de bebouwde kom geldt dat voor de bus niet, en op een rotonde heb je meestal geen voorrang. Kijk daarom altijd naar de haaientanden; die beslissen." }
    ],
    borden: [
      { svg: "bebouwde_kom", naam: "Begin bebouwde kom", uitleg: "Vanaf hier binnen de kom, auto's meestal 50." },
      { svg: "einde_bebouwde_kom", naam: "Einde bebouwde kom", uitleg: "Naam doorgestreept: buiten de kom, auto's meestal 80." },
      { svg: "zone30", naam: "Zone 30", uitleg: "Woonwijk, langzaam rijden, pas op kinderen." }
    ]
  },
  {
    id: 3, titel: "Voorrang: wie mag eerst?",
    onthoud: "Agent, dan verkeerslicht, dan bord of haaientanden, en pas daarna: rechts gaat voor.",
    tekst: [
      { kop: "", body: "Voorrang hebben betekent: jij mag eerst. Voorrang verlenen betekent: jij wacht en laat de ander eerst gaan. Voorgaan is iets anders: dat gaat over wie er eerst bij is op dezelfde weg." },
      { kop: "Stap 1: agent en verkeerslicht", body: "Staat er een verkeersregelaar of agent? Die gaat boven alles. Daarna komen de verkeerslichten, dan de borden, en pas als die er niet zijn de gewone regels." },
      { kop: "Stap 2: borden en haaientanden", body: "Haaientanden zijn witte driehoekjes op de weg met de punt naar jou toe. Zie je ze aan jouw kant, dan moet jij voorrang verlenen aan het verkeer op de weg die je kruist. Een omgekeerde driehoek (bord B6) betekent hetzelfde. Een stopbord (B7) betekent: eerst echt stilstaan, dan voorrang verlenen." },
      { kop: "Stap 3: rechts gaat voor", body: "Op een kruispunt zonder borden en zonder haaientanden heeft verkeer dat van rechts komt voorrang. Een auto van rechts mag dus eerst, ook als jij op de fiets zit. En jij hebt voorrang op iemand die van links komt." },
      { kop: "Uitzonderingen", body: "Een tram heeft op een gewoon kruispunt altijd voorrang, ook van links. Kom je uit een uitrit, een parkeerplaats, een zandweg of een woonerf, dan laat je iedereen voorgaan, ook voetgangers. Wil je afslaan, dan laat je verkeer dat op dezelfde weg rechtdoor gaat eerst gaan." }
    ],
    borden: [
      { svg: "voorrang_verlenen", naam: "Voorrang verlenen", uitleg: "Omgekeerde driehoek: wacht op verkeer van beide kanten." },
      { svg: "voorrangsweg", naam: "Voorrangsweg", uitleg: "Gele ruit: jij rijdt op de weg met voorrang." },
      { svg: "stop", naam: "Stop", uitleg: "Eerst helemaal stilstaan, dan voorrang verlenen." }
    ]
  },
  {
    id: 4, titel: "Verkeersborden",
    onthoud: "Rode rand = verboden. Blauw rond = moet. Driehoek = pas op. Rechthoekig blauw = informatie.",
    tekst: [
      { kop: "", body: "Aan de vorm en de kleur zie je meteen wat voor bord het is." },
      { kop: "De vormen", body: "Rond met een rode rand: iets is verboden. Rond en blauw: iets moet (een gebod). Driehoek met rode rand en de punt omhoog: een waarschuwing, pas op. Rechthoekig blauw: informatie." },
      { kop: "Waarschuwingsborden", body: "Een driehoek waarschuwt je voor gevaar: bijvoorbeeld overstekende voetgangers (bord J23) of kinderen in de buurt van een school (bord J21). Rustig aan en goed kijken." }
    ],
    borden: [
      { svg: "voorrang_verlenen", naam: "Voorrang verlenen", uitleg: "Omgekeerde driehoek, rode rand." },
      { svg: "stop", naam: "Stop", uitleg: "Stilstaan en voorrang verlenen." },
      { svg: "voorrangsweg", naam: "Voorrangsweg", uitleg: "Jij hebt voorrang." },
      { svg: "verplicht_fietspad", naam: "Verplicht fietspad", uitleg: "Blauw rond = gebod." },
      { svg: "gesloten_alle", naam: "Gesloten voor alle verkeer", uitleg: "Hier mag je niet in." },
      { svg: "verboden_fietsers", naam: "Verboden voor fietsers", uitleg: "Rode rand = verbod." },
      { svg: "inrijden_verboden", naam: "Inrijden verboden", uitleg: "Vaak bij een eenrichtingsweg." },
      { svg: "rotonde", naam: "Rotonde", uitleg: "Rondgaand verkeer." },
      { svg: "waarschuwing_voetgangers", naam: "Pas op: voetgangers", uitleg: "Driehoek: overstekende voetgangers." },
      { svg: "waarschuwing_kinderen", naam: "Pas op: kinderen", uitleg: "Driehoek: kinderen, vaak bij een school." }
    ]
  },
  {
    id: 5, titel: "Verkeerslichten en agenten",
    onthoud: "Rood en oranje: stoppen. Groen: gaan als het veilig is. Een agent gaat boven het licht.",
    tekst: [
      { kop: "Rood", body: "Stoppen en wachten, ook als er niemand aankomt." },
      { kop: "Oranje (geel)", body: "Stoppen. Alleen als je al zo dichtbij bent dat je niet meer veilig kunt stoppen, rijd je door." },
      { kop: "Groen", body: "Je mag gaan, maar kijk eerst of het veilig is. Wie afslaat moet nog steeds voorrang geven aan verkeer dat rechtdoor gaat en aan voetgangers." },
      { kop: "Fietslicht", body: "Veel kruispunten hebben een apart fietslicht met een fietsje erin. Dat licht is voor jou, niet het licht voor de auto's." },
      { kop: "Knipperend geel", body: "Een knipperend geel licht betekent: let op, de gewone voorrangsregels gelden. Je mag voorzichtig doorrijden." },
      { kop: "Agent", body: "Wijst een agent of verkeersregelaar iets aan? Dan doe je wat hij zegt, ook als het verkeerslicht iets anders laat zien." }
    ]
  },
  {
    id: 6, titel: "Afslaan",
    onthoud: "Kijken, arm uit, voorsorteren, voorrang geven, afslaan.",
    tekst: [
      { kop: "Rechtsaf", body: "Kijk achterom of er iemand naast of achter je zit (ook in je dode hoek). Steek je rechterarm uit. Laat voetgangers en fietsers die rechtdoor gaan eerst. Sla dan af." },
      { kop: "Linksaf (moeilijker)", body: "Kijk achterom over je linkerschouder. Steek je linkerarm uit. Ga naar het midden van de weg of in het vak voor linksaf (voorsorteren). Laat tegemoetkomend verkeer dat rechtdoor gaat eerst gaan. Sla af met je arm weer aan het stuur." },
      { kop: "Let op de dode hoek", body: "Kijk bij afslaan goed om je heen. Naast en achter je zit een plek die je niet in je ooghoek ziet. Draai dus echt je hoofd." }
    ]
  },
  {
    id: 7, titel: "De rotonde",
    onthoud: "Rechtsom rijden, haaientanden bepalen de voorrang, arm uit als je eraf gaat.",
    tekst: [
      { kop: "", body: "Je rijdt een rotonde altijd rechtsom (tegen de klok in) op." },
      { kop: "Voorrang", body: "Wie voorrang heeft zie je aan de haaientanden. Staan ze aan jouw kant, dan laat je het verkeer dat al op de rotonde rijdt eerst gaan." },
      { kop: "Fietspad rond de rotonde", body: "Ligt er een fietspad om de rotonde, dan hangt het van de bebouwde kom af. Binnen de bebouwde kom hebben fietsers er meestal voorrang, buiten de bebouwde kom meestal niet. Kijk daarom altijd naar de haaientanden en vertrouw er nooit blind op dat een auto stopt." },
      { kop: "Eraf gaan", body: "Steek je rechterarm uit als je de rotonde verlaat, zodat anderen weten dat je eraf gaat." }
    ],
    borden: [
      { svg: "rotonde", naam: "Rotonde", uitleg: "Rond en blauw: je rijdt rechtsom." },
      { svg: "voorrang_verlenen", naam: "Voorrang verlenen", uitleg: "Haaientanden of dit bord: verkeer op de rotonde eerst." }
    ]
  },
  {
    id: 8, titel: "Oversteken en voetgangers",
    onthoud: "Zebrapad: voetgangers gaan voor. Lopend naast je fiets ben je zelf voetganger.",
    tekst: [
      { kop: "Zebrapad (voetgangersoversteekplaats)", body: "Bij een zebrapad hoort een blauw bord met een lopende persoon (bord L2). Een voetganger die op of vlak bij het zebrapad wil oversteken, moet je laten gaan. Dat geldt voor auto's en voor fietsers." },
      { kop: "Zelf oversteken met je fiets", body: "Wil jij met je fiets oversteken op een zebrapad, dan heb je alleen voorrang als je naast je fiets loopt. Dan ben je voetganger. Blijf je op je fiets zitten, dan heb je geen voorrang." },
      { kop: "Oversteken zonder zebrapad", body: "Zoek een plek waar je ver kunt kijken, niet tussen geparkeerde auto's of in een bocht. Kijk links, dan rechts, dan weer links. Steek recht over, niet schuin, en ga pas als het echt vrij is." },
      { kop: "Bus bij de halte", body: "Binnen de bebouwde kom moet je een bus die bij de halte wegrijdt en richting aangeeft laten vertrekken." }
    ],
    borden: [
      { svg: "oversteekplaats", naam: "Voetgangersoversteekplaats", uitleg: "Hier steken voetgangers over (zebrapad)." },
      { svg: "waarschuwing_voetgangers", naam: "Pas op: voetgangers", uitleg: "Driehoek: let op overstekende voetgangers." },
      { svg: "waarschuwing_kinderen", naam: "Pas op: kinderen", uitleg: "Driehoek: kinderen in de buurt." }
    ]
  },
  {
    id: 9, titel: "Grote voertuigen en de dode hoek",
    onthoud: "Nooit rechts naast een vrachtwagen. Zie je de spiegel niet, dan ziet de chauffeur jou ook niet.",
    tekst: [
      { kop: "Wat is de dode hoek?", body: "De dode hoek is de ruimte rond een vrachtwagen of bus waar de chauffeur je niet kan zien: vooral rechts naast de wagen, schuin rechts ervoor, vlak voor de cabine en vlak erachter." },
      { kop: "Bij een kruispunt", body: "Ga nooit rechts naast een vrachtwagen staan die rechtsaf kan slaan. Blijf er goed achter, of ga er juist ver vandaan staan. Een slim ezelsbruggetje: kun jij de spiegels van de chauffeur zien, dan kan hij jou ook zien." },
      { kop: "Afslaan en uitzwaaien", body: "Een vrachtwagen die afslaat, zwaait met de achterkant naar de andere kant uit. Houd dus altijd flink afstand van een afslaande vrachtwagen of bus." }
    ],
    borden: []
  },
  {
    id: 10, titel: "Voorrangsvoertuigen en bijzondere situaties",
    onthoud: "Zwaailicht EN sirene: altijd voor laten gaan, rustig naar de kant. Bij de spoorbomen: wachten.",
    tekst: [
      { kop: "Voorrangsvoertuig", body: "Een ambulance, politieauto of brandweerauto met zwaailicht EN sirene (de tweetonige hoorn) is een voorrangsvoertuig. Die moet je altijd voor laten gaan. Ga rustig en voorspelbaar naar de kant en stop als dat nodig is. Schrik niet en ga niet plotseling slingeren." },
      { kop: "Alleen een zwaailicht", body: "Zie je alleen een zwaailicht en hoor je geen sirene, dan is het geen voorrangsvoertuig. Je hoeft geen voorrang te geven, maar blijf wel opletten." },
      { kop: "Spoorwegovergang", body: "Knipperen er rode lichten of gaan de bomen dicht, dan stop je en wacht je. Ga nooit zigzaggend langs gesloten of halfgesloten bomen. Pas als de lichten uit zijn en de bomen open, steek je over." },
      { kop: "Inhalen", body: "Inhalen doe je links. Kijk eerst achterom of er niemand aankomt, geef zo nodig richting aan, en haal alleen in als je ver genoeg vooruit kunt kijken en het veilig is." }
    ],
    borden: []
  },
  {
    id: 11, titel: "Gevaren en afleiding",
    onthoud: "Telefoon weg, twee handen aan het stuur, afstand houden van geparkeerde auto's.",
    tekst: [
      { kop: "Telefoon", body: "Een telefoon vasthouden tijdens het fietsen is verboden. Ook appen of bellen met je telefoon in je hand mag niet. Je krijgt er een boete voor. Zet hem weg voordat je gaat fietsen." },
      { kop: "Muziek en oordopjes", body: "Met allebei je oren dicht hoor je het verkeer niet: geen aankomende auto, bel of sirene. Doe muziek zacht of laat een oor vrij." },
      { kop: "Portier", body: "Fiets je langs geparkeerde auto's, houd dan een beetje afstand. Er kan zomaar een autodeur opengaan." },
      { kop: "Snelheid en afstand", body: "Pas je snelheid aan als het druk of glad is, en houd afstand zodat je op tijd kunt remmen. Bij regen en in het donker zie je minder en is de weg gladder." }
    ],
    borden: []
  },
  {
    id: 12, titel: "Je fiets in orde",
    onthoud: "Remmen, bel, lichten, reflectoren. In het donker en bij slecht zicht de lampen aan.",
    tekst: [
      { kop: "", body: "Voor het praktijkexamen wordt je fiets gecontroleerd. Deze dingen moeten goed zijn:" },
      { kop: "Op de fiets", body: "Minstens een rem die goed werkt. Een bel die je goed hoort. Een wit of geel lampje voor en een rood lampje achter, dat werkt. Een rode reflector achter. Gele reflectoren op de trappers. Reflectie in de wielen of op de banden aan de zijkant. Goede banden en een stuur dat vastzit." },
      { kop: "Lichten aan", body: "In het donker en bij slecht zicht (bijvoorbeeld mist of harde regen) moeten je voorlamp en achterlamp aan. Zo zien anderen jou en zie jij de weg." }
    ],
    borden: []
  },
  {
    id: 13, titel: "Als passagier en met bagage",
    onthoud: "Gordel om, uitstappen aan de stoepkant. Bagage vast, niet aan het stuur.",
    tekst: [
      { kop: "In de auto", body: "Doe altijd je gordel om, ook achterin. Stap uit aan de kant van de stoep, niet aan de straatkant. Kijk eerst of er een fietser of auto aankomt voordat je het portier opent." },
      { kop: "Bagage op de fiets", body: "Zet je spullen vast op de bagagedrager of in een fietstas. Hang geen zware tas aan je stuur: dan ga je slingeren of slaat je stuur om. Houd twee handen aan het stuur." },
      { kop: "Iemand meenemen", body: "Iemand achterop meenemen mag alleen op een goede zitplaats met voetsteunen, zodat er geen voeten tussen de spaken komen." }
    ],
    borden: []
  }
];

// niveau: 1 = beginner, 2 = midden, 3 = expert.
const VRAGEN = [
  // ===== Les 1: Waar fiets je? =====
  { les: 1, niveau: 1, bron: "lesstof", vraag: "Er staat een rond blauw bord met een witte fiets. Wat moet je doen?", opties: ["Op de rijbaan blijven", "Het fietspad gebruiken", "Afstappen en lopen"], juist: 1, uitleg: "Een rond blauw bord met een fiets is een verplicht fietspad: hier moet je fietsen." },
  { les: 1, niveau: 1, bron: "lesstof", vraag: "Mag je op de stoep fietsen als het druk is op de weg?", opties: ["Ja", "Nee, de stoep is voor voetgangers", "Alleen heel langzaam"], juist: 1, uitleg: "De stoep is voor voetgangers. Jij fietst op het fietspad of rechts op de rijbaan." },
  { les: 1, niveau: 1, bron: "toets", vraag: "Met hoeveel mag je naast elkaar fietsen?", opties: ["Twee", "Drie", "Zoveel als je wilt"], juist: 0, uitleg: "Maximaal twee naast elkaar. Houd je ander verkeer op, ga dan achter elkaar." },
  { les: 1, niveau: 1, bron: "toets", vraag: "Er is geen fietspad en geen fietsstrook. Waar fiets je?", opties: ["Op de stoep", "Op de rijbaan, zo veel mogelijk rechts", "In het midden van de weg"], juist: 1, uitleg: "Zonder fietspad of strook fiets je rechts op de rijbaan. De stoep is voor voetgangers." },
  { les: 1, niveau: 2, bron: "toets", vraag: "Er ligt een fietsstrook op de weg. Mag je gewoon op de rijbaan fietsen?", opties: ["Ja, dat mag altijd", "Nee, je moet de fietsstrook gebruiken", "Alleen als het druk is"], juist: 1, uitleg: "Is er een fietspad of fietsstrook, dan moet je die gebruiken." },
  { les: 1, niveau: 2, bron: "lesstof", vraag: "Je fietst naast een vriend en jullie houden auto's achter je op. Wat doe je?", opties: ["Naast elkaar blijven", "Achter elkaar gaan fietsen", "Sneller fietsen"], juist: 1, uitleg: "Twee naast elkaar mag, maar hou je ander verkeer op, ga dan achter elkaar." },
  { les: 1, niveau: 2, bron: "lesstof", toonBord: "onverplicht_fietspad", vraag: "Dit rechthoekige bord met het woord FIETSPAD betekent...", opties: ["Verplicht fietspad, je moet hier fietsen", "Onverplicht fietspad, fietsen mag maar hoeft niet", "Verboden voor fietsers"], juist: 1, uitleg: "Een rechthoekig bord FIETSPAD is onverplicht: je mag er fietsen, maar mag ook op de rijbaan." },
  { les: 1, niveau: 2, bron: "lesstof", toonBord: "bromfietspad", vraag: "Wat betekent dit bord met een fiets en een bromfiets?", opties: ["Alleen bromfietsen", "Fiets/bromfietspad: fietsers en bromfietsers samen", "Verboden voor fietsers"], juist: 1, uitleg: "Dit is een fiets/bromfietspad. Let op bromfietsers die sneller gaan dan jij." },
  { les: 1, niveau: 3, bron: "lesstof", vraag: "Op een verplicht fietspad komt een snelle bromfietser achter je. Wat is het slimst?", opties: ["In het midden blijven fietsen", "Rechts houden zodat hij er veilig langs kan", "Plotseling naar links gaan"], juist: 1, uitleg: "Houd ook op het fietspad rechts, dan kan sneller verkeer je veilig voorbij." },
  { les: 1, niveau: 3, bron: "lesstof", vraag: "Er is alleen een onverplicht fietspad (rechthoekig bord). Je wilt zo linksaf. Wat mag?", opties: ["Alleen het fietspad gebruiken", "Je mag ook op de rijbaan rijden om voor te sorteren", "Je moet afstappen"], juist: 1, uitleg: "Bij een onverplicht fietspad mag je ook op de rijbaan, handig om linksaf voor te sorteren." },

  // ===== Les 2: Binnen en buiten de bebouwde kom =====
  { les: 2, niveau: 1, bron: "lesstof", toonBord: "bebouwde_kom", vraag: "Wat betekent dit blauwe bord met een plaatsnaam?", opties: ["Hier begint de bebouwde kom", "Hier eindigt de bebouwde kom", "Parkeerplaats"], juist: 0, uitleg: "Een blauw bord met de plaatsnaam is het begin van de bebouwde kom (bord H1)." },
  { les: 2, niveau: 1, bron: "lesstof", toonBord: "einde_bebouwde_kom", vraag: "De plaatsnaam is rood doorgestreept. Wat betekent dat?", opties: ["Begin bebouwde kom", "Einde bebouwde kom", "Doodlopende weg"], juist: 1, uitleg: "Een doorgestreepte plaatsnaam (bord H2) betekent: einde bebouwde kom. Daarna ben je erbuiten." },
  { les: 2, niveau: 1, bron: "lesstof", vraag: "Hoe hard mogen auto's meestal binnen de bebouwde kom?", opties: ["30 km/u", "50 km/u", "80 km/u"], juist: 1, uitleg: "Binnen de bebouwde kom meestal 50 km/u (in een zone soms 30)." },
  { les: 2, niveau: 2, bron: "lesstof", vraag: "Hoe hard mogen auto's meestal buiten de bebouwde kom?", opties: ["50 km/u", "80 km/u", "100 km/u"], juist: 1, uitleg: "Buiten de bebouwde kom meestal 80 km/u. Auto's gaan daar dus harder, let extra op." },
  { les: 2, niveau: 2, bron: "lesstof", toonBord: "zone30", vraag: "Je ziet een bord met 30 in een zone. Wat weet je nu?", opties: ["Hier mag je 80", "Langzame zone, vaak een woonwijk met kinderen", "Verboden voor fietsers"], juist: 1, uitleg: "In een 30-zone rijdt iedereen langzaam; er spelen vaak kinderen. Extra opletten." },
  { les: 2, niveau: 2, bron: "lesstof", vraag: "Binnen de bebouwde kom rijdt een bus weg bij de halte en geeft richting aan. Wat doe je?", opties: ["Ik ga eerst", "Ik laat de bus voorgaan", "Ik toeter"], juist: 1, uitleg: "Binnen de bebouwde kom laat je een wegrijdende bus die richting aangeeft voorgaan." },
  { les: 2, niveau: 3, bron: "lesstof", vraag: "Buiten de bebouwde kom rijdt een bus weg bij de halte. Moet je hem voor laten gaan?", opties: ["Ja, altijd", "Nee, die regel geldt alleen binnen de bebouwde kom", "Alleen 's avonds"], juist: 1, uitleg: "De regel om een wegrijdende bus voor te laten gaan geldt alleen binnen de bebouwde kom." },
  { les: 2, niveau: 3, bron: "lesstof", vraag: "Je nadert buiten de bebouwde kom een rotonde met een fietspad eromheen. Heb je voorrang?", opties: ["Ja, fietsers hebben altijd voorrang", "Niet zomaar; buiten de kom meestal niet, kijk naar de haaientanden", "Nee, nooit"], juist: 1, uitleg: "Buiten de bebouwde kom hebben fietsers op een rotonde meestal geen voorrang. De haaientanden beslissen." },
  { les: 2, niveau: 3, bron: "lesstof", vraag: "Waarom moet je buiten de bebouwde kom extra goed opletten bij het oversteken?", opties: ["Omdat het er donkerder is", "Omdat auto's er harder rijden (meestal 80) en later stoppen", "Omdat er geen borden staan"], juist: 1, uitleg: "Buiten de kom rijden auto's harder, dus ze hebben meer afstand nodig om te stoppen." },

  // ===== Les 3: Voorrang =====
  { les: 3, niveau: 1, bron: "toets", vraag: "Je fietst op een kruispunt zonder borden, haaientanden of verkeerslichten. Een auto komt van rechts. Wie mag eerst?", opties: ["Ik, want ik ben op de fiets", "De auto, want die komt van rechts", "Wie het eerst bij het kruispunt is"], juist: 1, uitleg: "Zonder borden en haaientanden geldt: verkeer van rechts heeft voorrang, ook auto's." },
  { les: 3, niveau: 1, bron: "toets", vraag: "Wat betekenen haaientanden aan jouw kant van de weg?", opties: ["Ik heb voorrang", "Ik moet voorrang verlenen", "Hier mag ik niet fietsen"], juist: 1, uitleg: "Haaientanden met de punt naar jou toe: jij verleent voorrang aan het verkeer op de kruisende weg." },
  { les: 3, niveau: 1, bron: "lesstof", vraag: "Wat betekent voorrang verlenen?", opties: ["Ik mag eerst", "Ik wacht en laat de ander eerst gaan", "Ik moet toeteren"], juist: 1, uitleg: "Voorrang verlenen betekent: jij wacht en laat de ander eerst gaan." },
  { les: 3, niveau: 2, bron: "lesstof", vraag: "Wat is de juiste volgorde om te bepalen wie voorrang heeft?", opties: ["Rechts, dan bord, dan agent", "Agent, dan verkeerslicht, dan bord of haaientanden, dan rechts", "Wie het grootst is gaat voor"], juist: 1, uitleg: "Eerst de agent, dan het verkeerslicht, dan de borden of haaientanden, en pas daarna geldt rechts gaat voor." },
  { les: 3, niveau: 2, bron: "lesstof", vraag: "Jij komt van rechts, iemand anders van links, geen borden. Wie mag eerst?", opties: ["Ik", "De ander", "Tegelijk"], juist: 0, uitleg: "Verkeer van rechts gaat voor. Jij komt van rechts, dus jij mag eerst." },
  { les: 3, niveau: 2, bron: "toets", vraag: "Je komt uit een parkeerplaats (een uitrit). Wie moet je voor laten gaan?", opties: ["Alleen auto's", "Alleen verkeer van rechts", "Iedereen, ook voetgangers"], juist: 2, uitleg: "Wie uit een uitrit, een zandweg of een woonerf komt, laat al het verkeer voorgaan, ook voetgangers." },
  { les: 3, niveau: 2, bron: "toets", vraag: "Een tram komt van links op een kruispunt zonder borden. Wie heeft voorrang?", opties: ["Ik, want ik kom van rechts", "De tram", "Niemand"], juist: 1, uitleg: "Een tram heeft op een gewoon kruispunt voorrang, ook als hij van links komt." },
  { les: 3, niveau: 2, bron: "lesstof", toonBord: "stop", vraag: "Je komt bij dit bord. Wat moet je doen?", opties: ["Alleen langzamer rijden", "Helemaal stilstaan en dan voorrang verlenen", "Doorrijden als je van rechts komt"], juist: 1, uitleg: "Bij een stopbord sta je eerst echt helemaal stil en verleen je daarna voorrang." },
  { les: 3, niveau: 3, bron: "toets", vraag: "Je slaat linksaf. Er komt een fietser tegemoet die rechtdoor gaat. Wie mag eerst?", opties: ["Ik, ik gaf richting aan", "De fietser die rechtdoor gaat", "Wie het snelst is"], juist: 1, uitleg: "Wie afslaat, laat verkeer op dezelfde weg dat rechtdoor gaat eerst gaan." },
  { les: 3, niveau: 3, bron: "toets", vraag: "Je slaat rechtsaf een zijstraat in. Een voetganger steekt die zijstraat over. Wat doe je?", opties: ["Bellen en doorrijden", "De voetganger eerst laten gaan", "Om de voetganger heen fietsen"], juist: 1, uitleg: "Wie afslaat laat het verkeer op dezelfde weg dat rechtdoor gaat voorgaan; daar hoort deze voetganger bij." },
  { les: 3, niveau: 3, bron: "lesstof", vraag: "Op een voorrangsweg (gele ruit) nadert van rechts een auto uit een gewone straat. Wie mag eerst?", opties: ["De auto van rechts", "Ik, want ik rijd op de voorrangsweg", "We stoppen allebei"], juist: 1, uitleg: "Een bord maakt de rechts-gaat-voor-regel ongedaan. Op de voorrangsweg heb jij voorrang." },

  // ===== Les 4: Verkeersborden =====
  { les: 4, niveau: 1, bron: "toets", vraag: "Een rond bord met een rode rand betekent meestal...", opties: ["Iets is verboden", "Iets moet", "Pas op, gevaar"], juist: 0, uitleg: "Rond met rode rand = verbod. Rond en blauw = gebod. Driehoek = waarschuwing." },
  { les: 4, niveau: 1, bron: "toets", vraag: "Een rond blauw bord met een witte fiets betekent...", opties: ["Hier mag je niet fietsen", "Verplicht fietspad", "Fietsenstalling"], juist: 1, uitleg: "Blauw rond is een gebod: hier moet je fietsen." },
  { les: 4, niveau: 1, bron: "lesstof", vraag: "Een driehoekig bord met rode rand en de punt omhoog betekent...", opties: ["Verbod", "Waarschuwing, pas op", "Informatie"], juist: 1, uitleg: "Een driehoek met rode rand en punt omhoog is een waarschuwingsbord." },
  { les: 4, niveau: 2, bron: "lesstof", vraag: "Een rechthoekig blauw bord betekent meestal...", opties: ["Informatie", "Verbod", "Gebod"], juist: 0, uitleg: "Rechthoekig blauw is een informatiebord." },
  { les: 4, niveau: 2, bron: "lesstof", toonBord: "verboden_fietsers", vraag: "Welk bord is dit?", opties: ["Verplicht fietspad", "Verboden voor fietsers", "Fietsenstalling"], juist: 1, uitleg: "Een rode rand betekent een verbod. Hier mag je niet fietsen." },
  { les: 4, niveau: 2, bron: "lesstof", toonBord: "voorrangsweg", vraag: "Welk bord is dit?", opties: ["Voorrangsweg", "Waarschuwing", "Gesloten voor alle verkeer"], juist: 0, uitleg: "De gele ruit betekent: jij rijdt op de voorrangsweg." },
  { les: 4, niveau: 2, bron: "lesstof", toonBord: "inrijden_verboden", vraag: "Welk bord is dit?", opties: ["Inrijden verboden", "Stop", "Voorrangsweg"], juist: 0, uitleg: "Rode cirkel met witte balk: inrijden verboden, vaak bij een eenrichtingsweg." },
  { les: 4, niveau: 2, bron: "lesstof", toonBord: "waarschuwing_kinderen", vraag: "Wat waarschuwt dit driehoekige bord?", opties: ["Pas op, kinderen (vaak bij een school)", "Hier mogen geen kinderen fietsen", "Speeltuin"], juist: 0, uitleg: "Een driehoek met kinderen waarschuwt: let op kinderen, bijvoorbeeld bij een school." },
  { les: 4, niveau: 3, bron: "lesstof", toonBord: "gesloten_alle", vraag: "Welk bord is dit en wat betekent het?", opties: ["Voorrangsweg", "Gesloten voor alle verkeer: hier mag je niet in", "Rotonde"], juist: 1, uitleg: "Een rode ring zonder tekening: gesloten voor alle verkeer, je mag er niet in." },
  { les: 4, niveau: 3, bron: "lesstof", toonBord: "rotonde", vraag: "Dit bord is rond en blauw. Wat betekent dat voor de vorm en de boodschap?", opties: ["Verbod: niet de rotonde op", "Gebod: rondgaand verkeer, je rijdt rechtsom", "Waarschuwing voor een rotonde"], juist: 1, uitleg: "Rond en blauw is een gebod. Dit rotondebord zegt: rondgaand verkeer, rechtsom rijden." },

  // ===== Les 5: Verkeerslichten en agenten =====
  { les: 5, niveau: 1, bron: "lesstof", vraag: "Het licht is rood en er komt niemand aan. Wat doe je?", opties: ["Doorfietsen", "Stoppen en wachten", "Even kijken en dan gaan"], juist: 1, uitleg: "Bij rood stop je en wacht je, ook als er niemand aankomt." },
  { les: 5, niveau: 1, bron: "toets", vraag: "Het verkeerslicht springt op oranje. Je bent nog een flink stuk van de streep. Wat doe je?", opties: ["Snel doorfietsen", "Stoppen", "Rechts afslaan"], juist: 1, uitleg: "Bij oranje stop je. Alleen als je niet meer veilig kunt stoppen, rijd je door." },
  { les: 5, niveau: 1, bron: "lesstof", vraag: "Er hangt een apart licht met een fietsje erin. Voor wie is dat?", opties: ["Voor de auto's", "Voor jou als fietser", "Voor voetgangers"], juist: 1, uitleg: "Een fietslicht met een fietsje erin is voor jou, niet het licht voor de auto's." },
  { les: 5, niveau: 2, bron: "toets", vraag: "Een agent zegt dat je moet doorrijden, maar het verkeerslicht is rood. Wat doe je?", opties: ["Ik wacht op groen", "Ik doe wat de agent zegt", "Ik stap af en loop"], juist: 1, uitleg: "Aanwijzingen van een agent of verkeersregelaar gaan boven verkeerslichten, borden en regels." },
  { les: 5, niveau: 2, bron: "lesstof", vraag: "Het is groen en jij wilt afslaan. Wat moet je nog doen?", opties: ["Meteen afslaan", "Voorrang geven aan verkeer dat rechtdoor gaat en aan voetgangers", "Toeteren"], juist: 1, uitleg: "Ook bij groen moet wie afslaat voorrang geven aan rechtdoorgaand verkeer en voetgangers." },
  { les: 5, niveau: 3, bron: "lesstof", vraag: "Een verkeerslicht knippert geel. Wat betekent dat?", opties: ["Altijd stoppen", "Let op: de gewone voorrangsregels gelden, voorzichtig doorrijden", "Het licht is kapot, dus snel door"], juist: 1, uitleg: "Knipperend geel betekent: pas op, de normale voorrangsregels gelden. Rijd voorzichtig." },
  { les: 5, niveau: 3, bron: "lesstof", vraag: "Het fietslicht is groen, maar een ambulance met zwaailicht en sirene komt eraan. Wat doe je?", opties: ["Ik heb groen, dus ik ga", "Ik wacht en laat de ambulance voorgaan", "Ik ga snel, voor de ambulance langs"], juist: 1, uitleg: "Een voorrangsvoertuig gaat boven jouw groene licht. Wacht en laat hem voorgaan." },

  // ===== Les 6: Afslaan =====
  { les: 6, niveau: 1, bron: "toets", vraag: "Je wilt linksaf. Wat doe je als eerste?", opties: ["Arm uitsteken", "Achterom kijken", "Meteen afslaan"], juist: 1, uitleg: "Eerst achterom kijken of het veilig is, dan arm uit, voorsorteren, voorrang geven en afslaan." },
  { les: 6, niveau: 1, bron: "lesstof", vraag: "Je slaat rechtsaf. Welke arm steek je uit?", opties: ["De linkerarm", "De rechterarm", "Geen arm"], juist: 1, uitleg: "Bij rechtsaf steek je je rechterarm uit." },
  { les: 6, niveau: 1, bron: "lesstof", vraag: "Je slaat linksaf. Welke arm steek je uit?", opties: ["De rechterarm", "De linkerarm", "Allebei"], juist: 1, uitleg: "Bij linksaf steek je je linkerarm uit." },
  { les: 6, niveau: 2, bron: "lesstof", vraag: "Wat betekent voorsorteren?", opties: ["Harder gaan fietsen", "Naar het midden of het vak voor linksaf gaan", "Op de stoep gaan rijden"], juist: 1, uitleg: "Voorsorteren is naar het midden van de weg of in het vak voor linksaf gaan." },
  { les: 6, niveau: 2, bron: "lesstof", vraag: "Wat is de goede volgorde bij afslaan?", opties: ["Afslaan, dan kijken", "Kijken, arm uit, voorsorteren, voorrang geven, afslaan", "Arm uit en meteen afslaan"], juist: 1, uitleg: "Onthoud: kijken, arm uit, voorsorteren, voorrang geven, afslaan." },
  { les: 6, niveau: 3, bron: "lesstof", vraag: "Waarom kijk je bij afslaan echt over je schouder en niet alleen in je ooghoek?", opties: ["Dat staat netter", "Omdat er naast en achter je een dode hoek is die je anders niet ziet", "Dat hoeft niet"], juist: 1, uitleg: "Ook op de fiets heb je een dode hoek. Draai je hoofd om een fietser naast je te zien." },
  { les: 6, niveau: 3, bron: "lesstof", vraag: "Je wilt linksaf op een drukke weg en er komt steeds verkeer aan. Wat is het veiligst?", opties: ["Snel ertussendoor schieten", "Wachten tot het veilig is, desnoods afstappen en lopend oversteken", "Met een hand telefoon pakken om te appen dat je later komt"], juist: 1, uitleg: "Is linksaf te gevaarlijk, wacht of stap af en steek lopend over. Veiligheid gaat voor." },

  // ===== Les 7: De rotonde =====
  { les: 7, niveau: 1, bron: "toets", vraag: "Hoe rijd je een rotonde op?", opties: ["Linksom", "Rechtsom (tegen de klok in)", "Dat maakt niet uit"], juist: 1, uitleg: "Je gaat altijd rechtsom de rotonde rond." },
  { les: 7, niveau: 1, bron: "toets", vraag: "Waaraan zie je bij een rotonde wie voorrang heeft?", opties: ["Aan de haaientanden", "Aan de grootte van de auto", "Wie links rijdt"], juist: 0, uitleg: "Haaientanden laten zien wie moet wachten. Kijk er altijd naar." },
  { les: 7, niveau: 2, bron: "lesstof", vraag: "Wanneer steek je je rechterarm uit op een rotonde?", opties: ["Als je de rotonde op gaat", "Als je de rotonde verlaat", "Nooit"], juist: 1, uitleg: "Je steekt je rechterarm uit als je de rotonde verlaat." },
  { les: 7, niveau: 2, bron: "lesstof", vraag: "Haaientanden staan aan jouw kant van de rotonde. Wat doe je?", opties: ["Doorrijden, ik heb voorrang", "Het verkeer op de rotonde eerst laten gaan", "Toeteren"], juist: 1, uitleg: "Staan de haaientanden aan jouw kant, dan laat je het verkeer op de rotonde eerst gaan." },
  { les: 7, niveau: 3, bron: "lesstof", vraag: "Je rijdt binnen de bebouwde kom op het fietspad rond een rotonde. Mag je er blind op vertrouwen dat auto's stoppen?", opties: ["Ja, binnen de kom heb ik altijd voorrang", "Nee, kijk altijd zelf en vertrouw op de haaientanden en oogcontact", "Nee, fietsers hebben nooit voorrang"], juist: 1, uitleg: "Binnen de kom heb je meestal voorrang, maar kijk altijd zelf en vertrouw niet blind op een auto." },

  // ===== Les 8: Oversteken en voetgangers =====
  { les: 8, niveau: 1, bron: "lesstof", vraag: "Een voetganger wil oversteken bij een zebrapad. Wat doe je?", opties: ["Doorrijden", "De voetganger laten gaan", "Bellen"], juist: 1, uitleg: "Een voetganger op of vlak bij een zebrapad die wil oversteken, moet je laten gaan." },
  { les: 8, niveau: 1, bron: "lesstof", vraag: "In welke volgorde kijk je bij het oversteken?", opties: ["Rechts, links", "Links, rechts en weer links", "Alleen vooruit"], juist: 1, uitleg: "Kijk links, dan rechts, dan weer links voordat je oversteekt." },
  { les: 8, niveau: 1, bron: "lesstof", toonBord: "oversteekplaats", vraag: "Wat betekent dit blauwe bord met een lopende persoon?", opties: ["Hier steken voetgangers over (zebrapad)", "Verboden voor voetgangers", "Fietspad"], juist: 0, uitleg: "Dit is het bord voor een voetgangersoversteekplaats (zebrapad)." },
  { les: 8, niveau: 2, bron: "toets", vraag: "Je fietst over een zebrapad. Heb je dan voorrang op auto's?", opties: ["Ja, altijd", "Nee, alleen als je naast je fiets loopt", "Alleen 's avonds"], juist: 1, uitleg: "Op een zebrapad hebben voetgangers voorrang. Loop je naast je fiets, dan ben je voetganger." },
  { les: 8, niveau: 2, bron: "lesstof", vraag: "Waar steek je het beste over als er geen zebrapad is?", opties: ["Tussen geparkeerde auto's", "Op een plek waar je ver kunt kijken", "In een bocht"], juist: 1, uitleg: "Zoek een plek waar je ver kunt kijken, niet tussen geparkeerde auto's of in een bocht." },
  { les: 8, niveau: 2, bron: "lesstof", toonBord: "waarschuwing_voetgangers", vraag: "Dit driehoekige bord waarschuwt voor...", opties: ["Een fietspad", "Overstekende voetgangers", "Een parkeerplaats"], juist: 1, uitleg: "De driehoek waarschuwt: let op overstekende voetgangers." },
  { les: 8, niveau: 3, bron: "lesstof", vraag: "Je nadert een zebrapad en een kind staat te twijfelen aan de kant. Wat doe je?", opties: ["Doorrijden, het staat stil", "Snelheid minderen en klaarstaan om te stoppen, het kind wil misschien oversteken", "Bellen zodat het wegblijft"], juist: 1, uitleg: "Iemand die vlak bij een zebrapad wil oversteken laat je gaan. Minder vaart en wees klaar om te stoppen." },
  { les: 8, niveau: 3, bron: "lesstof", vraag: "Je wilt met je fiets een drukke weg oversteken zonder zebrapad. Wat is het veiligst?", opties: ["Op de fiets snel ertussendoor", "Afstappen, naast je fiets lopen en pas gaan als het echt vrij is", "Schuin oversteken, dat is korter"], juist: 1, uitleg: "Afstappen maakt je smaller en rustiger. Steek recht over en pas als het vrij is." },

  // ===== Les 9: Grote voertuigen en de dode hoek =====
  { les: 9, niveau: 1, bron: "toets", vraag: "Waar kan een vrachtwagenchauffeur je niet zien?", opties: ["Ver achter de vrachtwagen", "Rechts naast de vrachtwagen", "Aan de overkant van de weg"], juist: 1, uitleg: "Rechts naast en vlak voor een vrachtwagen zit de dode hoek. Blijf erachter." },
  { les: 9, niveau: 1, bron: "lesstof", vraag: "Je staat bij een kruispunt naast een vrachtwagen. Wat is veilig?", opties: ["Rechts naast de vrachtwagen blijven", "Erachter blijven met een paar meter afstand", "Er vlak voor gaan staan"], juist: 1, uitleg: "Ga nooit rechts naast een vrachtwagen staan. Blijf erachter en houd afstand." },
  { les: 9, niveau: 2, bron: "lesstof", vraag: "Wat is een goede manier om te weten of de vrachtwagenchauffeur jou ziet?", opties: ["Hard bellen", "Kijken of jij zijn spiegels kunt zien; zo niet, dan ziet hij jou ook niet", "Vlak achter de wielen gaan staan"], juist: 1, uitleg: "Zie jij de spiegels van de chauffeur, dan kan hij jou ook zien. Zo niet, blijf dan weg." },
  { les: 9, niveau: 3, bron: "lesstof", vraag: "Een vrachtwagen naast je gaat rechtsaf en jij wilt rechtdoor. Wat doe je?", opties: ["Snel rechtdoor, voor de vrachtwagen langs", "Wachten en hem eerst laten afslaan, je zit in zijn dode hoek", "Links van de vrachtwagen inhalen"], juist: 1, uitleg: "Een afslaande vrachtwagen ziet je niet en zwaait uit. Wacht en laat hem eerst gaan." },
  { les: 9, niveau: 3, bron: "lesstof", vraag: "Waarom is afstand houden van een afslaande bus of vrachtwagen belangrijk?", opties: ["Omdat de motor warm is", "Omdat de achterkant naar de andere kant uitzwaait", "Dat hoeft niet, hij is groot genoeg"], juist: 1, uitleg: "Bij het afslaan zwaait de achterkant uit; te dichtbij word je geraakt." },

  // ===== Les 10: Voorrangsvoertuigen en bijzondere situaties =====
  { les: 10, niveau: 1, bron: "lesstof", vraag: "Een ambulance komt eraan met zwaailicht en sirene. Wat doe je?", opties: ["Doorrijden, ik was er eerst", "Rustig naar de kant en hem voor laten gaan", "Midden op de weg stoppen"], juist: 1, uitleg: "Een voorrangsvoertuig laat je altijd voorgaan. Ga rustig en voorspelbaar naar de kant." },
  { les: 10, niveau: 2, bron: "lesstof", vraag: "Wanneer is een politieauto een voorrangsvoertuig?", opties: ["Altijd", "Met zwaailicht EN sirene aan", "Alleen als hij blauw is"], juist: 1, uitleg: "Pas met zwaailicht en sirene samen is het een voorrangsvoertuig dat je voor laat gaan." },
  { les: 10, niveau: 2, bron: "lesstof", vraag: "De rode lichten bij de spoorwegovergang knipperen. Wat doe je?", opties: ["Snel oversteken", "Stoppen en wachten tot ze uit zijn en de bomen open", "Langs de bomen zigzaggen"], juist: 1, uitleg: "Bij knipperende rode lichten of dichtgaande bomen stop je en wacht je. Nooit zigzaggen." },
  { les: 10, niveau: 3, bron: "lesstof", vraag: "Je ziet alleen een zwaailicht, maar hoort geen sirene. Moet je voorrang geven?", opties: ["Ja, altijd bij een zwaailicht", "Nee, zonder sirene is het geen voorrangsvoertuig, maar blijf wel opletten", "Nee, en wegkijken mag"], juist: 1, uitleg: "Alleen een zwaailicht zonder sirene is geen voorrangsvoertuig. Je hoeft geen voorrang te geven, maar let wel op." },
  { les: 10, niveau: 3, bron: "lesstof", meer: true, vraag: "Je wilt een langzame fietser inhalen. Wat hoort er allemaal bij veilig inhalen?", opties: ["Links inhalen", "Eerst achterom kijken", "Alleen als het veilig en overzichtelijk is", "Rechts er vlak langs schieten", "Hard bellen en gewoon doorrijden"], juistMeer: [0, 1, 2], uitleg: "Veilig inhalen is: links inhalen, eerst achterom kijken, en alleen als het veilig en overzichtelijk is." },

  // ===== Les 11: Gevaren en afleiding =====
  { les: 11, niveau: 1, bron: "toets", vraag: "Mag je je telefoon vasthouden tijdens het fietsen?", opties: ["Ja, als je niet belt", "Nee, dat is verboden", "Alleen op een fietspad"], juist: 1, uitleg: "Een telefoon vasthouden tijdens het fietsen is verboden." },
  { les: 11, niveau: 1, bron: "lesstof", vraag: "Je fietst langs geparkeerde auto's. Waar moet je op letten?", opties: ["Dat er een deur opengaat, dus afstand houden", "Niks, gewoon dichtbij blijven", "Sneller gaan"], juist: 0, uitleg: "Er kan zomaar een autodeur opengaan. Houd een beetje afstand van geparkeerde auto's." },
  { les: 11, niveau: 2, bron: "lesstof", vraag: "Waarom is muziek met twee oordopjes in gevaarlijk op de fiets?", opties: ["Het is niet gevaarlijk", "Je hoort het verkeer niet: geen auto, bel of sirene", "De batterij gaat snel leeg"], juist: 1, uitleg: "Met beide oren dicht hoor je het verkeer niet. Doe muziek zacht of laat een oor vrij." },
  { les: 11, niveau: 2, bron: "lesstof", vraag: "Het regent hard en het is schemerig. Wat pas je aan?", opties: ["Niets", "Langzamer rijden, meer afstand houden en je lampen aan", "Juist harder om snel thuis te zijn"], juist: 1, uitleg: "Bij slecht zicht en een gladde weg rijd je langzamer, houd je afstand en doe je je lampen aan." },
  { les: 11, niveau: 3, bron: "lesstof", vraag: "Je telefoon gaat en je wilt hem opnemen terwijl je fietst. Wat is goed?", opties: ["Snel opnemen met een hand", "Afstappen en stilstaan voordat je hem pakt", "Tussen je schouder en oor klemmen"], juist: 1, uitleg: "Een telefoon vasthouden mag niet. Stap af en sta stil als je hem wilt gebruiken." },

  // ===== Les 12: Je fiets in orde =====
  { les: 12, niveau: 1, bron: "toets", vraag: "Welke kleur lamp moet achter op je fiets?", opties: ["Wit", "Geel", "Rood"], juist: 2, uitleg: "Achter een rood licht, voor een wit of geel licht." },
  { les: 12, niveau: 1, bron: "lesstof", vraag: "Welke kleur lamp mag voor op je fiets?", opties: ["Rood", "Wit of geel", "Blauw"], juist: 1, uitleg: "Voor op je fiets hoort een wit of geel lampje." },
  { les: 12, niveau: 1, bron: "lesstof", vraag: "Hoeveel remmen die goed werken moet je fiets minstens hebben?", opties: ["Geen", "Minstens een", "Precies drie"], juist: 1, uitleg: "Je fiets moet minstens een rem hebben die goed werkt." },
  { les: 12, niveau: 2, bron: "lesstof", vraag: "Welke kleur hebben de reflectoren op de trappers?", opties: ["Rood", "Geel", "Wit"], juist: 1, uitleg: "Op de trappers horen gele reflectoren." },
  { les: 12, niveau: 2, bron: "lesstof", vraag: "Wanneer moeten je fietslampen aan?", opties: ["Alleen overdag", "In het donker en bij slecht zicht", "Nooit"], juist: 1, uitleg: "In het donker en bij slecht zicht (mist, harde regen) moeten je lampen aan." },
  { les: 12, niveau: 3, bron: "lesstof", vraag: "Je achterlicht doet het niet en het wordt donker. Wat is het beste?", opties: ["Toch gaan, het valt wel mee", "Het eerst maken of een werkend lampje gebruiken voordat je gaat", "Alleen je voorlamp aan en gaan"], juist: 1, uitleg: "Zonder werkend achterlicht zien anderen je niet. Maak het eerst of gebruik een werkend lampje." },

  // ===== Les 13: Als passagier en met bagage =====
  { les: 13, niveau: 1, bron: "lesstof", vraag: "Je zit achterin de auto. Moet je je gordel om?", opties: ["Nee, alleen voorin", "Ja, ook achterin altijd", "Alleen op de snelweg"], juist: 1, uitleg: "De gordel is altijd verplicht, ook achterin." },
  { les: 13, niveau: 1, bron: "lesstof", vraag: "Aan welke kant stap je het veiligst uit de auto?", opties: ["Aan de straatkant", "Aan de kant van de stoep", "Dat maakt niet uit"], juist: 1, uitleg: "Stap uit aan de stoepkant, weg van het rijdende verkeer." },
  { les: 13, niveau: 2, bron: "lesstof", vraag: "Waar doe je je tas het beste als je gaat fietsen?", opties: ["Aan het stuur", "In de fietstas of op de bagagedrager", "Op je rug tegen je nek"], juist: 1, uitleg: "Een tas aan het stuur laat je slingeren. Zet bagage vast op de drager of in een fietstas." },
  { les: 13, niveau: 2, bron: "lesstof", vraag: "Voordat je het portier van de auto opent, wat doe je eerst?", opties: ["Meteen openduwen", "Kijken of er een fietser of auto aankomt", "Toeteren"], juist: 1, uitleg: "Kijk eerst achterom of er iemand aankomt; anders rijdt een fietser tegen je portier." },
  { les: 13, niveau: 3, bron: "lesstof", vraag: "Waarom mag iemand alleen achterop als er voetsteunen zijn?", opties: ["Dat staat leuker", "Anders komen zijn voeten tussen de spaken", "Dan mag je harder"], juist: 1, uitleg: "Zonder voetsteunen kunnen voeten tussen de spaken komen; dat is gevaarlijk." },
  { les: 13, niveau: 3, bron: "lesstof", vraag: "Je moet een zware tas meenemen op de fiets. Wat is het veiligst?", opties: ["Aan het stuur hangen", "In twee fietstassen verdelen, links en rechts op de drager", "In een hand vasthouden en met een hand sturen"], juist: 1, uitleg: "Gewicht laag en verdeeld over de drager houdt je stabiel. Nooit aan het stuur of in je hand." },

  // ===== Expert: meerkeuzevragen (meerdere antwoorden goed, alles aanvinken) =====
  { les: 6, niveau: 3, bron: "lesstof", meer: true, vraag: "Je gaat linksaf. Welke stappen horen daar allemaal bij?", opties: ["Achterom kijken over je schouder", "Je linkerarm uitsteken", "Voorsorteren naar het midden", "Voorrang geven aan tegemoetkomend verkeer dat rechtdoor gaat", "Meteen afslaan zonder te kijken", "Je rechterarm uitsteken"], juistMeer: [0, 1, 2, 3], uitleg: "Linksaf: achterom kijken, linkerarm uit, voorsorteren, voorrang geven, en pas dan afslaan." },
  { les: 12, niveau: 3, bron: "lesstof", meer: true, vraag: "Wat hoort er allemaal op een goedgekeurde fiets?", opties: ["Een rem die goed werkt", "Een bel die je goed hoort", "Een wit of geel licht voor", "Een rood licht achter", "Een blauw zwaailicht", "Een toeter met muziek"], juistMeer: [0, 1, 2, 3], uitleg: "Een goede fiets heeft een werkende rem, een bel, wit of geel licht voor en rood licht achter (plus reflectoren). Geen zwaailicht." },
  { les: 9, niveau: 3, bron: "lesstof", meer: true, vraag: "Waar zit de dode hoek van een vrachtwagen? Kies alle plekken.", opties: ["Rechts naast de wagen", "Vlak voor de cabine", "Vlak achter de wagen", "Ver aan de overkant van de weg"], juistMeer: [0, 1, 2], uitleg: "De dode hoek zit rechts naast, vlak voor en vlak achter de wagen. Aan de overkant ziet de chauffeur je wel." },
  { les: 10, niveau: 3, bron: "lesstof", meer: true, vraag: "Een hulpdienst komt eraan. Wanneer laat je hem voorgaan en wat doe je?", opties: ["Als het zwaailicht EN de sirene aan zijn", "Rustig en voorspelbaar naar de kant gaan", "Stoppen als dat nodig is", "Alleen een zwaailicht is al genoeg", "Snel voor hem langs schieten"], juistMeer: [0, 1, 2], uitleg: "Pas met zwaailicht EN sirene is het een voorrangsvoertuig. Ga rustig naar de kant en stop zo nodig. Alleen een zwaailicht is niet genoeg." },
  { les: 8, niveau: 3, bron: "lesstof", meer: true, vraag: "Je steekt over zonder zebrapad. Wat doe je allemaal goed?", opties: ["Een plek met goed zicht kiezen", "Links, rechts en weer links kijken", "Recht oversteken", "Tussen geparkeerde auto's door oversteken", "Schuin oversteken, dat is korter"], juistMeer: [0, 1, 2], uitleg: "Kies een plek met goed zicht, kijk links-rechts-links en steek recht over. Niet tussen auto's door en niet schuin." },
  { les: 2, niveau: 3, bron: "lesstof", meer: true, vraag: "Wat geldt er binnen de bebouwde kom? Kies alles wat klopt.", opties: ["Auto's mogen meestal 50 km/u", "Een wegrijdende bus bij de halte laat je voorgaan", "Op een rotonde met fietspad heb je meestal voorrang", "Auto's mogen meestal 80 km/u"], juistMeer: [0, 1, 2], uitleg: "Binnen de kom: meestal 50, bus voor laten gaan, en op de rotonde meestal voorrang. 80 km/u is juist buiten de kom." },
  { les: 11, niveau: 3, bron: "lesstof", meer: true, vraag: "Hoe ga je goed om met je telefoon en muziek op de fiets?", opties: ["Je telefoon wegzetten voordat je gaat fietsen", "Afstappen en stilstaan als je wilt bellen", "Muziek zacht zetten of een oor vrij houden", "Even snel appen met een hand aan het stuur"], juistMeer: [0, 1, 2], uitleg: "Telefoon weg, afstappen om te bellen, en muziek zacht of een oor vrij. Appen tijdens het fietsen mag niet." },
  { les: 3, niveau: 3, bron: "lesstof", meer: true, vraag: "Je komt uit een uitrit de weg op. Wie moet je allemaal voor laten gaan?", opties: ["Auto's", "Fietsers", "Voetgangers", "Niemand, want ik kom van rechts"], juistMeer: [0, 1, 2], uitleg: "Uit een uitrit laat je iedereen voorgaan: auto's, fietsers en voetgangers." }
];
