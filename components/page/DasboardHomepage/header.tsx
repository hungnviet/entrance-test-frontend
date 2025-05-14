import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import InfoIcon from '@mui/icons-material/InfoOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
export function Header(){
    return(
        <header className="flex items-center justify-between border-b-1 p-4">
            <div className="flex items-center justify-center gap-2">
                <h1 className="text-2xl font-semibold">Overview</h1>
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <InfoIcon fontSize="small" />
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-black text-white rounded-md p-2">
                        <p className="text-xs p-0">Lead and contact engagement metrics</p>
                    </HoverCardContent>
                </HoverCard>
            </div>
            <div className="flex items-center gap-4">
                <a 
                    href="https://github.com" 
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <GitHubIcon fontSize="small" />
                </a>
                <a 
                    href="https://twitter.com" 
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <TwitterIcon fontSize="small" />
                </a>
            </div>
        </header>
    )
}