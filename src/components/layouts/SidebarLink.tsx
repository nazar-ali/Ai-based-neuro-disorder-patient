// "use client";

// import Link from "next/link";
// import { LucideIcon } from "lucide-react";
// import { cn } from "@/utils";

// interface SidebarLinkProps {
//   href: string;
//   label: string;
//   icon: LucideIcon;
//   active?: boolean;
// }

// export function SidebarLink({ href, label, icon: Icon, active }: SidebarLinkProps) {
//   return (
//     <Link
//       href={href}
//       className={cn(
//         "flex items-center p-3 rounded-lg transition duration-200 ease-in-out",
//         active
//           ? "bg-[var(--primary-color)] text-white"
//           : "text-[var(--text-secondary)] hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)]"
//       )}
//     >
//       <Icon className="h-5 w-5" />
//       <span className="ml-4 font-medium">{label}</span>
//     </Link>
//   );
// }
