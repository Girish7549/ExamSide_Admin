import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilBook, cilCalendar, cilOptions, cilPlus, cilViewColumn, cilViewModule } from '@coreui/icons'
import {
  cilHome,
  cilUser,
  cilList,
  cilTag,
  cilGrid,
  cilFolder,
  cibGoogleAds,
  cibAdobeAcrobatReader,
  cibSignal,
  cilVideo,
  cilImage,
  cilStar,
  cilEnvelopeClosed,
  cilPhone,
  cilBrush,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },

  {
    component: CNavGroup,
    name: 'Category',
    icon: <CIcon icon={cilGrid} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Category List',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
        to: '/categorylist',
      },
      {
        component: CNavItem,
        name: 'Add Category',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
        to: '/addcategory',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Subcategory',
    icon: <CIcon icon={cilFolder} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Subcategory List',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
        to: '/subcategorylist',
      },
      {
        component: CNavItem,
        name: 'Add Subcategory',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
        to: '/addsubcategory',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Subject',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Subject List',
        icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
        to: '/subject',
      },
      {
        component: CNavItem,
        name: 'Add Subject',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
        to: '/addsubject',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Unit',
    icon: <CIcon icon={cibGoogleAds} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Unit List',
        icon: <CIcon icon={cibGoogleAds} customClassName="nav-icon" />,
        to: '/unitlist',
      },
      {
        component: CNavItem,
        name: 'Add Unit',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
        to: '/addunit',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Chapter',
    icon: <CIcon icon={cibSignal} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Chapter List',
        icon: <CIcon icon={cibSignal} customClassName="nav-icon" />,
        to: '/allchapter',
      },
      {
        component: CNavItem,
        name: 'Add Chapter',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
        to: '/addchapter',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Topic',
    icon: <CIcon icon={cibAdobeAcrobatReader} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Topic List',
        icon: <CIcon icon={cibAdobeAcrobatReader} customClassName="nav-icon" />,
        to: '/alltopics',
      },
      {
        component: CNavItem,
        name: 'Add Topic',
        icon: <CIcon icon={cibAdobeAcrobatReader} customClassName="nav-icon" />,
        to: '/addtopic',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Questions',
    icon: <CIcon icon={cilTag} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Questions List',
        icon: <CIcon icon={cilTag} customClassName="nav-icon" />,
        to: '/allquestions',
      },
      {
        component: CNavItem,
        name: 'Add Chapter Question',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
        to: '/addquestion',
      },
      {
        component: CNavItem,
        name: 'Add Shift Question',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
        to: '/addShiftQuestion',
      },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'Options',
  //   icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Options List',
  //       icon: <CIcon icon={cilOptions} customClassName="nav-icon" />,
  //       to: '/alladsbanner',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Add Option',
  //       icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
  //       to: '/addadsbanner',
  //     },
  //   ],
  // },
  {
    component: CNavGroup,
    name: 'Shift',
    icon: <CIcon icon={cilTag} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Shift List',
        icon: <CIcon icon={cilTag} customClassName="nav-icon" />,
        to: '/shift',
      },
      {
        component: CNavItem,
        name: 'Shift Subject List',
        icon: <CIcon icon={cilTag} customClassName="nav-icon" />,
        to: '/shift-subject',
      },
      {
        component: CNavItem,
        name: 'Add Shift',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
        to: '/add-shift',
      },
      {
        component: CNavItem,
        name: 'Add Shift Subject',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
        to: '/add-shift-subject',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Year',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    to: '/years',
  },
  {
    component: CNavItem,
    name: 'Admin',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    to: '/admin',
  },
  {
    component: CNavGroup,
    name: 'User',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Users List',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
        to: '/allusers',
      },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'Logo',
  //   icon: <CIcon icon={cilImage} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Logo List',
  //       icon: <CIcon icon={cilImage} customClassName="nav-icon" />,
  //       to: '/logo',
  //     },
  //   ],
  // },

  // {
  //   component: CNavGroup,
  //   name: 'Video',
  //   icon: <CIcon icon={cilVideo} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Video List',
  //       icon: <CIcon icon={cilVideo} customClassName="nav-icon" />,
  //       to: '/video',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Add Video',
  //       icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
  //       to: '/addvideo',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Color',
  //   icon: <CIcon icon={cilBrush} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Color List',
  //       icon: <CIcon icon={cilBrush} customClassName="nav-icon" />,
  //       to: '/colortheme',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Add Color',
  //       icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
  //       to: '/addcolortheme',
  //     },
  //   ],
  // },
]

export default _nav
