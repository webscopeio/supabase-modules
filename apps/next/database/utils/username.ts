const ADJECTIVES = [
  "Agile",
  "Astute",
  "Audacious",
  "Benevolent",
  "Blissful",
  "Captivating",
  "Cerebral",
  "Compassionate",
  "Confident",
  "Creative",
  "Dazzling",
  "Dauntless",
  "Deft",
  "Dexterous",
  "Dreamy",
  "Effervescent",
  "Efficacious",
  "Elegant",
  "Eloquence",
  "Empathetic",
  "Enthusiastic",
  "Ethereal",
  "Exuberant",
  "Exquisite",
  "Fantastic",
  "Flourishing",
  "Focused",
  "Fortuitous",
  "Gentle",
  "Gracious",
  "Gregarious",
  "Harmonious",
  "Headstrong",
  "Heroic",
  "Hilarious",
  "Illuminating",
  "Imaginative",
  "Impeccable",
  "Impregnable",
  "Indomitable",
  "Ingenious",
  "Inquisitive",
  "Inspiring",
  "Intrepid",
  "Invigorating",
  "Jaunty",
  "Jovial",
  "Joyous",
  "Jubilant",
  "Keen",
  "Luminous",
  "Magnanimous",
  "Majestic",
  "Marvelous",
  "Melodic",
  "Mercurial",
  "Mindful",
  "Miraculous",
  "Mystical",
  "Nimble",
  "Optimistic",
  "Opulent",
  "Pacific",
  "Perceptive",
  "Persuasive",
  "Pioneering",
  "Placid",
  "Plucky",
  "Poised",
  "Powerful",
  "Precise",
  "Prolific",
  "Radiant",
  "Rational",
  "Resolute",
  "Resilient",
  "Resplendent",
  "Resourceful",
  "Robust",
  "Scintillating",
  "Serene",
  "Serendipitous",
  "Shrewd",
  "Skillful",
  "Sincere",
  "Sophisticated",
  "Splendid",
  "Stellar",
  "Stoic",
  "Sublime",
  "Sumptuous",
  "Supportive",
  "Surreal",
  "Tenacious",
  "Thriving",
  "Tranquil",
  "Unassuming",
  "Unstoppable",
  "Upbeat",
  "Valiant",
  "Vigilant",
  "Virtuous",
  "Vivacious",
  "Witty",
  "Zealous",
]

const COLORS = [
  "Amber",
  "Apricot",
  "Aquamarine",
  "Auburn",
  "Azure",
  "Beige",
  "Black",
  "Blush",
  "Bronze",
  "Cerulean",
  "Chartreuse",
  "Chocolate",
  "Coral",
  "Crimson",
  "Cyan",
  "Emerald",
  "Fuchsia",
  "Gold",
  "Gray",
  "Green",
  "Indigo",
  "Ivory",
  "Jade",
  "Lavender",
  "Lime",
  "Magenta",
  "Maroon",
  "Navy",
  "Olive",
  "Orange",
  "Orchid",
  "Peach",
  "Periwinkle",
  "Pink",
  "Plum",
  "Purple",
  "Red",
  "Ruby",
  "Salmon",
  "Sapphire",
  "Scarlet",
  "Silver",
  "Teal",
  "Turquoise",
  "Violet",
  "White",
  "Yellow",
]

const NOUNS = [
  "Adventure",
  "Alchemy",
  "Aurora",
  "Avalanche",
  "Balance",
  "Bayou",
  "Blossom",
  "Blizzard",
  "Cascade",
  "Cavern",
  "Celestial",
  "Challenge",
  "Constellation",
  "Cosmos",
  "Coyote",
  "Crescent",
  "Crystal",
  "Curiosity",
  "Cyclone",
  "Destiny",
  "Dragonfly",
  "Echo",
  "Eclipse",
  "Ember",
  "Enchantment",
  "Enigma",
  "Equilibrium",
  "Essence",
  "Eternity",
  "Everest",
  "Eyrie",
  "Fable",
  "Fauna",
  "Festival",
  "Firefly",
  "Fluorescence",
  "Fog",
  "Forest",
  "Fortress",
  "Fountain",
  "Fracture",
  "Galaxy",
  "Geode",
  "Glyph",
  "Harmony",
  "Haven",
  "Horizon",
  "Hurricane",
  "Illusion",
  "Impulse",
  "Infinity",
  "Insight",
  "Island",
  "Jubilation",
  "Kaleidoscope",
  "Labyrinth",
  "Lagoon",
  "Legacy",
  "Labyrinth",
  "Lightning",
  "Lullaby",
  "Maelstrom",
  "Majesty",
  "Mammoth",
  "Manatee",
  "Melody",
  "Menagerie",
  "Meteor",
  "Mirage",
  "Moonlight",
  "Mystery",
  "Myth",
  "Oasis",
  "Odyssey",
  "Olympus",
  "Panorama",
  "Paradox",
  "Paradise",
  "Pathfinder",
  "Peace",
  "Phoenix",
  "Pinwheel",
  "Prism",
  "Prophecy",
  "Radiance",
  "Refuge",
]

export function generateUsername(
  options: { isAnonymous?: boolean } = {}
): string {
  const randomAdjective = options.isAnonymous
    ? "Anonymous"
    : ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]
  const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)]
  const randomNoun = NOUNS[Math.floor(Math.random() * NOUNS.length)]
  const randomInteger = Math.floor(Math.random() * 999)

  return randomAdjective + randomColor + randomNoun + randomInteger
}