const fs = require("fs");

async function print(path, csv) {
    fs.rmdirSync(csv, {recursive: true})
    fs.mkdirSync(csv)
    
    const dir = await fs.promises.opendir(path);

    for await (const dirent of dir) {
        if(dirent.name.includes('_usersays')) {
            let json = fs.readFileSync(`${path}/${dirent.name}`)

            let object = JSON.parse(json)

            for(let {data} of object) {
                let phrase_compound = ''

                for(let item of data) {
                    phrase_compound = phrase_compound.concat(item.text)
                }

                phrase_compound = phrase_compound.concat('\n')

                fs.writeFile(csv + '/' + dirent.name.replace('.json', '.csv'), phrase_compound, {flag: 'a'}, (err) => {
                    if(err)
                        throw new Error(err)
                })
            }
        }
    }
}


print('./intents', './files_CSV')
    .catch(err => {
        console.log(new Error(err))
    })