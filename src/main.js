let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: false
    },
    width: 400,
    height: 320,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    zoom: 2,
    scene: [ Menu, Fight, Overworld ]
}

const game = new Phaser.Game(config)
let keyEnter
let keyF