var GameManager = function() {
    
    this.player = null;
    this.alien = [];
    this.bullet = null;
    this.alienBullet = null;
    this.alienAlive = false;
    this.dots = [];
  
    this.clearLevel = function() {
        this.alien = [];
    };
    
    this.updateCollection = function(collection) {
        for (i = 0; i < collection.length; i++) {
            collection[i].update();
            
            // CHECK ALIVE
            if (collection[i].alive) this.alienAlive = true;
            
            var randomShot = null;
            if (collection[i].alive && !this.alienBullet.shot) randomShot = Math.floor(Math.random() * collection.length);
            
            if (collection[i].alive && randomShot === i && !this.alienBullet.shot) {
                this.alienBullet.x = collection[i].x + 12;
                this.alienBullet.y = collection[i].y + 35;
                this.alienBullet.shot = true;
            }
        }
    };
  
    this.update = function() {
        this.alienAlive = false;
        this.updateCollection(this.dots);
        if (this.player.alive) this.player.update();
        this.updateCollection(this.alien);
        this.bullet.update();
        this.alienBullet.update();
    };
    
    this.drawCollection = function(collection, context) {
        for (i = 0; i < collection.length; i++) {
            collection[i].draw(context);
        }
    };
    
    this.draw = function(context) {
        this.drawCollection(this.dots, context);
        if (this.player.alive) this.player.draw(context);
        this.drawCollection(this.alien, context);
        this.bullet.draw(context);
        this.alienBullet.draw(context);
    };
    
    this.createBackground = function() {
        
        this.dots = [];
        for (i = 0; i < 30; i++) {
            this.dots.push(new Dot(10 + (i * (Math.floor(Math.random() * 10) + 20)), 10 + (i * (Math.floor(Math.random() * 3) + 30))));
        }
    };
    
    this.loadLevel = function(level) {
        this.alienAlive = true;
        this.bullet = new Bullet(200, 200);
        
        this.alienBullet = new AlienBullet(200, 200, level);
        
        this.createBackground();
        
        this.player = new Player(GameCanvas.screenWidth / 2 - 35, GameCanvas.screenHeight - 100, this.bullet);
        
        for (i = 0; i < 10; i++) {
            this.alien[i] = new Alien(new Sprite('images/old/alien1.png'), 70 + (i * 50), 80, level);
        }
        for (i = 10; i < 20; i++) {
            this.alien[i] = new Alien(new Sprite('images/old/alien1.png'), 70 + ((i - 10) * 50), 130, level);
        }
        
        for (i = 20; i < 30; i++) {
            this.alien[i] = new Alien(new Sprite('images/old/alien2.png'), 70 + ((i - 20) * 50), 180, level);
        }
    };
    
    this.isLevelEnd = function() {
        return !this.alienAlive;
    };
};
