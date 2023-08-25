import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chats/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chats/PotentialChats";
import ChatBox from "../components/chats/ChatBox";
import { useFetchRecipient } from "../hooks/useFetchRecipient"

const Chat = () => {

    const { user } = useContext(AuthContext);
    const { userChats, userChatsLoading, userChatsError, updateCurrentChat, currentChat } = useContext(ChatContext);
    const { recipientUser, error } = useFetchRecipient(currentChat, user);

    
    
    return ( 
        <Container>
            <PotentialChats />
            {userChats?.length < 1 ? null : (
                <Stack direction = "horizontal" gap = {4} className = "align-items-start">
                    <Stack className = "messages-box flex-grow-0 pe-3" gap = {3}>
                        {userChatsLoading && <p>Loading conversations..</p>}
                        {userChats?.map((chat, index) => {
                            
                            return(
                                
                                <div key = {index} onClick = {() => updateCurrentChat(chat)}>
                                    <UserChat chat = {chat} user = {user}/>
                                </div>
                            )
                        })}
                    </Stack>
                    <ChatBox recipientUser = {recipientUser} error = {error}/>
                </Stack>
            )}
        </Container>
    );
}

export default Chat;