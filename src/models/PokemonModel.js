export default class PokemonModel {
    constructor({ id, name, types }) {
        this.id = id
        this.name = name
        this.types = types
    }

    get displayName() {
        return this.name.charAt(0).toUpperCase() + this.name.slice(1)
    }

    get primaryType() {
        return this.types?.[0] || "normal"
    }



    get showdownName() {
        const SHOWDOWN_NAME_OVERRIDES = {
            "mr-mime": "mrmime",
            "nidoran-m": "nidoranm",
            "nidoran-f": "nidoranf",
        };
        const lower = this.name.toLowerCase()
        return SHOWDOWN_NAME_OVERRIDES[lower] ?? lower;
    }

    get animatedSpriteUrl() {
        return `https://play.pokemonshowdown.com/sprites/ani/${this.showdownName}.gif`;
    }
}