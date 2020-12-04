import React from 'react';
import MainMenu from './mainmenu/MainMenu';
import Game from './game/Game';
import HallOfFame from './halloffame/HallOfFame';
// import { isGamepadSupported } from './core/Utils';
import './App.scss';
import { GameState, StateType } from '../core';
import GameSettings from './gamesettings/GameSettings';
import SplashMenu from './splashmenu/SplashMenu';


class App extends React.Component< {}, GameState> {

  // console.log("is gamepad supported?: " + isGamepadSupported());


  // window.addEventListener("gamepadconnected", function(e: any) {
  //   console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
  //     e.gamepad.index, e.gamepad.id,
  //     e.gamepad.buttons.length, e.gamepad.axes.length);
  // });

  // window.addEventListener("gamepaddisconnected", function(e: any) {
  //   console.log("Gamepad disconnected from index %d: %s",
  //     e.gamepad.index, e.gamepad.id);
  // });



  public constructor(props: any) {
    super(props);
    this.state = {gameState: StateType.SplashMenu};
  }

  public switchGameState = (gameState: StateType) => {
    this.setState({
      gameState: gameState
    })
  }

  public render(): JSX.Element {
    switch (this.state.gameState) {
      case StateType.SplashMenu:
        return (
          <SplashMenu switchGameState={ this.switchGameState} />
        );
      case StateType.MainMenu:
        return (
          <MainMenu switchGameState={ this.switchGameState} />
        );
      case StateType.Game:
        return (          
          <Game switchGameState={ this.switchGameState} />
        );
      case StateType.Settings:
        return (
          <GameSettings switchGameState={ this.switchGameState } />
        );
      case StateType.HallOfFame:
        return (
          <HallOfFame switchGameState={ this.switchGameState } />
      );
      default:
        return <div>LOADING...</div>
    }

  }
}

export default App;
