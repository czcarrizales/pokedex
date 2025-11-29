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
        const lower = this.name.toLowerCase()
        return lower
    }

    get animatedSpriteUrl() {
        return `https://play.pokemonshowdown.com/sprites/ani/${this.showdownName}.gif`;
    }
}