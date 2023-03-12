import { useState } from "react";

type body = {
  amount: Number;
  accountNo: String;
  accountName: String;
  acqId: Number;
  addInfo: String;
  format: String;
  template: "print";
};
type response = {
  code: String;
  desc: String;
  data: {
    acpId: Number;
    accountName: String;
    qrCode: String;
    qrDataURL: String;
  };
};

async function post(params: body) {
  const response = await fetch("https://api.vietqr.io/v2/generate", {
    method: "POST",
    headers: {
      "x-client-id": ``,
      "x-api-key": ``,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const data = await response.json();
  return data;
}

function PaymentsHook(props: body) {
  const [data, setData] = useState(props);
  const [qr, setQr] = useState();
  console.log(data);
  const handleClick = () => {
    async function fetchData() {
      const result = await post(data);
      console.log(result);
    }
    fetchData();
  };
  return (
    <div>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}

export default PaymentsHook;
