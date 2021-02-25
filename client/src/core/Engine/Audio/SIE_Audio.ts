
export abstract class SIE_Audio {
    
    protected readonly fileName: string;
    protected readonly audioElement: HTMLAudioElement;
    protected looped: boolean;
    protected paused: boolean;

    public constructor(fileName: string) {
        this.fileName = fileName;
        this.looped = false;
        this.paused = false;
        this.audioElement = new Audio(fileName);
    }

    public abstract play(): void;
    public abstract pause(): void;
    public abstract stop(): void;

    

    // ############## GETTERS ##############

    public isLooped(): boolean {
        return this.looped;
    }

    public isPaused(): boolean {
        return this.looped;
    }

    public getAudioElement(): HTMLAudioElement {
        return this.audioElement;
    }

    public getFileName(): string {
        return this.fileName;
    }



    // ############## SETTERS ##############

    public setLoop(l: boolean): void {
        this.looped = l;
    }

}
