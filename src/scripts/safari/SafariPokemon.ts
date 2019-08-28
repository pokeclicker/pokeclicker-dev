class SafariPokemon implements pokemonInterface {
    name: string;
    id: number;
    type1: PokemonTypes;
    type2: PokemonTypes;
    shiny: boolean;
    baseCatchFactor: number;
    baseEscapeFactor: number;
    angry: number;
    eating: number;

    // Lower weighted pokemon will appear less frequently, equally weighted are equally likely to appear
    static readonly list = [
        { name: "Nidoran(F)", weight: 15 },
        { name: "Nidorina", weight: 10 },
        { name: "Nidoran(M)", weight: 25 },
        { name: "Nidorino", weight: 10 },
        { name: "Exeggcute", weight: 20 },
        { name: "Paras", weight: 5 },
        { name: "Parasect", weight: 15 },
        { name: "Rhyhorn", weight: 10 },
        { name: "Chansey", weight: 4 },
        { name: "Scyther", weight: 4 },
        { name: "Pinsir", weight: 4 },
        { name: "Kangaskhan", weight: 15 },
        { name: "Tauros", weight: 10 },
        { name: "Cubone", weight: 10 },
        { name: "Marowak", weight: 5 },
        { name: "Tangela", weight: 4 },
    ];

    static readonly listWeight = SafariPokemon.list.reduce((sum:number, pokemon) => {return sum += pokemon.weight}, 0);

    constructor(name: string) {
        let data = PokemonHelper.getPokemonByName(name);

        this.name = data.name;
        this.id = data.id;
        this.type1 = data.type1;
        this.type2 = data.type2;
        this.shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_SAFARI);
        if (shiny) Notifier.notify(`✨ You encountered a shiny ${name}! ✨`, GameConstants.NotificationOption.warning);
        this.baseCatchFactor = data.catchRate * 100/1275;
        this.baseEscapeFactor = 40;
        this.angry = 0;
        this.eating = 0;
    }

    public get catchFactor(): number {
        let catchF = this.baseCatchFactor;
        if(this.eating > 0) {
            catchF /= 2;
        }
        if(this.angry > 0) {
            catchF *= 2;
        }

        return Math.min(100, catchF);
    }

    public get escapeFactor(): number {
        if(this.eating > 0) {
            return this.baseEscapeFactor / 4;
        }
        if(this.angry > 0) {
            return this.baseEscapeFactor * 2;
        }

        return this.baseEscapeFactor;
    }

    public static random() {
        let rand = Math.random() * SafariPokemon.listWeight;
        let i = 0;
        for (let pokemon of SafariPokemon.list) {
            i += pokemon.weight;
            if (rand < i) {
                return new SafariPokemon(pokemon.name);
            }
        }
    }
}
