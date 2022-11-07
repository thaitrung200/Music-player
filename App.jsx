const Player =({song, onNext, onPrev, onLoadedData, onPlayPause, onRandom, onRange}) => {
    return(
        <div className="player-control">
            <div className="author">
                <div className="author-avatar">
                    <img src={song.image} alt={song.image} />
                </div>

                <div className="author-info">
                    <h4 className="author-singer">{song.singer}</h4>
                    <div className="author-name">{song.name}</div>
                </div>
            </div>
            <div className="controls">
                <div className="control-list">
                    <button className="btn" onClick={onRandom}>
                        <i className="fas fa-random"></i>
                    </button>
                    <button className="btn" onClick={onPrev}>
                        <i className="fas fa-step-backward"></i>
                    </button>
                    <button className="btn" onClick={onPlayPause}>
                        <i className="fas fa-play"></i>
                    </button>
                    <button className="btn" onClick={onNext}>
                        <i className="fas fa-step-forward"></i>
                    </button>
                    <button className="btn">
                        <i className="fas fa-repeat"></i>
                    </button>
                </div>
                <div className="time">
                    <p className="time-start">0:00</p>
                    <div className="time-progress">
                        <input className="progress" type="range" defaultValue="0" min = "0" max = "100" onChange={onRange}  />
                    </div>
                    <p className="time-end">2:00</p>
                </div>
            </div>
            <div className="volume">Volume <i class="fas fa-volume"></i></div>
            
            
        </div>
    )
}
function App(){
    const songRef = React.useRef();
    
    const [index, setIndex] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [isPlay, setPlay] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [progress, setProgress] = React.useState(0);

    const songs = [
        {
            name: "Nevada",
            singer: "Vicetone",
            path: "https://mp3-s1-m-zmp3.zmdcdn.me/1d9de0bd79f990a7c9e8/1660985765828162804?authen=exp=1667790268~acl=/1d9de0bd79f990a7c9e8/*~hmac=e6ee687637ab78df15e88619a4c9960f",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR578VeoAPl1F6cfgzvh2ngHFjrDcNSReZ5QNEux3b7rg&s"
        },
        {
            name: "Flay Away feat AnJulie",
            singer: "TheFatRat",
            path: "https://mp3-s1-m-zmp3.zmdcdn.me/dd551decc5a82cf675b9/5149851025649766372?authen=exp=1667818112~acl=/dd551decc5a82cf675b9/*~hmac=103ef2e6fda323035f9a925ba0f82e90",
            image: "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/covers/7/c/7cf4e4cb3bfd033339f07ec39fdb5372_1498184502.jpg"
        },
        {
            name: "Unity",
            singer: "TheFatRat",
            path: "https://mp3-320s1-m-zmp3.zmdcdn.me/cd2d2a82fac613984ad7/74091051395827918?authen=exp=1667819015~acl=/cd2d2a82fac613984ad7/*~hmac=a733bb85501d3b33bda8d4723fdcc7fa",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/covers/f/8/f8af1ec869232da2460fd5f8eb09bb21_1475225520.jpg"
        },
    ]

    const handleLoadedData = () => {
        setDuration(songRef.current.duration);
        if (isPlay) songRef.current.play();
    };
    const handleNext = () => {
        if (index == songs.length - 1) setIndex(0);
        else setIndex(index + 1);
    };

    const handlePrev = () => {
        if (index == 0) setIndex(songs.length - 1);
        else setIndex(index - 1);
    };

    const handlePausePlayClick = () => {
        if (isPlay) {
          songRef.current.pause();
        } else {
          songRef.current.play();
        }
        setPlay(!isPlay);
    };

    const handleRandom = () => {
        console.log('Random');
        let newRandom = Math.floor(Math.random() * songs.length);
        setIndex(newRandom)
    }
    const HandleRange = (e) => {
        songRef.current.currentTime = (songRef.current.duration / 100) * e.target.value
        setProgress(e.target.value)
        console.log("Progress", songRef.current.currentTime);
      }
    //   const currentPercentage = songRef.current ? `${(trackProgress / (songRef.current)) * 100}%` : "0%";
 
    const song = songs[index]
    return (
        <div className="section-songs">
            <audio ref={songRef}  src={song.path} onLoadedData={handleLoadedData}></audio>
            <Player song={song} onPrev={handlePrev} onNext={handleNext} onPlayPause={handlePausePlayClick } onRandom={handleRandom}  onRange={HandleRange} />
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);