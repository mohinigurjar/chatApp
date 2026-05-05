import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import EditProfileModal from "./EditProfileModal";
import ChangePasswordModal from "./ChangePasswordModal";


const UserMenu = () => {
    const [open, setOpen] = useState(false); //controls dropdown visibility
    const [openEditProfileModal, setOpenEditProfileModal] = useState(false); //controls EditProfileModal visibility
    const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
    const menuRef = useRef();
    const { logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async() => {
        await logout();
        navigate("/login");
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(menuRef.current && !menuRef.current.contains(e.target)){
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    return(
        <div className="relative" ref={menuRef}>
            <button onClick={() => setOpen(prev => !prev)} className="text-xl cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="19" r="2" />
                </svg>
            </button>

            {open && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md transition-all duration-200">
                        <button 
                        onClick={() => {
                            setOpenEditProfileModal(true);
                            setOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover:rounded-lg">
                            Edit Profile
                        </button>
                        
                        <button 
                        onClick={() => {
                            setOpenChangePasswordModal(true);
                            setOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                            Change Password
                        </button>

                        <button onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 hover:rounded-lg">
                            Logout
                        </button>
                    </div>
            )}

            <EditProfileModal
            isOpen={openEditProfileModal}
            onClose={() => setOpenEditProfileModal(false)}/>
            <ChangePasswordModal
            isOpen={openChangePasswordModal}
            onClose={() => setOpenChangePasswordModal(false)}/>
        </div>
    )  
}

export default UserMenu;