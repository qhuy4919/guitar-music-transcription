import React, { useState, useEffect, useRef } from 'react';
import type alphaTabType from "@coderline/alphatab";
import { Button } from 'antd';
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
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
    const tabsEl = useRef<any>(null);
    const [song, setSong] = useState<string>("");
    const [isplaying, setPlaying] = useState<boolean>(false);
    const alphaTabApi = useRef<alphaTabType.AlphaTabApi>();
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    useEffect(() => {
        console.log(processedSong);
        setSong(
            `\\tempo ${processedSong?.bpm} \\tuning e5 b4 g4 d4 a3 e3 . ${processedSong?.notes}`
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

    return (
            <div className="at-wrap">
                <div className="at-overlay">
                </div>
                <div className="at-content">
                    <div className="at-sidebar">
                        Track selector will go here
                    </div>
                    <div className="at-viewport">
                        <div ref={tabsEl} className="at-main">
                            {song}
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
                            <PauseOutlined className='fa-step-backward' />
                        </Button>
                        <Button
                            className="btn at-player-play-pause disabled"
                            onClick={(e: any) => {
                                alphaTabApi?.current?.playPause();
                                setPlaying(true);
                            }}
                        >
                            <CaretRightOutlined className='fa-play' />
                        </Button>
                        <span className="at-player-progress">0%</span>
                        <div className="at-song-position">00:00 / 00:00</div>

                    </div>
                </div>
            </div>
    )
}
