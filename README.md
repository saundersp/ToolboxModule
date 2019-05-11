# ToolboxModule

Un module NodeJS incluant plusieurs fonctions réutilisables pour des projets divers, est également utilisable en navigateur

## Usage

1. `Cloner le répertoire avec git clone https://github.com/saundersp/ToolboxModule.git`
2. `Pour NodeJS : Utilisez require('../ToolboxModule')`
3. `Pour navigateur : Mettre <script src="toolbox.min.js"></script> dans le head`

## Documentation des fonctions

### calcSpeedFromDelta(delta, speed)

#### Permet de convertir les déplacement Pixel/S en Pixels/Delta(ms) pour animation plus fluide

```javascript
class Player {
//...
    move(ms){
        //...
        const tempVelX = calcSpeedFromDelta(ms, this.speedX);
        this.x += tempVelX;
        //...
    }
//...
}
```

### collisionX(object1, object2) || collisionX(object1, object[])

#### Vérifie la collision entre deux objets sur l'axe horizontale X

##### Note: utilise les propriétés x et w sur les deux objets

```javascript
class Player {
//...
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
//...
    move(ms){
        //...
        // Do movement
        if(collisionX(this, BORDER.LEFT)){
            //Cancel movement
        }
        //...
    }
//...
}
```

### collisionY(object1, object2) || collisionY(object1, object[])

#### Vérifie la collision entre deux objets sur l'axe vertical Y

##### Note: utilise les propriétés y et h sur les deux objets

```javascript
class Player {
//...
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
//...
    move(ms){
        //...
        // Do movement
        if(collisionY(this, BORDER.BOTTOM)){
            //Cancel movement
        }
        //...
    }
//...
}
```

### collision(object1, object2) || collision(object1, object[])

#### Vérifie la collision entre deux objets

##### Note: utilise les propriétés x, y, h et w sur les deux objets

```javascript
class Player {
//...
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
//...
    move(ms){
        //...
        // Do movement
        if(collisionX(this, BORDERS)){
            //Cancel movement
        }
        //...
    }
//...
}
```

### constrain(n, min, max)

#### Contraint la valeur n à être dans l'intervalle [min, max]

```javascript
let vY = 40;

vY = constrain(vY, -20, 30);

vY //? => 30

vY = -57;

vY = constrain(vY, -20, 30);

vY //? => -20
```

### trackKeys(keys[])

#### Renvoie un tableau des touches pressées à chaque moment

##### Note: s'attache à document.onkeydown et document.onkeyup

```javascript
// binding key events
const keyInput = trackKeys([
    //Moving sideways
    "ArrowLeft", "KeyA",
    "ArrowRight", "KeyD",
    //Jumping
    "ArrowUp", "KeyW"
]);

//...
//If key ArrowUp is pressed
if(keyInput.ArrowUp){
    //Do jumping...
}

if(keyInput.ArrowLeft){
    //Do move left...
}

if(keyInput.ArrowRight){
    //Do move right...
}
```

### random(min, max) || random(max)

#### Donne un nombre rond aléatoire entre min et max

```javascript
const n = random(50, 100);
const k = random(20);

n //? => un chiffre entre [50 et 100[
k //? => un chiffre entre [0 et 20[
```

### randomFloat(min, max) || random(max)

#### Donne un nombre avec virgule aléatoire entre min et max

```javascript
const n = random(50.0, 100.0);
const k = random(20.0);

n //? => un chiffre dans [50.0 et 100.0[
k //? => un chiffre entre [0.0 et 20.0[
```

### randomGaussian()

#### Donne un nombre Gaussian

##### Paramètre optionnel = { moyenne: 0, deviation: 1 }

```javascript
const n = randomGaussian(50.0, 100.0);
n //? => nombre aléatoire gaussian
```

### removeFromArray(array, obj)

#### Retire un Objet obj du tableau array

##### Note: fonctionne que si (array[i] === obj) === true

```javascript
let tab = [ /* elements... */];
//...
tab[i] //? => 3;
//...
removeFromArray(tab, 3);
```

### generateArray(...size)

#### Génére un tableau de dimension Arguments.length rempli de 0

```javascript
const tab = generateArray(10, 20);
tab.length    //? => 10
tab[0].length //? => 20
//...
tab[7][15] = 5;
//...
```

### delay(n)

#### Retourne une promise que se résoudra dans n millisecondes

##### Note: renvoie une erreur si n < 1

```javascript
delay(2000)
.then(_ => {
    //Do stuffs...
})
.catch(err => {
    console.error(`Error while in delay ! ${err}`);
});
```

### map(valeur, min1, max1, min2, max2)

#### Retranscrie la valeur situé dans l'intervale [min1, max1] dans l'intervale [min2, max2]

