import { useEffect, useState } from "react";
import API from "../../../server/api";

function handleLyric(lyricStr: string) {
  const lyricList: [number, number, string | null][] = [];
  const reg = /\[\d{2}:\d{2}.\d{2}\]/g;
  let index = 0;
  let timeStart = 0;

  const sliceTimeAndLyric = (value: string, i: number) => {
    const sentence = lyricStr.slice(index, i).slice(10);
    const times = value.replace(/\[|\]/g, "").split(":");
    const time = Number(times[0]) * 60 + Number(times[1]);
    lyricList.push([timeStart, time, sentence]);
    timeStart = time;
  };

  lyricStr.replace(reg, (value: string, i: number) => {
    if (index) {
      sliceTimeAndLyric(value, i);
    }
    index = i;
    return value;
  });

  // 最后一句歌词
  sliceTimeAndLyric(lyricStr.slice(index), lyricStr.length);

  return lyricList;
}

export default function useLyric(playingSong: any) {
  const [lyrics, setLyrics] = useState<[number, number, string | null][]>([]);

  useEffect(() => {
    if (playingSong.mid) {
      API.GetSongLyric({ songmid: playingSong.mid }).then((res) => {
        const list = handleLyric(res.data.lyric);
        list.shift();
        setLyrics(list);
      });
    }
  }, [playingSong]);

  return { lyrics, setLyrics };
}
