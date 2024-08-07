# ToolboxModule

Un module NodeJS incluant plusieurs fonctions réutilisables pour des projets divers, est également utilisable en navigateur

## Usage

1. `Cloner ou télécharger le répertoire`
2. `Pour NodeJS : Utilisez require('ToolboxModule')`
3. `Pour navigateur : Mettre <script src="toolbox-min.js"></script> en premier dans <head>`

## Sommaire / Raccourcis

- [calcSpeedFromDelta](#calcspeedfromdeltadelta-speed)
- [calcDistance](#calcdistanceobject1-object2)
- [calcAngle](#calcangleobject1-object2)
- [collisionX](#collisionxobject1-object2--collisionxobject1-object)
- [collisionY](#collisionyobject1-object2--collisionyobject1-object)
- [collision](#collisionobject1-object2--collisionobject1-object)
- [constrain](#constrainn-min-max)
- [range](#rangen)
- [trackKeys](#trackkeyshtml_element-keys)
- [random](#randommin-max--randommax--randomtableau)
- [randomFloat](#randomfloatmin-max--randomfloatmax)
- [randomNormal](#randomnormalmoyenne-déviation)
- [removeFromArray](#removefromarrayarray-obj)
- [generateArray](#generatearraysize)
- [delay](#delayn)
- [map](#mapvaleur-min1-max1-min2-max2)
- [loadImage](#loadimageobjet-lien--loadimagelien)
- [isImage](#isimagelien)
- [loadAudio](#loadaudiolien-options--loadaudiolien)
- [isAudio](#isaudiolien)
- [getCurrentDateTime](#getcurrentdatetime)
- [sha256](#sha256message--sha384message--sha512message)
- [MD5](#md5message)
- [Fonctions console](#fonctions-console-log-error)
- [Fonctions Maths](#fonctions-maths-max-min-pow-floor-ceil-abs-sqrt)
- [ask](#askoptions)
- [\$](#$htmlelement)
- [cleanup](#cleanupfonction)
- [parseUrl](#parseurlurl)
- [class Rectangle](#class-rectanglex-y-w-h-c)
- [defineControlledProperty](#definecontrolledpropertyobjet-nom_propriete-valeur_initial-check_function)
- [arrayEqual](#arrayequalarr1-arr2)
- [colourNameToHex](#colournametohexcolour--colornametohexcolor)
- [sum](#sumtableau)
- [mean](#meantableau)
- [stddev](#stddevtableau)
- [rangeArray](#rangearraytableau)
- [round](#roundfloat-n)
- [encodeHTML](#encodehtmlstring)
- [decodeHTML](#decodehtmlstring)

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

### calcDistance(object1, object2)

#### Permet de calculer la distance entre deux objet

##### Note: utilise la propiétés x et y sur les deux objets

```javascript
class Missile {
//...
    move(ms){
        //...
        if(calcDistance(this, player) < 50){
            //Change animation
        }
        //...
    }
//...
}
```

### calcAngle(object1, object2)

#### Permet de calculer l'angle de la ligne entre deux objet

##### Note: utilise la propiétés x et y sur les deux objets

```javascript
class Missile {
//...
    draw(ctx){
        //...
        const ang = calcAngle(this, player);
        ctx.rotate(ang);
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
vY = constrain(40, -20, 30);
vY //? => 30

vY = constrain(-57, -20, 30);
vY //? => -20
```

### range(n)

#### Construit un tableau de N élements dont la valeur est égale à l'indice de l'élément

##### (Commande venant de Python)

```javascript
const t = range(5);
t //? => [0, 1, 2, 3, 4]
```

### trackKeys(html_element, keys[])

#### Renvoie un tableau des touches pressées à chaque moment

##### Note: s'attache à html_element.onkeydown et html_element.onkeyup

```javascript
// binding key events
const keyInput = trackKeys(document, [
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

### random(min, max) || random(max) || random(tableau)

#### Donne un nombre rond aléatoire entre min et max, si on donne un tableau renvoie un élément aléatoire du tableau

##### Paramètre optionnel = { min: 0, max: 1 }

```javascript
const n = random(50, 100);
const k = random(20);

n //? => un chiffre entre [50 et 100[
k //? => un chiffre entre [0 et 20[
```

### randomFloat(min, max) || randomFloat(max)

#### Donne un nombre avec virgule aléatoire entre min et max

##### Paramètre optionnel = { min: 0.0, max: 1.0 }

```javascript
const n = randomFloat(50.0, 100.0);
const k = randomFloat(20.0);

n //? => un chiffre dans [50.0 et 100.0[
k //? => un chiffre entre [0.0 et 20.0[
```

### randomNormal(moyenne, déviation)

#### Donne un nombre tirée d'une distribution normal

##### Paramètre optionnel = { moyenne: 0, déviation: 1 }

```javascript
const n = randomNormal(50.0, 100.0);
n //? => nombre aléatoire normal
```

### removeFromArray(array, obj)

#### Retire un Objet obj du tableau array

##### Note: fonctionne que si (array[i] === obj) === true

```javascript
let tab = [ /* elements... */ ];
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
    error(`Error while in delay ! ${err}`);
});
//...
(async function(){
    await delay(2000);
    //Do stuffs...
})();
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

##### Note: fonctionne sur les fichiers tif, jpeg, jpg, gif et png

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

##### Note: fonctionne sur les fichiers mp3, ogg, wav, wma, flac et aac

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
    "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    "a8b64babd0aca91a59bdbb7761b421d4f2bb38280d3a75ba0f21f2bebc45583d446c598660c94ce680c47d19c30783a7",
    "b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86"
]
*/
```

### MD5(message)

#### Renvoie le hashage MD5 du message

```javascript
const hashMd = MD5('password');
hashMd //? => 5f4dcc3b5aa765d61d8327deb882cf99
```

### Fonctions console (log, error)

#### Wrapper de console

```javascript
// Wrapper de console.log
log("Some amazing text !");
error("Something wrong...");
```

### Fonctions Maths (max, min, pow, floor, ceil, abs, sqrt)

#### Wrapper de diverses fonctions de Math

```javascript
max([ 8, 3, 1, 3, 0 ]); //? => 8
min([ 8, 3, 1, 3, 0 ]); //? => 0

max(0, 5, 2); //? => 5
min(0, 5, 2); //? => 0
pow(2, 3);    //? => 8
floor(2.635); //? => 2
ceil(2.443);  //? => 3
abs(-23);     //? => 23
sqrt(9);      //? => 3
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

//opt => (XHR req) localhost/?vues=joker
try {
    const res = await ask(opt);
    res //? => JSON formatted String
    //Do things...
} catch(err){
    error("Can't ask !", err);
}
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
// OR
player.loadImage("./images/player.png");

//...
//Si l'image est chargé, dessine player.png
player.draw(ctx);
```

### defineControlledProperty(objet, nom_propriete, valeur_initial, check_function)

#### Permet de définir une propriété d'un objet avec un setter personnalisé

##### Wrapper de Object.defineProperty(objet, nom_propriete, { get: valeur_initial, set: check_function })

```javascript
class Player(){
    constructor(x, y){
        defineControlledProperty(this, 'x', x, nx => {
            if(isNaN(nx) || nx < 0) throw 'Incorrect X !';
        });
        defineControlledProperty(this, 'y', y, ny => {
            if(isNaN(ny) || ny < 0) throw 'Incorrect Y !';
        });
    }
    //...
}

const player = new Player(-20, 30);
//? => error ! : Incorrect X !
```

### arrayEqual(arr1, arr2)

#### Permet de comparer l'égalité total (de chaque entité) de 2 tableaux

##### Note: fonctionne que si chaque (arr1[i] === arr2[i]) === true

```javascript
const t1 = [1,5,3];
const t2 = [1,2,3];

arrayEqual(t1, t2) //? => false
arrayEqual(t1, [1,5,3]) //? => true
arrayEqual(t2, [1,2,3]) //? => true
```

### colourNameToHex(colour) && colorNameToHex(color)

#### Récupèrer le code hexadécimal d'une couleur CSS

##### Note: renvoie false si inconnu

```javascript
const hex = colourNameToHex('aquamarine');
hex //? => '#7fffd4'
//...
const hex = colourNameToHex('blda');
hex //? => false
```

### sum(tableau)

#### Renvoie la somme des valeurs dans le tableau

```javascript
const tab = [ 2, 1, 1, 3, 7, 4, 1, 8, 0, 0 ];
const total = sum(tab);
total //? => 27
```

### mean(tableau)

#### Renvoie la moyenne des valeurs dans le tableau

```javascript
const tab = [ 2, 1, 1, 3, 7, 4, 1, 8, 0, 0 ];
const mu = mean(tab);
mu //? => 2.7
```

### stddev(tableau)

#### Renvoie l'écart-type des valeurs dans le tableau

```javascript
const tab = [ 2, 1, 1, 3, 7, 4, 1, 8, 0, 0 ];
const sd = stddev(tab);
sd //? => 7.21
```

### rangeArray(tableau)

#### Renvoie la porté d'un tableau (minimum et maximum)

```javascript
const tab = [ 2, 1, 1, 3, 7, 4, 1, 8, 0, 0 ];
const interval = rangeArray(tab);
interval //? => [ 0, 8 ]
```

### round(float, n)

#### Renvoie un float avec la précision n

```javascript
round(Math.PI, 2) //? => 3.14
round(Math.PI, 4) //? => 3.1416
```

### encodeHTML(string)

#### Renvoie une chaîne de charactère dont les charactéres HTML sont encodées

```javascript
const str = "<a href='localhost:8080?query=dataset&page=3' id=\"useful_link\">Link</a>";
const res = encodeHTML(str);
str //? => "&lt;a href=&#39;localhost:8080?query=dataset&amp;page=3&#39; id=&quot;useful_link&quot;&gt;Link&lt;/a&gt;"
```

### decodeHTML(string)

#### Décode une chaîne de charactère HTML dont les charactéres HTML sont était encodées

```javascript
const str = "&lt;a href=&#39;localhost:8080?query=dataset&amp;page=3&#39; id=&quot;useful_link&quot;&gt;Link&lt;/a&gt;";
const res = decodeHTML(str);
str //? => "<a href='localhost:8080?query=dataset&page=3' id=\"useful_link\">Link</a>"
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present, SAUNDERS Pierre
