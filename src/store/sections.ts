import { fetchSections } from 'services/api/calls';
import type { Section } from 'services/api/types';
import create from 'zustand'

type TStore = {
    sections?: Section[]
    isFetching:boolean
    fetch:() => void
    getSections:() => Section[] | undefined
};

export default create<TStore>((set, get) => ({
    isFetching:false,
    fetch: async () => {
        set({isFetching:true})
        set({sections:await fetchSections() , isFetching:false })
    }, 
    getSections:() => {
        const state = get()
        if(!state.sections && !state.isFetching){
            state.fetch()
        }
        return state.sections
    }
}))



