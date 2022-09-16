// import Blank from "./Blank";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  messagesApi,
  useGetMessagesQuery,
} from "../../../features/messages/messagesApi";
import Error from "../../ui/Error";
import Blank from "./Blank";
import ChatHead from "./ChatHead";
import Messages from "./Messages";
import Options from "./Options";

export default function ChatBody() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetMessagesQuery(id);

  const { data: messages, totalCount } = data || {};

  // decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <div className="h-[calc(100vh-10px)] flex items-center justify-center">
        <div class="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  } else if (!isLoading && isError) {
    content = (
      <div>
        <Error message={error?.data} />
      </div>
    );
  } else if (!isLoading && !isError && messages?.length === 0) {
    content = <Blank/>;
  } else if (!isLoading && !isError && messages?.length > 0) {
    content = (
      <>
        <ChatHead message={messages[0]} />
        <Messages messages={messages} totalCount={totalCount} />
        <Options info={messages[0]} />
      </>
    );
  }

  return (
    <div className="w-full lg:col-span-2 lg:block">
      <div className="w-full grid conversation-row-grid">{content}</div>
    </div>
  );
}
