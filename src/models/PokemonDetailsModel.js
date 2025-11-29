const STAT_COLORS = {
  hp: "#e64949",
  attack: "#d99559",
  defense: "#d8c050",
  "special-attack": "#7fa4e8",
  "special-defense": "#8cc57b",
  speed: "#e06c96",
};

export default class PokemonDetailsModel {
  constructor(details, species) {
    this.details = details;
    this.species = species;
  }

  get id() {
    return this.details.id;
  }

  get name() {
    return this.details.name;
  }

  get displayName() {
    return this.name.toUpperCase();
  }

  get types() {
    return this.details.types.map((t) => t.type.name);
  }

  get primaryType() {
    return this.types[0] || "normal";
  }

  get containerClass() {
    return `pokemon-details-container--${this.primaryType}`;
  }

  get artworkUrl() {
    return (
      this.details.sprites?.other?.["official-artwork"]?.front_default ??
      this.details.sprites?.front_default ??
      ""
    );
  }

  get heightMeters() {
    return this.details.height / 10;
  }

  get weightKg() {
    return this.details.weight / 10;
  }

  get description() {
    if (!this.species?.flavor_text_entries) return "";
    const entry = this.species.flavor_text_entries.find(
      (e) => e.language.name === "en"
    );
    return entry ? entry.flavor_text.replace(/\s+/g, " ") : "";
  }

  get stats() {
    return this.details.stats.map((s) => {
      const percent = Math.round((s.base_stat / 255) * 100);
      const color = STAT_COLORS[s.stat.name] || "#B8B8B8";
      return {
        name: s.stat.name,
        value: s.base_stat,
        percent,
        color,
      };
    });
  }
}
