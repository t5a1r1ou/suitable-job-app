import React from "react";
import { useHistory } from "react-router-dom";

import logoTitle from "../images/logo-title.png";
import logoLeft from "../images/logo-item_left.png";
import logoRight from "../images/logo-item_right.png";

const Start = () => {
    const history = useHistory();
    return (
        <>
            <h1>
                <img
                    src={logoTitle}
                    alt="ロゴ"
                />
            </h1>
            <div className="top-logo_flex">
                <img
                    src={logoLeft}
                    alt="ロゴ"
                    className="top-logo_item"
                />
                <p
                    className="btn btn-start"
                    onClick={() => history.push("/values/top")}
                >
                    始める
                    </p>
                <img
                    src={logoRight}
                    alt="ロゴ"
                    className="top-logo_item"
                />
            </div>
        </>
    )
};

export default Start;