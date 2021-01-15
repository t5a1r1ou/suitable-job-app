import React, { memo } from "react";
import { useHistory } from "react-router-dom";
// @ts-ignore
import Typewriter from "typewriter-effect";

import PageHeader from "./PageHeader";

import Constants from "../Constants";

interface Props {
  type: string;
  secImg: {
    values: {
      title: string;
      titleAlt: string;
      doc: string;
      docAlt: string;
    };
    personality: {
      title: string;
      titleAlt: string;
      doc: string;
      docAlt: string;
    };
  };
}

interface Writer {
  typeString: (
    arg0: string
  ) => { (): any; new (): any; start: { (): any; new (): any } };
}

const SectionTop: React.FC<Props> = memo(({ type, secImg }) => {
  const { sectionTexts } = Constants;
  const history = useHistory();

  const secElements = {
    values: {
      imgs: secImg["values"],
      texts: sectionTexts["values"],
      headerTitle: "価値観診断テスト",
    },
    personality: {
      imgs: secImg["personality"],
      texts: sectionTexts["personality"],
      headerTitle: "性格診断テスト",
    },
  };

  const secElement =
    type === "values" ? secElements["values"] : secElements["personality"];

  const { imgs, texts, headerTitle } = secElement;

  const test_start = () => history.push(`/${type}/questions/1`);
  return (
    <>
      <PageHeader title={headerTitle} />
      <h1>
        <img src={imgs.title} alt={imgs.titleAlt} className="sectop-img" />
      </h1>
      <div className="sectop-box">
        <div className="sectop-dia">
          <p className="sectop-name">Dr.Nisso</p>
          <Typewriter
            onInit={(writer: Writer) => writer.typeString(texts).start()}
            options={{
              delay: 70,
            }}
          />
        </div>
        <img src={imgs.doc} alt={imgs.docAlt} className="sectop-doc" />
      </div>
      <p onClick={() => test_start()} className="btn">
        始める
      </p>
    </>
  );
});

export default SectionTop;
