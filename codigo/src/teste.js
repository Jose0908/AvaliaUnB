import fs from 'fs'

const file = fs.readFileSync('/home/jose/killua.jpg')
const blob = Buffer.from(file)

console.log(blob)