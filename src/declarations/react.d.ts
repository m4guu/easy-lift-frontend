import { FC, PropsWithChildren } from "react";

export declare module "react" {
  interface FCWithChildren<P = {}> extends FC<PropsWithChildren<P>> {}
}
