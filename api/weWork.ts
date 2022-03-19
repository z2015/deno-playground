const ACCESS_TOKEN = Deno.env.get("ACCESS_TOKEN");

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
  if (retData.errcode !== 0 ) {
    console.error(retData);
  }
  return retData;
};