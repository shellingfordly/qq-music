import { ErrMsg } from "./errMessage";
import { Toast } from "antd-mobile";

export function checkStatus(status: number, msg: string) {
  let errMessage = "";

  switch (status) {
    case 400:
      errMessage = msg;
      break;
    case 401:
      errMessage = ErrMsg["401"];
      break;
    case 403:
      errMessage = ErrMsg["403"];
      break;
    case 404:
      errMessage = ErrMsg["404"];
      break;
    case 405:
      errMessage = ErrMsg["405"];
      break;
    case 408:
      errMessage = ErrMsg["408"];
      break;
    case 500:
      errMessage = ErrMsg["500"];
      break;
    case 501:
      errMessage = ErrMsg["501"];
      break;
    case 502:
      errMessage = ErrMsg["502"];
      break;
    case 503:
      errMessage = ErrMsg["503"];
      break;
    case 504:
      errMessage = ErrMsg["504"];
      break;
    case 505:
      errMessage = ErrMsg["505"];
      break;
    default:
  }
  if (errMessage) {
    Toast.show({
      content: errMessage,
      position: "top",
    });
  }
}
