///<reference path="GymPokemon.ts"/>
///<reference path="../pokemons/PokemonFactory.ts"/>

/**
 * Gym class.
 */
class Gym {
    leaderName: string;
    town: string;
    pokemons: GymPokemon[];
    badgeReward: GameConstants.Badge;
    moneyReward: number;
    badgeReq: GameConstants.Badge;
    defeatMessage: string;

    constructor(leaderName: string, town: string, pokemons: GymPokemon[], badgeReward: GameConstants.Badge, moneyReward: number, badgeReq: GameConstants.Badge, rewardMessage: string) {
        this.leaderName = leaderName;
        this.town = town;
        this.pokemons = pokemons;
        this.badgeReward = badgeReward;
        this.moneyReward = moneyReward;
        this.badgeReq = badgeReq;
        this.defeatMessage = rewardMessage;
    }

    public static isUnlocked(gym: Gym): boolean {
        return player.hasBadge(gym.badgeReq);
    }

    public static calculateCssClass(gym: Gym): KnockoutComputed<string> {
        return ko.computed(function () {
            if (player.hasBadge(gym.badgeReward)) {
                return "btn btn-success"
            }
            return "btn btn-secondary"
        });
    }

    public static getLeaderByBadge(badge: GameConstants.Badge): string {
        for (let item in gymList) {
            let gym = gymList[item];
            if (GameConstants.Badge[gym.badgeReward] == GameConstants.Badge[GameConstants.Badge[badge]]) {
                return gym.leaderName;
            }
        }
        return "Brock";
    }
}

//TODO add all rewardMessages

/**
 * Data list that contains all gymLeaders, accessible by townName.
 */
const gymList: { [townName: string]: Gym } = {};

// Kanto Gyms
gymList["Pewter City"] = new Gym(
    "Brock",
    "Pewter City",
    [new GymPokemon("Geodude", 770, 12),
        new GymPokemon("Onix", 1554, 14)],
    GameConstants.Badge.Boulder,
    250,
    GameConstants.Badge.None,
    "I took you for granted, and so I lost. As proof of your victory, I confer on you this...the official Pokémon League Boulder Badge.");

gymList["Cerulean City"] = new Gym(
    "Misty",
    "Cerulean City",
    [new GymPokemon("Staryu", 4000, 18),
        new GymPokemon("Starmie", 6800, 21)],
    GameConstants.Badge.Cascade,
    500,
    GameConstants.Badge.Boulder,
    "Wow! You're too much, all right! You can have the Cascade Badge to show that you beat me."
);
gymList["Vermillion City"] = new Gym(
    "Lt. Surge",
    "Vermillion City",
    [new GymPokemon("Voltorb", 10780, 21),
        new GymPokemon("Pikachu", 13540, 18),
        new GymPokemon("Raichu", 15675, 24)],
    GameConstants.Badge.Thunder,
    1000,
    GameConstants.Badge.Cascade,
    "Now that's a shocker! You're the real deal, kid! Fine, then, take the Thunder Badge!"
);
gymList["Celadon City"] = new Gym(
    "Erika",
    "Celadon City",
    [new GymPokemon("Victreebel", 28810, 29),
        new GymPokemon("Tangela", 30340, 24),
        new GymPokemon("Vileplume", 36400, 29)],
    GameConstants.Badge.Rainbow,
    1500,
    GameConstants.Badge.Thunder,
    "Oh! I concede defeat. You are remarkably strong. I must confer on you the Rainbow Badge."
);
gymList["Saffron City"] = new Gym(
    "Sabrina",
    "Saffron City",
    [new GymPokemon("Kadabra", 23040, 38),
        new GymPokemon("Mr. Mime", 25600, 37),
        new GymPokemon("Venomoth", 28400, 38),
        new GymPokemon("Alakazam", 35380, 43)],
    GameConstants.Badge.Marsh,
    2500,
    GameConstants.Badge.Rainbow,
    "This loss shocks me! But a loss is a loss. I admit I didn't work hard enough to win. You earned the Marsh Badge."
);
gymList["Fuchsia City"] = new Gym(
    "Koga",
    "Fuchsia City",
    [new GymPokemon("Koffing", 30780, 38),
        new GymPokemon("Muk", 32460, 37),
        new GymPokemon("Koffing", 36540, 38),
        new GymPokemon("Weezing", 37430, 43)],
    GameConstants.Badge.Soul,
    3500,
    GameConstants.Badge.Marsh,
    "Humph! You have proven your worth! Here! Take the Soul Badge!"
);
gymList["Cinnabar Island"] = new Gym(
    "Blaine",
    "Cinnabar Island",
    [new GymPokemon("Growlithe", 37430, 42),
        new GymPokemon("Ponyta", 42340, 40),
        new GymPokemon("Rapidash", 45230, 42),
        new GymPokemon("Arcanine", 50290, 47)],
    GameConstants.Badge.Volcano,
    5000,
    GameConstants.Badge.Soul,
    "I have burned down to nothing! Not even ashes remain! You have earned the Volcano Badge."
);
gymList["Viridian City"] = new Gym(
    "Giovanni",
    "Viridian City",
    [new GymPokemon("Rhyhorn", 45230, 45),
        new GymPokemon("Dugtrio", 47530, 42),
        new GymPokemon("Nidoqueen", 48740, 44),
        new GymPokemon("Nidoking", 48350, 45),
        new GymPokemon("Rhydon", 55000, 50)],
    GameConstants.Badge.Earth,
    6000,
    GameConstants.Badge.Volcano,
    "Ha! That was a truly intense fight. You have won! As proof, here is the Earth Badge!"
);

