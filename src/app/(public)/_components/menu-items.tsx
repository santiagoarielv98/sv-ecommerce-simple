import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { adminNav, authenticatedNav, guestNav } from "@/config/nav";

export interface MenuItemProps {
  onClose?: () => void;
}

export const GuestMenuItems = ({ onClose }: MenuItemProps) => {
  return (
    <>
      {guestNav.map((nav, index) => (
        <MenuItem
          key={index}
          component={Link}
          href={nav.href}
          onClick={onClose}
        >
          {nav.title}
        </MenuItem>
      ))}
    </>
  );
};

export const LogoutItem = ({ onClick }: { onClick?: () => void }) => {
  return (
    <MenuItem
      onClick={() => {
        signOut();
        onClick?.();
      }}
    >
      Sign out
    </MenuItem>
  );
};

export const AdminMenuItems = ({ onClose }: MenuItemProps) => {
  return (
    <>
      {adminNav.map((nav, index) => (
        <MenuItem
          key={index}
          component={Link}
          href={nav.href}
          onClick={onClose}
        >
          {nav.title}
        </MenuItem>
      ))}
      <LogoutItem onClick={onClose} />
    </>
  );
};

export const AuthenticatedMenuItems = ({ onClose }: MenuItemProps) => {
  return (
    <>
      {authenticatedNav.map((nav, index) => (
        <MenuItem
          key={index}
          component={Link}
          href={nav.href}
          onClick={onClose}
        >
          {nav.title}
        </MenuItem>
      ))}
      <LogoutItem />
    </>
  );
};
