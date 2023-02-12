import {
  LockClosedIcon,
  PhotoIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import { locales } from "@/locales";
import { routes } from "@/routes";

export interface MenuItem {
  label: string;
  href: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const MENU = [
  {
    label: locales.profile,
    href: routes.profile,
    Icon: UserIcon,
  },
  {
    label: locales.nfts,
    href: routes.nfts,
    Icon: PhotoIcon,
  },
  {
    label: locales.tokenGated,
    href: routes.gated,
    Icon: LockClosedIcon,
  },
];
