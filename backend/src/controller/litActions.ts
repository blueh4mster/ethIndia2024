// @ts-nocheck

const _litActionCode = async () => {
  const url = "https://23da-14-195-142-82.ngrok-free.app/ai-agent"; //api url of ai agent
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
  
};

export const litActionCode = `(${_litActionCode.toString()})();`;
