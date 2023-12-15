/* Golf Quest Mini by Brian Feng
 * Systems used: physics, cameras, tweens, text, tilemaps, timer
 * 
 * Fun feature: the swing bar gets faster for the final boss
 */

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
            debug: false
        }
    },
    zoom: 2,
    scene: [ Menu, Instructions, Overworld, Fight, Fight2, Fight3, Fight4, Win]
}

const game = new Phaser.Game(config)
let keyEnter
let keyF
let keyUp
let keyDown
var currentX = 0
var currentY = 0
var wins = 0