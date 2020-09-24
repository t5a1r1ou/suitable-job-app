import React from "react";
import { useHistory } from "react-router-dom";
import Typewriter from "typewriter-effect";

import PageHeader from "./PageHeader";

import Constants from "../Constants";
import docValues from "../images/doctor1.png";
import docPersonality from "../images/doctor2.png";

const SectionTop = ({type, secImg}) => {
    const { sectionTexts } = Constants;
    const history = useHistory();

    const secElements = {
        values: {
            topImg: secImg["values"],
            docImg: docValues,
            texts: sectionTexts["values"]
        },
        personality: {
            topImg: secImg["personality"],
            docImg: docPersonality,
            texts: sectionTexts["personality"]
        }
    };

    const secElement = type === "values" ? secElements["values"] : secElements["personality"];

    const { topImg, docImg, texts } = secElement;
    
    const test_start = () => history.push(`/${type}/questions/1`);
    return (
        <>
            <PageHeader title={type === "values" ? "価値観診断テスト" : "性格診断テスト"} />
            <h1>
                <img
                    src={topImg.path}
                    alt={topImg.alt}
                    className="sectop-img"
                />
            </h1>
            <div className="sectop-box">
                <div className="sectop-dia">
                    <p className="sectop-name">Dr.Nisso</p>
                    <Typewriter
                        onInit={writer => writer.typeString(texts).start()}
                        options={{
                            delay: 70
                        }}
                    />
                </div>
                <img
                    src={docImg}
                    alt="博士"
                    className="sectop-doc"
                />
            </div>
            <p 
                onClick={() => test_start()}
                className="btn"
            >
                始める
            </p>
        </>
    )
};

export default SectionTop;