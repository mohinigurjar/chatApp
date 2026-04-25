import { useChatStore } from "../store/chatStore";
import { isOnline } from "../utils/isOnline";
import Avatar from "./Avatar";

const UserRow = ({ user, onClick, lastMessage}) => {

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 active:bg-gray-200  transition-colors duration-150 rounded-lg"
    >
      {/* Avatar */}
      <Avatar name={user.username} isOnline={isOnline(user)}/>

      {/* User Info */}
      <div className="flex flex-col flex-1">
        <span className="text-sm font-medium text-gray-800">
          {user.username}
        </span>
        <span className="text-xs text-gray-500 truncate">
          {lastMessage || "Start chat"}
        </span>
      </div>
    </div>
  );
};

export default UserRow;