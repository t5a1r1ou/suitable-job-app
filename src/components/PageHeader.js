import React, { memo } from 'react';
import { Helmet } from "react-helmet-async";

const PageHeader = memo(({ title }) => {
    const head = [
        { charset: "utf-8" },
        { name: 'viewport', content: "minimum-scale=1, initial-scale=1, width=device-width, maximum-scale=1, shrink-to-fit=no" },
        { name: "theme-color", content: "#000000" },
        { name: "description", content: "あなたに合ったお仕事を探せる！" }
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