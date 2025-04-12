import oledFont5x7 from 'oled-font-5x7'
import { getOLED, renderText, drawFromCanvas, clearDisplay, clearCanvas } from './lib.js'

const sleep = ms => new Promise(r => setTimeout(r, ms))
const getBottomY = font => 64 - font.height

const thresholds = [60, 80, 26, 130, 36, 50, 100, 90, 90]
const words = [
	{
		str: 'わびさび',
		font: 'Noto Sans JP',
		size: 25,
		lineHeight: 1.5,
		centerX: true,
		centerY: true,
		offsetY: -6,
		bold: false,
		handle: 'arpita.illustration'
	},
	{
		str: 'oiiae',
		font: 'JetBrains Mono',
		size: 35,
		lineHeight: 1.5,
		centerX: true,
		centerY: true,
		offsetY: -6,
		bold: false,
		handle: 'sarebjay'
	},
	{
		str: 'Löwenzahn',
		font: 'Quicksand',
		size: 20,
		lineHeight: 1.5,
		centerX: true,
		centerY: true,
		offsetY: -4,
		bold: false,
		handle: 'hanyashaven'
	},
	{
		str: 'سلام',
		font: 'Noto Sans Arabic',
		size: 35,
		lineHeight: 1.5,
		centerX: true,
		centerY: true,
		offsetY: -16,
		bold: false,
		handle: 'itismeeo'
	},
	{
		str: 'det æ’kke bare bare',
		font: 'Quicksand',
		size: 20,
		lineHeight: 1.5,
		centerX: true,
		centerY: true,
		offsetY: -6,
		bold: false,
		handle: 'tildadoesart'
	},
	{
		str: 'ラズベリーパイ',
		font: 'Noto Sans JP',
		size: 17,
		lineHeight: 1.5,
		centerX: true,
		centerY: true,
		offsetY: -6,
		bold: false,
		handle: 'funkyhoratio'
	},
	{
		str: 'தமிழ்',
		font: 'Noto Sans Tamil',
		size: 35,
		lineHeight: 1.5,
		centerX: true,
		centerY: true,
		offsetY: -15,
		bold: false,
		handle: 'suryapragasam'
	},
	{
		str: 'Programmēšana',
		font: 'Roboto',
		size: 13,
		lineHeight: 1.5,
		centerX: true,
		centerY: true,
		offsetY: -5,
		bold: false,
		handle: 'ananiel_'
	},
	{
		str: 'illusion',
		font: 'Roboto',
		size: 20,
		lineHeight: 1.5,
		centerX: true,
		centerY: true,
		offsetY: -5,
		bold: false,
		handle: 'tusharkandpal'
	},
	{
		str: 'سنہرا',
		font: 'Noto Sans Arabic',
		size: 35,
		lineHeight: 1.5,
		centerX: true,
		centerY: true,
		offsetY: -12,
		bold: false,
		handle: 'sunehra_tech'
	}
]

async function main() {
	const n = words.length
	clearDisplay()

	for (let i = 0; i < n; i++) {
		clearCanvas()
		renderText(words[i])
		drawFromCanvas(thresholds[i])

		const oled = getOLED()
		const font = oledFont5x7
		const submitter = '@' + words[i].handle

		oled.setCursor(5, getBottomY(font) - 2)
		oled.writeString(font, 1, submitter, 1, true)
		await sleep(1500)

		clearDisplay()
		await sleep(200)
	}
}

main()
