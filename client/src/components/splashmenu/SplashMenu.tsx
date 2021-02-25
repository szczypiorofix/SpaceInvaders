import React from 'react';
import './SplashMenu.scss';
import { StateType } from '../../core/Engine';
import { IMainMenuChoice } from '../game/GameModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'



export default class SplashMenu extends React.Component<IMainMenuChoice, {}> {
    
    public constructor(props: any) {
        super(props);
    }

    public render(): JSX.Element {
        const switchGameStateTo = this.props.switchGameState;
        return (
            <div className="SplashMenu">
                <h1>SPACE INVADERS</h1>
                <div className="div-splash-button">
                    <button className="menu-button splash-button" onClick={ () => switchGameStateTo(StateType.MainMenu) }>
                        <FontAwesomeIcon icon={ faPlayCircle }/> START
                    </button>
                </div>
            </div>
        );
    }

}
