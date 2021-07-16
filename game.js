kaboom({
    global: true,
    fullscreen: true,
    scale: 2,
    debug: true,
    clearColor: [0, 0, 0, 1],
});
const MOVE_SPEED = 120
const JUMP_FORCE = 360
const BIG_JUMP_FORCE = 500
let CURRENT_JUMP_FORCE = JUMP_FORCE

loadRoot('https://i.imgur.com/')
loadSprite('coin', 'wbKxhcd.png')
loadSprite('evil-shroom', 'KPO3fR9.png')
loadSprite('brick', 'pogC9x5.png')
loadSprite('block', 'pogC9x5.png')
loadSprite('mario', 'Wb1qfhK.png')
loadSprite('mushroom', '0wMd92p.png')
loadSprite('surprise', 'gesQ1KP.png')
loadSprite('unboxed', 'bdrLpi6.png')
loadSprite('pipe-top-left', 'ReTPiWY.png')
loadSprite('pipe-top-right', 'hj2GK4n.png')
loadSprite('pipe-bottom-left', 'c1cYSbt.png')
loadSprite('pipe-bottom-right', 'nqQ79eI.png')


scene("game", () => {
    layers(['bg', 'obj', 'ui'], 'obj')


    const map = [
        '                                                 ',
        '                                                 ',
        '                                                 ',
        '                                                 ',
        '                                                 ',
        '                                                 ',
        '                                                 ',
        '                                                 ',
        '      %     =*=%=                                ',
        '                                                 ',
        '                                  -+             ',
        '                      ^     ^     ()             ',
        '====================================    =========',
    ];

    const levelCfg = {
        width: 20,
        height: 20,
        '=': [sprite('block'), solid()],
        '$': [sprite('coin'), 'coin'],
        '%': [sprite('surprise'), solid(), 'coin-surprise'],
        '*': [sprite('surprise'), solid(), 'mushroom-surprise'],
        '}': [sprite('unboxed'), solid()],
        '(': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
        ')': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
        '-': [sprite('pipe-top-left'), solid(), scale(0.5)],
        '+': [sprite('pipe-top-right'), solid(), scale(0.5)],
        '^': [sprite('evil-shroom'), solid(),],
        '#': [sprite('mushroom'), solid(), 'mushroom', body()],

    };

    const gameLevel = addLevel(map, levelCfg)

    const scoreLabel = add([
        text('test'),
        pos(30, 6),
        layer('ui'),
        {
            value: 'test',
        }
    ])

    add([text('level' + 'test', pos(4.6))])
    //marionun büyüklük zaman sınırlayıcısı
    function big() {
        let timer = 0
        let isBig = false
        return {
            update() {
                if (isBig) {
                    CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
                    timer -= dt()
                    if (timer <= 0) {
                        this.smallify

                    }
                }
            },
            isBig() {
                return isBig
            },
            smallify() {

                this.scale = vec2(1)
                CURRENT_JUMP_FORCE = JUMP_FORCE
                timer = 0
                isBig = false
            },
            biggify(time) {
                this.scale = vec2(2)
                timer = time
                isBig = true
            }
        }
    }

    const player = add([
        sprite('mario'), solid(),
        //haritada başlangıç pozisyonu belirlemek adına yazılan kod satırı
        pos(30.0),
        body(),
        big(),
        origin('bot')
    ])

    action('mushroom', (m) => {
        m.move(20, 0)
    })
    //altın ve mantarları çıkartma işlemi
    player.on("headbump", (obj) => {
        //sürpriz altın çıkartma işlemi 
        if (obj.is('coin-surprise')) {
            gameLevel.spawn('$', obj.gridPos.sub(0, 1))
            destroy(obj)
            gameLevel.spawn('}', obj.gridPos.sub(0, 0))
        }
        //sürpriz mantar çıkartma işlemi
        if (obj.is('mushroom-surprise')) {
            gameLevel.spawn('#', obj.gridPos.sub(0, 1))
            destroy(obj)
            gameLevel.spawn('}', obj.gridPos.sub(0, 0))
        }
    })

    //marionun mantarı yedikten sonra büyümesi işlemi; collides=çarpışma işlemi
    player.collides('mushroom', (m) => {
        destroy(m)
        player.biggify(6)
    })
    //marionun parayı aldıktan sonra altının kendini imha etmesi işlemi
    player.collides('coin', (c) => {
        destroy(c)
        scoreLabel.value++
        scoreLabel.text = scoreLabel.value
    })
    //karakterin fiziksel hareketlerinin tuşlara atanması
    keyDown('a', () => {
        player.move(-MOVE_SPEED, 0)
    })
    keyDown('d', () => {
        player.move(MOVE_SPEED, 0)
    })
    keyPress('w', () => {
        //karakter yer yüzeyine temaslı olduğu sürece zıplama komutunu gerçekleştirebilmesi adına koşul bloğuna sokulur
        if (player.grounded()) {
            player.jump(CURRENT_JUMP_FORCE)
        }
    })


});


start("game")