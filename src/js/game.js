//This file will be the entry point of all JavaScript files
// found in this game 
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
     game.load.image('snake_block', 'src/img/box.png');

}

var player;
var cursors;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    player = game.add.sprite(32, game.world.height - 150, 'snake_block');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    // //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    player.body.velocity.y= 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -100
        player.x -= 4;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 100
        player.x += 4;
    }
    else if (cursors.up.isDown)
    {
        player.body.velocity.y = -100
        player.y -= 4;
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y = 100
        player.y += 4;
    }
}
