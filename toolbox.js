(exports => {
	exports.log = console.log;
	exports.error = console.error;

	exports.max = Math.max;
	exports.min = Math.min;
	exports.pow = Math.pow;
	exports.floor = Math.floor;
	exports.ceil = Math.ceil;
	exports.abs = Math.abs;

	exports.calcSpeedFromDelta = (d, s) => (s * d) / 1e3;

	exports.collisionX = (o1, o2) => {
		if (o2.some) return o2.some(obj => collisionX(o1, obj));
		else return (!(o1.x > o2.x + o2.w || o1.x + o1.w < o2.x));
	};

	exports.collisionY = (o1, o2) => {
		if (o2.some) return o2.some(obj => collisionY(o1, obj));
		else return (!(o1.y > o2.y + o2.h || o1.y + o1.h < o2.y));
	};

	exports.collision = (o1, o2) => {
		if (o2.some) return o2.some(o => collision(o1, o));
		else return collisionX(o1, o2) && collisionY(o1, o2);
	};

	exports.constrain = (n, min, max) => n < min ? min : n > max ? max : n;

	exports.trackKeys = k => {
		const d = {};
		const h = (e, val) => {
			if (k.includes(e.code)) {
				d[e.code] = val;
				e.preventDefault();
			}
		};
		document.onkeydown = e => h(e, true);
		document.onkeyup = e => h(e, false);
		return d;
	};

	exports.random = (min, max) => {
		if (min == undefined) {
			min = 0;
			max = 2;
		} else if (max == undefined) {
			max = min;
			min = 0;
		}
		return Math.floor(randomFloat(min, max));
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

	let previous = false;
	let y2 = 0;
	exports.randomGaussian = (mean = 0, sd = 1) => {
		let y1;
		if (previous) {
			y1 = y2;
			previous = false;
		} else {
			let x1, x2, w = Infinity;
			do {
				x1 = exports.randomFloat(2) - 1;
				x2 = exports.randomFloat(2) - 1;
				w = x1 * x1 + x2 * x2;
			} while (w >= 1);
			w = Math.sqrt(-2 * Math.log(w) / w);
			y1 = x1 * w;
			y2 = x2 * w;
			previous = true;
		}
		return y1 * sd + mean;
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
			i.src = s;
			i.onload = _ => o.img = i;
		} else
			i.src = o;
		i.onerror = error;
		return i;
	};

	exports.isImage = l => /\.(jpeg|jpg|gif|png)$/.test(l);

	exports.loadAudio = (s, opt = {}) => {
		const a = new Audio();
		a.src = s;
		a.autoplay = opt.autoplay || false;
		a.loop = opt.loop || false;
		a.volume = opt.volume || 1.0;
		a.stop = function () {
			this.pause();
			this.currentTime = 0;
		};
		return a;
	};

	exports.isAudio = l => /\.(mp3|ogg|wav)$/.test(l);

	exports.getCurrentDateTime = _ => {
		const c = new Date(),
			n = n => (n < 10 ? "0" : "") + n;
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

	exports.MD5 = s => hex(md51(s));

	function md5cycle(x, k) {
		let a = x[0],
			b = x[1],
			c = x[2],
			d = x[3];

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
		const hex_chr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
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

	exports.ask = opt => {
		let query = opt.link ? opt.link + "?" : "/?";
		let responseType = "text",
			requestType = "GET";
		if (opt.name) {
			query += opt.name;
			if (opt.value) query += "=" + opt.value;
		}
		if (opt.responseType) {
			if ([
					"text",
					"arraybuffer",
					"blob",
					"document",
					"json",
					"ms-stream",
					"moz-chunked-arraybuffer"
				].indexOf(opt.responseType) === -1)
				throw "Invalid responseType";
			else responseType = opt.responseType;
		}
		if (opt.requestType) {
			if (["GET", "POST", "PUT", "DELETE"].indexOf(opt.requestType.toUpperCase()) === -1)
				throw "Invalid requestType";
			else requestType = opt.requestType;
		}
		return new Promise((resolve, reject) => {
			const x = new XMLHttpRequest();
			x.responseType = responseType;

			x.onreadystatechange = () => {
				if (x.readyState === 4) {
					if (x.status === 200) resolve(x.response);
					else reject("Request failed : " + x.statusText);
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
					address: "block",
					area: "block",
					article: "block",
					aside: "block",
					blockquote: "block",
					body: "block",
					caption: "table-caption",
					col: "table-column",
					colgroup: "",
					datalist: "block",
					dd: "block",
					details: "block",
					div: "block",
					dl: "block",
					dt: "block",
					fieldset: "block",
					figcaption: "block",
					figure: "block",
					footer: "block",
					form: "block",
					h1: "block",
					h2: "block",
					h3: "block",
					h4: "block",
					h5: "block",
					h6: "block",
					head: "block",
					header: "block",
					hr: "block",
					html: "block",
					img: "inline-block",
					legend: "block",
					li: "list-item",
					link: "block",
					map: "inline",
					menu: "block",
					nav: "block",
					ol: "block",
					output: "inline",
					p: "block",
					param: "block",
					pre: "block",
					q: "inline",
					script: "block",
					section: "block",
					style: "block",
					summary: "block",
					table: "table",
					tbody: "table-row-group",
					td: "table-cell",
					tfoot: "table-footer-group",
					th: "table-cell",
					thead: "table-header-group",
					title: "block",
					tr: "table-row",
					ul: "block"
				};
				dom.forEach(obj => {
					const nodename = obj.nodeName.toLowerCase();
					if (displayValues.hasOwnProperty(nodename))
						obj.style.display = displayValues[nodename];
					else obj.style.display = "inline";
				});
			};
			dom.hide = _ => dom.forEach(obj => (obj.style.display = "none"));
			dom.click = cb => dom.forEach(obj => obj.addEventListener("click", cb));
			dom.attr = (name, value) => (dom[0][name] = value);

			return dom;
		} else return null;
	};

	exports.parseUrl = url => {
		url = url.split("%20").join(" ");
		const dir = url.split("/");
		dir.shift();
		const q = dir[dir.length - 1].split("?"),
			r = {
				dir: dir,
				params: {
					length: 0
				}
			};
		if (q.length > 1) {
			q[1].split("&").forEach(item => {
				const obj = item.split("=");
				r.params[obj[0]] = obj.length > 1 ? obj[1] : "";
				r.params.length++;
			});
			dir[dir.length - 1] = q[0];
		}
		return r;
	};

	exports.cleanup = callback => {

		process.on("cleanup", callback);

		// do app specific cleaning before exiting
		process.on("exit", _ => {
			process.emit("cleanup");
		});

		// catch ctrl+c event and exit normally
		process.on("SIGINT", _ => {
			process.emit("cleanup");
			process.exit(2);
		});

		//catch uncaught exceptions, trace, then exit normally
		process.on("uncaughtException", e => {
			log("Uncaught Exception...");
			error(e.stack);
			process.emit("cleanup");
			process.exit(99);
		});
	};

	class Rectangle {
		constructor(_x = 0, _y = 0, _w = 0, _h = 0, _c = 'black') {
			this.x = _x;
			this.y = _y;
			this.w = _w;
			this.h = _h;
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
		cf(value);
	};

})(typeof exports == "undefined" ? typeof window == "undefined" ? self : window : exports);