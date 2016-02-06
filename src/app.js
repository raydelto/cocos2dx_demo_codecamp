
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    enemigos: [],
    mostrarFuego: function(posicion){
        var fuego = new cc.ParticleFire();
        fuego.setDuration(1);
        fuego.setTexture(cc.textureCache.addImage(res.HelloWorld_png));
        fuego.setPosition(posicion);
        this.addChild(fuego);
        
    },
    crear:function(){
        var enemigo = new cc.Sprite(res.HelloWorld_png);
        enemigo.setPosition(0,0);
        var moveTo = cc.moveTo(3, 400, 760);
        enemigo.runAction(moveTo);
        this.enemigos.push(enemigo);
        this.addChild(enemigo);

    },
    iniciarToque:function(){
      cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          onTouchBegan: this.matar
      },this);  
    },
    matar: function(touch, event){
      var punto = touch.getLocation();
      var escena = event.getCurrentTarget();
       cc.log("MATAR");
       cc.log("Enemigos:" +this.enemigos);
      for(enemigo in escena.enemigos)
      { 
          cc.log("Enemigo = " + enemigo);
        var rectangulo = escena.enemigos[enemigo].getBoundingBox();
        if(cc.rectContainsPoint(rectangulo, punto)){
            escena.enemigos[enemigo].setVisible(false);
            escena.mostrarFuego(punto);
        }        
      }
        
        
    },
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("CodeCamp SDQ", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        var moveTo = cc.moveTo(3, size.width, size.height);
        this.addChild(this.sprite, 0);
        this.sprite.runAction(moveTo);
        this.schedule(this.crear, 2);
        this.iniciarToque();

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

