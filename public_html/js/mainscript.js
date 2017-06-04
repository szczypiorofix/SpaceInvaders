
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

// OBSŁUGA DOTYKU
//        var touchzone = document.getElementById("gameCanvas");
//        touchzone.addEventListener("touchstart", touchHandler, false);
//
//        function touchHandler(event) {
//            console.log('x: ' + event.touches[0].pageX + ', y: ' + event.touches[0].pageY);
//        }

    var GameState = {MainMenu: 0, Game: 1, GameWon: 2, GameLoose: 3};
    var gameState = GameState.MainMenu;
    
    var scoreText = null;
    var livesText = null;
    var levelText = null;
    var endGameText = null;
    var winText = null;
    var gameRunning = true;
    var gameWon = false;
    var level = 1;
    var score = 0;
    var initialLives = 5;
    var lives = initialLives;
    
    var gameManager = new GameManager();
    //var audio = new Audio('music/OutThere.ogg');
    // https://opengameart.org/content/darker-waves
    var audio = new Audio('music/Zander Noriega - Darker Waves.mp3');
    audio.loop = true;
    audio.play();
    
    //var player = new ChiptuneJsPlayer(new ChiptuneJsConfig(-1));
    //player.load('music/chiptune_no_170.mod', function(buffer) {
    //   player.play(buffer);
    // });

    
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
        levelText.update("LEVEL: "+level);
        gameManager.update();
        
        if (gameManager.isLevelEnd()) {
            gameWon = true;
            document.getElementById("nextLevel").style.display = 'block';
        }
        
        if (lives <= 0) {
            gameRunning = false;
            document.getElementById("restart").style.display = 'block';
        }
    }
    
    
    function draw(context) {
        
        // CLEAR CANVAS CONTEXT
        GameCanvas.ctx.clearRect(0, 0, GameCanvas.screenWidth, GameCanvas.screenHeight);
        
        scoreText.draw();
        livesText.draw();
        levelText.draw();
        
        if (gameWon) {
            winText.draw();
        }
        
        gameManager.draw(context);
    }
    
    window.onload = function() {
        
        document.getElementById("nextLevel").addEventListener('click', function() {
            level++;
            document.getElementById("nextLevel").style.display = 'none';
            gameManager.clearLevel();
            gameManager.loadLevel(level);
            gameWon = false;
            gameRunning = true;
        });
        
        document.getElementById("restart").addEventListener('click', function() {
            level = 1;
            score = 0;
            lives = initialLives;
            document.getElementById("restart").style.display = 'none';
            gameManager.clearLevel();
            gameManager.loadLevel(level);
            gameWon = false;
            gameRunning = true;
        });
        
        GameCanvas.create();

        gameManager.loadLevel(level);

        GameCanvas.canvas.addEventListener('mousemove', function(evt) {
            var mousePos = getMousePos(GameCanvas.canvas, evt);
            if (mousePos.x < GameCanvas.screenWidth - 10
                    && mousePos.x > gameManager.player.width
                    && gameRunning) gameManager.player.x = mousePos.x - 25;
            if (mousePos.y > 250
                    && mousePos.y < GameCanvas.screenHeight - 35
                    && gameRunning) gameManager.player.y = mousePos.y;
        }, false);

        function getMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
              x: evt.clientX - rect.left,
              y: evt.clientY - rect.top
            };
        }

        // STEROWANIE MYSZKĄ :)
        GameCanvas.canvas.onmousedown = function() { gameManager.player.isShooting = true; };
        GameCanvas.canvas.onmouseup = function() { gameManager.player.isShooting = false; };

        endGameText = new HUD_Text("GAME OVER", 270, GameCanvas.screenHeight / 2, '42px Orbitron', 'red');
        winText = new HUD_Text("YOU WIN !!!", 270, GameCanvas.screenHeight / 2, '42px Orbitron', 'crimson');
        scoreText = new HUD_Text("SCORE: "+score, 50, 20, '24px Orbitron', 'lime');
        livesText = new HUD_Text("LIVES: "+lives, 250, 20, '24px Orbitron', 'Beige');
        levelText = new HUD_Text("LIVES: "+level, 450, 20, '24px Orbitron', 'lime');

        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        requestAnimationFrame(mainLoop);
    };
