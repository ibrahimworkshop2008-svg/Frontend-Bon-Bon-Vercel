import React from "react";
import { useAuth } from "../ContextAuth/AuthProvider";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#172B4D]">
            You are not logged in
          </h1>

          <Link
            to="/login"
            className="mt-4 inline-block rounded-full bg-[#0878D1] px-6 py-3 text-white"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#F7FAFC] px-4 py-10">
      <div className="mx-auto max-w-3xl">

        {/* Profile Card */}
        <div className="rounded-3xl bg-white p-6 shadow-lg sm:p-10">

          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#0878D1] text-3xl font-bold text-white">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <h1 className="mt-4 text-2xl font-bold text-[#172B4D]">
              {user.name}
            </h1>

            <p className="text-sm text-gray-500">
              {user.email}
            </p>
          </div>

          {/* User Information */}
          <div className="mt-8 space-y-4">

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs text-gray-500">
                Full Name
              </p>

              <p className="mt-1 font-semibold text-[#172B4D]">
                {user.name}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs text-gray-500">
                Email
              </p>

              <p className="mt-1 font-semibold text-[#172B4D]">
                {user.email}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs text-gray-500">
                Account Type
              </p>

              <p className="mt-1 font-semibold capitalize text-[#172B4D]">
                {user.role || "User"}
              </p>
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <button
              onClick={logout}
              className="w-full rounded-full bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
            >
              Logout
            </button>

            <button
              className="w-full rounded-full bg-[#0878D1] py-3 font-semibold text-white transition hover:bg-[#006FBD]"
            >
              Edit Profile
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Profile;