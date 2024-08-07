(exports => {
	exports.log = console.log;
	exports.error = console.error;

	exports.max = function(...args) {
		return (args.length == 1 && Array.isArray(args[0])) ? Math.max(...args[0]) : Math.max(...args);
	};
	exports.min = function(...args) {
		return (args.length == 1 && Array.isArray(args[0])) ? Math.min(...args[0]) : Math.min(...args);
	};
	exports.pow = Math.pow;
	exports.floor = Math.floor;
	exports.ceil = Math.ceil;
	exports.round = (n, prec = 0) => Math.round(n * pow(10, prec)) / pow(10, prec);
	exports.abs = Math.abs;
	exports.sqrt = Math.sqrt;

	exports.calcSpeedFromDelta = (d, s) => s * d / 1e3;

	exports.calcDistance = (o1, o2) => {
		const x = pow(o2.x - o1.x, 2);
		const y = pow(o2.y - o1.y, 2);
		return sqrt(x + y);
	};

	exports.calcAngle = (o1, o2) => Math.atan2(o2.y - o1.y, o2.x - o1.x);

	exports.collisionX = (o1, o2) => {
		if (Array.isArray(o2)) return o2.some(obj => collisionX(o1, obj));
		else return (!(o1.x > o2.x + o2.w || o1.x + o1.w < o2.x));
	};

	exports.collisionY = (o1, o2) => {
		if (Array.isArray(o2)) return o2.some(obj => collisionY(o1, obj));
		else return (!(o1.y > o2.y + o2.h || o1.y + o1.h < o2.y));
	};

	exports.collision = (o1, o2) => {
		if (Array.isArray(o2)) return o2.some(o => collision(o1, o));
		else return collisionX(o1, o2) && collisionY(o1, o2);
	};

	exports.constrain = (n, min, max) => n < min ? min : n > max ? max : n;

	exports.trackKeys = (elt, k) => {
		const d = {};
		const h = (e, val) => {
			if (k.includes(e.code)) {
				d[e.code] = val;
				e.preventDefault();
			}
		};
		elt.onkeydown = e => h(e, true);
		elt.onkeyup = e => h(e, false);
		return d;
	};

	exports.rangeArray = arr => {
		if (!Array.isArray(arr))
			throw 'rangeArray() only accept arrays';
		else
			return [min(arr), max(arr)];
	};

	exports.range = n => this.generateArray(n).map((_, i) => i);

	exports.random = (min, max) => {
		if (Array.isArray(min) && max == undefined)
			return min[random(min.length)];
		else if (min == undefined) {
			min = 0;
			max = 2;
		} else if (max == undefined) {
			max = min;
			min = 0;
		}
		return floor(randomFloat(min, max));
	};

	exports.randomFloat = (min, max) => {
		if (min == undefined) {
			min = 0;
			max = 1;
		} else if (max == undefined) {
			max = min;
			min = 0;
		}
		return min + Math.random() * (max - min);
	};

	exports.randomNormal = (mean = 0, sd = 1) => {
		let s, u, v;

		do {
			u = randomFloat(-1, 1);
			v = randomFloat(-1, 1);
			s = pow(u, 2) + pow(v, 2);
		} while (s >= 1);

		const norm = u * sqrt(-2 * Math.log(s) / s);
		return sd * norm + mean;
	};

	exports.removeFromArray = (t, o) => {
		const i = t.indexOf(o);
		if (i !== -1) t.splice(i, 1);
		return t;
	};

	exports.generateArray = (...args) => {
		if (args.length <= 1) return new Array(args[0]).fill(0);
		const arg = args.shift();
		return new Array(arg).fill(0).reduce(t => {
			t.push(generateArray(...args));
			return t;
		}, []);
	};

	exports.delay = time => {
		return new Promise((resolve, reject) => {
			if (time < 1) reject("Time can't be less then 1 ms");
			else setTimeout(resolve, time);
		});
	};

	exports.map = (v, f1, f2, l1, l2) => l1 + (l2 - l1) * ((v - f1) / (f2 - f1));

	exports.loadImage = (o, s) => {
		const i = new Image();
		if (s) {
			if (typeof s != 'string')
				throw 'Loading image only support links';
			i.src = s;
			i.onload = _ => o.img = i;
		} else {
			if (typeof o != 'string')
				throw 'Loading image only support links';
			i.src = o;
		}
		i.onerror = error;
		return i;
	};

	exports.isImage = l => /\.(tif|jpeg|jpg|gif|png)$/.test(l.trim().toLowerCase());

	exports.loadAudio = (s, opt = {}) => {
		if (typeof o != 'string')
			throw 'Loading audio only support links';
		const a = new Audio();
		a.src = s;
		a.autoplay = opt.autoplay || false;
		a.loop = opt.loop || false;
		a.volume = opt.volume || 1.0;
		a.stop = function() {
			this.pause();
			this.currentTime = 0;
		};
		return a;
	};

	exports.isAudio = l => /\.(mp3|ogg|wav|flac|wma|aac)$/.test(l.trim().toLowerCase());

	exports.getCurrentDateTime = _ => {
		const c = new Date();
		const n = n => (n < 10 ? '0' : '') + n;
		const d = n(c.getDate());
		const m = n(c.getMonth() + 1);
		const y = c.getFullYear();
		const t = c.toTimeString().substring(0, 8);
		return `${y}-${m}-${d} ${t}`;
	};

	exports.sha256 = async message => crypto_digest('SHA-256', message);
	exports.sha384 = async message => crypto_digest('SHA-384', message);
	exports.sha512 = async message => crypto_digest('SHA-512', message);

	async function crypto_digest(algo, message) {

		// encode as UTF-8
		const msgBuffer = new TextEncoder('utf-8').encode(message);

		// hash the message
		const hashBuffer = await crypto.subtle.digest(algo, msgBuffer);

		// convert ArrayBuffer to Array
		const hashArray = Array.from(new Uint8Array(hashBuffer));

		// convert bytes to hex string
		const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
		return hashHex;
	}

	exports.MD5 = s => {
		function md5cycle(x, k) {
			let [a, b, c, d] = x;

			a = ff(a, b, c, d, k[0], 7, -680876936);
			d = ff(d, a, b, c, k[1], 12, -389564586);
			c = ff(c, d, a, b, k[2], 17, 606105819);
			b = ff(b, c, d, a, k[3], 22, -1044525330);
			a = ff(a, b, c, d, k[4], 7, -176418897);
			d = ff(d, a, b, c, k[5], 12, 1200080426);
			c = ff(c, d, a, b, k[6], 17, -1473231341);
			b = ff(b, c, d, a, k[7], 22, -45705983);
			a = ff(a, b, c, d, k[8], 7, 1770035416);
			d = ff(d, a, b, c, k[9], 12, -1958414417);
			c = ff(c, d, a, b, k[10], 17, -42063);
			b = ff(b, c, d, a, k[11], 22, -1990404162);
			a = ff(a, b, c, d, k[12], 7, 1804603682);
			d = ff(d, a, b, c, k[13], 12, -40341101);
			c = ff(c, d, a, b, k[14], 17, -1502002290);
			b = ff(b, c, d, a, k[15], 22, 1236535329);

			a = gg(a, b, c, d, k[1], 5, -165796510);
			d = gg(d, a, b, c, k[6], 9, -1069501632);
			c = gg(c, d, a, b, k[11], 14, 643717713);
			b = gg(b, c, d, a, k[0], 20, -373897302);
			a = gg(a, b, c, d, k[5], 5, -701558691);
			d = gg(d, a, b, c, k[10], 9, 38016083);
			c = gg(c, d, a, b, k[15], 14, -660478335);
			b = gg(b, c, d, a, k[4], 20, -405537848);
			a = gg(a, b, c, d, k[9], 5, 568446438);
			d = gg(d, a, b, c, k[14], 9, -1019803690);
			c = gg(c, d, a, b, k[3], 14, -187363961);
			b = gg(b, c, d, a, k[8], 20, 1163531501);
			a = gg(a, b, c, d, k[13], 5, -1444681467);
			d = gg(d, a, b, c, k[2], 9, -51403784);
			c = gg(c, d, a, b, k[7], 14, 1735328473);
			b = gg(b, c, d, a, k[12], 20, -1926607734);

			a = hh(a, b, c, d, k[5], 4, -378558);
			d = hh(d, a, b, c, k[8], 11, -2022574463);
			c = hh(c, d, a, b, k[11], 16, 1839030562);
			b = hh(b, c, d, a, k[14], 23, -35309556);
			a = hh(a, b, c, d, k[1], 4, -1530992060);
			d = hh(d, a, b, c, k[4], 11, 1272893353);
			c = hh(c, d, a, b, k[7], 16, -155497632);
			b = hh(b, c, d, a, k[10], 23, -1094730640);
			a = hh(a, b, c, d, k[13], 4, 681279174);
			d = hh(d, a, b, c, k[0], 11, -358537222);
			c = hh(c, d, a, b, k[3], 16, -722521979);
			b = hh(b, c, d, a, k[6], 23, 76029189);
			a = hh(a, b, c, d, k[9], 4, -640364487);
			d = hh(d, a, b, c, k[12], 11, -421815835);
			c = hh(c, d, a, b, k[15], 16, 530742520);
			b = hh(b, c, d, a, k[2], 23, -995338651);

			a = ii(a, b, c, d, k[0], 6, -198630844);
			d = ii(d, a, b, c, k[7], 10, 1126891415);
			c = ii(c, d, a, b, k[14], 15, -1416354905);
			b = ii(b, c, d, a, k[5], 21, -57434055);
			a = ii(a, b, c, d, k[12], 6, 1700485571);
			d = ii(d, a, b, c, k[3], 10, -1894986606);
			c = ii(c, d, a, b, k[10], 15, -1051523);
			b = ii(b, c, d, a, k[1], 21, -2054922799);
			a = ii(a, b, c, d, k[8], 6, 1873313359);
			d = ii(d, a, b, c, k[15], 10, -30611744);
			c = ii(c, d, a, b, k[6], 15, -1560198380);
			b = ii(b, c, d, a, k[13], 21, 1309151649);
			a = ii(a, b, c, d, k[4], 6, -145523070);
			d = ii(d, a, b, c, k[11], 10, -1120210379);
			c = ii(c, d, a, b, k[2], 15, 718787259);
			b = ii(b, c, d, a, k[9], 21, -343485551);

			x[0] = add32(a, x[0]);
			x[1] = add32(b, x[1]);
			x[2] = add32(c, x[2]);
			x[3] = add32(d, x[3]);
		}

		function cmn(q, a, b, x, s, t) {
			a = add32(add32(a, q), add32(x, t));
			return add32((a << s) | (a >>> (32 - s)), b);
		}

		function ff(a, b, c, d, x, s, t) {
			return cmn((b & c) | ((~b) & d), a, b, x, s, t);
		}

		function gg(a, b, c, d, x, s, t) {
			return cmn((b & d) | (c & (~d)), a, b, x, s, t);
		}

		function hh(a, b, c, d, x, s, t) {
			return cmn(b ^ c ^ d, a, b, x, s, t);
		}

		function ii(a, b, c, d, x, s, t) {
			return cmn(c ^ (b | (~d)), a, b, x, s, t);
		}

		function md51(s) {
			let n = s.length,
				state = [1732584193, -271733879, -1732584194, 271733878],
				i;
			for (i = 64; i <= s.length; i += 64)
				md5cycle(state, md5blk(s.substring(i - 64, i)));

			s = s.substring(i - 64);
			let tail = generateArray(16);
			for (i = 0; i < s.length; i++)
				tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
			tail[i >> 2] |= 0x80 << ((i % 4) << 3);
			if (i > 55) {
				md5cycle(state, tail);
				tail = generateArray(16);
			}
			tail[14] = n * 8;
			md5cycle(state, tail);
			return state;
		}

		function md5blk(s) {
			const md5blks = [];
			for (let i = 0; i < 64; i += 4) {
				md5blks[i >> 2] = s.charCodeAt(i) +
					(s.charCodeAt(i + 1) << 8) +
					(s.charCodeAt(i + 2) << 16) +
					(s.charCodeAt(i + 3) << 24);
			}
			return md5blks;
		}

		function rhex(n) {
			const hex_chr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
			let s = '';
			for (let j = 0; j < 4; j++)
				s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] +
				hex_chr[(n >> (j * 8)) & 0x0F];
			return s;
		}

		function hex(x) {
			return x.reduce((s, o) => s + rhex(o), '');
		}

		function add32(x, y) {
			const lsw = (x & 0xFFFF) + (y & 0xFFFF),
				msw = (x >> 16) + (y >> 16) + (lsw >> 16);
			return (msw << 16) | (lsw & 0xFFFF);
		}
		return hex(md51(s));
	};

	exports.ask = opt => {
		let query = opt.link ? opt.link + '?' : '/?';
		let responseType = 'text',
			requestType = 'GET';
		if (opt.name) {
			query += opt.name;
			if (opt.value) query += '=' + opt.value;
		}
		if (opt.responseType) {
			if ([
					'text',
					'arraybuffer',
					'blob',
					'document',
					'json',
					'ms-stream',
					'moz-chunked-arraybuffer'
				].indexOf(opt.responseType) === -1)
				throw 'Invalid responseType';
			else responseType = opt.responseType;
		}
		if (opt.requestType) {
			if (['GET', 'POST', 'PUT', 'DELETE'].indexOf(opt.requestType.toUpperCase()) === -1)
				throw 'Invalid requestType';
			else requestType = opt.requestType;
		}
		return new Promise((resolve, reject) => {
			const x = new XMLHttpRequest();
			x.responseType = responseType;

			x.onreadystatechange = () => {
				if (x.readyState === 4) {
					if (x.status === 200) resolve(x.response);
					else reject('Request failed : ' + x.statusText);
				}
			};
			x.open(requestType, query, true);
			x.send();
		});
	};

	exports.$ = query => {
		const dom = document.querySelectorAll(query);

		if (dom.length > 0) {
			dom.css = (property, value) =>
				dom.forEach(obj => (obj.style[property] = value));
			dom.html = value => dom.forEach(obj => (obj.innerHTML = value));
			dom.show = _ => {
				const displayValues = {
					address: 'block',
					area: 'block',
					article: 'block',
					aside: 'block',
					blockquote: 'block',
					body: 'block',
					caption: 'table-caption',
					col: 'table-column',
					colgroup: '',
					datalist: 'block',
					dd: 'block',
					details: 'block',
					div: 'block',
					dl: 'block',
					dt: 'block',
					fieldset: 'block',
					figcaption: 'block',
					figure: 'block',
					footer: 'block',
					form: 'block',
					h1: 'block',
					h2: 'block',
					h3: 'block',
					h4: 'block',
					h5: 'block',
					h6: 'block',
					head: 'block',
					header: 'block',
					hr: 'block',
					html: 'block',
					img: 'inline-block',
					legend: 'block',
					li: 'list-item',
					link: 'block',
					map: 'inline',
					menu: 'block',
					nav: 'block',
					ol: 'block',
					output: 'inline',
					p: 'block',
					param: 'block',
					pre: 'block',
					q: 'inline',
					script: 'block',
					section: 'block',
					style: 'block',
					summary: 'block',
					table: 'table',
					tbody: 'table-row-group',
					td: 'table-cell',
					tfoot: 'table-footer-group',
					th: 'table-cell',
					thead: 'table-header-group',
					title: 'block',
					tr: 'table-row',
					ul: 'block'
				};
				dom.forEach(obj => {
					const nodename = obj.nodeName.toLowerCase();
					if (displayValues.hasOwnProperty(nodename))
						obj.style.display = displayValues[nodename];
					else obj.style.display = 'inline';
				});
			};
			dom.hide = _ => dom.forEach(obj => (obj.style.display = 'none'));
			dom.click = cb => dom.forEach(obj => obj.addEventListener('click', cb));
			dom.attr = (name, value) => (dom[0][name] = value);

			return dom;
		} else return null;
	};

	exports.parseUrl = url => {
		url = url.split('%20').join(' ');
		const dir = url.split('/');
		dir.shift();
		const q = dir[dir.length - 1].split('?'),
			r = {
				dir: dir,
				params: {
					length: 0
				}
			};
		if (q.length > 1) {
			q[1].split('&').forEach(item => {
				const obj = item.split('=');
				r.params[obj[0]] = obj.length > 1 ? obj[1] : '';
				r.params.length++;
			});
			dir[dir.length - 1] = q[0];
		}
		return r;
	};

	exports.cleanup = callback => {

		process.on('cleanup', callback);

		// do app specific cleaning before exiting
		process.on('exit', _ => {
			process.emit('cleanup');
		});

		// catch ctrl+c event and exit normally
		process.on('SIGINT', _ => {
			process.emit('cleanup');
			process.exit(2);
		});

		//catch uncaught exceptions, trace, then exit normally
		process.on('uncaughtException', e => {
			console.error('Uncaught Exception...');
			console.error(e.stack);
			process.emit('cleanup');
			process.exit(99);
		});
	};

	class Rectangle {
		constructor(x = 0, y = 0, w = 0, h = 0, _c = 'black') {
			defineControlledProperty(this, 'x', x, nx => {
				if (isNaN(nx)) throw 'x property accept numbers only';
			});
			defineControlledProperty(this, 'y', y, ny => {
				if (isNaN(ny)) throw 'y property accept numbers only';
			});
			defineControlledProperty(this, 'h', h, nh => {
				if (isNaN(nh)) throw 'h property accept numbers only';
			});
			defineControlledProperty(this, 'w', w, nw => {
				if (isNaN(nw)) throw 'w property accept numbers only';
			});
			this.c = _c;

			//Image placeholder
			this.img = undefined;
		}

		draw(ctx) {
			ctx.save();
			ctx.translate(this.x, this.y);
			//If no img
			if (this.img != undefined)
				ctx.drawImage(this.img, 0, 0, this.w, this.h);
			else {
				ctx.fillStyle = this.c;
				ctx.fillRect(0, 0, this.w, this.h);
			}
			ctx.restore();
		}

		loadImage(s) {
			if (typeof s != 'string')
				throw 'Loading image only support links';
			const i = new Image();
			i.src = s;
			i.onload = _ => this.img = i;
			i.onerror = error;
			return i;
		}
	}

	exports.Rectangle = Rectangle;

	exports.defineControlledProperty = (o, n, v, cf) => {
		Object.defineProperty(o, n, {
			get: _ => v,
			set: nv => {
				cf(nv);
				v = nv;
			}
		});
		o[n] = v;
	};

	exports.arrayEqual = (t1, t2) => {
		return t1.length === t1.length &&
			t1.every((o, i) => o === t2[i]);
	};

	//US ------------------- UK
	exports.colorNameToHex = exports.colourNameToHex = c => {
		const colours = {
			'aliceblue': '#f0f8ff',
			'antiquewhite': '#faebd7',
			'aqua': '#00ffff',
			'aquamarine': '#7fffd4',
			'azure': '#f0ffff',
			'beige': '#f5f5dc',
			'bisque': '#ffe4c4',
			'black': '#000000',
			'blanchedalmond': '#ffebcd',
			'blue': '#0000ff',
			'blueviolet': '#8a2be2',
			'brown': '#a52a2a',
			'burlywood': '#deb887',
			'cadetblue': '#5f9ea0',
			'chartreuse': '#7fff00',
			'chocolate': '#d2691e',
			'coral': '#ff7f50',
			'cornflowerblue': '#6495ed',
			'cornsilk': '#fff8dc',
			'crimson': '#dc143c',
			'cyan': '#00ffff',
			'darkblue': '#00008b',
			'darkcyan': '#008b8b',
			'darkgoldenrod': '#b8860b',
			'darkgray': '#a9a9a9',
			'darkgreen': '#006400',
			'darkkhaki': '#bdb76b',
			'darkmagenta': '#8b008b',
			'darkolivegreen': '#556b2f',
			'darkorange': '#ff8c00',
			'darkorchid': '#9932cc',
			'darkred': '#8b0000',
			'darksalmon': '#e9967a',
			'darkseagreen': '#8fbc8f',
			'darkslateblue': '#483d8b',
			'darkslategray': '#2f4f4f',
			'darkturquoise': '#00ced1',
			'darkviolet': '#9400d3',
			'deeppink': '#ff1493',
			'deepskyblue': '#00bfff',
			'dimgray': '#696969',
			'dodgerblue': '#1e90ff',
			'firebrick': '#b22222',
			'floralwhite': '#fffaf0',
			'forestgreen': '#228b22',
			'fuchsia': '#ff00ff',
			'gainsboro': '#dcdcdc',
			'ghostwhite': '#f8f8ff',
			'gold': '#ffd700',
			'goldenrod': '#daa520',
			'gray': '#808080',
			'green': '#008000',
			'greenyellow': '#adff2f',
			'honeydew': '#f0fff0',
			'hotpink': '#ff69b4',
			'indianred ': '#cd5c5c',
			'indigo': '#4b0082',
			'ivory': '#fffff0',
			'khaki': '#f0e68c',
			'lavender': '#e6e6fa',
			'lavenderblush': '#fff0f5',
			'lawngreen': '#7cfc00',
			'lemonchiffon': '#fffacd',
			'lightblue': '#add8e6',
			'lightcoral': '#f08080',
			'lightcyan': '#e0ffff',
			'lightgoldenrodyellow': '#fafad2',
			'lightgrey': '#d3d3d3',
			'lightgreen': '#90ee90',
			'lightpink': '#ffb6c1',
			'lightsalmon': '#ffa07a',
			'lightseagreen': '#20b2aa',
			'lightskyblue': '#87cefa',
			'lightslategray': '#778899',
			'lightsteelblue': '#b0c4de',
			'lightyellow': '#ffffe0',
			'lime': '#00ff00',
			'limegreen': '#32cd32',
			'linen': '#faf0e6',
			'magenta': '#ff00ff',
			'maroon': '#800000',
			'mediumaquamarine': '#66cdaa',
			'mediumblue': '#0000cd',
			'mediumorchid': '#ba55d3',
			'mediumpurple': '#9370d8',
			'mediumseagreen': '#3cb371',
			'mediumslateblue': '#7b68ee',
			'mediumspringgreen': '#00fa9a',
			'mediumturquoise': '#48d1cc',
			'mediumvioletred': '#c71585',
			'midnightblue': '#191970',
			'mintcream': '#f5fffa',
			'mistyrose': '#ffe4e1',
			'moccasin': '#ffe4b5',
			'navajowhite': '#ffdead',
			'navy': '#000080',
			'oldlace': '#fdf5e6',
			'olive': '#808000',
			'olivedrab': '#6b8e23',
			'orange': '#ffa500',
			'orangered': '#ff4500',
			'orchid': '#da70d6',
			'palegoldenrod': '#eee8aa',
			'palegreen': '#98fb98',
			'paleturquoise': '#afeeee',
			'palevioletred': '#d87093',
			'papayawhip': '#ffefd5',
			'peachpuff': '#ffdab9',
			'peru': '#cd853f',
			'pink': '#ffc0cb',
			'plum': '#dda0dd',
			'powderblue': '#b0e0e6',
			'purple': '#800080',
			'rebeccapurple': '#663399',
			'red': '#ff0000',
			'rosybrown': '#bc8f8f',
			'royalblue': '#4169e1',
			'saddlebrown': '#8b4513',
			'salmon': '#fa8072',
			'sandybrown': '#f4a460',
			'seagreen': '#2e8b57',
			'seashell': '#fff5ee',
			'sienna': '#a0522d',
			'silver': '#c0c0c0',
			'skyblue': '#87ceeb',
			'slateblue': '#6a5acd',
			'slategray': '#708090',
			'snow': '#fffafa',
			'springgreen': '#00ff7f',
			'steelblue': '#4682b4',
			'tan': '#d2b48c',
			'teal': '#008080',
			'thistle': '#d8bfd8',
			'tomato': '#ff6347',
			'turquoise': '#40e0d0',
			'violet': '#ee82ee',
			'wheat': '#f5deb3',
			'white': '#ffffff',
			'whitesmoke': '#f5f5f5',
			'yellow': '#ffff00',
			'yellowgreen': '#9acd32'
		};

		if (typeof colours[c.toLowerCase()] != 'undefined')
			return colours[c.toLowerCase()];

		return false;
	};

	exports.sum = arr => {
		if (!Array.isArray(arr))
			throw 'arr() is only compatible with arrays';
		else
			return arr.reduce((t, o) => t + o, 0);
	};

	exports.mean = arr => {
		if (!Array.isArray(arr))
			throw 'mean() is only compatible with arrays';
		else
			return sum(arr) / arr.length;
	};

	exports.stddev = arr => {
		if (!Array.isArray(arr))
			throw 'stddev() is only compatible with arrays';
		else {
			const mu = mean(arr);
			return this.sum(arr.map(v => this.pow(v - mu, 2))) / arr.length;
		}
	};

	exports.encodeHTML = str => str.replace(/[&<>'"]/g, tag => ({
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		"'": '&#39;',
		'"': '&quot;'
	})[tag] || tag);

	exports.decodeHTML = str => str.replace(/&[#a-zA-Z0-9]{1,4};/g, tag => ({
		'&amp;': '&',
		'&lt;': '<',
		'&gt;': '>',
		'&#39;': "'",
		'&quot;': '"'
	})[tag] || tag);

})(typeof exports == 'undefined' ? typeof window == 'undefined' ? self : window : exports);
