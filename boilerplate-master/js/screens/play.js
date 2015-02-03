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

        var mainplay = new game.PlayerEntity(0,0,{width:100,height:100});

        me.game.world.addChild(mainplay,1);

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
