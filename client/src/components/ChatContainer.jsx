import {
  ArrowBack,
  AttachFile,
  DoneAll,
  Send,
  Telegram,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
`;

const TopBar = styled.div`
  height: 70px;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  display: flex;
  align-items: center;
  padding: 0px 16px;
  @media (max-width: 800px) {
    height: 60px;
    padding: 0px 16px 0px 6px;
  }
`;

const Chat = styled.div`
  flex: 1;
  overflow-y: scroll;
  padding: 20px 6px;
  background-color: ${({ theme }) => theme.chat_background};
  @media (max-width: 800px) {
    padding: 20px 0;
  }
`;

const RecievedMessage = styled.p`
  margin: 16px 16px 0 16px;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.recieve_message};
  border-radius: 12px;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  max-width: 70%;
  width: fit-content;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  position: relative;
  &:after {
    content: "";
    position: absolute;
    visibility: visible;
    top: 0px;
    left: -10px;
    border: 10px solid transparent;
    border-top: 10px solid ${({ theme }) => theme.recieve_message};
    clear: both;
  }
`;

const SentMessage = styled.p`
  margin: 16px 16px 0 auto;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.send_message};
  border-radius: 12px 0px 12px 12px;
  color: ${({ theme }) => theme.send_message_text_color};
  font-size: 14px;
  max-width: 70%;
  width: fit-content;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.4);
  position: relative;
  &:after {
    content: "";
    position: absolute;
    visibility: visible;
    top: 0px;
    right: -10px;
    border: 10px solid transparent;
    border-top: 10px solid ${({ theme }) => theme.send_message};
    clear: both;
  }
`;

const Time = styled.span`
  font-size: 12px;
  padding: 10px 16px;
  color: ${({ theme }) => theme.soft2};
  margin: 0 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  ${({ message }) =>
    message === "recieved" &&
    `
        justify-content: flex-start;
    `}
`;

const SendMessage = styled.div`
  min-height: 70px;
  border-top: 1px solid ${({ theme }) => theme.soft};
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 10px;
  @media (max-width: 800px) {
    position: fixed;
    background-color: ${({ theme }) => theme.card};
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    gap: 6px;
    padding: 0 2px;
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  gap: 4px;
`;

const Name = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`;

const Status = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.text};
`;

const MessageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 12px;
  padding: 16px 8px;
`;

const Message = styled.input`
  border: none;
  flex: 1;
  height: 100%;
  width: 100%;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  padding: 0 16px;
  &:focus {
    outline: none;
  }
`;

const ChatContainer = ({ showChat, setShowChat, messages }) => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 768;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  return (
    <Container>
      <TopBar>
        {width < breakpoint && (
          <IconButton
            style={{ color: "inherit" }}
            onClick={() => setShowChat(false)}
          >
            <ArrowBack sx={{ width: "24px", height: "24px" }} />
          </IconButton>
        )}
        <Avatar sx={{ width: "46px", height: "46px" }} />
        <Profile>
          <Name>John Doe</Name>
          <Status>Online</Status>
        </Profile>
      </TopBar>
      <Chat>
        {messages.map((msg, index) => (
          <React.Fragment key={index}>
            {msg.type === "received" ? (
              <>
                <RecievedMessage>{msg.text}</RecievedMessage>
                <Time message="received">
                  <b>{msg.time}</b>{" "}
                  <DoneAll sx={{ width: "18px", height: "18px" }} />
                </Time>
              </>
            ) : (
              <>
                <SentMessage>{msg.text}</SentMessage>
                <Time message="sent">
                  <b>{msg.time}</b>
                  <DoneAll />
                </Time>
              </>
            )}
          </React.Fragment>
        ))}
        <div ref={messagesEndRef} />
      </Chat>
      <SendMessage>
        <IconButton style={{ color: "inherit", marginBottom: "6px" }}>
          <AttachFile sx={{ height: "28px", width: "28px" }} />
        </IconButton>
        <MessageBox>
          <Message placeholder="Type a message" />
        </MessageBox>
        <IconButton style={{ color: "inherit", marginBottom: "6px" }}>
          <Telegram sx={{ height: "30px", width: "30px" }} />
        </IconButton>
      </SendMessage>
    </Container>
  );
};

export default ChatContainer;
