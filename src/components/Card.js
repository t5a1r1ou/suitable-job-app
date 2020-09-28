import React from "react";

const FLIP_STYLE = {
    // 前面⇒背面
    entering: {
        transition: 'all .5s ease',
        transform: 'perspective(25rem) rotateY(360deg)'
    },
    // 背面
    entered: {
        transition: '',
        transform: 'perspective(25rem) rotateY(0deg)'
    },
    // 背面⇒前面
    exiting: {
        transition: 'all .5s ease',
        transform: 'perspective(25rem) rotateY(360deg)'
    },
    // 前面
    exited: {
        transition: '',
        transform: 'perspective(25rem) rotateY(0)'
    }
};

const FLIP_BACK_STYLE = {
    // 前面⇒背面
    entering: {
        transition: 'all .5s ease',
        transform: 'perspective(25rem) rotateY(-360deg)'
    },
    // 背面
    entered: {
        transition: '',
        transform: 'perspective(25rem) rotateY(0deg)'
    },
    // 背面⇒前面
    exiting: {
        transition: 'all .5s ease',
        transform: 'perspective(25rem) rotateY(-360deg)'
    },
    // 前面
    exited: {
        transition: '',
        transform: 'perspective(25rem) rotateY(0)'
    }
};

const Card = ({state, flipFlag, index, questionIndex, buttons, questions}) => {
   return (
    <div className="flip-card" style={flipFlag ? FLIP_STYLE[state] : FLIP_BACK_STYLE[state]}>
        <div className="flip-card_id">
            <em>問{index}</em>
        </div>
        <h2 className="flip-card_title">{questions[questionIndex].title}</h2>
        <div className="btn_box">
            {buttons}
        </div>
    </div>
   );
};

export default Card;