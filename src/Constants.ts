class Constants {
  static sectionTexts = {
    values:
      "価値観診断テスト説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
    personality: "性格診断テスト説明説明説明",
  };

  static progressTexts = {
    early: "サクサク答えよう！",
    middle: "その調子！",
    late: "あともう少し！",
  };

  static formElements = [
    {
      label: "age",
      labelName: "年齢",
      type: "number",
      placeholder: "",
      required: true,
    },
    {
      label: "sex",
      labelName: "性別",
      type: "select",
      placeholder: "",
      required: true,
      options: ["男", "女", "答えない"],
    },
    {
      label: "job",
      labelName: "職業",
      type: "text",
      placeholder: "現職または直近のご職業をお答えください",
      required: false,
    },
    {
      label: "wage",
      labelName: "年収",
      type: "select",
      placeholder: "現職または直近のご年収をお答えください",
      required: false,
      options: [
        "-",
        "200万円以下",
        "250万円以下",
        "300万円以下",
        "350万円以下",
        "400万円以下",
        "400万円以上",
      ],
    },
    {
      label: "email",
      labelName: "メールアドレス",
      type: "email",
      placeholder: "結果を基に厳選したお仕事をメールにてご紹介します",
      required: false,
    },
  ];

  static categories = [
    {
      value: 0,
      label: "バランス",
    },
    {
      value: 1,
      label: "収入",
    },
    {
      value: 2,
      label: "安定",
    },
    {
      value: 3,
      label: "ライフスタイル",
    },
    {
      value: 4,
      label: "環境",
    },
    {
      value: 5,
      label: "診断外",
    },
  ];

  static sexs = [
    {
      value: 1,
      label: "男性",
    },
    {
      value: 2,
      label: "女性",
    },
    {
      value: 3,
      label: "答えない",
    },
  ];

  static questionsLen = {
    vQuestions: 5,
    pQuestions: 25,
  };

  static answersLen = {
    vQuestions: 4,
    pQuestions: 6,
  };

  static valuesResults = [
    {
      id: 1,
      type: "タイプ1",
      desc: "タイプ1の説明説明説明説明説明説明説明説明説明説明説明説明",
    },
    {
      id: 2,
      type: "タイプ2",
      desc: "タイプ2の説明説明説明説明説明説明説明説明説明説明説明説明",
    },
    {
      id: 3,
      type: "タイプ3",
      desc: "タイプ3の説明説明説明説明説明説明説明説明説明説明説明説明",
    },
    {
      id: 4,
      type: "タイプ4",
      desc: "タイプ4の説明説明説明説明説明説明説明説明説明説明説明説明",
    },
  ];

  static personalityResults = [
    {
      type: "タイプ1",
      desc: "タイプ1の説明説明説明説明説明説明説明説明説明説明説明説明",
    },
    {
      type: "タイプ2",
      desc: "タイプ2の説明説明説明説明説明説明説明説明説明説明説明説明",
    },
    {
      type: "タイプ3",
      desc: "タイプ3の説明説明説明説明説明説明説明説明説明説明説明説明",
    },
    {
      type: "タイプ4",
      desc: "タイプ4の説明説明説明説明説明説明説明説明説明説明説明説明",
    },
    {
      type: "タイプ5",
      desc: "タイプ5の説明説明説明説明説明説明説明説明説明説明説明説明",
    },
    {
      type: "タイプ6",
      desc: "タイプ6の説明説明説明説明説明説明説明説明説明説明説明説明",
    },
  ];
}

export default Constants;
