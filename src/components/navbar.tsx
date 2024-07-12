import * as React from "react"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { MenuIcon } from "lucide-react"


function Navbar() {
  return (
    <nav className="flex p-2 justify-between items-center">
      <div className="flex items-center gap-2">
        <Menubar className="bg-transparent border-0">
          <MenubarMenu>
            <MenubarTrigger>
              <MenuIcon size={24} />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem asChild>
                <Link href="/">
                  Home
                </Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <div>BMO SaaS Starter</div>
      </div>
      <UserButton />
    </nav>
  )
}

export default Navbar
