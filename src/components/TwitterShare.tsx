import React, { memo } from "react";
import { TwitterShareButton, TwitterIcon } from "react-share";

interface Result {
  id: number;
  arr?: number[];
  type: string;
  desc: string;
}

interface Props {
  valuesResult: Result;
  personalityResult: Result;
}

const TwitterShare: React.VFC<Props> = memo(
  ({ valuesResult, personalityResult }) => {
    const attributes = {
      url: "https://nisso-jobcheck.netlify.app/",
      title:
        `あなたの価値観タイプは「${valuesResult["type"]}タイプ」、\r\n` +
        `性格タイプは「${personalityResult["type"]}タイプ」！\r\n\r\n` +
        "工場求人ナビのプチ自分発見診断で\r\n" +
        "お気軽に価値観・性格診断しよう！\r\n\r\n",
      hashtags: ["工場求人ナビ", "プチ自分発見診断"],
      via: "717450NISSO",
      related: ["717450NISSO"],
      className: "result-sharebtn",
    };
    return (
      <div className="result-share">
        <TwitterShareButton {...attributes}>
          <TwitterIcon size={50} round />
        </TwitterShareButton>
        <p>プチ自分発見診断をTwitterでシェア！</p>
      </div>
    );
  }
);

export default TwitterShare;