// Kanto Elite 4
gymList["Elite Lorelei"] = new Gym(
    "Lorelei",
    "Elite Lorelei",
    [new GymPokemon("Dewgong", 45330, 52),
        new GymPokemon("Cloyster", 48300, 51),
        new GymPokemon("Slowbro", 52000, 52),
        new GymPokemon("Jynx", 57000, 54),
        new GymPokemon("Lapras", 60250, 54),],
    GameConstants.Badge.Elite_Lorelei,
    7500,
    GameConstants.Badge.Earth,
    "...Things shouldn't be this way!"
);
gymList["Elite Bruno"] = new Gym(
    "Bruno",
    "Elite Bruno",
    [new GymPokemon("Onix", 45330, 51),
        new GymPokemon("Hitmonchan", 48300, 53),
        new GymPokemon("Hitmonlee", 52000, 53),
        new GymPokemon("Onix", 57000, 54),
        new GymPokemon("Machamp", 60250, 56),],
    GameConstants.Badge.Elite_Bruno,
    7500,
    GameConstants.Badge.Elite_Lorelei,
    "Why? How could I lose?"
);
gymList["Elite Agatha"] = new Gym(
    "Agatha",
    "Elite Agatha",
    [new GymPokemon("Gengar", 45330, 54),
        new GymPokemon("Golbat", 48300, 54),
        new GymPokemon("Haunter", 52000, 53),
        new GymPokemon("Arbok", 57000, 56),
        new GymPokemon("Gengar", 60250, 58),],
    GameConstants.Badge.Elite_Agatha,
    7500,
    GameConstants.Badge.Elite_Bruno,
    "Oh, my! You're something special, child!"
);
gymList["Elite Lance"] = new Gym(
    "Lance",
    "Elite Lance",
    [new GymPokemon("Gyarados", 48300, 56),
        new GymPokemon("Dragonair", 52000, 54),
        new GymPokemon("Dragonair", 57000, 54),
        new GymPokemon("Aerodactyl", 60250, 58),
        new GymPokemon("Dragonite", 66000, 60),],
    GameConstants.Badge.Elite_Lance,
    7500,
    GameConstants.Badge.Elite_Agatha,
    "That’s it! I hate to admit it, but you are a Pokémon master!"
);
//TODO make champion Gym

