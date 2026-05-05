import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";

const EditProfileModal = ({ isOpen, onClose }) => {
    const { currentUser, editUsername } = useAuthStore();
    const [newname, setNewname] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState("");

    useEffect(() => {
        if(isOpen){
            setNewname(currentUser?.username || "");
            setErrors("");
        }
    }, [isOpen, currentUser]);

    if(!isOpen) return null;

    const handleSave = async() => {
        if(!newname.trim()) return;

        if(newname.length <= 3){
            setErrors("Name must have at least 4 characters");
            return;
          }
          
        setLoading(true);
        setErrors("");

        try{
          await editUsername(newname);
          onClose();
        }catch(err){if(newname)
          console.log("Error updating profile: ", err)
        }finally{
          setLoading(false);
        }
    }


    return(
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      
      <div className="bg-white w-80 p-5 rounded-lg shadow-md">

        <h2 className="text-lg font-semibold mb-3">
          Edit Profile
        </h2>

        <input
          type="text"
          value={newname}
          onChange={(e) => setNewname(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
          placeholder="Enter username"
        />
        {errors && (
          <p className = "text-red-500 text-sm">{errors}</p>
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
            disabled={loading || !newname.trim()}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>

      </div>
    </div>
    )
}

export default EditProfileModal;