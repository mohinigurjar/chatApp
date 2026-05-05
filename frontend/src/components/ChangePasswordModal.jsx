import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore"

const ChangePasswordModal = ({isOpen, onClose}) => {
    const { currentUser, editPassword } = useAuthStore();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if(isOpen){
            setOldPassword("");
            setNewPassword("");
        }
    }, [isOpen]);

    if(!isOpen) return null;

    const handleSave = async() => {
        if (!oldPassword || !newPassword) return;
        if (newPassword.length < 6) return;

        try{
            setLoading(true);
            await editPassword(oldPassword, newPassword);
            onClose();
            setOldPassword("");
            setNewPassword("");
        }catch(error){
            const apiErrors = error?.response?.data?.errors || [];

            const formatted = {};
            apiErrors.forEach(err => {
                formatted[err.field] = err.message;
            });
            setErrors(formatted);
            // console.log("Error changing password: ", error);
        }finally{
            setLoading(false);
        }

    }
    return(
     <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-80 p-5 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3">Change Password</h2>

        <input
          type="password"
          placeholder="Old password"
          value={oldPassword}
          onChange={(e) => {
            setOldPassword(e.target.value);
            setErrors(prev => ({...prev, oldPassword: ""}));
          }}
          className="w-full border px-3 py-2 rounded mb-3"
        />
        {errors.oldPassword && (
            <p className="text-red-500 text-xs">{errors.oldPassword}</p>
        )}

        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setErrors(prev => ({...prev, newPassword: ""}));
          }}
          className="w-full border px-3 py-2 rounded mb-4"
        />
        {errors.newPassword && (
            <p className="text-red-500 text-xs">{errors.newPassword}</p>
        )}

        <div className="flex justify-end gap-2">

          <button 
            onClick={onClose} 
            className="px-3 py-1 text-gray-600"
        >
            Cancel
         </button>
          <button 
            onClick={handleSave} 
            disabled={loading || !oldPassword || !newPassword}
            className="px-3 py-1 bg-blue-500 text-white rounded" 
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
    )
}

export default ChangePasswordModal;