//Johto Gyms
gymList["Violet City"] = new Gym(
    "Falkner",
    "Violet City",
    [new GymPokemon("Pidgey", 38000, 9),
        new GymPokemon("Pidgeotto", 42000, 13)],
    GameConstants.Badge.Zephyr,
    500,
    GameConstants.Badge.Elite_Lance,
    "...For pity's sake! My dad's cherished bird Pokémon... But a defeat is a defeat. All right. Take this official Pokémon League Badge. This one is the Zephyr Badge."
);
gymList["Azalea Town"] = new Gym(
    "Bugsy",
    "Azalea Town",
    [new GymPokemon("Metapod", 33000, 15),
        new GymPokemon("Kakuna", 37500, 15),
        new GymPokemon("Scyther", 39000, 17)],
    GameConstants.Badge.Hive,
    500,
    GameConstants.Badge.Zephyr,
    "Whoa, amazing! You're an expert on Pokémon! My research isn't complete yet. OK, you win. Take this Hive Badge."
);
gymList["Goldenrod City"] = new Gym(
    "Whitney",
    "Goldenrod City",
    [new GymPokemon("Clefairy", 50000, 17),
        new GymPokemon("Miltank", 80000, 19)],
    GameConstants.Badge.Plain,
    500,
    GameConstants.Badge.Hive,
    "...Sniff... What? What do you want? A badge? Oh, right. I forgot. Here's the Plain Badge."
);
gymList["Ecruteak City"] = new Gym(
    "Morty",
    "Ecruteak City",
    [new GymPokemon("Gastly", 37000, 21),
        new GymPokemon("Haunter", 38000, 21),
        new GymPokemon("Haunter", 40000, 23),
        new GymPokemon("Gengar", 42000, 25)],
    GameConstants.Badge.Fog,
    500,
    GameConstants.Badge.Plain,
    "I see... Your journey has taken you to far-away places. And you have witnessed much more than me. I envy you for that... Here is the Fog Badge.."
);
gymList["Cianwood City"] = new Gym(
    "Chuck",
    "Cianwood City",
    [new GymPokemon("Primeape", 87000, 29),
        new GymPokemon("Poliwrath", 93000, 31)],
    GameConstants.Badge.Storm,
    500,
    GameConstants.Badge.Fog,
    "Here is the Storm Badge. Wahahah! I enjoyed battling you! But a loss is a loss! From now on, I'm going to train 24 hours a day!"
);
gymList["Olivine City"] = new Gym(
    "Jasmine",
    "Olivine City",
    [new GymPokemon("Magnemite", 67000, 30),
        new GymPokemon("Magnemite", 68000, 30),
        new GymPokemon("Steelix", 72000, 35)],
    GameConstants.Badge.Mineral,
    500,
    GameConstants.Badge.Storm,
    "...You are a better Trainer than me, in both skill and kindness. In accordance with League rules, I confer upon you this Mineral Badge."
);
gymList["Mahogany Town"] = new Gym(
    "Pryce",
    "Mahogany Town",
    [new GymPokemon("Seel", 70000, 30),
        new GymPokemon("Dewgong", 72500, 32),
        new GymPokemon("Piloswine", 76000, 34)],
    GameConstants.Badge.Glacier,
    500,
    GameConstants.Badge.Mineral,
    "I am impressed by your prowess. With your strong will, I know you will overcome all life's obstacles. You are worthy of this Glacier Badge!"
);
gymList["Blackthorn City"] = new Gym(
    "Clair",
    "Blackthorn City",
    [new GymPokemon("Dragonair", 65000, 38),
        new GymPokemon("Dragonair", 65000, 38),
        new GymPokemon("Gyarados", 78000, 38),
        new GymPokemon("Kingdra", 80000, 41)],
    GameConstants.Badge.Rising,
    500,
    GameConstants.Badge.Glacier,
    "Here, this is the Rising Badge... Hurry up! Take it!"
);

//Johto Elite 4
gymList["Elite Will"] = new Gym(
    "Will",
    "Elite Will",
    [new GymPokemon("Xatu", 45330, 40),
        new GymPokemon("Jynx", 48300, 41),
        new GymPokemon("Exeggutor", 52000, 41),
        new GymPokemon("Slowbro", 57000, 41),
        new GymPokemon("Xatu", 60250, 42),],
    GameConstants.Badge.Elite_Will,
    7500,
    GameConstants.Badge.Rising,
    "Even though I was defeated, I won't change my course. I will continue battling until I stand above all Trainers! Now move on and experience the true ferocity of the Elite Four."
);
gymList["Elite Koga"] = new Gym(
    "Koga2",
    "Elite Koga",
    [new GymPokemon("Ariados", 45330, 40),
        new GymPokemon("Venomoth", 48300, 41),
        new GymPokemon("Forretress", 52000, 43),
        new GymPokemon("Muk", 57000, 42),
        new GymPokemon("Crobat", 60250, 44),],
    GameConstants.Badge.Elite_Koga,
    7500,
    GameConstants.Badge.Elite_Will,
    "I subjected you to everything I could muster. But my efforts failed. I must hone my skills. Go on to the next room, and put your abilities to the test!"
);
gymList["Elite Bruno2"] = new Gym(
    "Bruno2",
    "Elite Bruno2",
    [new GymPokemon("Hitmontop", 45330, 42),
        new GymPokemon("Hitmonlee", 48300, 42),
        new GymPokemon("Hitmonchan", 52000, 42),
        new GymPokemon("Onix", 57000, 43),
        new GymPokemon("Machamp", 60250, 46),],
    GameConstants.Badge.Elite_Bruno2,
    7500,
    GameConstants.Badge.Elite_Koga,
    "Having lost, I have no right to say anything… Go face your next challenge!"
);
gymList["Elite Karen"] = new Gym(
    "Karen",
    "Elite Karen",
    [new GymPokemon("Umbreon", 48300, 42),
        new GymPokemon("Vileplume", 52000, 42),
        new GymPokemon("Gengar", 57000, 45),
        new GymPokemon("Murkrow", 60250, 44),
        new GymPokemon("Houndoom", 66000, 47),],
    GameConstants.Badge.Elite_Karen,
    7500,
    GameConstants.Badge.Elite_Bruno2,
    "Strong Pokémon. Weak Pokémon. That is only the selfish perception of people. Truly skilled Trainers should try to win with the Pokémon they love best. I like your style. You understand what's important. Go on — — the Champion is waiting."
);
gymList["Champion Lance"] = new Gym(
    "Lance2",
    "Champion Lance",
    [new GymPokemon("Gyarados", 58300, 44),
        new GymPokemon("Dragonite", 62000, 49),
        new GymPokemon("Dragonite", 64000, 49),
        new GymPokemon("Aerodactyl", 60250, 48),
        new GymPokemon("Dragonite", 70000, 50),],
    GameConstants.Badge.Elite_JohtoChampion,
    7500,
    GameConstants.Badge.Elite_Karen,
    "…It's over. But it's an odd feeling. I’m not angry that I lost. In fact, I feel happy. Happy that I witnessed the rise of a great new Champion!"
);

