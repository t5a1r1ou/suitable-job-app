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

  static progressWaitText = "お待ちください…";

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
      type: "1",
      desc: "タイプ1の説明説明説明説明説明説明\n説明説明説明説明説明説明",
    },
    {
      id: 2,
      type: "2",
      desc: "タイプ2の説明説明説明説明説明説\n明説明説明説明説明説明説明",
    },
    {
      id: 3,
      type: "3",
      desc: "タイプ3の説明説明説明説明説明説明説明説\n明説明説明説明説明",
    },
    {
      id: 4,
      type: "4",
      desc: "タイプ4の説明説明説明説明説明説\n明説明説明説明説明説明説明",
    },
  ];

  // static personalityResults = [
  //   {
  //     type: "1",
  //     desc: "タイプ1の説明説明説明説明説明説明\n説明説明説明説明説明説明",
  //   },
  //   {
  //     type: "2",
  //     desc: "タイプ2の説明説明説明説明説\n明説明説明説明説明説明説明説明",
  //   },
  //   {
  //     type: "3",
  //     desc: "タイプ3の説明説明説明説明説明説\n明説明説明説明説明説明説明",
  //   },
  //   {
  //     type: "4",
  //     desc: "タイプ4の説明説明説明説明説明説明\n説明説明説明説明説明説明",
  //   },
  //   {
  //     type: "5",
  //     desc: "タイプ5の説明説明説明説明説\n明説明説明説明説明説明説明説明",
  //   },
  //   {
  //     type: "6",
  //     desc: "タイプ6の説明説明説明説明説明説\n明説明説明説明説明説明説明",
  //   },
  // ];

  static personalityResults = [
    {
      id: 1,
      arr: [0, 1],
      type: "1",
      desc: "タイプ1の説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
    },
    {
      id: 2,
      arr: [0, 2],
      type: "2",
      desc: "タイプ2の説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
    },
    {
      id: 3,
      arr: [0, 3],
      type: "3",
      desc: "タイプ3の説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
    },
    {
      id: 4,
      arr: [0, 4],
      type: "4",
      desc: "タイプ4の説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
    },
    {
      id: 5,
      arr: [0, 5],
      type: "5",
      desc: "タイプ5の説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
    },
    {
      id: 6,
      arr: [1, 2],
      type: "6",
      desc: "タイプ6の説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
    },
    {
      id: 7,
      arr: [1, 3],
      type: "7",
      desc: "タイプ7の説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
    },
    {
      id: 8,
      arr: [1, 4],
      type: "8",
      desc: "タイプ8の説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
    },
    {
      id: 9,
      arr: [1, 5],
      type: "9",
      desc: "タイプ9の説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
    },
    {
      id: 10,
      arr: [2, 3],
      type: "10",
      desc:
        "タイプ10の説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
    },
    {
      id: 11,
      arr: [2, 4],
      type: "11",
      desc:
        "タイプ11の説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
    },
    {
      id: 12,
      arr: [2, 5],
      type: "12",
      desc:
        "タイプ12の説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
    },
    {
      id: 13,
      arr: [3, 4],
      type: "13",
      desc:
        "タイプ13の説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
    },
    {
      id: 14,
      arr: [3, 5],
      type: "14",
      desc:
        "タイプ14の説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
    },
    {
      id: 15,
      arr: [4, 5],
      type: "15",
      desc:
        "タイプ15の説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
    },
  ];
}

export default Constants;
