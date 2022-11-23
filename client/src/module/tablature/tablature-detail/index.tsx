import React, { useState, useEffect } from 'react'
import { TabSheet } from 'src/component';
import { ParseJson } from 'src/util';
import { twilight, windsong} from 'src/asset';
import { useParams } from 'react-router-dom';

// type TablatureDetailProps = {
//     song_id: string,
// }

const data: Record<string, any> = {
    '1': twilight,
    '2': windsong
}
export const TablatureDetail = () => {
    const [processedSong, setProcessedSong] = useState<any>();
    let { song_id } = useParams();
    useEffect(() => {
        console.log("song id",ParseJson(data[song_id!]))
        setProcessedSong(ParseJson(data[song_id!]));
    }, [song_id]);

    useEffect(() => {
        console.log("song id",song_id);
    })

  return (
    <>
    {
        processedSong && <TabSheet key={song_id} processedSong={processedSong}/>
    }
    </>
  )
}
