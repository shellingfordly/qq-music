import { Button } from "antd-mobile";
import { View } from "react-native";
import { useGetCookie, useSetCookie } from "../../server/api";

export default function Account() {
  function setCookie() {
    // useSetCookie({
    //   data: "RK=+sD9Qf76ME; ptcz=40230196ccaf81bfc8f7b525ab01a6376a8d6244c114627e8bf4cb58ac8e15bc; Qs_lvt_323937=1636606009; Qs_pv_323937=4107239090385080300; pgv_pvid=4715867676; fqm_pvqid=c6215e23-4353-4d61-84ac-4a8bb6ae60aa; ts_uid=408586008; ptui_loginuin=1418504249; fqm_sessionid=53109454-e365-4b72-917f-237525c30bad; pgv_info=ssid=s155757283; ct=2011; _qpsvr_localtk=0.8680287597635976; euin=oKv5Ne4z7e-PNv**; tmeLoginType=2; ts_refer=ADTAGmyqq; login_type=1; uin=1418504249; psrf_qqaccess_token=BECB0F9B36D7AD1910E2D68980847778; wxrefresh_token=; wxunionid=; qm_keyst=Q_H_L_2GBX9760eeQRo5cOgUIF0kMTlJ_8JMAu5vb8OggUEQJsuBC7o-DLbX5nDSh9066; psrf_qqrefresh_token=44070A910F02F9BAA5A082F77805FFD5; psrf_access_token_expiresAt=1648372660; psrf_qqunionid=F8C64AE89BAC1D140F5705102E4FB4DE; psrf_musickey_createtime=1640596660; qm_keyst=Q_H_L_2GBX9760eeQRo5cOgUIF0kMTlJ_8JMAu5vb8OggUEQJsuBC7o-DLbX5nDSh9066; qqmusic_key=Q_H_L_2GBX9760eeQRo5cOgUIF0kMTlJ_8JMAu5vb8OggUEQJsuBC7o-DLbX5nDSh9066; psrf_qqopenid=E03784002AA13EF103AB689D83BCBF7B; wxopenid=; ts_last=y.qq.com/n/ryqq/player",
    // });

    useGetCookie({
      id: 1418504249,
    });
  }
  const songUrl =
    "http://isure.stream.qqmusic.qq.com/C4000004Uiq84QArne.m4a?guid=2796982635&vkey=FE7ABBC79965C92F0C1402E19EBFE3395CC9A6B9EF4907A8568EF47A47C4C90AC0591D0FBCE4769529508662EC97EE4B21E48C86DCE78344&uin=1418504249&fromtag=66";

  return (
    <>
      Account
      <Button onClick={setCookie}>set cookie</Button>
      <audio
        src="http://isure.stream.qqmusic.qq.com/C4000004Uiq84QArne.m4a?guid=2796982635&vkey=FE7ABBC79965C92F0C1402E19EBFE3395CC9A6B9EF4907A8568EF47A47C4C90AC0591D0FBCE4769529508662EC97EE4B21E48C86DCE78344&uin=1418504249&fromtag=66"
        controls
      >
        Your browser does not support the audio element.
      </audio>
    </>
  );
}
