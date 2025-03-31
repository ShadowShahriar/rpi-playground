import libgpiod from 'node-libgpiod'

const { version, Chip, Line, LineFlags } = libgpiod
const consumer = 'node'
const chipid = 0
const getpin = n => `__GPIO${n}`
global.chip = new Chip(chipid)

console.log('Using libgpiod', `v${version()}`)
export const INPUT_PULLUP = LineFlags.GPIOD_LINE_REQUEST_FLAG_BIAS_PULL_UP
export const INPUT_PULLDOWN = LineFlags.GPIOD_LINE_REQUEST_FLAG_BIAS_PULL_DOWN
export const INPUT = 'INPUT'
export const OUTPUT = 'OUTPUT'
export const HIGH = 1
export const LOW = 0

export function GPIO(pin, mode = 'OUTPUT', val = 0) {
	if (!global[getpin(pin)]) global[getpin(pin)] = new Line(chip, pin)
	if (mode === 'OUTPUT') global[getpin(pin)].requestOutputMode(val)
	else {
		if (val == INPUT_PULLUP) global[getpin(pin)].requestInputModeFlags(consumer, INPUT_PULLUP)
		else if (val == INPUT_PULLDOWN) global[getpin(pin)].requestInputModeFlags(consumer, INPUT_PULLDOWN)
		else global[getpin(pin)].requestInputMode(consumer)
	}
}

export function purgeGPIO(pin) {
	if (!global[getpin(pin)]) return false
	global[getpin(pin)].release()
	return true
}

export function digitalWrite(pin, val) {
	if (!global[getpin(pin)]) return false
	global[getpin(pin)].setValue(val > 0 ? 1 : 0)
	return true
}

export function digitalRead(pin) {
	if (!global[getpin(pin)]) return null
	return global[getpin(pin)].getValue()
}
