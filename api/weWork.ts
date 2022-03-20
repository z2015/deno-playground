let ACCESS_TOKEN = "";

const getAccessToken = async (generate) => {
  if (generate || !ACCESS_TOKEN) {
    const corpid = Deno.env.get("corpid");
    const corpsecret = Deno.env.get("corpsecret");
    const params = `corpid=${corpid}&corpsecret=${corpsecret}`;
    const url = "https://qyapi.weixin.qq.com/cgi-bin/gettoken?" + params;
    const request = new Request(url, {
      method: "GET",
    });
    const res = await fetch(request);
    const retData = await res.json();
    console.log('get Token success');
    ACCESS_TOKEN = retData.access_token;
  }
  return ACCESS_TOKEN;
};

export const sendMsgApi = async (msg) => {
  const data = {
    touser: "zhoujunhui",
    msgtype: "text",
    agentid: 1000002,
    text: {
      content: `${msg}`,
    },
    safe: 0,
    enable_id_trans: 0,
    enable_duplicate_check: 0,
  };
  const ACCESS_TOKEN = await getAccessToken(false);
  const url =
    "https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=" +
    ACCESS_TOKEN;
  const request = new Request(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });
  const res = await fetch(request);
  const retData = await res.json();
  if (retData.errcode !== 0) {
    console.error(retData);
    if (retData.errcode === 42001) {
      console.log("token expired , get Token again");
      await getAccessToken(true);
      await sendMsgApi(msg);
    }
  }
  return retData;
};
