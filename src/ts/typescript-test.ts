const field: string = 'Hello TypeScript'
let srt: string = '1'
let srt2 = parseInt(srt)
let num: number = srt2;

interface OBJ {
    field: string
}

const wfm: OBJ = {field}

console.log(wfm.field, srt2);