/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
    init:function (x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y , settings]);

        var shapes = new me.Rect(10,10,64,64);

        this.body.addShape(shapes);

        //this.renderable = new me.Sprite(10,10,me.loader.getImage("gripe_run_right"));
                            // define a basic walking animation (using all frames)
        this.renderable.addAnimation("walk",  [0, 1, 2, 3, 4, 5, 6, 7]);
        // define a standing animation (using the first frame)
        this.renderable.addAnimation("stand",  [0]);
        // set the standing animation as default
        this.renderable.setCurrentAnimation("stand");

         me.input.registerPointerEvent('pointerdown', this, this.onMouseDown.bind(this));
    },

        /**
     * callback for mouse click
     */
    onMouseDown : function() {
        // if (this.isOut === true) {
        //     this.isOut = false;
        //     // set touch animation
        //     this.setCurrentAnimation("touch", this.hide.bind(this));
        //     // make it flicker
        //     this.flicker(750);
        //     // play ow FX
        //     me.audio.play("ow");

        //     // add some points
        //     game.data.score += 100;

        //     if (game.data.hiscore < game.data.score) {
        //         // i could save direclty to me.save
        //         // but that allows me to only have one
        //         // simple HUD Score Object
        //         game.data.hiscore = game.data.score;
        //         // save to local storage
        //         me.save.hiscore = game.data.hiscore;
        //     }

        //     // stop propagating the event
        //     return false;

        // };
        this.pos.y++;
    },


    /**
     * update the entity
     */
    update : function (dt) {

        // apply physics to the body (this moves the entity)
        //this.body.update(dt);
        this.pos.y++;
        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {
        // Make all other objects solid
        return true;
    }
});


game.BallEntity = me.AnimationSheet.extend({
    init:function (x, y){

        //this._super(me.AnimationSheet,'init',[x, y , { image: me.loader.getImage("football"), framewidth: 145, frameheight: 110}]);
        this._super(me.AnimationSheet, 'init', [x, y, {image: me.loader.getImage("football"),spritewidth: 145,spriteheight: 110}]);

        this.addAnimation("go_ball",[0,1,2,3,4,5]);

        this.setCurrentAnimation("go_ball");

        this.initialPos = this.pos.y;

        //this.body.setVelocity(3, 15);

    },

    update : function ( dt )
    {
        this._super(me.AnimationSheet, 'update', [dt] );

        this.pos.y++;

        this.pos.x++;
        return true;
    },
});

game.BallManager = me.Entity.extend({
    init:function (x, y){

        var settings = {};
        settings.width = 10;
        settings.height = 10;
        // call the super constructor
        this._super(me.Entity, 'init', [0, 0, settings]);

        var ball = new game.BallEntity(0, 0);
        ball.scale(0.5,0.5);
        me.game.world.addChild(ball,1);

    },
});