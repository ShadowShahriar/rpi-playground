import i2c from 'i2c-bus'
import Oled from 'oled-rpi-i2c-bus'
import { createCanvas } from 'canvas'

const defaultThreshold = 154
const defaultLineHeight = 1.2

const options = {
	width: 128,
	height: 64,
	address: 0x3c,
	driver: 'SSD1306'
}

const colors = {
	foreground: 'white',
	background: 'black'
}

const bus = i2c.openSync(1)
const oled = new Oled(bus, options)
const canvas = createCanvas(options.width, options.height)
const ctx = canvas.getContext('2d')

export const getOLED = _ => oled
export const getCanvas = _ => canvas
export const getCtx = _ => ctx
export const clearCanvas = _ => {
	ctx.fillStyle = colors.background
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

canvas.width = options.width
canvas.height = options.height
ctx.imageSmoothingEnabled = false
clearCanvas()

export const renderText = ({
	str,
	font,
	size,
	bold,
	tx,
	ty,
	lineHeight,
	centerX = false,
	centerY = false,
	offsetY = 0
}) => {
	ctx.font = bold ? `bold ${size}px "${font}"` : `${size}px "${font}"`
	ctx.fillStyle = colors.foreground
	ctx.translate(0.2, 0.2)

	const { actualBoundingBoxAscent, actualBoundingBoxDescent } = ctx.measureText(str)
	const height = actualBoundingBoxAscent + actualBoundingBoxDescent
	const currLineHeight = (lineHeight || defaultLineHeight) * height
	const cw = ctx.canvas.width
	const ch = ctx.canvas.height

	const words = str.split(' ')
	let curr = ''
	let temp = ''
	let lines = []
	let x = tx || 0
	let y = (ty || 0) + height

	for (let i = 0, n = words.length; i < n; i++) {
		temp += `${words[i]} `
		const tempWidth = ctx.measureText(temp).width
		if (tempWidth > cw && i > 0) {
			lines.push([curr, x, y])
			y += currLineHeight
			curr = `${words[i]} `
			temp = `${words[i]} `
		} else curr += `${words[i]} `
		if (i === n - 1) lines.push([curr, x, y])
	}

	for (let i = 0, n = lines.length; i < n; i++) {
		const line = lines[i]
		const text = line[0].trim()
		let newX = line[1]
		let newY = line[2]
		if (centerX) newX = cw * 0.5 - ctx.measureText(text).width * 0.5
		if (centerY) {
			const offset = ch * 0.5 - Math.round((height + currLineHeight * (n - 1)) * 0.5)
			newY = height + currLineHeight * i + offset
		}
		ctx.fillText(text, newX, newY + (offsetY || 0))
	}
}

const getCanvasData = (threshold = defaultThreshold) => {
	const { data } = ctx.getImageData(0, 0, options.width, options.height)
	let array = []
	for (let i = 0, n = data.length; i < n; i += 4) {
		const bit = data[i] >= threshold ? 1 : 0
		array.push(bit)
	}
	return Buffer.from(array)
}

export const drawFromCanvas = (threshold = defaultThreshold) => {
	oled.clearDisplay()
	oled.drawBitmap(getCanvasData(threshold))
	oled.update()
}

export const clearDisplay = _ => {
	oled.clearDisplay()
	oled.update()
}
