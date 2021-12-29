import { useEffect } from "react";
import API from "../../server/api";

export default function Radio() {
  useEffect(() => {
    API.GetRadioCaregory().then((res) => {});
  });

  return <></>;
}
