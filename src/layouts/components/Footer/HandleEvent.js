class HandleEvent {
    constructor() {
        this.link = '';
    }

    play = (linkSong, audio, isPlay, currentTime) => {
        if (isPlay === false) {
            audio.src = linkSong[128];
            if (this.link !== linkSong[128]) {
                this.link = linkSong[128];
                audio.play();
            } else {
                audio.currentTime = currentTime;
                audio.play();
            }
        } else {
            audio.pause();
        }
    };
}

export default new HandleEvent();
