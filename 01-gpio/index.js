import { GPIO, digitalWrite, OUTPUT } from './lib.js'

// === initialize GPIO 17, 18, and 27 as OUTPUT ===
GPIO(17, OUTPUT)
GPIO(18, OUTPUT)
GPIO(27, OUTPUT)

let x = 0
let y = 0
let z = 0

setInterval(_ => digitalWrite(17, x++ % 2), 1000)
setInterval(_ => digitalWrite(18, y++ % 2), 700)
setInterval(_ => digitalWrite(27, z++ % 2), 400)
