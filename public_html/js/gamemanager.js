var GameManager = function(gameCanvas) {
    
    this.gameCanvas = gameCanvas;
    this.player = null;
    this.alien = [];
    this.walls = [];
    this.restore1HealthUpgrade = null;
    this.bullet = null;
    this.alienBullet = null;
    this.alienAlive = false;
    this.dots = [];
    this.instance = this;
  
    this.clearLevel = function() {
        this.alien = [];
        this.walls = [];
    };
    
    this.updateCollection = function(collection) {
        for (i = 0; i < collection.length; i++) {
            collection[i].update();
            
            // ONLY ALIENS CAN SHOT
            if (collection[i].isAlien) {
                // CHECK ALIVE
                if (collection[i].alive) this.alienAlive = true;

                var randomShot = null;
                if (collection[i].alive && !this.alienBullet.shot) randomShot = Math.floor(Math.random() * collection.length);

                if (collection[i].alive && randomShot === i && !this.alienBullet.shot) {
                    this.alienBullet.x = collection[i].x + 12;
                    this.alienBullet.y = collection[i].y + 35;
                    this.alienBullet.shot = true;
                    
                    if (!this.restore1HealthUpgrade.flying) this.restore1HealthUpgrade.counter++;
                    
                    if (this.restore1HealthUpgrade.counter > this.restore1HealthUpgrade.frequency && !this.restore1HealthUpgrade.flying) {
                        this.restore1HealthUpgrade.x = Math.floor(Math.random() * (this.gameCanvas.screenWidth - 200) + 100);
                        this.restore1HealthUpgrade.flying = true;
                        this.restore1HealthUpgrade.counter = 0;
                    }
                }   
            }
        }
    };
  
    this.update = function() {
        this.alienAlive = false;
        this.updateCollection(this.dots);
        if (this.player.alive) this.player.update();
        this.updateCollection(this.alien);
        this.updateCollection(this.walls);
        this.bullet.update();
        this.alienBullet.update();
        this.restore1HealthUpgrade.update();
    };
    
    this.drawCollection = function(collection, context) {
        for (i = 0; i < collection.length; i++) {
            collection[i].draw(context);
        }
    };
    
    this.draw = function(context) {
        this.drawCollection(this.dots, context);
        this.drawCollection(this.walls, context);
        if (this.player.alive) this.player.draw(context);
        this.drawCollection(this.alien, context);
        this.bullet.draw(context);
        this.alienBullet.draw(context);
        this.restore1HealthUpgrade.draw(context);
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
        
        this.alienBullet = new AlienBullet(200, 200, level, this.instance);
        
        this.createBackground();
        
        this.player = new Player(this.gameCanvas.screenWidth / 2 - 35, this.gameCanvas.screenHeight - 50, this.bullet);
        
        for (i = 0; i < 10; i++) {
            this.alien[i] = new Alien(new Sprite('images/alien1.png'), 70 + (i * 50), 80, level);
        }
        for (i = 10; i < 20; i++) {
            this.alien[i] = new Alien(new Sprite('images/alien1.png'), 70 + ((i - 10) * 50), 130, level);
        }
        
        for (i = 20; i < 30; i++) {
            this.alien[i] = new Alien(new Sprite('images/alien2.png'), 70 + ((i - 20) * 50), 180, level);
        }
        
        for (i = 0; i < 3; i++) {
            this.walls[i] = new Wall(new Sprite('images/wall.png'), 110 + (i * 180), 350);
        }
        
        this.restore1HealthUpgrade = new Restore1Health(new Sprite('images/restore1h.png'), this.instance);
    };
    
    this.isLevelEnd = function() {
        return !this.alienAlive;
    };
};
