
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
    var shieldsText = null;
    var levelText = null;
    var endGameText = null;
    var restartText = null;
    var winText = null;
    var level = 1;
    var score = 0;
    var initialShields = 5;
    var shields = initialShields;
    var looseTimeOutSec = 3;
    var looseTimeOut = looseTimeOutSec * 60;
    var looseStep = 0;
    
    var gameManager = null;
    
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
            levelText.update("LEVEL: "+level);
            gameManager.update();

            if (gameManager.isLevelEnd()) {
                gameState = GameState.GameWon;
            }

            if (shields <= 0) {
                gameManager.player.alive = false;
                gameState = GameState.GameLoose;
            }
            
            if (gameState === GameState.GameLoose) {
                looseStep ++;
                restartText.update("BACK TO MAIN MENU IN "+ (looseTimeOutSec - Math.floor(looseStep / 60))+" sec.");
                
                if (looseStep > looseTimeOut) {
                    // BACK TO THE MAIN MENU
                    
                    if (playerName === undefined) {
                        var playerName = prompt('Please enter your name', 'Player');
                        if (playerName !== '') {
                            if (typeof(window.localStorage) !== "undefined") {
                                var highScores = JSON.parse(localStorage.getItem("highscores"));
                                var temp = new Object;
                                temp.name = playerName;
                                var today = new Date();
                                var dd = today.getDate();
                                var mm = today.getMonth()+1; //January is 0!
                                var yyyy = today.getFullYear();
                                if(dd<10) {
                                    dd='0'+dd;
                                } 
                                if(mm<10) {
                                    mm='0'+mm;
                                } 
                                today = mm+'/'+dd+'/'+yyyy;
                                temp.date = today;
                                temp.score = score;

                                if (highScores === null) highScores = [];

                                highScores.push(temp);
                                localStorage.setItem("highscores", JSON.stringify(highScores));
                            }
                            else {
                                alert('Warning! No Local Storage support!');
                            }
                        }
                    }
                    
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
            shieldsText.draw();
            shieldsText.drawBar(shields, initialShields, GameCanvas.ctx);
            levelText.draw();
            
            if (gameState === GameState.GameWon) {
                this.gameManager.player.y -= 3;
                this.gameManager.alienBullet.shot = false;
                this.gameManager.player.isShooting = false;
                if (this.gameManager.player.y < -80) {
                    gameState = GameState.NextLexel;
                }
                winText.draw();
            }
            
            gameManager.draw(context);
        }
        if (gameState === GameState.GameLoose) {
            endGameText.draw();
            restartText.draw();
        }
    }
    
    // GAME LOOP
    function mainLoop() {
        
        update();
        draw(GameCanvas.ctx);
        requestAnimationFrame(mainLoop);
    }   
    
    function showHighScores() {
        if (typeof(window.localStorage) !== "undefined") {

            // RETRIVE FROM STORAGE
            var highscores = JSON.parse(localStorage.getItem("highscores"));
            var table = 0;

            if (highscores !== null) {
                table = document.createElement('table');

                // FIRST ROW WITH COLUMN TITLES
                var trtitles = document.createElement('tr');

                var thname = document.createElement('th');
                var textthname = document.createTextNode('Name');
                thname.appendChild(textthname);
                thname.className = "thname";

                var thscore = document.createElement('th');
                var textthscore = document.createTextNode('Score');
                thscore.appendChild(textthscore);
                thscore.className = "thscore";

                var thdate = document.createElement('th');
                var textthdate = document.createTextNode('Date');
                thdate.appendChild(textthdate);
                thdate.className = "thdate";

                trtitles.appendChild(thname);
                trtitles.appendChild(thscore);
                trtitles.appendChild(thdate);

                table.appendChild(trtitles);

                // NEXT ROWS
                for (i = 0; i < highscores.length; i++) {
                    var trrow1 = document.createElement('tr'); 
                    var td1 = document.createElement('td');
                    var td2 = document.createElement('td');
                    var td3 = document.createElement('td');
                    var text1 = document.createTextNode(highscores[i].name);
                    var text2 = document.createTextNode(highscores[i].score);
                    var text3 = document.createTextNode(highscores[i].date);
                    td1.appendChild(text1);
                    td2.appendChild(text2);
                    td3.appendChild(text3);
                    trrow1.appendChild(td1);
                    trrow1.appendChild(td2);
                    trrow1.appendChild(td3);
                    table.appendChild(trrow1);          
                }    
            }
            else {
                table = document.createElement('p');
                table.appendChild(document.createTextNode("No scores detected!"));
            }
            document.getElementById('highscorestable').appendChild(table);
            
        } else {
            alert('Warning! No Local Storage support!');
            location.reload();
        }
    }
    
    window.onload = function() {
        
        gameState = GameState.MainMenu;
        
        document.getElementById("playbtn").addEventListener('click', function() {
            level = 1;
            shields = initialShields;
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
        
        document.getElementById("highscoresbtn").addEventListener('click', function() {
            document.getElementById("mainmenudiv").style.display = 'none';
            document.getElementById("highscorespart").style.display = 'block';
            if (typeof(window.localStorage) !== "undefined") {
                showHighScores();
            }
            else {
                alert('Warning! No Local Storage support!');
            }
        });
        
        document.getElementById("highscoresexit").addEventListener('click', function() {
            document.getElementById("mainmenudiv").style.display = 'block';
            document.getElementById('highscorestable').innerHTML = '';
            document.getElementById("highscorespart").style.display = 'none';
        });
        
        document.getElementById("clearscores").addEventListener('click', function() {
            var r = confirm('Delete all scores?');
            if (r === true) {
                localStorage.setItem("highscores", JSON.stringify(null));
                location.reload();
            }
        });
        
        GameCanvas.create();
        
        gameManager = new GameManager(GameCanvas);
                
        GameCanvas.canvas.addEventListener('mousemove', function(evt) {
            var mousePos = getMousePos(GameCanvas.canvas, evt);
            if (mousePos.x < GameCanvas.screenWidth - 10
                    && mousePos.x > gameManager.player.width
                    && (gameState === GameState.Game)) gameManager.player.x = mousePos.x - 25;
            if (mousePos.y > 250
                    && mousePos.y < GameCanvas.screenHeight - 35
                    && (gameState === GameState.Game)) {
                //gameManager.player.y = mousePos.y;
            }
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
        
        endGameText = new HUD_Text("GAME OVER", 200, GameCanvas.screenHeight / 2, '42px Orbitron', 'red');
        winText = new HUD_Text("YOU WIN !!!", 230, GameCanvas.screenHeight / 2, '42px Orbitron', 'crimson');
        restartText = new HUD_Text("BACK TO MAIN MENU IN ", 200, 280, '18px Orbitron', 'crimson');
        scoreText = new HUD_Text("SCORE: "+score, 10, 20, '24px Orbitron', 'lime');
        shieldsText = new HUD_Text("SHIELDS", 250, 20, '24px Orbitron', 'Beige');
        levelText = new HUD_Text("LEVEL: "+level, 500, 20, '24px Orbitron', 'lime');
        
        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        requestAnimationFrame(mainLoop);
    };
