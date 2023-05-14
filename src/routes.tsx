import React from "react";
import { RouteObject } from "react-router-dom";
import LayoutMain from "./layout/layout-main/LayoutMain";

export const homeRouter = [
  {
    path: "post-management",
    element: LayoutMain,
    children: [
      {
        path: "post-management",
        element: <LayoutMain />,
      },
      {
        path: "/post-management/:id",
        element: <LayoutMain />,
      },
    ],
  },
  {
    path: "setting-groups",
    element: LayoutMain,
  },
  {
    path: "organization-management",
    element: LayoutMain,
  },
  {
    path: "medal-management",
    element: LayoutMain,
  },
  {
    path: "admin-dashboard",
    element: LayoutMain,
  },
  {
    path: "manage-calender-room",
    element: LayoutMain,
  },
  {
    path: "activity-log",
    element: LayoutMain,
  },
  {
    path: "timesheet",
    element: LayoutMain,
  },
];

export const routesConfig: RouteObject[] = [
  {
    path: "abc",
    element: <LayoutMain />,
    children: [
      {
        path: "corp-list",
        element: <LayoutMain />,
      },
      {
        path: "corp-list/:id",
        element: <LayoutMain />,
      },
    ],
  },
];
