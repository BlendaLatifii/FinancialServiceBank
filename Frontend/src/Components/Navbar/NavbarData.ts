import React from 'react';
import { NavItem } from '../../interfaces/nav-item';



export const SidebarData : NavItem[] = [
  {

    title: 'Users',
    path: '/RegisterTable',
    icon: '',
    className: 'nav-text background:var(--color-primary)'
  },
  {
    title:'Bank Account',
    path:'/AccountTable',
    icon:'',
    className: 'nav-text background:var(--color-primary)'
  },
  {
    title:'Branch',
    path:'/BranchTable',
    icon:'',
    className: 'nav-text background:var(--color-primary)'
  },
  {
    title:'Contact Us',
    path:'/ContactTable',
    icon:'',
    className: 'nav-text background:var(--color-primary)'
  },
];