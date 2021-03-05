import React, { memo } from "react";
import { Helmet } from "react-helmet-async";

interface Props {
  title?: string;
}

const PageHeader: React.VFC<Props> = memo(({ title }) => {
  const head = [
    { charset: "utf-8" },
    { name: "theme-color", content: "#000000" },
    { name: "description", content: "あなたに合ったお仕事を探せる！" },
  ];

  return (
    <>
      <Helmet
        defaultTitle="プチ自分発見診断 | 工場求人ナビ"
        titleTemplate="%s | プチ自分発見診断 工場求人ナビ"
        title={title}
        meta={head}
      />
    </>
  );
});

export default PageHeader;
