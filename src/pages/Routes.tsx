import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { PATHS } from "./paths";

import { useGetUserRouteState } from "../store/redux-store/slices/user/user.hooks";

import { useAuth } from "../hooks";

import { getRoutes } from "../utils/Routes";

import { Role } from "../shared/enums";

import { Welcome, Auth, Configuration, NotFound } from "./index";
import Layout from "../Layout";

const Routing: React.FC = () => {
  const { id, isConfigured, role } = useGetUserRouteState();
  const { autoLogin, autoLogout } = useAuth();

  let routes;
  const isRouteWithLayout = !!id;

  useEffect(() => {
    autoLogin();
  }, [autoLogin]);

  useEffect(() => {
    autoLogout();
  }, [autoLogout, id]);

  if (id) {
    if (!isConfigured) {
      routes = (
        <>
          <Route path={PATHS.CONFIGURATION} element={<Configuration />} />
          <Route path={PATHS.notFound} element={<Configuration />} />
        </>
      );
    }
    if (role === Role.trainer && isConfigured) {
      routes = getRoutes(Role.trainer);
    }
    if (role === Role.user && isConfigured) {
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
