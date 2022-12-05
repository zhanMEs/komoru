import axios from "axios";

// 2022-07-08 PG
// 取得要獲得使用者 code 的 api url
// clientId：Line 提供的企業方 Id
// redirectUri：call back url
// state：隨機加密字串
// return：string
export function getUserCodeApiUrl({ clientId, redirectUri, state }) {
  let locationUrl = "https://access.line.me/oauth2/v2.1/authorize";
  let getCodeParams = new URLSearchParams();

  getCodeParams.append("response_type", "code");
  getCodeParams.append("client_id", clientId);
  getCodeParams.append("redirect_uri", redirectUri);
  getCodeParams.append("state", state);
  getCodeParams.append("scope", "openid profile email");

  return locationUrl + "?" + getCodeParams.toString();
}

// 2022-07-08 PG
// 取得使用者 token By 使用者 code
// code：使用者 code
// clientId：企業方 Id
// redirectUri：call back url
// clientSecret：企業方金鑰
// return：string
export async function getTokenByUserCode({
  code,
  clientId,
  redirectUri,
  clientSecret,
}) {
  let token;
  let getTokenParams = new URLSearchParams();

  getTokenParams.append("grant_type", "authorization_code");
  getTokenParams.append("code", code);
  getTokenParams.append("redirect_uri", redirectUri);
  getTokenParams.append("client_id", clientId);
  getTokenParams.append("client_secret", clientSecret);

  await axios({
    method: "POST",
    url: "https://api.line.me/oauth2/v2.1/token",
    data: getTokenParams.toString(),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((resToken) => {
      if (resToken.status == 200) {
        token = resToken.data.id_token;
      }
    })
    .catch((e) => {
      console.log(e);
    });
  return token;
}
