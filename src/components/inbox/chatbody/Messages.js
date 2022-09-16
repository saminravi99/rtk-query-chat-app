import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { messagesApi } from "../../../features/messages/messagesApi";
import Message from "./Message";

export default function Messages({ messages = [], totalCount = 0 }) {
  const { id } = useParams();

  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();

  const fetchMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) {
      dispatch(
        messagesApi.endpoints.getMoreMessages.initiate({
          id,
          page,
        })
      );
    }
  }, [page, id, dispatch]);

  useEffect(() => {
    if (Number(totalCount) > 0) {
      const more =
        Math.ceil(
          Number(totalCount) / Number(process.env.REACT_APP_MESSAGES_PER_PAGE)
        ) > page;

      setHasMore(more);
    }
  }, [totalCount, page]);

  return (
    <>
      <div
        id="scrollable-div"
        className="relative w-full h-[calc(100vh-197px)] p-6 overflow-y-auto flex flex-col-reverse"
      >
        <InfiniteScroll
          dataLength={messages.length}
          next={fetchMore}
          inverse={true}
          hasMore={hasMore}
          style={{ display: "flex", flexDirection: "column-reverse", overflow: "hidden" }}
          scrollableTarget="scrollable-div"
          loader={
            <div className=" flex items-center justify-center">
              <div class="w-16 h-16  border-b-2 border-gray-900 rounded-full animate-spin"></div>
            </div>
          }
        >
          <ul className="space-y-2">
            {messages
              .slice()
              .sort((a, b) => a.timestamp - b.timestamp)
              .map((message) => {
                const { message: lastMessage, id, sender } = message || {};

                const justify = sender.email !== email ? "start" : "end";

                return (
                  <Message key={id} justify={justify} message={lastMessage} />
                );
              })}
          </ul>
        </InfiniteScroll>
      </div>
    </>
  );
}
