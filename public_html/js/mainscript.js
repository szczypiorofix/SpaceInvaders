    
    var GameCanvas = {
        canvas: null,
        ctx: null,
        screenWidth: 0,
        screenHeight: 0,
        
        create : function() {
            this.canvas = document.getElementById('gameCanvas');
            this.ctx = this.canvas.getContext('2d');
            this.ctx.imageSmoothingEnabled = false;
            this.screenWidth = this.canvas.width;
            this.screenHeight = this.canvas.height;
        }
    };

    var scoreText = null;
    var livesText = null;
    var endGameText = null;
    var score = 0;
    var lives = 5;
    var gameRunning = true;
    
    var gameManager = new GameManager();
    var background = new Sprite('images/background.png', GameCanvas.ctx);
    var audio = new Audio('music/OutThere.ogg');
    audio.loop = true;
    audio.play();
      
    function requestAnimFrame() {

        if(!lastCalledTime) {
           lastCalledTime = Date.now();
           fps = 0;
           return;
        }
        delta = (Date.now() - lastCalledTime)/1000;
        lastCalledTime = Date.now();
        fps = 1/delta;
      }
    
    function mainLoop() {
        
        if (gameRunning) {
            update();
        }
        draw(GameCanvas.ctx);
        
        if (!gameRunning) {
            livesText.update("LIVES: "+lives);
            endGameText.draw();
        }
        
        requestAnimationFrame(mainLoop);
    }    
    
    function update() {
        
        scoreText.update("SCORE: "+score);
        livesText.update("LIVES: "+lives);
        gameManager.update();
        
        if (lives <= 0) {
            gameRunning = false;
        }
    }
    
    
    function draw(context) {
        // BACKGROUND
        context.drawImage(background.image, 0, 0, GameCanvas.screenWidth, GameCanvas.screenHeight);
        
        scoreText.draw();
        livesText.draw();
        
        gameManager.draw(context);
    }
    
    window.onload = function() {

            GameCanvas.create();
            
            gameManager.loadLevel(1);
            
            endGameText = new HUD_Text("GAME OVER", 270, GameCanvas.screenHeight / 2, '32px Comic Sans MS', 'red');
            scoreText = new HUD_Text("SCORE: "+score, 50, 30, '24px Comic Sans MS', 'lime');
            livesText = new HUD_Text("LIVES: "+lives, 250, 30, '24px Comic Sans MS', 'lime');
                                    
            var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            requestAnimationFrame(mainLoop);
    };
