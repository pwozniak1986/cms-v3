import sections from './sections.json'

export default function fakeFetch (address: string){
    return new Promise<any>((resolve) => {
        setTimeout(() => resolve({ json: () => Promise.resolve(getResponse(address)) }), 100 + (Math.random() * 200));
    });
}

function getResponse (address:string) {
    return sections
}
    
