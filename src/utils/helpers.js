
const systemNames =
[
  "Acamar",
  "Adahn",		// The alternate personality for The Nameless One in "Planescape: Torment"
  "Aldea",
  "Andevian",
  "Antedi",
  "Balosnee",
  "Baratas",
  "Brax",			// One of the heroes in Master of Magic
  "Bretel",		// This is a Dutch device for keeping your pants up.
  "Calondia",
  "Campor",
  "Capelle",		// The city I lived in while programming this game
  "Carzon",
  "Castor",		// A Greek demi-god
  "Cestus",
  "Cheron",		
  "Courteney",	// After Courteney Cox…
  "Daled",
  "Damast",
  "Davlos",
  "Deneb",
  "Deneva",
  "Devidia",
  "Draylon",
  "Drema",
  "Endor",
  "Esmee",		// One of the witches in Pratchett's Discworld
  "Exo",
  "Ferris",		// Iron
  "Festen",		// A great Scandinavian movie
  "Fourmi",		// An ant, in French
  "Frolix",		// A solar system in one of Philip K. Dick's novels
  "Gemulon",
  "Guinifer",		// One way of writing the name of king Arthur's wife
  "Hades",		// The underworld
  "Hamlet",		// From Shakespeare
  "Helena",		// Of Troy
  "Hulst",		// A Dutch plant
  "Iodine",		// An element
  "Iralius",
  "Janus",		// A seldom encountered Dutch boy's name
  "Japori",
  "Jarada",
  "Jason",		// A Greek hero
  "Kaylon",
  "Khefka",
  "Kira",			// My dog's name
  "Klaatu",		// From a classic SF movie
  "Klaestron",
  "Korma",		// An Indian sauce
  "Kravat",		// Interesting spelling of the French word for "tie"
  "Krios",
  "Laertes",		// A king in a Greek tragedy
  "Largo",
  "Lave",			// The starting system in Elite
  "Ligon",
  "Lowry",		// The name of the "hero" in Terry Gilliam's "Brazil"
  "Magrat",		// The second of the witches in Pratchett's Discworld
  "Malcoria",
  "Melina",
  "Mentar",		// The Psilon home system in Master of Orion
  "Merik",
  "Mintaka",
  "Montor",		// A city in Ultima III and Ultima VII part 2
  "Mordan",
  "Myrthe",		// The name of my daughter
  "Nelvana",
  "Nix",			// An interesting spelling of a word meaning "nothing" in Dutch
  "Nyle",			// An interesting spelling of the great river
  "Odet",
  "Og",			// The last of the witches in Pratchett's Discworld
  "Omega",		// The end of it all
  "Omphalos",		// Greek for navel
  "Orias",
  "Othello",		// From Shakespeare
  "Parade",		// This word means the same in Dutch and in English
  "Penthara",
  "Picard",		// The enigmatic captain from ST:TNG
  "Pollux",		// Brother of Castor
  "Quator",
  "Rakhar",
  "Ran",			// A film by Akira Kurosawa
  "Regulas",
  "Relva",
  "Rhymus",
  "Rochani",
  "Rubicum",		// The river Ceasar crossed to get into Rome
  "Rutia",
  "Sarpeidon",
  "Sefalla",
  "Seltrice",
  "Sigma",
  "Sol",			// That's our own solar system
  "Somari",
  "Stakoron",
  "Styris",
  "Talani",
  "Tamus",
  "Tantalos",		// A king from a Greek tragedy
  "Tanuga",
  "Tarchannen",
  "Terosa",
  "Thera",		// A seldom encountered Dutch girl's name
  "Titan",		// The largest moon of Jupiter
  "Torin",		// A hero from Master of Magic
  "Triacus",
  "Turkana",
  "Tyrus",
  "Umberlee",		// A god from AD&D, which has a prominent role in Baldur's Gate
  "Utopia",		// The ultimate goal
  "Vadera",
  "Vagra",
  "Vandor",
  "Ventax",
  "Xenon",
  "Xerxes",		// A Greek hero
  "Yew",			// A city which is in almost all of the Ultima games
  "Yojimbo",		// A film by Akira Kurosawa
  "Zalkon",
  "Zuul"			// From the first Ghostbusters movie
];

const resourceType = [
  "NOSPECIALRESOURCES",
  "MINERALRICH",
  "MINERALPOOR",
  "DESERT",
  "LOTSOFWATER",
  "RICHSOIL",
  "POORSOIL",
  "RICHFAUNA",
  "LIFELESS",
  "WEIRDMUSHROOMS",
  "LOTSOFHERBS",
  "ARTISTIC",
  "WARLIKE"
]

const techMap = [
  "Pre-Agriculture", 
  "Agriculture",
  "Medieval",
  "Renaissance",
  "Early Industrial",
  "Industrial",
  "Post-Industrial",
  "Hi-Tech"
]

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function generateGameInfo (numSystems) {
  let solarSystems = {};
  let usedCoordinates = new Set();
  let x = getRandomInt(0, 151)
  let y = getRandomInt(0, 101)
  for (var i = 0; i < numSystems; i++) {
    while (usedCoordinates.has(x + " " + y)) {
      x = getRandomInt(0, 151)
      y = getRandomInt(0, 101)    
    }

    usedCoordinates.add(x + " " + y)
    if (!solarSystems[x]) solarSystems[x] = {};
    solarSystems[x][y] = {
      systemName: systemNames[getRandomInt(0, systemNames.length)],
      resourceType: resourceType[getRandomInt(0, resourceType.length)],
      techLevel: getRandomInt(0, 8)
    }
  }

  return { x, y, solarSystems }
}

export default generateGameInfo