// Hoenn Gyms
gymList["Rustboro City"] = new Gym(
    "Roxanne",
    "Rustboro City",
    [
        new GymPokemon("Geodude", 100000, 14),
        new GymPokemon("Nosepass", 100000, 15),
    ],
    GameConstants.Badge.Stone,
    10000,
    GameConstants.Badge.Elite_JohtoChampion,
    "So… I lost… It seems that I still have much more to learn… I understand."
);
gymList["Dewford Town"] = new Gym(
    "Brawly",
    "Dewford Town",
    [
        new GymPokemon("Machop", 100000, 17),
        new GymPokemon("Makuhita", 100000, 18),
    ],
    GameConstants.Badge.Knuckle,
    10000,
    GameConstants.Badge.Stone,
    "Whoah, wow! You made a much bigger splash than I expected! You swamped me! Okay, you've got me. Take this Gym Badge!"
);
gymList["Mauville City"] = new Gym(
    "Wattson",
    "Mauville City",
    [
        new GymPokemon("Magnemite", 100000, 22),
        new GymPokemon("Voltorb", 100000, 20),
        new GymPokemon("Magneton", 100000, 23),
    ],
    GameConstants.Badge.Dynamo,
    10000,
    GameConstants.Badge.Knuckle,
    "Wahahahah! Fine, I lost! You ended up giving me a thrill! Take this Badge!"
);
gymList["Lavaridge Town"] = new Gym(
    "Flannery",
    "Lavaridge Town",
    [
        new GymPokemon("Slugma", 100000, 26),
        new GymPokemon("Slugma", 100000, 26),
        new GymPokemon("Torkoal", 100000, 28),
    ],
    GameConstants.Badge.Heat,
    10000,
    GameConstants.Badge.Dynamo,
    "Oh... I guess I was trying too hard... I... I've only recently become a Gym Leader. I tried too hard to be someone I'm not. I have to do things my natural way. If I don't, my Pokémon will be confused. Thanks for teaching me that. For that, you deserve this."
);
gymList["Petalburg City"] = new Gym(
    "Norman",
    "Petalburg City",
    [
        new GymPokemon("Slaking", 100000, 28),
        new GymPokemon("Vigoroth", 100000, 30),
        new GymPokemon("Slaking", 100000, 31),
    ],
    GameConstants.Badge.Balance,
    10000,
    GameConstants.Badge.Heat,
    "… I… I can't… I can't believe it. I lost to you? But, rules are rules! Here, take this."
);
gymList["Fortree City"] = new Gym(
    "Winona",
    "Fortree City",
    [
        new GymPokemon("Swellow", 100000, 31),
        new GymPokemon("Pelipper", 100000, 30),
        new GymPokemon("Skarmory", 100000, 32),
        new GymPokemon("Altaria", 100000, 33),
    ],
    GameConstants.Badge.Feather,
    10000,
    GameConstants.Badge.Balance,
    "Never before have I seen a Trainer command Pokémon with more grace than I... In recognition of your prowess, I present to you this Gym Badge."
);
gymList["Mossdeep City"] = new Gym(
    "Tate & Liza",
    "Mossdeep City",
    [
        new GymPokemon("Lunatone", 100000, 42),
        new GymPokemon("Solrock", 100000, 42),
    ],
    GameConstants.Badge.Mind,
    10000,
    GameConstants.Badge.Feather,
    "What? Our combination... Was shattered! It can't be helped. You've won... So, in recognition, take this Gym Badge."
);
gymList["Sootopolis City"] = new Gym(
    "Juan",
    "Sootopolis City",
    [
        new GymPokemon("Luvdisc", 100000, 41),
        new GymPokemon("Whiscash", 100000, 41),
        new GymPokemon("Sealeo", 100000, 43),
        new GymPokemon("Crawdaunt", 100000, 43),
        new GymPokemon("Kingdra", 100000, 46),
    ],
    GameConstants.Badge.Rain,
    10000,
    GameConstants.Badge.Mind,
    "I realize now your authenticity and magnificence as a Pokémon Trainer. I find much joy in having met you and your Pokémon. You have proven yourself worthy of the Rain Badge. Accept it. Having that Badge assures you full obedience of all your Pokémon to every command you make."
);

