import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import { Box, Button, IconButton } from "@mui/material";
import {
  IProposalAction,
  IProposalOption,
} from "@pages/dao/[id]/proposal/create";
import * as React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";

import useDidMountEffect from "@components/utilities/hooks";
import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import DraggableCard, { DraggableHeader } from "./DraggableContent";
import { Add } from "@mui/icons-material";

// fake data generator
const getItems = (count: any) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (
  list: IProposalOption[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle,
  compact: boolean
) => ({
  // some basic styles to make the items look a bit nicer
  // change background colour if dragging

  // styles we need to apply on draggables
  ...draggableStyle,
  backgroundColor: "fileInput.outer",
  color: "text.primary",
  borderRadius: ".3rem",
  my: "1rem",
  border: 1,
  borderColor: isDragging ? "primary.main" : "border.main",
  px: ".75rem",
  py: ".5rem",
});

const getListStyle = (
  isDraggingOver: boolean,
  compact: boolean,
  items: IProposalOption[]
) => ({
  backgroundColor: "background.default",
  padding: ".5rem",
  width: "100%",
  borderRadius: ".3rem",
});

const DraggableContext: React.FC<{ name: string }> = (props) => {
  const context = React.useContext<IProposalContext>(ProposalContext);
  const [compact, setCompact] = React.useState<boolean>(false);
  const [items, setItems] = React.useState<IProposalOption[]>(
    context.api.value.actions[0].options === undefined
      ? []
      : context.api.value.actions[0].options.sort((a, b) => a.rank - b.rank)
  );

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    setCompact(false);
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const tempItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(tempItems);
  };

  useDidMountEffect(() => {
    if (context.api.value.actions.length > 0) {
      setItems(context.api.value.actions[0].options);
    }
  }, [context.api.value.actions]);

  useDidMountEffect(() => {
    if (context.api.value.actions.length > 0) {
      setItems(context.api.value.actions[0].options);
    }
  }, [context.api.value.actions]);

  const compactContainerStyle = {
    border: 1,
    borderColor: "border.main",
    borderRadius: ".3rem",
    px: ".75rem",
    py: ".5rem",
    my: ".75rem",
  };

  const declineProposal: IProposalOption = {
    name: "Decline proposal",
    description:
      "If you do not agree with any of the provided options, choose this one.",
    data: undefined,
    rank: 2,
    default: true,
  };
  return (
    props.name !== undefined &&
    items !== undefined && (
      <>
        <DragDropContext
          onDragEnd={onDragEnd}
          onBeforeDragStart={() => {
            setCompact(true);
          }}
        >
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={getListStyle(snapshot.isDraggingOver, compact, items)}
              >
                {items.map((item: IProposalOption, index: number) => (
                  <>
                    <Draggable
                      key={`temp-index-${index}`}
                      draggableId={`temp-index-${index}`}
                      index={index}
                      isDragDisabled={items.length < 1}
                    >
                      {(_provided, snapshot) => {
                        return (
                          <Box
                            ref={_provided.innerRef}
                            {..._provided.draggableProps}
                            {..._provided.dragHandleProps}
                            sx={getItemStyle(
                              snapshot.isDragging,
                              _provided.draggableProps.style,
                              compact
                            )}
                          >
                            <DraggableHeader
                              compact={compact}
                              item={item}
                              index={index}
                              items={items}
                              snapshot={snapshot}
                            />
                            <DraggableCard
                              item={item}
                              index={index}
                              items={items}
                            />
                          </Box>
                        );
                      }}
                    </Draggable>
                  </>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Button
            startIcon={<Add />}
            size="small"
            onClick={() => {
              let temp = [...context.api.value.actions];
              temp[0].options.push({
                name: "",
                description: "",
                data: undefined,
                rank: temp[0].options.length + 1,
              });
              console.log(temp);
              context.api.setValue({
                ...context.api.value,
                actions: temp,
              });
            }}
          >
            Add Another
          </Button>
        </Box>
        <Box sx={{ ...getItemStyle(false, {}, compact), mx: ".5rem" }}>
          <DraggableHeader
            item={declineProposal}
            index={-1}
            items={items}
            compact={compact}
          />
          <DraggableCard item={declineProposal} index={-1} items={items} />
        </Box>
      </>
    )
  );
};

export default DraggableContext;
