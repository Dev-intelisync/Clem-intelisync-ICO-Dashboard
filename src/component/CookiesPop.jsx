import React from "react";
import { useCookies } from "react-cookie";
import { Typography } from "@material-ui/core";

const CookiesPop = () => {
  const [cookies, setCookie] = useCookies(["name"]);

  function onChange(newName) {
    setCookie("name", newName, { path: "/" });
  }
  return (
    <div>
      {/* <NameForm name={cookies.name} onChange={onChange} /> */}
      <Typography onChange={onChange} name={cookies.name}>
        Hellowgdhgkdshsdkhndjkshngskdlj
      </Typography>
      {cookies.name && <h1>Hellogsfgdfjksdfjksgnjkdfsnjk {cookies.name}!</h1>}
    </div>
  );
};

export default CookiesPop;
