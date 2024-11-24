import React, { useEffect, useState } from "react";
import SummaryApi from "../common/commonApi";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUerRole from "../components/ChangeUerRole";

const AllUsers = () => {
  const [userData, setUserData] = useState([]);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateUserDetails,setUpdateUserDetails] = useState({
    userName : "",
    email : "",
    role : "",
    _id : ""
  })

  const fetchUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUsers.url, {
      credentials: "include",
    });
    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setUserData(dataResponse.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <table className="w-full userTable">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((val, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{val?.userName}</td>
              <td>{val?.email}</td>
              <td>{val?.role}</td>
              <td>{moment(val?.createdAt).format("ll")}</td>
              <td className="py-1">
                <button
                  className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                  onClick={() => {
                    setUpdateUserDetails(val)
                    setOpenUpdate(true)
                }}>
                  <MdModeEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openUpdate ? (
        <ChangeUerRole 
        onClose={() => setOpenUpdate(false)}
        userName={updateUserDetails.userName}
        email={updateUserDetails.email}
        role={updateUserDetails.role}
        userId={updateUserDetails._id}
        callAllUsers={fetchUsers}
        />
      ) : null}
    </div>
  );
};

export default AllUsers;
