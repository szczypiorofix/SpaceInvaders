
export abstract class GameObject {

    protected x: number;
    protected y: number;
    protected width: number;
    protected height: number;
    protected alive: boolean;
    protected visible: boolean;

    public constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.alive = false;
        this.visible = false;
    }


    // ########## ABSTRACT METHODS ##########
    public abstract update(): void;
    public abstract draw(ctx: CanvasRenderingContext2D): void;




    // ############# GETTERS #############

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public isAlive(): boolean {
        return this.alive;
    }

    public isVisible(): boolean {
        return this.visible;
    }



    // ############# SETTERS #############

    public setAlive(a: boolean) {
        this.alive = a;
    }

    public setX(x: number) {
        this.x = x;
    }

    public setY(y: number) {
        this.y = y;
    }

    public setWidth(w: number) {
        this.width = w;
    }

    public setHeight(h: number) {
        this.height = h;
    }

    public setCoord(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

}
