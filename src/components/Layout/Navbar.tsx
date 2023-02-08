import { Menu, Transition } from "@headlessui/react";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import Image from "next/image";
import Logo from "public/logo.png";
import React from "react";

export const Navbar: React.FC<{
  picture: string | undefined | null;
  username: string | undefined | null;
  authLoading: boolean;
  logOut: () => void;
}> = ({ picture, username, logOut }) => (
  <nav
    className={`fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 shadow flex items-center px-4 z-10`}
  >
    <div className="flex justify-between w-full items-center">
      <Image src={Logo} alt="Logo" className="w-12 rounded-full ml-2" />
      <div className="">
        <Menu as="div" className="">
          <div>
            <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 p-1 space-x-1">
              <Image
                className="h-8 w-8 rounded-full"
                width={32}
                height={32}
                src={`data:image/png;base64,${picture}`}
                alt="identicon"
                unoptimized
              />
              <span>{username}</span>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-12 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      logOut();
                    }}
                    className="flex w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:cursor-pointer"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 mr-2" />
                    Signout
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  </nav>
);
