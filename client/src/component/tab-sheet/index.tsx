import React, { useState, useEffect, useRef } from 'react';
import type alphaTabType from "@coderline/alphatab";
import { Button } from 'antd';
import { CaretRightOutlined, PauseOutlined, ReloadOutlined,EditOutlined } from '@ant-design/icons';
import './style.scss'

declare let alphaTab: typeof alphaTabType;

type SongProps = {
    bpm?: any;
    notes: any;
}
export type TabsProps = {
    tex?: string;
    processedSong?: SongProps;
};

export const TabSheet = ({ tex, processedSong }: TabsProps) => {

    const Bpmsheet = localStorage.getItem("bpm")|| '80';

    const tabsEl = useRef<any>(null);
    const [song, setSong] = useState<string>("");
    const [isplaying, setPlaying] = useState<boolean>(false);
    const alphaTabApi = useRef<alphaTabType.AlphaTabApi>();
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    useEffect(() => {
        console.log(Bpmsheet)

        setSong(
            `\\tempo ${Bpmsheet} \\tuning e5 b4 g4 d4 a3 e3 . ${processedSong?.notes}`
        );
        if (document.querySelector("#alphaTabScript")) {
            setIsScriptLoaded(true);
            return;
        }

        const alphaTabScript = document.createElement("script");
        alphaTabScript.id = "alphaTabScript";
        alphaTabScript.src =
            "https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/alphaTab.js";
        alphaTabScript.onload = () => {
            setIsScriptLoaded(true);
        };

        document.body.appendChild(alphaTabScript);
    }, []);

    useEffect(() => {
        if (!isScriptLoaded) {
            return;
        }
        const settings = {
            core: {
                tex: true,
            },
            display: {
                staveProfile: "Default",
                resources: {
                    // staffLineColor: "rgb(200, 10, 110)"
                },
            },
            player: {
                enablePlayer: true,
                enableUserInteraction: true,
                enableCursor: true,
                soundFont: 'https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/soundfont/sonivox.sf2',
                scrollElement: document.querySelector('.at-viewport')
            },
        };

        alphaTabApi.current = new alphaTab.AlphaTabApi(tabsEl.current, settings)!;
        // alphaTabApi.current.tex(tex);

        const overlay: HTMLElement = document.querySelector(".at-overlay")!;
        if (overlay) {
            alphaTabApi.current.renderStarted.on(() => {
                overlay.style.display = 'flex';
            });
            alphaTabApi.current.renderFinished.on(() => {
                overlay.style.display = "none";
            });
        }

        return () => {
            alphaTabApi?.current?.destroy();
        };
        
    }, [isScriptLoaded, tex, song]);

    useEffect(() => {
        if(alphaTabApi.current) {
            const playerIndicator: HTMLElement = document.querySelector(
                ".at-controls .at-player-progress"
            )!;
            alphaTabApi.current.soundFontLoad.on((e) => {
                console.log(e.loaded);
                const percentage = Math.floor((e.loaded / e.total) * 100);
                playerIndicator.innerText = percentage + "%";
            });
            alphaTabApi.current.playerReady.on(() => {
                playerIndicator.style.display = 'none';
            });
        }
    }, [isplaying])

    if (!isScriptLoaded) {
        return <div>Loading AlphaTab...</div>;
    }

    const submitBpm = () =>{
        let bpm = prompt("Please enter bpm you want", "80");
        // setSong(
        //     `\\tempo ${bpm} \\tuning e5 b4 g4 d4 a3 e3 . ${processedSong?.notes}`
        // );
        if ( bpm == null ){
            localStorage.setItem('bpm',"80")
        }
        if ( bpm != null) 
        {
        localStorage.setItem('bpm',bpm )
        }
        window.location.reload();
    }
    return (
            <div className="at-wrap">
                <div className="at-overlay">
                </div>
                <div className="at-content">
                    {/* <div className="at-sidebar">
                        Track selector will go here
                    </div> */}
                    <div className="at-viewport">
                        <div ref={tabsEl} className="at-main">
                            {tex || song}
                        </div>
                    </div>
                </div>
                <div className="at-controls">
                    <div className="at-controls-left">                        
                        <Button
                            className="btn at-player-stop disabled"
                            onClick={(e: any) => {
                                alphaTabApi?.current?.stop();
                                setPlaying(false);
                            }}
                        >
                            <ReloadOutlined className='fa-step-backward' />
                        </Button>
                        <Button
                            key={`${isplaying}`}
                            className="btn at-player-play-pause disabled"
                            onClick={(e: any) => {
                                alphaTabApi?.current?.playPause();
                                setPlaying(!isplaying);
                            }}
                        >
                            {
                                isplaying 
                                ? <PauseOutlined/>
                                : <CaretRightOutlined className='fa-play' />
                            }
                        </Button>
                        
                        <Button
                            className="btn-bpm"
                            onClick={submitBpm}
                        >
                            <EditOutlined/>
                        </Button>

                        {/* <span className="at-player-progress">0%</span>
                        <div className="at-song-position">00:00 / 00:00</div> */}

                    </div>
                </div>
            </div>
    )
}
