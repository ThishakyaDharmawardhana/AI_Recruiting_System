
import {
  LayoutDashboard,
  Calendar,
  List,
  WalletCards,
  Settings,
  Code2Icon,
  User2Icon,
  BriefcaseBusinessIcon,
  Puzzle,
} from "lucide-react"

import { Smile } from "lucide-react";
import { Users } from "lucide-react";


export const SideBarOptions=[
    {
        name:'Dashboard',
        icon:LayoutDashboard,
        path:'/dashboard'

    },
    {
        name:'Scheduled Interview',
        icon:Calendar,
        path:'/scheduled-interview'

    },
    {
        name:'All Interviews',
        icon:List,
        path:'/all-interviews'

    },
    {
        name:'Billing',
        icon:WalletCards,
        path:'/billing'

    },
    {
        name:'Settings',
        icon:Settings,
        path:'/settings'

    }
]

export const InterviewType=[
    {
        title: 'Technical',
        icon: Code2Icon
    },

    {
        title: 'Behavioral',
        icon: User2Icon
    },

    {
        title: 'Experience',
        icon: BriefcaseBusinessIcon
    },

    {
        title: 'Problem Solving',
        icon: Puzzle
    },

    {
        title: 'Leadership',
        icon: Users
    },

    {
        title: 'Confidence',
        icon: Smile
    }
]
