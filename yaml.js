// Object

class YAML {
    #rws=""
    #raw = {}
    constructor(file){
        console.info(this.#fetchData(file))
    }
    #fetchData = async (url)=>{
        // return await (await fetch(url)).json()

        return await fetch(url).then(data=>data.json()||false)
    }
}