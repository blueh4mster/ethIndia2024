// @ts-nocheck

const _litActionCode = async () => {
  const url = "http://localhost:3000/ai-agent"; //api url of ai agent
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amount,
      address: address,
      timePeriod: timePeriod,
    }),
  }).then((response) => response.json());
  return resp;
  // this requests a signature share from the Lit Node
  // the signature share will be automatically returned in the HTTP response from the node
  // all the params (toSign, publicKey, sigName) are passed in from the LitJsSdk.executeJs() function
  // const sigShare = await LitActions.signEcdsa({ toSign, publicKey, sigName });
};

export const litActionCode = `(${_litActionCode.toString()})();`;
