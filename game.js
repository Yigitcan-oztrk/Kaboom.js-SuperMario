kaboom({
    global: true,
    fullscreen: true,
    scale: 2,
    debug: true,
    clearColor: [0, 0, 0, 1],
});
loadRoot('https://i.imgur.com/')
loadSprite('coin', 'wbKxhcd.png')
loadSprite('evil-shroom', 'KPO3fR9.png')
loadSprite('brick', 'pogC9x5.png')
loadSprite('block', 'pogC9x5.png')
loadSprite('mario', 'Wb1qfhK.png')
loadSprite('mushroom', '0wMd92p.png')
loadSprite('surprise', '0wMd92p.png')
loadSprite('unboxed', 'bdrLpi6.png')
loadSprite('pipe-top-left', 'ReTPiWY.png')
loadSprite('pipe-top-right', 'hj2GK4n.png')
loadSprite('pipe-bottom-left', 'c1cYSbt.png')
loadSprite('pipe-bottom-right', 'nqQ79eI.png')


scene("game", () => {
    layers(['bg', 'obj', 'ui'], 'obj')
});

const map = [
    '                                                            ',
    '                                                            ',
    '                                                            ',
    '                                                            ',
    '                                                            ',
    '                                                            ',
    '                                                            ',
    '                                                            ',
    '                                                            ',
    '                                                            ',
    '                                                            ',
    '                                                            ',
    '=========================    ===============================',
];

const levelCfg = {
    width: 20,
    height: 20,
    '=': [sprite('block'), solid()],

};

const gameLevel = addLevel(map, levelCfg)





Sart("game")