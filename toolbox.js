(_=>{let isScript=false;if(typeof(exports)=="undefined"){isScript=true;exports={};}
exports.calcSpeedFromDelta=(d,s)=>s*d/1e3;
exports.collisionX=(o1,o2)=>{if(o2.some)return o2.some(obj=>collisionX(o1,obj));if(o1.x>o2.x+o2.w||o1.x+o1.w<o2.x)return false;return true;};
exports.collisionY=(o1,o2)=>{if(o2.some)return o2.some(obj=>collisionY(o1,obj));if(o1.y>o2.y+o2.h||o1.y+o1.h<o2.y)return false;return true;};
exports.collision=(o1,o2)=>o2.some?o2.some(o=>collision(o1,o)):collisionX(o1,o2)&&collisionY(o1,o2);
exports.trackKeys=k=>{const d={};const h=e=>{if(k.includes(e.code)){d[e.code]=e.type==="keydown";e.preventDefault();}};document.onkeydown=h;document.onkeyup=h;return d;};
exports.random=(min,max)=>{if(min==undefined){min=0;max=2;}else if(max==undefined){max=min;min=0;}return Math.floor(randomFloat(min,max));};
exports.randomFloat=(min,max)=>{if(min==undefined){min=0;max=1;}else if(max==undefined){max=min;min=0;}return min+Math.random()*(max-min);};
exports.removeFromArray=(t,o)=>{const i=t.indexOf(o);if(i!==-1)t.splice(i,1);return t;};
exports.generateArray=(...args)=>{if(args.length<=1)return new Array(args[0]).fill(0);const arg=args.shift();return new Array(arg).fill(0).reduce(t=>{t.push(generateArray(...args));return t;},[]);};
exports.delay=time=>{return new Promise((resolve,reject)=>{if(time<1)reject("Time can't be less then 1 ms");else setTimeout(resolve,time);});};
exports.map=(v,f1,f2,l1,l2)=>l1+((l2-l1)*((v-f1)/(f2-f1)));
exports.loadImage=(o,u)=>{const i=new Image();i.src=u;i.onload=_=>o.img=i;i.onerror=error;};
exports.isImage=u=>/\.(jpeg|jpg|gif|png)$/.test(u);
exports.isAudio=u=>/\.(mp3|ogg|wav)$/.test(u);
exports.getCurrentDateTime=_=>{const c=new Date(),n=n=>(n<10?'0':'')+n;const d=n(c.getDate()),m=n(c.getMonth()+1),y=c.getFullYear();t=c.toTimeString().substring(0,8);return `${y}-${m}-${d} ${t}`;};
exports.MD5=d=>M(V(Y(X(d),8*d.length))).toLowerCase();function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f;}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _;}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _;}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e);}return Array(m,f,r,i);}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m);}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n);}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n);}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n);}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n);}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m;}function bit_rol(d,_){return d<<_|d>>>32-_;}
const{log,error}=console;exports.log=log;exports.error=error;
exports.ask = opt => {
    let query = opt.link ? opt.link+"?": "/?";
    let responseType = "text", requestType = "GET";
    if(opt.name){
        query += opt.name;
        if(opt.value)
            query += "="+opt.value;
    }
    if(opt.responseType){
        const responseTypes = ["text", "arraybuffer", "blob", "document", "json", "ms-stream", "moz-chunked-arraybuffer"];
        if(responseTypes.indexOf(opt.responseType) === -1)
            throw "Invalid responseType";
        else 
            responseType = opt.responseType;   
    }
    if(opt.requestType){
        const requestTypes = ["GET", "POST", "PUT", "DELETE"];
        if(requestTypes.indexOf(opt.requestType.toUpperCase()) === -1)
            throw "Invalid requestType";
        else 
            requestType = opt.requestType;  
    }
    return new Promise((resolve, reject) => {
        const x = new XMLHttpRequest();
        x.responseType = responseType;
    
        x.onreadystatechange = () => {
            if(x.readyState === 4){
                    if(x.status === 200)
                        resolve(x.response);
                    else
                        reject("Request failed : " + x.statusText);
            }
        };
        x.open(requestType, query, true);
        x.send();
    });
};
exports.$ = query => {
    const dom = document.querySelectorAll(query);

    if(dom.length > 0){        
        dom.css = (property, value) => dom.forEach(obj => obj.style[property] = value );
        dom.html =  value => dom.forEach(obj => obj.innerHTML = value );
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
                if(displayValues.hasOwnProperty(nodename))
                    obj.style.display = displayValues[nodename];
                else 
                    obj.style.display = "inline";
            });
        };
        dom.hide = _ => dom.forEach(obj => obj.style.display = "none" );
        dom.click = cb => dom.forEach(obj => obj.addEventListener("click", cb) );
        dom.attr = (name, value) => dom[0][name] = value ;

        return dom;
        
    } else
        return null;
};
exports.parseUrl = url => {
    url = url.split('%20').join(' ');
    const dir = url.split("/");
    dir.shift();
    const q = dir[dir.length-1].split('?'), r = { dir:dir, params:{ length:0 } };
    if(q.length > 1){
        q[1].split('&').forEach(item => {
            const obj = item.split('=');
            r.params[obj[0]] = obj.length > 1 ? obj[1] : '';
            r.params.length++;
       });
       dir[dir.length-1] = q[0];
    }
    return r;
};
exports.cleanup = callback => {
    callback = callback || (_ => {});
    
    process.on('cleanup', callback);

    // do app specific cleaning before exiting
    process.on('exit',  _ => {
        process.emit('cleanup');
    });

    // catch ctrl+c event and exit normally
    process.on('SIGINT', _ => {
        process.exit(2);
    });

    //catch uncaught exceptions, trace, then exit normally
    process.on('uncaughtException', e => {
        log('Uncaught Exception...');
        error(e.stack);
        process.exit(99);
    });
};
if(isScript)for(let key of Object.keys(exports))if(!window[key])window[key]=exports[key];})();