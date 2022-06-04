import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import * as React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import dateFormat from "dateformat";
import { LikesDislikes } from "../proposals/ProposalCard";

export interface IComment {
  id: number;
  likes: number;
  dislikes: number;
  date: Date;
  username: string;
  img: string;
  comment: string;
  userSide: number;
  parent: number;
}

const _comments: IComment[] = [
  {
    id: 1,
    likes: 158,
    dislikes: 31,
    date: new Date(),
    parent: undefined,
    username: "Lily Evans",
    img: "",
    userSide: 1,
    comment:
      "Hey, my name is Lily & I think this should be upgraded to a proposal",
  },
  {
    id: 2,
    likes: 158,
    dislikes: 31,
    parent: undefined,
    date: new Date(),
    username: "Joaquin Cizzin",
    userSide: 1,
    img: "",
    comment: "Let's upgrade this to a proposal",
  },
  {
    id: 3,
    likes: 158,
    parent: undefined,
    dislikes: 31,
    date: new Date(),
    username: "John Daonnot",
    userSide: 0,
    img: "",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet fermentum sapien amet eu viverra facilisis nisl laoreet. Euismod adipiscing nam in pulvinar sed maecenas dolor, netus viverra. Id id elementum tortor gravida consequat convallis molestie vitae. Dignissim placerat blandit laoreet amet consectetur placerat aliquet eu, ullamcorper.",
  },
  {
    id: 4,
    parent: 2,
    likes: 4,
    dislikes: 3,
    userSide: undefined,
    date: new Date(),
    username: "Michael Mirandi",
    img: "",
    comment: "I agree with this!",
  },
  {
    id: 5,
    parent: 4,
    userSide: undefined,
    likes: 7,
    dislikes: 0,
    date: new Date(),
    username: "Joaquin Cizzin",
    img: "",
    comment: "Thanks michael!",
  },
];

const Comments: React.FC = () => {
  const [comments, setComments] = React.useState<IComment[]>(_comments);
  const setCommentsWrapper = (newComment: IComment) =>
    setComments([...comments, newComment]);
  return (
    <>
      <CapsInfo title="Post a comment" />
      <CommentInput length={comments.length} set={setCommentsWrapper} />
      <CapsInfo title="All comments" />
      {comments
        .sort((a: IComment, b: IComment) => b.date.getTime() - a.date.getTime())
        .filter((i: IComment) => i.parent == null)
        .map((i: any) => {
          return (
            <BaseComment
              comment={i}
              data={comments}
              key={`base-comment-${i.id}`}
              set={setCommentsWrapper}
            />
          );
        })}
    </>
  );
};

const CommentInput: React.FC<{
  set: Function;
  length: number;
  parent?: number;
  level?: number;
}> = (props) => {
  const [value, setValue] = React.useState<string>("");

  return (
    <Box
      sx={{
        pl: props.level === undefined ? "0rem" : `${props.level * 2.5}rem`,
        mt: props.level === undefined ? 0 : ".5rem",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          backgroundColor: "fileInput.main",
          pt: ".25rem",
          pl: ".5rem",
          borderRadius: "1px solid",
          pr: "1.5rem",
          mb: "1.5rem",
        }}
      >
        <InputBase
          sx={{ ml: ".5rem", flex: 1, pb: "1rem", width: "100%", pt: ".5rem" }}
          placeholder="Type something to leave a comment"
          multiline
          value={value}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => setValue(e.target.value)}
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            pb: ".5rem",
          }}
        >
          <Box
            sx={{
              ml: "auto",
              display: "flex",
              alignItems: "center",
              mr: "-.5rem",
            }}
          >
            <IconButton sx={{ mr: ".5rem" }}>
              <TagFacesIcon color="primary" />
            </IconButton>
            <IconButton sx={{ mr: "1rem" }}>
              <AttachFileIcon color="primary" />
            </IconButton>
            <Button
              variant="contained"
              onClick={() => {
                props.set({
                  id: props.length + 1,
                  parent: props.parent,
                  userSide: undefined,
                  likes: 0,
                  dislikes: 0,
                  date: new Date(),
                  username: "Current User",
                  img: "",
                  comment: value,
                });
                setValue("");
              }}
            >
              Publish
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

const BaseComment: React.FC<{
  comment: IComment;
  data: any[];
  set?: Function;
  level?: number;
}> = (props) => {
  const children = props.data.filter(
    (i: IComment) => i.parent === props.comment.id
  );
  const level = props.level;
  const [reply, setReply] = React.useState<boolean>(false);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          mt: "1rem",
          mb: "1rem",
          pl: props.level === undefined ? 0 : `${level * 2.5}rem`,
          fontSize: ".9rem",
        }}
      >
        <Box sx={{ width: "100%", display: "flex", mr: ".5rem" }}>
          <Box sx={{ width: "8%", display: "flex", alignItems: "center" }}>
            <Avatar src={props.comment.img} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {props.comment.username}
          </Box>
          <Box sx={{ ml: "auto", color: "text.light" }}>
            {dateFormat(props.comment.date, "mmmm dS, yyyy @ h:MM TT")}
          </Box>
        </Box>
        <Box sx={{ width: "100%", display: "flex", mr: ".5rem" }}>
          <Box
            sx={{ width: "8%", display: "flex", alignItems: "center" }}
          ></Box>
          <Box sx={{ display: "flex", alignItems: "center", width: "92%" }}>
            {props.comment.comment}
          </Box>
        </Box>
        <Box sx={{ display: "flex", width: "100%", mt: ".5rem" }}>
          <Box
            sx={{ width: "7%", display: "flex", alignItems: "center" }}
          ></Box>
          {!reply && <Button onClick={() => setReply(true)}>Reply</Button>}
          <Box sx={{ ml: "auto" }}>
            <LikesDislikes
              likes={props.comment.likes}
              dislikes={props.comment.dislikes}
              userSide={props.comment.userSide}
            />
          </Box>
        </Box>
        {reply && (
          <CommentInput
            parent={props.comment.id}
            length={props.data.length}
            set={(newComment: IComment) => {
              props.set(newComment);
              setReply(false);
            }}
            level={level === undefined ? 1 : level + 1}
          />
        )}
      </Box>
      {children.length >= 0 &&
        children.map((i: IComment) => (
          <BaseComment
            key={`child-comment-${level === undefined ? 1 : level + 1}-${
              props.comment.id
            }`}
            comment={i}
            data={props.data}
            level={level === undefined ? 1 : level + 1}
            set={props.set}
          />
        ))}
    </>
  );
};

export default Comments;