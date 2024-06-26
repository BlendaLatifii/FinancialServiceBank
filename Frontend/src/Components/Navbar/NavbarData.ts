import React from 'react';
import { NavItem } from '../../interfaces/nav-item';



export const SidebarData : NavItem[] = [
  {
    title: 'Dashboard',
    path: '/Dashboard',
    icon: '',
    className: 'nav-text background:var(--color-primary)'
  },
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
    title:'Client',
    path:'/ClientTable',
    icon:'',
    className: 'nav-text background:var(--color-primary)'
  },
  {
    title:'Client Bank Account',
    path:'/ClientAccountTable',
    icon:'',
    className: 'nav-text background:var(--color-primary)'
  },
  {
    title:'Transaction',
    path:'/TransactionTable',
    icon:'',
    className: 'nav-text background:var(--color-primary)'
  },
  {
    title:'Credit Cards',
   path:'/CreditCardsTable',
     icon:'',
     className: 'nav-text background:var(--color-primary)'
   },
   {
    title:'Types Of Credit Cards',
   path:'/TypesOfCreditCardsTable',
     icon:'',
     className: 'nav-text background:var(--color-primary)'
   },
  {
    title:'Loan',
    path:'/LoanTable',
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
  }
];