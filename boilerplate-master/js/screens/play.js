game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {

        me.game.reset();

        // reset the score
        game.data.score = 0;


        var background_sprite = new me.Sprite(0,0, me.loader.getImage("background"));

        me.game.world.addChild(background_sprite, 0);

        var ballmanager = new game.BallManager(0,0);

        me.game.world.addChild(ballmanager);

       var settings = {
                    image : "gripe_run_right",
                    spritewidth : 64,
                    height:64,
                    width:64,
                 };
        var mainplay = new game.PlayerEntity(100,100,settings);

        me.game.world.addChild(mainplay,1);

        console.log(mainplay.body.getShape());
        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    }
});
