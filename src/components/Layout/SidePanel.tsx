import Link from "next/link";
import { MenuItem } from "@/config/menu";
import React from "react";
import clsx from "clsx";
import { useRouter } from "next/router";

interface SidePanelProps {
  items: MenuItem[];
}

const SidePanelItem: React.FC<MenuItem> = ({ Icon, label, href }) => {
  const { asPath } = useRouter();
  const active = asPath === href;
  return (
    <li>
      <Link
        href={href}
        className={clsx(
          active
            ? "text-theme-700 bg-gray-100 cursor-default"
            : "text-gray-700",
          "flex items-center flex-col py-4 space-y-2 hover:bg-gray-100"
        )}
      >
        <Icon className="w-7" />
        <p className="text-sm">{label}</p>
      </Link>
    </li>
  );
};

export const SidePanel: React.FC<SidePanelProps> = ({ items }) => (
  <aside
    className={`fixed top-16 left-0 bottom-0 w-24 bg-white border-r border-gray-200 shadow`}
  >
    <ul>
      {items.map((item) => (
        <SidePanelItem {...item} key={item.href} />
      ))}
    </ul>
  </aside>
);
