# ToolboxModule
Un module NodeJS incluant plusieurs fonctions réutilisables pour des projets divers, est également utilisable en navigateur

## Usage

1. `Cloner le répertoire avec git clone https://github.com/saundersp/ToolboxModule.git`
2. `Utilisez require('../ToolboxModule') dans votre projet NodeJS`

## Documentation des fonctions

### calcSpeedFromDelta(delta, speed)

#### Permet de convertir les déplacement Pixel/S en Pixels/Delta(ms) pour animation plus fluide

```javascript
class Player {
//...
    move(ms){
        //...
        const tempVelX = calcVelocityFromDelta(ms, this.speedX);
        this.x += tempVelX;
        //...
    }
//...
}
```

### collisionX(object1, object2) || collisionX(object[], object2)

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

### collisionY(object1, object2) || collisionY(object[], object2)

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

### collision(object1, object2) || collision(object[], object2)

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

//Usage in loop

class Player {
//...
    move(ms, keyInput){
        //...

        //If key ArrowUp is pressed
        if(keyInput.ArrowUp){
            this.jumping = true;
            this.speedY = -this.jumpHeight;  
        }

        //...

        if(keyInput.ArrowLeft){
            speedX += -this.speedX;
            this.direction = direction.LEFT;
            this.changeState(state.RUNNING);
        }

        if(keyInput.ArrowRight){
            speedX += this.speedX;
            this.direction = direction.RIGHT;
            this.changeState(state.RUNNING);
        }

        //..
    }
//...
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

### removeFromArray(array, obj)

#### Retire un Objet obj du tableau array

##### Note: fonctionne que si (array[i] === obj) === true

```javascript
let tab = [ /* elements... */];
//...
tab[i] //? => 3;
//...
removeFromArray(tab, 3);
//...
tab[i] //? => undefined
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

### loadImage(objet, lien)

#### Charge un image et l'attache à objet dans la propriété img

```javascript
loadImage(player, './image/player.png');
//...
//Si chargé
player.img //? => Image Object
```

### isImage(lien)

#### Utilise un expression régulière pour tester si le lien donne une image

##### Note: fonctionne sur les fichiers jpeg, jpg, gif et png

```javascript
if(isImage(link)){
    //do image related stuff
}
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

### MD5(valeur)

#### Renvoie le hashage de valeur

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
const h1 = $("h1#myH1");

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
const inf = parseUrl('localhost/test?vues=joker');
inf //? => { link: 'localhost', dir: 'test', params: { ['joker'], length: 1}}
```


## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present, SAUNDERS Pierre