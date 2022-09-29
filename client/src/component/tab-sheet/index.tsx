import React, { useState, useEffect, useRef } from 'react';
import type alphaTabType from "@coderline/alphatab";
import './style.scss'

declare let alphaTab: typeof alphaTabType;
export type TabsProps = {
    tex?: string;
};

export const TabSheet = ({ tex }: TabsProps) => {
    const tabsEl = useRef<any>(null);
    const alphaTabApi = useRef<any>({});
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    useEffect(() => {
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
            file: "https://www.alphatab.net/files/canon.gp",
        };

        alphaTabApi.current = new alphaTab.AlphaTabApi(tabsEl.current, settings);
        // alphaTabApi.current.tex(tex);
        return () => {
            alphaTabApi.current.destroy();
        };
    }, [isScriptLoaded, tex]);

    if (!isScriptLoaded) {
        return <div>Loading AlphaTab...</div>;
    }
    return (
        <>
            <div className="at-wrap">
                <div className="at-overlay">
                </div>
                <div className="at-content">
                    <div className="at-sidebar">
                        Track selector will go here
                    </div>
                    <div className="at-viewport">
                        <div ref={tabsEl} className="at-main"></div>
                    </div>
                </div>
                <div className="at-controls">
                    Player controls will go here
                </div>
            </div></>
    )
}
