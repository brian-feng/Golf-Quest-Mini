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
    scene: [ Menu, Instructions, Overworld, Fight, Fight2, Fight3, Fight4]
}

const game = new Phaser.Game(config)
let keyEnter
let keyF
let keyUp
let keyDown
var currentX = 0
var currentY = 0
var wins = 0