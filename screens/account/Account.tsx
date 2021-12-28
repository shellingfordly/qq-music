import { Button } from "antd-mobile";
import { View } from "react-native";
import { useGetCookie, useSetCookie } from "../../server/api";

export default function Account() {
  function setCookie() {
    // useSetCookie({
    //   data: "RK=+sD9Qf76ME; ptcz=40230196ccaf81bfc8f7b525ab01a6376a8d6244c114627e8bf4cb58ac8e15bc; Qs_lvt_323937=1636606009; Qs_pv_323937=4107239090385080300; pgv_pvid=4715867676; fqm_pvqid=c6215e23-4353-4d61-84ac-4a8bb6ae60aa; ts_uid=408586008; ptui_loginuin=1418504249; fqm_sessionid=53109454-e365-4b72-917f-237525c30bad; pgv_info=ssid=s155757283; ct=2011; _qpsvr_localtk=0.8680287597635976; euin=oKv5Ne4z7e-PNv**; tmeLoginType=2; ts_refer=ADTAGmyqq; ts_last=y.qq.com/; login_type=1; psrf_qqrefresh_token=44070A910F02F9BAA5A082F77805FFD5; qm_keyst=Q_H_L_2aqsA760ea5J8njoxZswuI01nOyeD2wSuu-nSma-lPH5ctU8lgDiBqfivtuFvA7; psrf_access_token_expiresAt=1648460361; psrf_qqunionid=F8C64AE89BAC1D140F5705102E4FB4DE; psrf_qqopenid=E03784002AA13EF103AB689D83BCBF7B; wxrefresh_token=; uin=1418504249; wxopenid=; qm_keyst=Q_H_L_2aqsA760ea5J8njoxZswuI01nOyeD2wSuu-nSma-lPH5ctU8lgDiBqfivtuFvA7; psrf_musickey_createtime=1640684361; qqmusic_key=Q_H_L_2aqsA760ea5J8njoxZswuI01nOyeD2wSuu-nSma-lPH5ctU8lgDiBqfivtuFvA7; psrf_qqaccess_token=BECB0F9B36D7AD1910E2D68980847778; wxunionid=",
    // });

    useGetCookie({
      id: 1418504249,
    });
  }

  return (
    <>
      <Button onClick={setCookie}>set cookie</Button>
    </>
  );
}
