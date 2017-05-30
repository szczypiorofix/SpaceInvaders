var GameManager = function() {
    
    this.level01 = [0,0,0,0,0,0,0,0,0,0,0];
    this.player = null;
    this.alien = [];
    this.bullet = null;
  
    
    this.updateCollection = function(collection) {
        for (i = 0; i < collection.length; i++) {
            collection[i].update();
        }
    };
  
    this.update = function() {
        this.player.update();
        this.updateCollection(this.alien);
        this.bullet.update();
    };
    
    this.drawCollection = function(collection, context) {
        for (i = 0; i < collection.length; i++) {
            collection[i].draw(context);
        }
    };
    
    this.draw = function(context) {
        this.player.draw(context);
        this.drawCollection(this.alien, context);
        this.bullet.draw(context);
    };
    
    this.loadLevel = function(level) {
        
        this.bullet = new Bullet(200, 200);
        
        this.player = new Player(GameCanvas.screenWidth / 2 - 35, GameCanvas.screenHeight - 100, this.bullet);
        
        for (i = 0; i < 10; i++) {
            this.alien[i] = new Alien(50 + (i * 50), 50);
        }
    };
};