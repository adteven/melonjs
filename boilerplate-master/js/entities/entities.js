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

        this.body.setVelocity(3, 15);

        //this.renderable = new me.Sprite(10,10,me.loader.getImage("gripe_run_right"));
                            // define a basic walking animation (using all frames)
        this.renderable.addAnimation("walk",  [0, 1, 2, 3, 4, 5, 6, 7]);
        // define a standing animation (using the first frame)
        this.renderable.addAnimation("stand",  [0]);
        // set the standing animation as default
        this.renderable.setCurrentAnimation("stand");

        // me.input.registerPointerEvent('pointerdown', this, this.onMouseDown.bind(this));

    },

        /**
     * callback for mouse click
     */
    // onMouseDown : function() {
    //     this.pos.y++;
    // },


    /**
     * update the entity
     */
    update : function (dt) {
      if (me.input.isKeyPressed('left')) {
      // flip the sprite on horizontal axis
      this.renderable.flipX(true);
      // update the entity velocity
      this.body.vel.x -= this.body.accel.x * me.timer.tick;
      // change to the walking animation
      if (!this.renderable.isCurrentAnimation("walk")) {
        this.renderable.setCurrentAnimation("walk");
      }
    } else if (me.input.isKeyPressed('right')) {
      // unflip the sprite
      this.renderable.flipX(false);
      // update the entity velocity
      this.body.vel.x += this.body.accel.x * me.timer.tick;
      // change to the walking animation
      if (!this.renderable.isCurrentAnimation("walk")) {
        this.renderable.setCurrentAnimation("walk");
      }
    } else {
      this.body.vel.x = 0;
      // change to the standing animation
      this.renderable.setCurrentAnimation("stand");
    }
   
    if (me.input.isKeyPressed('jump')) {
      // make sure we are not already jumping or falling
      if (!this.body.jumping && !this.body.falling) {
        // set current vel to the maximum defined value
        // gravity will then do the rest
        this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
        // set the jumping flag
        this.body.jumping = true;
      }
 
    }
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

game.NewBAall = me.Entity.extend({
    init:function(x, y){
       var settings = {
                image : "football",
                spritewidth : 145,
                spriteheight:110,
                height:64,
                width:64,
             };
        this._super(me.Entity, 'init',[0,0,settings]);
            // store the current atlas information
        this.renderable.scale(0.5,0.5);

        this.body.setVelocity(3,3);

        this.body.addShape(new me.Ellipse(60, 60, this.width, this.height));
    },
    update : function ( dt )
    {
               // apply physics to the body (this moves the entity)
        this.body.update(dt);
        // handle collisions against other shapes
        me.collision.check(this);
        this._super(me.Entity, 'update', [dt] );
    },

    onCollision : function (response, other) {
        // Make all other objects solid
        this.renderable.flicker(750);
        response.overlapV.y = 0;
        return true;
    }
}),

game.BallManager = me.Entity.extend({
    init:function (x, y){

        var settings = {};
        settings.width = 100;
        settings.height = 100;
        // call the super constructor
        this._super(me.Entity, 'init', [0, 0, settings]);

        //var ball = new game.BallEntity(0, 0);
        var ball = new game.NewBAall(50,50);

        me.game.world.addChild(ball);
    },
    update : function ( dt )
    {
        this.body.update(dt);
        this._super(me.Entity, 'update', [dt] );
    },
});


game.CollisionLine = me.Entity.extend({
    init: function (sx, sy, ex, ey) {
        var settings = {
            width:64,
            height:64
        }
        this._super(me.Entity, "init", [sx, sy, settings]);
        this.body.addShape(new me.Line(0, 0, [new me.Vector2d(sx, sy), new me.Vector2d(ex, ey)]));
        var _this = this;
        this.renderable = new (me.Renderable.extend({
            draw: function (renderer) {
                  var color = renderer.getColor().toHex();
                  renderer.setColor('#ff0000');
                  var shape = _this.body.shapes[0];
                  var x = shape.points[1].x - shape.points[0].x;
                  var y = shape.points[1].y - shape.points[0].y;
                  console.log("x=",x,"y=",y);
                  renderer.strokeLine(0, 0, x, y);
                  renderer.setColor(color);
                        }
        }));
    }
})