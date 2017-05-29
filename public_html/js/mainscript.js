
    var BG_COLOR = 0x111111;
    var ship = null;
    var background = null;
    var input = new Input();
    var vx = 5, vy = 5;
    
    
    var Game = {
        screenWidth: 0,
        screenHeight: 0,
        renderer: null,
        stage: null,
        initialize: function() {

            this.stage = new PIXI.Container();
            this.renderer = PIXI.autoDetectRenderer(256, 256);
            document.body.appendChild(this.renderer.view);
            this.renderer.backgroundColor = BG_COLOR;
            this.renderer.autoResize = true;
            this.renderer.view.style.position = "absolute";
            this.renderer.view.style.display = "block";
            this.renderer.resize(window.innerWidth, window.innerHeight);
            this.screenWidth = this.renderer.width;
            this.screenHeight = this.renderer.height;
            document.body.appendChild(this.renderer.view);
            this.stage = new PIXI.Container();
            this.renderer.render(this.stage);
        },
        
        addTextField: function(text, x, y, color, font, size) {
            if (typeof color === 'undefined') color = 'white';
            var t = new PIXI.Text(text, {fontFamily: font, fontSize: size, fill: color});
            t.position.set(x, y);
            this.stage.addChild(t);
        }
    };
    
    function gameLoop() {
         requestAnimationFrame(gameLoop);
 
         if (input.keyLeft.isDown) {
             ship.x -= vx;
         }
         
         if (input.keyRight.isDown) {
             ship.x += vx;
         }
         
         if (input.keyUp.isDown) {
             ship.y -= vy;
         }
         
         if (input.keyDown.isDown) {
             ship.y += vy;
         }
 
        Game.renderer.render(Game.stage);
    }
    
    function loadSprites() {
        
        
        PIXI.loader.add("images/spaceship.png").load(setup);

        function setup() {

            var texture = PIXI.utils.TextureCache["images/spaceship.png"];
            var rectangle = new PIXI.Rectangle(0, 0, 32, 32);
            texture.frame = rectangle;
            ship = new PIXI.Sprite(texture);
            ship.width = 64;
            ship.height = 64;
            ship.x = Game.screenWidth / 2;
            ship.y = Game.screenHeight - ship.height - 20;
            Game.stage.addChild(ship);
            
            Game.renderer.render(Game.stage);
        }
    }
    
    window.onload = function() {
        
        Game.initialize();
        loadSprites();
        
        Game.addTextField("SPACE INVADERS", (Game.screenWidth / 2) - 140, 50, 'red', 'Courier', 42);
        
        gameLoop();
    };
