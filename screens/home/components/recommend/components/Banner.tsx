import React, { useEffect, useState } from "react";
import { Image } from "antd-mobile";
import Swiper from "react-native-swiper";
import { ApiUrl, getPlayList } from "../../../../../server/api";
import { themeColor } from "../../../../../utils/style";

export default function Banner() {
  const [bannerList, setBannerList] = useState<any>([]);

  useEffect(() => {
    getPlayList(ApiUrl.RecommendBanner).then((res) => {
      setBannerList(res.data);
    });
  }, []);

  return (
    <Swiper
      style={{ height: 150 }}
      loop={true}
      autoplay={true}
      showsPagination={false}
      activeDotColor={themeColor.primary}
    >
      {bannerList.map((banner: any) => (
        <Image width={"100%"} key={banner.id} src={banner.picUrl} />
      ))}
    </Swiper>
  );
}
