import { StateType } from '../../core/Engine';

export interface IMainMenuChoice {
    switchGameState: (gameState: StateType) => void;
}
