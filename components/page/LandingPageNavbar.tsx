import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/page/ModeToggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <header className="border-b bg-background w-full dark:border-slate-200 dark:bg-black flex justify-center">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6 ">
            <div className="flex items-center gap-6 md:gap-10">
                <Link href="/" className="flex items-center space-x-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M7.81815 8.36373L12 0L24 24H15.2809L7.81815 8.36373Z" fill="currentColor"></path><path d="M4.32142 15.3572L8.44635 24H-1.14809e-06L4.32142 15.3572Z" fill="currentColor"></path></g></svg>
                    <span className="font-bold">Acme</span>
                </Link>
                    <NavigationMenu>
                        <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Product</NavigationMenuTrigger>
                            <NavigationMenuContent>
                            <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                                <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <a
                                    className="flex flex-col h-full w-full justify-end rounded-md bg-gradient-to-b from-slate-50 to-slate-100 p-6 no-underline outline-none focus:shadow-md"
                                    href="/"
                                    >
                                    <div className="mb-2 mt-4 text-lg font-medium">
                                        Acme Platform
                                    </div>
                                    <p className="text-sm leading-tight text-muted-foreground">
                                        Everything you need to build your SaaS application
                                    </p>
                                    </a>
                                </NavigationMenuLink>
                                </li>
                                <ListItem href="/features" title="Features">
                                Core features and capabilities
                                </ListItem>
                                <ListItem href="/integrations" title="Integrations">
                                Connect with your favorite tools
                                </ListItem>
                                <ListItem href="/customers" title="Customers">
                                See who's using our platform
                                </ListItem>
                            </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                            <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                <ListItem href="/docs" title="Documentation">
                                Learn how to use our platform
                                </ListItem>
                                <ListItem href="/guides" title="Guides">
                                Step-by-step tutorials
                                </ListItem>
                                <ListItem href="/api" title="API Reference">
                                Technical documentation
                                </ListItem>
                                <ListItem href="/templates" title="Templates">
                                Ready-to-use templates
                                </ListItem>
                            </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/pricing"  >
                            <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                                Pricing
                            </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/blog"  >
                            <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                                Blog
                            </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/story"  >
                            <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                                Story
                            </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
            </div>
            <div className="flex items-center gap-2">
                <ModeToggle />
                <Button variant="ghost" asChild>
                    <Link href="/auth/signin">Log in</Link>
                </Button>
                <Button asChild>
                    <Link href="/auth/signup">Start for free</Link>
                </Button>
            </div>
        </div>
    </header>
  );
}

function ListItem({
  className,
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & {
  title: string;
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          href={href}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
}