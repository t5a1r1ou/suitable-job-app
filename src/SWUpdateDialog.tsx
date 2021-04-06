import React, { useState } from "react";

const SWUpdateDialog: React.VFC<{
  registration: ServiceWorkerRegistration;
}> = ({ registration }) => {
  const [show, setShow] = useState(!!registration.waiting);
  const style: React.CSSProperties = {
    width: "100%",
    backgroundColor: "green",
  };
  const handleUpdate = () => {
    registration.waiting?.postMessage({ type: "SKIP_WAITING" });
    setShow(false);
    window.location.reload();
  };

  return show ? (
    <div style={style}>
      <span>
        新しいバージョンがリリースされました。
        <span role="img" aria-label="cracker">
          🎉
        </span>
      </span>
      <button onClick={handleUpdate} className="btn-em">
        アップデート
      </button>
    </div>
  ) : (
    <></>
  );
};

export default SWUpdateDialog;
