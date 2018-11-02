// const fs = require('fs');
const BMP24 = require('gd-bmp').BMP24;

const WIDTH = 75;
const HEIGHT = 30;

//自定义字模
// const cnfonts = {
// 	w: 16,
// 	h: 16,
// 	fonts: '中国',
// 	data: [
// 		[0x01, 0x01, 0x01, 0x01, 0x3F, 0x21, 0x21, 0x21, 0x21, 0x21, 0x3F, 0x21, 0x01, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0xF8, 0x08, 0x08, 0x08, 0x08, 0x08, 0xF8, 0x08, 0x00, 0x00, 0x00, 0x00],/*"中",0*/
// 		[0x00, 0x7F, 0x40, 0x40, 0x5F, 0x41, 0x41, 0x4F, 0x41, 0x41, 0x41, 0x5F, 0x40, 0x40, 0x7F, 0x40, 0x00, 0xFC, 0x04, 0x04, 0xF4, 0x04, 0x04, 0xE4, 0x04, 0x44, 0x24, 0xF4, 0x04, 0x04, 0xFC, 0x04],/*"国",1*/
// 	]
// };

//仿PHP的rand函数
function rand(min, max) {
	return Math.random() * (max - min + 1) + min | 0; //特殊的技巧，|0可以强制转换为整数
}

function makeCapcha() {
	let img = new BMP24(WIDTH, HEIGHT);
	img.fillRect(0, 0, WIDTH, HEIGHT, 0x172232);
	img.drawCircle(rand(0, WIDTH), rand(0, HEIGHT), rand(10, HEIGHT), 0x172232);
	//边框
	img.drawRect(0, 0, img.w - 1, img.h - 1, 0x172232);
	img.fillRect(rand(0, WIDTH), rand(0, HEIGHT), rand(10, HEIGHT - 5), rand(10, HEIGHT - 5), 0x172232);
	img.drawLine(rand(0, WIDTH), rand(0, HEIGHT), rand(0, WIDTH), rand(0, HEIGHT), 0xffffff);

	let p = 'abcdefghkmnpqrstuvwxyzABCDEFGHKMNPQRSTUVWXYZ3456789';
	let str = '';
	for (let i = 0; i < 5; i++) {
		str += p.charAt(Math.random() * p.length | 0);
	}

	let fonts = [BMP24.font8x16, BMP24.font12x24, BMP24.font16x32];
	let x = 2, y = 4;
	for (let i = 0; i < str.length; i++) {
		let f = fonts[Math.random() * fonts.length | 0];
		y = 8 + rand(-8, 5);
		img.drawChar(str[i], x, y, f, 0xffffff);
		x += f.w + rand(1, 2);
	}

	//画曲线
	let w = img.w / 2;
	let h = img.h;
	let color = rand(0, 0xffffff);
	let y1 = rand(-5, 5); //Y轴位置调整
	let w2 = rand(10, 15); //数值越小频率越高
	let h3 = rand(4, 6); //数值越小幅度越大
	let bl = rand(1, 5);
	for (let i = -w; i < w; i += 0.1) {
		let y = Math.floor(h / h3 * Math.sin(i / w2) + h / 2 + y1);
		let x = Math.floor(i + w);
		for (let j = 0; j < bl; j++) {
			img.drawPoint(x, y + j, color);
		}
	}
	return { code: str, img: img };
}

module.exports = { makeCapcha: makeCapcha };