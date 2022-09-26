import { IComment } from "@components/dao/discussion/Comments";
import { AppApi } from "@lib/AppApi";
import { AbstractApi } from "@lib/utilities";
import { IDiscussion } from "@pages/dao/[id]/discussion/create";

interface ICommentPut {
  user_id: number;
  comment: string;
  parent: number;
}

export default class CommentsApi extends AbstractApi {
  api: AppApi;
  proposalId: number;

  constructor(api: AppApi, proposalId: number) {
    super();
    this.api = api;
    this.proposalId = proposalId;
  }

  commentData(comment: IComment): ICommentPut {
    let user_id = parseInt(localStorage.getItem("user_id"));
    return {
      user_id: user_id,
      comment: comment.comment,
      parent: comment.parent,
    };
  }

  publish(comment: IComment): Promise<any> | void {
    let data = this.commentData(comment);
    return this.put(
      `/proposals/comment/${this.proposalId}`,
      data,
      "Added comment"
    );
  }
}
