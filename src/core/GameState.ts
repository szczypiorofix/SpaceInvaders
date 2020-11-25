export enum StateType {
    MainMenu,
    Game,
    Settings,
    GameLoose
}

export interface GameState {
    gameState: StateType;
}

export interface IMainMenuChoice {
    switchGameState: (gameState: StateType) => void;
}
