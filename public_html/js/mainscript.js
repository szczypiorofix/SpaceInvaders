
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

    var GameState = {MainMenu: 0, Game: 1, GameWon: 2, GameLoose: 3, NextLexel: 4};
    var gameState = null;
    
    var scoreText = null;
    var livesText = null;
    var levelText = null;
    var endGameText = null;
    var restartText = null;
    var winText = null;
    var level = 1;
    var score = 0;
    var initialLives = 5;
    var lives = initialLives;
    var looseTimeOutSec = 3;
    var looseTimeOut = looseTimeOutSec * 60;
    var looseStep = 0;
    
    var gameManager = new GameManager();
    // https://opengameart.org/content/darker-waves
    //var audio = new Audio('music/Zander Noriega - Darker Waves.mp3');
    //audio.loop = true;
    //audio.play();
    
    var player = new ChiptuneJsPlayer(new ChiptuneJsConfig(-1));
    player.load('music/chiptune_no_170.mod', function(buffer) {
       player.play(buffer);
    });


    
    function update() {
        if (gameState !==  GameState.MainMenu) {
            
            // GO TO THE NEXT LEVEL
            if (gameState === GameState.NextLexel) {
                level++;
                gameManager.clearLevel();
                gameManager.loadLevel(level);
                gameState = GameState.Game;
            }
            
            scoreText.update("SCORE: "+score);
            livesText.update("LIVES: "+lives);
            levelText.update("LEVEL: "+level);
            gameManager.update();

            if (gameManager.isLevelEnd()) {
                gameState = GameState.GameWon;
            }

            if (lives <= 0) {
                gameManager.player.alive = false;
                gameState = GameState.GameLoose;
            }
            
            if (gameState === GameState.GameLoose) {
                looseStep ++;
                restartText.update("BACK TO MAIN MENU IN "+ (looseTimeOutSec - Math.floor(looseStep / 60))+" sec.");
                //console.log(looseStep);
                if (looseStep > looseTimeOut) {
                    // BACK TO THE MAIN MENU
                    gameManager.clearLevel();
                    looseStep = 0;
                    gameState = GameState.MainMenu;
                    document.getElementById("mainmenudiv").style.display = 'block';
                    document.getElementById("gameCanvas").style.display = 'none';
                }
            }
        }
    }
    
    
    function draw(context) {
        if (gameState !==  GameState.MainMenu) {
            // CLEAR CANVAS CONTEXT
            GameCanvas.ctx.clearRect(0, 0, GameCanvas.screenWidth, GameCanvas.screenHeight);

            scoreText.draw();
            livesText.draw();
            levelText.draw();
            
            if (gameState === GameState.GameWon) {
                this.gameManager.player.y -= 3;
                this.gameManager.player.isShooting = false;
                if (this.gameManager.player.y < -80) {
                    gameState = GameState.NextLexel;
                }
                winText.draw();
            }

            gameManager.draw(context);
        }
    }
    
    // GAME LOOP
    function mainLoop() { 
        update();
        draw(GameCanvas.ctx);
        
        if (gameState === GameState.GameLoose) {
            livesText.update("LIVES: "+lives);
            endGameText.draw();
            restartText.draw();
        }
        requestAnimationFrame(mainLoop);
    }   
    
    window.onload = function() {
        
        gameState = GameState.MainMenu;
        
        document.getElementById("playbtn").addEventListener('click', function() {
            level = 1;
            lives = initialLives;
            score = 0;
            document.getElementById("mainmenudiv").style.display = 'none';
            document.getElementById("gameCanvas").style.display = 'block';
            gameManager.clearLevel();
            gameManager.loadLevel(level);
            gameState = GameState.Game;
        });
        
        document.getElementById("helpbtn").addEventListener('click', function() {
            document.getElementById("mainmenudiv").style.display = 'none';
            document.getElementById("helpdiv").style.display = 'block';
        });
        
        document.getElementById("helpback").addEventListener('click', function() {
            document.getElementById("mainmenudiv").style.display = 'block';
            document.getElementById("helpdiv").style.display = 'none';
        });
        
        GameCanvas.create();
        
        GameCanvas.canvas.addEventListener('mousemove', function(evt) {
            var mousePos = getMousePos(GameCanvas.canvas, evt);
            if (mousePos.x < GameCanvas.screenWidth - 10
                    && mousePos.x > gameManager.player.width
                    && (gameState === GameState.Game)) gameManager.player.x = mousePos.x - 25;
            if (mousePos.y > 250
                    && mousePos.y < GameCanvas.screenHeight - 35
                    && (gameState === GameState.Game)) gameManager.player.y = mousePos.y;
        }, false);

        function getMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
              x: evt.clientX - rect.left,
              y: evt.clientY - rect.top
            };
        }

        // STEROWANIE MYSZKĄ :)
        GameCanvas.canvas.onmousedown = function() {
            if (gameState === GameState.Game) gameManager.player.isShooting = true;
        };
        GameCanvas.canvas.onmouseup = function() {
            if (gameState === GameState.Game) gameManager.player.isShooting = false;
        };

        endGameText = new HUD_Text("GAME OVER", 210, GameCanvas.screenHeight / 2, '42px Orbitron', 'red');
        winText = new HUD_Text("YOU WIN !!!", 230, GameCanvas.screenHeight / 2, '42px Orbitron', 'crimson');
        restartText = new HUD_Text("BACK TO MAIN MENU IN ", 210, 280, '18px Orbitron', 'crimson');
        scoreText = new HUD_Text("SCORE: "+score, 50, 20, '24px Orbitron', 'lime');
        livesText = new HUD_Text("LIVES: "+lives, 250, 20, '24px Orbitron', 'Beige');
        levelText = new HUD_Text("LIVES: "+level, 450, 20, '24px Orbitron', 'lime');
        
        //winButton = new Button(50, 50, 200, 30, 'NEXT LEVEL', '#410', '#ccc');

        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        requestAnimationFrame(mainLoop);
    };
