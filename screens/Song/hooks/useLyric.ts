import { useEffect, useState } from "react";
import API from "../../../server/api";

export default function useLyric(songmid: number) {
  const [lyrics, setLyrics] = useState<[number, number, string | null][]>([]);

  useEffect(() => {
    if (songmid) {
      API.GetSongLyric({ songmid }).then((res) => {
        setLyrics(handleLyric(res.data.lyric));
        console.log(handleLyric(res.data.lyric));
      });
    }
  }, []);

  return { lyrics, setLyrics };
}

function handleLyric(lyricStr: string) {
  const lyricList: [number, number, string | null][] = [];
  const reg = /\[\d{2}:\d{2}.\d{2}\]/g;
  let index = 0;
  let timeStart = 0;

  lyricStr.replace(reg, (value: string, i: number) => {
    if (index) {
      const sentence = lyricStr.slice(index, i).match(/\](.+)/);
      const times = value.replace(/\[|\]/g, "").split(":");
      const time = Number(times[0]) * 60 + Number(times[1]);
      lyricList.push([timeStart, time, sentence && sentence[1]]);
      timeStart = time;
    }
    index = i;
    return value;
  });

  return lyricList;
}
