import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";

export default function SideNav() {
  return (
    <div className="menu">
      <div className="menu-links">
        <NavLinks />
      </div>
    </div>
  );
}
