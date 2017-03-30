//This file will be the entry point of all JavaScript files
// found in this game 
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
     game.load.image('snake_block', 'src/img/box.png');

}

var player;
var cursors;
var horizontal;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    player = game.add.sprite(32, game.world.height - 150, 'snake_block');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    cursors = game.input.keyboard.createCursorKeys();
    horizontal = false;
}

function update() { 
    //The velocity values will be changed later on for dynamic
    //  increase of difficulty
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -50
        horizontal = true; 
        player.x -= 2;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 50
        player.body.velocity.y= 0;
        horizontal = true; 
        player.x += 2;
    }
    else if (cursors.up.isDown)
    {
        player.body.velocity.y = -50
        horizontal = false; 
        player.y -= 2;
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y = 50
        horizontal = false; 
        player.y += 2;
    }

    if( horizontal ){
        player.body.velocity.y= 0;
    }else
    {
        player.body.velocity.x= 0;
    }
}
