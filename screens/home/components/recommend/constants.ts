import UserIcon from "../../../../components/icons/UserIcon";
import RankIcon from "../../../../components/icons/RankIcon";
import SortIcon from "../../../../components/icons/SortIcon";
import RadioIcon from "../../../../components/icons/RadioIcon";
import { RootStackParamList } from "../../../../types";

export const navList: {
  id: number;
  title: string;
  icon: any;
  pathName: keyof RootStackParamList;
}[] = [
  {
    id: 1,
    title: "歌手",
    icon: UserIcon,
    pathName: "Singer",
  },
  {
    id: 2,
    title: "排行",
    icon: RankIcon,
    pathName: "Rank",
  },
  {
    id: 3,
    title: "分类",
    icon: SortIcon,
    pathName: "Sort",
  },
  {
    id: 4,
    title: "电台",
    icon: RadioIcon,
    pathName: "Radio",
  },
];
