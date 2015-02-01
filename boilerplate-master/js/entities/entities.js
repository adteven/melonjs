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
    },

    /**
     * update the entity
     */
    update : function (dt) {

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

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

        this._super(me.AnimationSheet,'init',[x, y , { image: me.loader.getImage("football"), framewidth: 145, frameheight: 110}]);

        this.addAnimation("go_ball",[0,1,2,3,4,5]);

        this.setCurrentAnimation("go_ball");

        this.initialPos = this.pos.y;
    },

    update : function ( dt )
    {
        this._super(me.AnimationSheet, 'update', [dt] );

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

        me.game.world.addChild(ball,0);

    },
});