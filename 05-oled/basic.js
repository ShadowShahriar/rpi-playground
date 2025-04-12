import font from './fonts/font.org_v01_18px.js'
import { getOLED, renderText, drawFromCanvas, clearDisplay } from './lib.js'

async function main() {
	clearDisplay()
	renderText({
		str: 'わびさび',
		font: 'Noto Sans JP',
		bold: false,
		size: 25,
		lineHeight: 1.5,
		centerX: true,
		centerY: true,
		offsetY: -10
	})
	drawFromCanvas(64)

	const oled = getOLED()
	oled.setCursor(27, 42)
	oled.writeString(font, 1, 'WABI-SABI', 1, true)
}

main()
