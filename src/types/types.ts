export interface CharacterInfo {
	    name: string;
		height: number;
		mass: number;
		hair_color: string;
		skin_color: string;
		eye_color: string;
		birth_year: string;
		gender: string;
		homeworld: any;
		films: string[];
		species: string[];
		vehicles: string[];
		starships: string[];
		created: string;
		edited: string;
		url: string;
}

export interface SpeciesInfo {
    name: string,
	classification: string,
	designation: string,
	average_height: number,
	skin_colors: string,
	hair_colors: string,
	eye_colors: string,
	average_lifespan: number,
	homeworld: string,
	language: string,
	people: string[],
	films: string[],
	created: string,
	edited: string,
	url: string
}

export interface FilmInfo {
	title: string,
	episode_id: number,
	opening_crawl: string,
	director: string,
	producer: string,
	release_date: string,
	characters: string[],
	planets: string[],
	starships: string[],
	vehicles: string[],
	species: string[],
	created: string,
	edited: string,
	url: string
}

export interface PlanetInfo {
	name: string,
	rotation_period: number,
	orbital_period: number,
	diameter: number,
	climate: string,
	gravity: string,
	terrain: string,
	surface_water: number,
	population: number,
	residents: string[],
	films: string[]
	created: string,
	edited: string,
	url: string
}

export interface VehicleInfo {
	name: string,
	model: string,
	manufacturer: string,
	cost_in_credits: string,
	length: number,
	max_atmosphering_speed: number,
	crew: number,
	passengers: number,
	cargo_capacity: number,
	consumables: string,
	vehicle_class: string,
	pilots: string[],
	films: string[],
	created: string,
	edited: string,
	url: string
}

export interface StarshipInfo {
	name: string,
	model: string,
	manufacturer: string,
	cost_in_credits: string,
	length: number,
	max_atmosphering_speed: string,
	crew: number,
	passengers: number,
	cargo_capacity: number,
	consumables: string,
	hyperdrive_rating: string,
	MGLT: number,
	starship_class: string,
	pilots: string[],
	films: string[],
	created: string,
	edited: string,
	url: string
}

export interface Characters {
	count: number,
	next: string,
	previous: string,
	results: CharacterInfo[]
}

export interface Planets {
	count: number,
	next: string,
	previous: string,
	results: Planets[]
}

export interface Films {
	count: number,
	next: string,
	previous: string,
	results: FilmInfo[]
}

export interface Species {
	count: number,
	next: string,
	previous: string,
	results: SpeciesInfo[]
}

export interface Vehicles {
	count: number,
	next: string,
	previous: string,
	results: VehicleInfo[]
}

export interface Starships {
	count: number,
	next: string,
	previous: string,
	results: StarshipInfo[]
}