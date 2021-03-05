import React, { memo } from "react";
import { useHistory } from "react-router-dom";

import PageHeader from "./PageHeader";
import SecTopDialog from "./SecTopDialog";

import useWhichQuestions from "../logic/useWhichQuestions";

interface Props {
  type: string;
}

const SectionTop: React.VFC<Props> = memo(({ type }) => {
  const history = useHistory();
  const { title, titleSrc, doc, sectionText } = useWhichQuestions(type);

  const test_start = () => history.push(`/${type}/questions/1`);
  return (
    <>
      <PageHeader title={title} />
      <h1>
        <img src={titleSrc} alt={title} className="sectop-img" />
      </h1>
      <div className="sectop-box">
        <SecTopDialog texts={sectionText} />
        <img src={doc} alt="" className="sectop-doc" />
      </div>
      <p onClick={() => test_start()} className="btn">
        始める
      </p>
    </>
  );
});

export default SectionTop;
