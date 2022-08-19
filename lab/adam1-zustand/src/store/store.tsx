import create from 'zustand'

function useStore() {
    return create((set: any) => ({
        pokemans: [
            { id: 1, name: 'Bulbasur' },
            { id: 2, name: "Ivysaur" },
            { id: 3, name: "Venusaur" },
            { id: 4, name: "Charmander" },
            { id: 5, name: "Charmeleon" },
        ],
        addPokemons:(pokeman:any)=> set()
    }))
}