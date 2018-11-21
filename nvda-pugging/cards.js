var cards = {

  '0010' :
  { front: "Hva er NVDA-tasten?",
    back: "Typisk Capslock på laptop, kan være Insert på stasjonær PC." },

  '0020' :
  { front: "Hvordan slår en av og på tastehjelp?",
    back: "NVDA+1" },

  '0030' :
  { front: "Hvordan hopper man til neste overskrift?",
    back: [
      "Man taster H (Shift+H for forrige overskrift).",
      "Noen titler er satt i siden slik at du kan prøve det."
    ],
    playground : [
      "<h1>Tittel 1</h1>",
      "<h2>Tittel 2</h2>",
      "<h3>Tittel 3</h2>"
    ]
  },

  '0040' :
  { front: "Hvordan beveger man seg til toppen av dokumentet?",
    back: "Ctrl+Home (dette er ikke en NVDA-hurtigtast)" },

  '0050' :
  { front: "Hva gjør NVDA+A?",
    back: "Den leser alt fra og med hvor markøren befinner seg." },

  '0060':
  { front: "Hvordan leser man linjen man er på?",
    back: "NVDA+L" },

  '0070':
  { front: "Hvordan navigerer man cellevis i en tabell?",
    back: [
      "Ctrl+Alt+Piltastene.",
      "En tabell er satt i siden slik at du kan prøve det."
    ],
    playground: [
      "<table>",
      "  <thead>",
      "    <tr><th>Tall</th><th>Binær</th><th>Polsk</th></tr>",
      "  </thread>",
      "  <tbody>",
      "    <tr><td>1</td><td>0001</td><td lang=\"pl\">jeden</td></tr>",
      "    <tr><td>2</td><td>0010</td><td lang=\"pl\">dwa</td></tr>",
      "    <tr><td>3</td><td>0011</td><td lang=\"pl\">trzy</td></tr>",
      "    <tr><td>4</td><td>0100</td><td lang=\"pl\">cztery</td></tr>",
      "    <tr><td>5</td><td>0101</td><td lang=\"pl\">pięć</td></tr>",
      "  </tbody>",
      "</table>"
    ]
  },

  '0080':
  { front: "Hvordan kan man hoppe til neste listeelement?",
    back: [
      "Man taster I (Shift+I for forrige listeelement).",
      "En liste er satt i siden som du kan prøve det på."
    ],
    playground: [
      "<ul>",
      "  <li>Alfa</li>",
      "  <li>Beta</li>",
      "  <li>Gamma</li>",
      "  <li>Delta</li>",
      "  <li>Epsilon</li>",
      "</ul>"
    ]
  },

  '0090':
  { front: "Hvis man kommer over en lang rekke lenker man ikke er interessert i, hvilken tast kan man bruke da?",
    back: [
      "N-tasten for å hoppe over lenkene.",
      "Noen lenker med innhold imellom er satt i siden"
    ],
    playground: [
      "<ul>",
      "  <li><a href='https://ddg.gg/?q=viagra'>Viagra</a></li>",
      "  <li><a href='https://ddg.gg/?q=trump'>Trump</a></li>",
      "  <li><a href='https://ddg.gg/?q=cassava'>100% naturlig cyanid</a></li>",
      "  <li><a href='https://ddg.gg/?q=snitzel'>Kva er eigentleg ein snitzel?</a></li>",
      "</ul>",
      "<article>",
      "  <h1>Liten ulenket artikkel</h1>",
      "  <p>Den første regelen i tautologiklubben er den første regelen i tautologiklubben.</p>",
      "  <p>Fordelen med et såpestykke er den, at i motsetning til en såpedispenser, så går et såpestykke aldri tomt.</p>",
      "  <a href='#'>Sluttlenke.</a>",
      "</article>"
    ]
  },

  '0100':
  { front: "Hvilken tast bruker man for å navigere forbi en liste eller tabell man er i?",
    back: "Komma-tasten. Shift+komma navigerer til begynnelsen tabellen eller listen. En liste og tabell er satt i siden.",
    playground: [
      "<ul>",
      "  <li>Alfa</li>",
      "  <li>Beta</li>",
      "  <li>Gamma</li>",
      "  <li>Delta</li>",
      "  <li>Epsilon</li>",
      "</ul>",
      "<table>",
      "  <thead>",
      "    <tr><th>Tall</th><th>Binær</th><th>Polsk</th></tr>",
      "  </thread>",
      "  <tbody>",
      "    <tr><td>1</td><td>0001</td><td lang=\"pl\">jeden</td></tr>",
      "    <tr><td>2</td><td>0010</td><td lang=\"pl\">dwa</td></tr>",
      "    <tr><td>3</td><td>0011</td><td lang=\"pl\">trzy</td></tr>",
      "    <tr><td>4</td><td>0100</td><td lang=\"pl\">cztery</td></tr>",
      "    <tr><td>5</td><td>0101</td><td lang=\"pl\">pięć</td></tr>",
      "  </tbody>",
      "</table>"
    ]
  },

  '0110':
  { front: "Hva taster man for å åpne NVDA-menyen?",
    back: "NVDA+N"},

  '0120':
  { front: "Hva taster man for å avslutte NVDA?",
    back: "NVDA+Q" },

  '0130':
  { front: "Hvordan veksler man mellom lesemodus, for å navigere i dokumentet, og fokusmodus, for å for eksempel å skrive inn tekst i et felt?",
    back: "NVDA+Mellomrom. Et tekstredigeringsfelt er satt i siden.",
    playground: "<textarea></textarea>"
  },

  '0140':
  { front: "Hvordan navigerer man ut av et innebygd objekt, som for eksempel en video- eller lydavspiller?",
    back: "NVDA+Ctrl+Mellomrom. En lydavspiller er satt i siden. Hos meg (Ivar) fører det i dette dokumentet til at jeg hører 'Svar', og kommer ikke videre før jeg har trykket Enter.",
    playground: "<audio controls src='public-domain-sound.ogg'></audio>",
  },

  '0150':
  { front: "Hvordan åpner man elementlisten?",
    back: "NVDA+F7" },

};

