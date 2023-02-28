import React from "react";
import { Routes, Route } from "react-router-dom";

import { useUserContext } from "../contexts/userContext";

import { getRoutes } from "../utils/Routes";

import { PATHS } from "./paths";
import { Role } from "../shared/enums";

import { Welcome, Auth, Configuration, NotFound } from "./index";
import Layout from "../Layout";

const Routing: React.FC = () => {
  const { user } = useUserContext();

  let routes;
  const isRouteWithLayout = !!user?.id && user?.isConfigured;

  if (user?.id) {
    if (!user?.isConfigured) {
      routes = (
        <>
          <Route path={PATHS.CONFIGURATION} element={<Configuration />} />
          <Route path={PATHS.notFound} element={<Configuration />} />
        </>
      );
    }
    if (user?.role === Role.trainer && user?.isConfigured) {
      routes = getRoutes(Role.trainer);
    }
    if (user?.role === Role.user && user?.isConfigured) {
      routes = getRoutes(Role.user);
    }
  } else {
    routes = (
      <>
        <Route path={PATHS.default} element={<Welcome />} />
        <Route path={PATHS.AUTH} element={<Auth />} />
        <Route path={PATHS.notFound} element={<NotFound />} />
      </>
    );
  }
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isRouteWithLayout ? (
        <Layout>
          <Routes>{routes}</Routes>
        </Layout>
      ) : (
        <Routes>{routes}</Routes>
      )}
    </>
  );
};

export default Routing;
