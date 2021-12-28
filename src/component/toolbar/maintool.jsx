import { Button } from "@material-ui/core";
import React, { useState } from "react";

export function Toolbar(
  alat,
  boardval,
  Tools,
  setboardtools,
  boardtools,
  setbuffertools,
  buffertools
) {
  return (
    <>
      {alat.map((val, idx) => {
        return (
          <Button
            onClick={() => {
              if (val === "Trash") {
                boardval.removeSelected();
                setboardtools({ ...boardtools, tools: Tools["Select"] });
                setbuffertools({
                  ...buffertools,
                  tools: Tools["Select"],
                });
              } else {
                setboardtools({ ...boardtools, tools: Tools[val] });
                setbuffertools(Tools[val]);
              }
            }}
          >
            {val}
          </Button>
        );
      })}
    </>
  );
}
