import { useEffect, useState } from "react";
import { doc, getDoc, collection } from "firebase/firestore";
import { db, app } from "../firebase.js";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";

const ChatLoad = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const [fetchedChat, setFetchedChat] = useState("");
  const [dataFetched, setDataFetched] = useState(false);

  const backButtonHandler = () => {
    navigate(`/profile/${auth.currentUser.displayName}`);
  };

  const loadUserChatHistory = async (userId) => {
    if (userId) {
      console.log("current user : " + userId.displayName);
      console.log("current uid : " + userId.uid);

      try {
        const documentRef = doc(
          db,
          `userChatHistory/${userId.uid}/chats/chatDocumentId`
        );

        const documentSnapshot = await getDoc(documentRef);

        if (documentSnapshot.exists()) {
          const chatData = documentSnapshot.data();
          //   console.log(chatData);
          console.log(chatData.messages);
          setFetchedChat(chatData);
          setDataFetched(true);
        } else {
          console.log("Chat document does not exist");
        }
      } catch (error) {
        console.error("Error loading chat document:", error);
      }
    } else {
      console.log("user Not logged In");
    }
  };

  useEffect(() => {
    const auth = getAuth(app);
    const userId = auth.currentUser;
    loadUserChatHistory(userId);
  }, []);

  return (
    <>
      <h1>
        Older Chat For <span>{auth.currentUser.displayName}</span>
      </h1>
      <div>
        {dataFetched &&
          fetchedChat.messages.map((message, index) => (
            <div key={index}>
              <div
                className={`${
                  message.role === "human"
                    ? "response-tab"
                    : "response-tab-user"
                }`}
                key={index}
              >
                {message.role === "human" ? (
                  <p className="user-designation-human">
                    {" "}
                    <FaUser />
                  </p>
                ) : (
                  <p className="user-designation-human">
                    {" "}
                    <FaRobot />
                  </p>
                )}
                <span className="singleMessage">{message.content}</span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ChatLoad;
