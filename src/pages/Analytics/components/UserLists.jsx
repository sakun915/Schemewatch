import React, { useState } from "react";
import useUserLists from "../../../hooks/useUserLists";

const UserLists = () => {
  const { activeUsers, inactiveUsers } = useUserLists();
  const [showActive, setShowActive] = useState(false);
  const [showInactive, setShowInactive] = useState(false);

  return (
    <div className="space-y-6 mt-6">
      {/* Active Users Section */}
        <div className="bg-white rounded shadow p-4">
          <button
           onClick={() => setShowActive(!showActive)}
              className="w-full text-left text-lg font-semibold text-green-700 flex justify-between"
            >
              Active Users
              <span>{showActive ? "▲" : "▼"}</span>
            </button>
            {showActive && (
              <div className="mt-3">
                <div className="grid grid-cols-2 font-semibold text-gray-700 mb-2">
                  <div>Name</div>
                  <div>Role</div>
                </div>
                <ul className="space-y-2">
                  {activeUsers.map((user) => (
                    <li key={user.id} className="grid grid-cols-2 border-b pb-1">
                      <div>{user.fullName}</div>
                      <div>{user.role}</div>
                    </li>
                  ))}
                </ul>
              </div>
              )}
            </div>

        {/* Inactive Users Section */}
        <div className="bg-white rounded shadow p-4">
          <button
            onClick={() => setShowInactive(!showInactive)}
            className="w-full text-left text-lg font-semibold text-red-700 flex justify-between"
          >
            Inactive Users
            <span>{showInactive ? "▲" : "▼"}</span>
          </button>
          {showInactive && (
            <div className="mt-3">
              <div className="grid grid-cols-3 font-semibold text-gray-700 mb-2">
                <div>Name</div>
                <div>Role</div>
                <div>Last Active</div>
              </div>
              <ul className="space-y-2">
                {inactiveUsers.map((user) => (
                  <li key={user.id} className="grid grid-cols-3 border-b pb-1">
                    <div>{user.fullName}</div>
                    <div>{user.role}</div>
                    <div className="text-sm text-gray-500">{user.lastActive}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

    </div>
  );
};

export default UserLists;
