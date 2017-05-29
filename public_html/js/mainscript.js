
    var BG_COLOR = 0x111111;
    var type = null;
    var renderer = null;
    var stage = null;
    
    
    var Game = {
        screenWidth: 0,
        screenHeight: 0,
        
        initialize: function() {

            var stage = new PIXI.Container(),
            renderer = PIXI.autoDetectRenderer(256, 256);
            document.body.appendChild(renderer.view);
            renderer.backgroundColor = BG_COLOR;
            renderer.autoResize = true;
            renderer.view.style.position = "absolute";
            renderer.view.style.display = "block";
            renderer.resize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.view);
            stage = new PIXI.Container();
            
            PIXI.loader
                .add("images/spaceship.png")
                .load(setup);

              //This `setup` function will run when the image has loaded
                function setup() {

                    var texture = PIXI.utils.TextureCache["images/tileset.png"];

                      //Create a rectangle object that defines the position and
                      //size of the sub-image you want to extract from the texture
                      var rectangle = new PIXI.Rectangle(192, 128, 64, 64);

                      //Tell the texture to use that rectangular section
                      texture.frame = rectangle;

                      //Create the sprite from the texture
                      var rocket = new Sprite(texture);

                      //Position the rocket sprite on the canvas
                      rocket.x = 32;
                      rocket.y = 32;

                      //Add the rocket to the stage
                      stage.addChild(rocket);

                      //Render the stage   
                      renderer.render(stage);
                }

            var message = new PIXI.Text(
                "Hello Pixi!",
                {fontFamily: "Tahoma", fontSize: 32, fill: "white"}
            );

            message.position.set(window.innerWidth /2, 96);
            stage.addChild(message);
              
            renderer.render(stage);
        }
    };
    
    
    window.onload = function() {
        Game.initialize();
    };
