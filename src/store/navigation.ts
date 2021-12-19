import create from 'zustand'

type TStore = {
    sectionId?:string
    screenId?:string
    page?:string
    update:(sectionId?:string, screenId?:string, page?:string) => void
};

export default create<TStore>((set) => ({
    update: (sectionId?:string, screenId?:string, page?:string) => set({sectionId, screenId, page}),
}))