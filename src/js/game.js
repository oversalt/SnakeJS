//This file will be the entry point of all JavaScript files
// found in this game
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('dot', ''); // Not using actual image because of security reasons.
                                // The browser will not allow you to run this from localhost if you have
                                // an image loaded. Should work if you put on local server
    game.load.image('things', ''); // This is a thing
}

function create() {
    // Adding out guy.
    player = game.add.sprite(400, 300, 'dot');
    // Enabling physics
    game.physics.arcade.enable(player);
    // Making sure we have no gravity
    player.body.gravity.y = 0;
    // Snake can collide with the boundaries
    player.body.collideWorldBounds = true;
    // just for fun, we bounce of the sides
    player.body.bounce.y = 1;
    player.body.bounce.x = 1;
    // cursors for user input
    cursors = game.input.keyboard.createCursorKeys();
    things = game.add.group();
    things.enableBody = true;

    for (var i = 0; i < 4; i++)
    {
        // We create a thing and put it in the world.
        var thing = things.create( i * 70, 0, 'thing');
        // Evens go right, odds to down
        i % 2 == 0 ? thing.body.velocity.x = 100: thing.body.velocity.y = 100;
        thing.body.collideWorldBounds = true;
        thing.body.bounce.y = 1;
        thing.body.bounce.x = 1;
    }
}

function update() {
    /*
        I'm making a fair amount of assumptions here. I"m assuming you can only move
        in one direction at a time. None of that fancy "diagonal" bullshit here.
        So we set the velocity of the opposite axis to equal 0.

        I'm also assuming that this is like classic snake; where once you start,
        you can't stop.
    */
    if (cursors.left.isDown)
    {
        // Move to the left
        player.body.velocity.x = -150;
        player.body.velocity.y = 0;
    }
    else if (cursors.right.isDown)
    {
        // Move to the right
        player.body.velocity.x = 150;
        player.body.velocity.y = 0;
    }
    else if (cursors.down.isDown)
    {
        // Move to down
        player.body.velocity.y = 150;
        player.body.velocity.x = 0;
    }
    else if (cursors.up.isDown)
    {
        // Move up
        player.body.velocity.y = -150;
        player.body.velocity.x = 0;
    }

    game.physics.arcade.overlap(player, things, getTheThing, null, this);
}

// If you get a thing, kill the thing
function getTheThing(player, thing)
{
    thing.kill();
}
