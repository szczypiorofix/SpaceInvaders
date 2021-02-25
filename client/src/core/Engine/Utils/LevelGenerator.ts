import { Enemy, EnemyType, Spaceship, Wall, WallType } from '../../Objects';
import { Canvas } from '..';


export interface Level {
    id: number;
    name: string;
    enemiesCount: number;
    enemies: Enemy[],
    enemyType: EnemyType;
    difficulty: number;
    wallCount: number;
    walls: Wall[],
    update: () => void;
    draw: (canvas: Canvas) => void;
}


export class LevelGenerator {

    private levels: Level[];
    private idCount: number = 0;
    private player?: Spaceship;

    constructor() {
        this.levels = [];
    }

    public createLevel(l: { name: string, diff: number, eC: number, eT: number}, player: Spaceship): Level {

        this.player = player;

        let en: Enemy[] = [];
        for (let i:number = 0; i < l.eC; i++) {
            en.push(new Enemy(l.eT, 120 + (i * 40), 10 ));
        }

        // if (this.player) {
        //     this.player.setEnemies(en);
        // }

        let w: Wall[] = [];
        for (let i: number = 0; i < 3; i++) {
            w.push(new Wall(WallType.TYPE1, 170 + (i * 120), 360, 0));
        }

        let level: Level = {
            id: this.idCount,
            name: l.name,
            difficulty: l.diff,

            enemiesCount: l.eC,
            enemyType: l.eT,
            enemies: en,

            wallCount: 3,
            walls: w,

            update: () => {
                for (let i:number = 0; i < l.eC; i++) {
                    level.enemies[i].update();
                }
                for (let i: number = 0; i < 3; i++) {
                    level.walls[i].update();
                }
            },
            draw: (canvas: Canvas) => {
                for (let i:number = 0; i < l.eC; i++) {
                    if (canvas.ctx) {
                        level.enemies[i].draw(canvas.ctx);
                    }
                }
                for (let i: number = 0; i < 3; i++) {
                    level.walls[i].draw(canvas);
                }
            }

        }

        this.levels.push(level);

        this.idCount++;

        return level;
    }

}
