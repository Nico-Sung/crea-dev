export interface Album {
    id: number;
    image: string;
    title: string;
    year: string;
    description: string;
    tracklist: string[];
    vinylColor: string;
}

export interface YearSection {
    year: string;
    albums: Album[];
}

export const yearSections: YearSection[] = [
    {
        year: "2013",
        albums: [
            {
                id: 1,
                image: "/album1.png",
                title: "PARTYNEXTDOOR",
                year: "2013",
                description:
                    "Premier EP de PARTYNEXTDOOR, sorti le 1er juillet 2013. Cet EP a marqué le début de sa carrière musicale et a été acclamé par la critique pour son style R&B alternatif unique.",
                tracklist: [
                    "Welcome to the Party",
                    "Wild Bitches",
                    "Right Now",
                    "Make a Mil",
                    "Break from Toronto",
                    "TBH",
                    "Wus Good / Curious",
                    "Over Here (feat. Drake)",
                    "Ballin'",
                    "Relax with Me",
                ],
                vinylColor: "#FFFFFF",
            },
        ],
    },
    {
        year: "2014",
        albums: [
            {
                id: 2,
                image: "/album2.png",
                title: "PARTYNEXTDOOR TWO",
                year: "2014",
                description:
                    "Deuxième projet studio, sorti le 28 juillet 2014. Cet album a consolidé sa position dans l'industrie musicale avec des hits comme 'Recognize' featuring Drake.",
                tracklist: [
                    "East Liberty",
                    "SLS",
                    "Sex on the Beach",
                    "Her Way",
                    "Belong to the City",
                    "Grown Woman",
                    "FWU",
                    "Recognize (feat. Drake)",
                    "Options",
                    "Thirsty",
                    "Bout It",
                    "Muse",
                ],
                vinylColor: "#808080",
            },
        ],
    },
    {
        year: "2016",
        albums: [
            {
                id: 3,
                image: "/album3.png",
                title: "PARTYNEXTDOOR 3",
                year: "2016",
                description:
                    "Troisième album studio, sorti le 12 août 2016. Cet album explore des thèmes plus matures et présente une évolution sonore significative.",
                tracklist: [
                    "High Hopes",
                    "Don't Run",
                    "Nobody",
                    "Not Nice",
                    "Only U",
                    "Don't Know How",
                    "Problems & Selfless",
                    "Temptations",
                    "Spiteful",
                    "Joy",
                    "You've Been Missed",
                    "Transparency",
                    "Brown Skin",
                    "1942",
                    "Come and See Me (feat. Drake)",
                    "Nothing Easy to Please",
                ],
                vinylColor: "#1a1a2e",
            },
        ],
    },
    {
        year: "2020",
        albums: [
            {
                id: 4,
                image: "/partymobile.png",
                title: "PARTYMOBILE",
                year: "2020",
                description:
                    "Quatrième album studio, sorti le 27 mars 2020. Cet album marque un retour très attendu avec des collaborations prestigieuses comme Drake, Rihanna et Bad Bunny.",
                tracklist: [
                    "NOTHING LESS",
                    "TURN UP",
                    "THE NEWS",
                    "SPLIT DECISION",
                    "LOYAL (feat. Drake)",
                    "TOUCH ME",
                    "TRAUMA",
                    "SHOWING YOU",
                    "EYE ON IT",
                    "BELIEVE IT (feat. Rihanna)",
                    "NEVER AGAIN",
                    "PGT",
                    "ANOTHER DAY",
                    "SAVAGE ANTHEM",
                    "LOYAL (Remix) [feat. Drake & Bad Bunny]",
                ],
                vinylColor: "#c9a86c",
            },
        ],
    },
    {
        year: "2024",
        albums: [
            {
                id: 5,
                image: "/album4.png",
                title: "Some Sexy Songs 4 U",
                year: "2024",
                description:
                    "Cinquième projet studio, sorti le 31 octobre 2024. Un EP sensuel et intimiste qui marque le retour de PARTYNEXTDOOR avec 6 titres aux sonorités R&B langoureuses.",
                tracklist: [
                    "CN Tower",
                    "Moth Balls",
                    "Something About You",
                    "Crying in Chanel",
                    "Spider-Man Superman",
                    "Deeper",
                    "Small Town Fame",
                    "Pimmie's Dilemma",
                    "Brian Steel",
                    "Gimme a Hug",
                    "Raining in Houston",
                    "Lasers",
                    "Meet Your Padre (feat. Chino Pacas)",
                    "Nokia",
                    "Die Trying (feat. Yebba)",
                    "Somebody Loves Me",
                    "Celibacy",
                    "OMW",
                    "Glorious",
                    "When He's Gone",
                    "Greedy",
                ],
                vinylColor: "#2d4a3e",
            },
        ],
    },
];
