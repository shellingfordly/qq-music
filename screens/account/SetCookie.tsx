import { Button, Input, NavBar, Popup, Toast } from "antd-mobile";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ACCOUNT_KEY, COOKIE_KEY } from "../../constants/key";
import { cache } from "../../utils/cookie";
import { localStorage } from "../../utils/storage";

export default function SetCookie({ visible, setVisible, setAccount }: any) {
  const [cookie, setCookie] = useState("");
  const [qq, setQQ] = useState("");

  useEffect(() => {
    (async () => {
      const account = await localStorage.getItem(ACCOUNT_KEY);
      const c = await localStorage.getItem(COOKIE_KEY);
      account && setQQ(account);
      c && setCookie(c);
    })();
  }, []);

  function onSetCookie() {
    const cookieMap: any = {};
    cache.parseCookie(cookie).forEach(([name, value]) => {
      cookieMap[name] = value;
      cache.setCookie(name, value);
    });
    localStorage.setItem(COOKIE_KEY, cookieMap);
    Toast.show({
      content: "Cookie设置成功！",
      position: "top",
    });
    setVisible(false);
  }

  function onGetAccountSongList() {
    localStorage.setItem(ACCOUNT_KEY, qq);
    setAccount(qq);
    Toast.show({
      content: "账号设置成功！",
      position: "top",
    });
    setVisible(false);
  }

  function onRemoveAccount() {
    localStorage.removeItem(ACCOUNT_KEY);
    Toast.show({
      content: "账号已移除！",
      position: "top",
    });
    setVisible(false);
    setAccount("");
  }

  return (
    <Popup
      visible={visible}
      onMaskClick={() => {
        setVisible(false);
      }}
      position="right"
      bodyStyle={{ minWidth: "100vw" }}
    >
      <NavBar onBack={() => setVisible(false)} style={{ "--height": "60px" }}>
        设置Cookie
      </NavBar>
      <View style={styles.form}>
        <View style={styles.formItem}>
          <View style={styles.formInput}>
            <Text style={styles.label}>Cookie:</Text>
            <Input
              value={cookie}
              onChange={(val) => setCookie(val)}
              placeholder="请填入QQ音乐Cookie"
              clearable
            />
          </View>
          <Text style={styles.itemNotify}>
            目前无法直接调用登录接口，只能在QQ音乐中获取cookie后粘贴到此处设置
          </Text>
          <Button color="primary" onClick={onSetCookie}>
            设置Cookie
          </Button>
        </View>

        <View style={styles.formItem}>
          <View style={styles.formInput}>
            <Text style={styles.label}>QQ:</Text>
            <Input
              value={qq}
              onChange={(val) => setQQ(val)}
              placeholder="请填入QQ号"
              clearable
            />
          </View>
          <Text style={styles.itemNotify}>
            填写QQ号仅限于获取账号收藏歌单和创建歌单
          </Text>
          <View style={styles.btnBox}>
            <Button
              style={{ flex: 1 }}
              color="primary"
              onClick={onGetAccountSongList}
            >
              获取QQ歌单
            </Button>
            <Button
              style={{ width: "30%", marginLeft: 20 }}
              onClick={onRemoveAccount}
            >
              清除
            </Button>
          </View>
        </View>
      </View>
    </Popup>
  );
}

const styles = StyleSheet.create({
  form: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  formItem: {
    marginTop: 20,
  },
  formInput: {
    flexDirection: "row",
  },
  label: {
    width: 90,
    fontSize: 16,
    fontWeight: "500",
  },
  itemNotify: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 12,
    color: "#999",
  },
  btnBox: {
    flexDirection: "row",
  },
});
