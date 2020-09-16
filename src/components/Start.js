import React from "react";
import { useHistory } from "react-router-dom";

const Start = () => {
    const history = useHistory();
    return (
        <div className="base_box">
            <h1>
                <img
                    src={`${process.env.PUBLIC_URL}/logo-title_.png`}
                    alt="ロゴ"
                />
            </h1>
            <div className="top-logo_flex">
                <img
                    src={`${process.env.PUBLIC_URL}/logo-item_left.png`}
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
                    src={`${process.env.PUBLIC_URL}/logo-item_right.png`}
                    alt="ロゴ"
                    className="top-logo_item"
                />
            </div>
            <img
                src={`${process.env.PUBLIC_URL}/logo-footer.png`}
                alt="ロゴフッター"
            />
        </div>
    )
};

export default Start;