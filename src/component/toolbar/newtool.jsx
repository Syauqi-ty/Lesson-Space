import { Grid, Slider, Tooltip, IconButton } from "@material-ui/core";
import Tippy from "@tippyjs/react";
import Fab from "@material-ui/core/Fab";
import { CompactPicker } from "react-color";
import FormatColorFillIcon from "@material-ui/icons/FormatColorFill";
function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}
export function Newtool(
  setboardtools,
  boardtools,
  buffertools,
  setbuffertools
) {
  return (
    <>
      {boardtools.tools !== "select" && boardtools.tools !== "pan" ? (
        <Grid container justifyContent={"center"}>
          <Grid item xs={3}>
            <Slider
              ValueLabelComponent={ValueLabelComponent}
              defaultValue={4}
              min={1}
              max={15}
              step={3}
              value={boardtools.tebel}
              onChange={(e, val) => {
                if (typeof val === "number") {
                  setboardtools({
                    ...boardtools,
                    tebel: val,
                    tools: "",
                  });
                  setboardtools({
                    ...boardtools,
                    tebel: val,
                    tools: buffertools.tools,
                  });
                  setbuffertools({
                    ...buffertools,
                    tebel: val,
                  });
                }
              }}
            />
          </Grid>
          <Tippy
            interactive={true}
            trigger={"click"}
            placement={"bottom"}
            content={
              <CompactPicker
                color={boardtools.fillcolor}
                onChangeComplete={(color) => {
                  setboardtools({
                    ...boardtools,
                    fillcolor: color.hex,
                    tools: "",
                  });
                  setboardtools({
                    ...boardtools,
                    fillcolor: color.hex,
                    tools: buffertools.tools,
                  });
                  setbuffertools({
                    ...buffertools,
                    fillcolor: color.hex,
                  });
                }}
              />
            }
          >
            <IconButton
              style={{
                marginLeft: "7rem",
              }}
            >
              <FormatColorFillIcon
                style={{
                  color: boardtools.fillcolor.toString(),
                }}
              />
            </IconButton>
          </Tippy>

          <Tippy
            interactive={true}
            trigger={"click"}
            placement={"bottom"}
            content={
              <CompactPicker
                color={boardtools.color}
                onChangeComplete={(color) => {
                  setboardtools({
                    ...boardtools,
                    color: color.hex,
                    tools: "",
                  });
                  setboardtools({
                    ...boardtools,
                    color: color.hex,
                    tools: buffertools.tools,
                  });
                  setbuffertools({
                    ...buffertools,
                    color: color.hex,
                  });
                }}
              />
            }
          >
            <Fab
              size="small"
              style={{
                color: boardtools.color.toString(),
                backgroundColor: boardtools.color.toString(),
                marginLeft: "7rem",
                border: "1px solid",
              }}
            ></Fab>
          </Tippy>
        </Grid>
      ) : (
        <></>
      )}
    </>
  );
}
