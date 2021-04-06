import React from "react";
// @ts-ignore
import Typewriter from "typewriter-effect";

interface Writer {
  typeString: (
    arg0: string
  ) => { (): any; new (): any; start: { (): any; new (): any } };
}

interface Props {
  texts: string;
}

const SecTopDialog: React.VFC<Props> = ({ texts }) => {
  return (
    <div className="sectop-dia">
      <p className="sectop-name">Dr.Nisso</p>
      <Typewriter
        onInit={(writer: Writer) => writer.typeString(texts).start()}
        options={{
          delay: 70,
        }}
      />
    </div>
  );
};

export default SecTopDialog;