// Hoenn Elite 4
gymList["Elite Sidney"] = new Gym(
    "Sidney",
    "Elite Sidney",
    [
        new GymPokemon("Mightyena", 100000, 46),
        new GymPokemon("Cacturne", 100000, 46),
        new GymPokemon("Shiftry", 100000, 48),
        new GymPokemon("Sharpedo", 100000, 48),
        new GymPokemon("Absol", 100000, 49),
    ],
    GameConstants.Badge.Elite_Sidney,
    10000,
    GameConstants.Badge.Rain,
    "Well, how do you like that? I lost! Eh, it was fun, so it doesn't matter."
);
gymList["Elite Phoebe"] = new Gym(
    "Phoebe",
    "Elite Phoebe",
    [
        new GymPokemon("Dusclops", 100000, 48),
        new GymPokemon("Banette", 100000, 49),
        new GymPokemon("Banette", 100000, 49),
        new GymPokemon("Sableye", 100000, 50),
        new GymPokemon("Dusclops", 100000, 51),
    ],
    GameConstants.Badge.Elite_Phoebe,
    10000,
    GameConstants.Badge.Elite_Sidney,
    "Oh, darn. I've gone and lost."
);
gymList["Elite Glacia"] = new Gym(
    "Glacia",
    "Elite Glacia",
    [
        new GymPokemon("Glalie", 100000, 50),
        new GymPokemon("Sealeo", 100000, 50),
        new GymPokemon("Glalie", 100000, 52),
        new GymPokemon("Sealeo", 100000, 52),
        new GymPokemon("Walrein", 100000, 53),
    ],
    GameConstants.Badge.Elite_Glacia,
    10000,
    GameConstants.Badge.Elite_Phoebe,
    "You and your Pokémon... How hot your spirits burn! The all-consuming heat overwhelms. It's no surprise that my icy skills failed to harm you."
);
gymList["Elite Drake"] = new Gym(
    "Drake",
    "Elite Drake",
    [
        new GymPokemon("Shelgon", 100000, 52),
        new GymPokemon("Altaria", 100000, 54),
        new GymPokemon("Flygon", 100000, 53),
        new GymPokemon("Flygon", 100000, 53),
        new GymPokemon("Salamence", 100000, 55),
    ],
    GameConstants.Badge.Elite_Drake,
    10000,
    GameConstants.Badge.Elite_Glacia,
    "You deserve every credit for coming this far as a Trainer of Pokémon. You do seem to know what is needed. Yes, what a Trainer needs is a virtuous heart. Pokémon touch the good hearts of Trainers and learn good from wrong. They touch the good hearts of Trainers and grow strong. Go! Go onwards! The Champion is waiting!"
);
gymList["Champion Wallace"] = new Gym(
    "Wallace",
    "Champion Wallace",
    [
        new GymPokemon("Wailord", 100000, 57),
        new GymPokemon("Tentacruel", 100000, 55),
        new GymPokemon("Ludicolo", 100000, 56),
        new GymPokemon("Whiscash", 100000, 56),
        new GymPokemon("Gyarados", 100000, 56),
        new GymPokemon("Milotic", 100000, 58),
    ],
    GameConstants.Badge.Elite_HoennChampion,
    10000,
    GameConstants.Badge.Elite_Drake,
    "I, the Champion, fall in defeat… That was wonderful work. You were elegant, infuriatingly so. And yet it was utterly glorious! Kudos to you! You are a truly noble Pokémon Trainer!"
);
