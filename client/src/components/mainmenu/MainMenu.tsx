import React from 'react';
import './MainMenu.scss';
import { StateType } from '../../core/Engine';
import { IMainMenuChoice } from '../game/GameModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';


class MainMenu extends React.Component<IMainMenuChoice, {}> {

    private currentMusic: React.RefObject<HTMLAudioElement>;

    public constructor(props: any) {
        super(props);
        this.currentMusic = React.createRef();
    }

    public componentDidMount() {
        if (this.currentMusic.current) {
            this.currentMusic.current.play();
            this.currentMusic.current.loop = true;
        }
    }

    public render(): JSX.Element {
        const switchGameStateTo = this.props.switchGameState;

        return (
            <div className="MainMenu">
                <h1>SPACE INVADERS</h1>
                <div className="menu-buttons">
                    <button className="menu-button" onClick={ () => switchGameStateTo(StateType.Game)       } ><span className="icon"><FontAwesomeIcon icon={ faPlay }/></span> START NEW GAME</button>
                    <button className="menu-button" onClick={ () => switchGameStateTo(StateType.Settings)   } ><span className="icon"><FontAwesomeIcon icon={ faCog }/></span> SETTINGS</button>
                    <button className="menu-button" onClick={ () => switchGameStateTo(StateType.HallOfFame) }><span className="icon"><FontAwesomeIcon icon={ faTrophy }/></span> HALL OF FAME</button>
                </div>
            </div>
        );
    }

}

export default MainMenu;