```javascript
const valMap = map(25, 0, 100, 50, 60);
valMap //? => 52.5
```

### loadImage(objet, lien) && loadImage(lien)

#### Charge un image et si un objet est fourni l'attache à l'objet dans la propriété img

```javascript
loadImage(player, './image/player.png');
//...
//Si chargé
player.img //? => Image Object
//...
const sprite_brick = loadImage('./image/brick.png');
//...
```

### isImage(lien)

#### Utilise un expression régulière pour tester si le lien donne une image

##### Note: fonctionne sur les fichiers jpeg, jpg, gif et png

```javascript
if(isImage(link)){
    //do image related stuff
}
```

### loadAudio(lien, options) && loadAudio(lien)

#### Charge un fichier audio et applique les options fourni

##### options par défaut = { autoplay: false, loop: false, volume: 1 }

```javascript
const music = loadAudio('./music/background.mp3', { autoplay: true, loop: true, volume: 0.3 });
const fire_sound = loadAudio('./music/jumping.ogg', { volume: 0.2, loop: true });
const jump_sound = loadAudio('./music/jumping.ogg', { volume: 0.5 });
```

### isAudio(lien)

#### Utilise un expression régulière pour tester si le lien donne un fichier audio

##### Note: fonctionne sur les fichiers mp3, ogg et wav

```javascript
if(isAudio(link)){
    //do audio related stuff
}
```

### getCurrentDateTime()

#### Renvoie le DateTime courant format SQL

```javascript
const oTime = getCurrentDateTime();
oTime //? => "2019-04-08 17:31:47"
```

### sha256(message) && sha384(message) && sha512(message)

#### Renvoie le hashage SHA du message

```javascript
const msg = 'password';
const sha = [sha256, sha384, sha512];
Promise.all(sha.map(o => o(msg))).then(log);
/*
[
    "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8","a8b64babd0aca91a59bdbb7761b421d4f2bb38280d3a75ba0f21f2bebc45583d446c598660c94ce680c47d19c30783a7","b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86"
]
*/
```

### MD5(message)

#### Renvoie le hashage MD5 du message

```javascript
const hashMd = MD5('password');
hashMd //? => 5f4dcc3b5aa765d61d8327deb882cf99
```

### log(Objet) && error(Objet)

#### Wrapper de console

```javascript
log("Some amazing text !");
error("Something wrong...");
```

### Fonctions Maths

#### Wrapper de diverses fonctions de Math

```javascript
max(0, 5, 2); //? => 5
min(0, 5, 2); //? => 0
pow(2, 3);    //? => 8
floor(2.635); //? => 2
ceil(2.443);  //? => 3
abs(-23);     //? => 23
```

### ask(Options)

#### Wrapper d'une requête XHR

```javascript
const opt = {
    link: "localhost"
    name: "vues"
    value: "joker"
    responseType: "json"
    requestType: "get"
};

//opt => localhost/?vues=joker

ask(opt)
.then(res => {
    res //? => JSON String
    //Do things...
})
.catch(err => {
    console.error("Can't ask !", err);
});
```

### $(htmlElement)

#### Mini JQuery n'incluant que certaines fonctions

```javascript
const h1 = $("h1#myH1")[0];

h1.css('color', 'red');
h1.html("<div>Hello there !</div>");
h1.attr("data", 'val1');
h1.click(_ => {
    alert("H1 has been clicked !");
});
//...
h1.hide();
//...
h1.show();
```

### cleanup(fonction)

#### Permet d'attacher une fonction lors que l'arrêt d'un processus NodeJS

```javascript
const { log, map, cleanup } = require("../ToolboxModule");
//..
cleanup(_ => {
    //Saving files...
    log("Closing !");
});
```

### parseUrl(url)

#### Permet de récupère les informations d'une url

```javascript
const inf = parseUrl('localhost/test?vues=joker&help=batman');
inf //? => { link: 'localhost', dir: 'test', params: { vues: 'joker', help: 'batman', length: 2 }}
```

### class Rectangle(x, y, w, h, c)

#### Objet pour intialiser un rectangle qui est dessinable dans un canvas et si un image est attaché, dessine l'image

##### Paramètres par défaut = { x: 0, y: 0, w: 0, h: 0, c: 'black' }

```javascript
const brick = new Rectangle(40, 30, 50, 50, 'green');
//...
//ctx = canvas.getContext('2d');
brick.draw(ctx);

//...

const player = new Rectangle(0, 0, 50, 100, 'yellow');
loadImage(player, "./images/player.png");
//...
//Si l'image est chargé, dessine player.png
player.draw(ctx);


```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present, SAUNDERS Pierre
