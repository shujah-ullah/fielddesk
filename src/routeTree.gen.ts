/* eslint-disable */
import { Route as rootRouteImport } from "./routes/__root";
import { Route as IndexRouteImport } from "./routes/index";
import { Route as FeedbackRouteImport } from "./routes/feedback";
import { Route as HvacRouteImport } from "./routes/hvac";
import { Route as MotorRouteImport } from "./routes/motor";
import { Route as ServiceRouteImport } from "./routes/service";
import { Route as VoltageDropRouteImport } from "./routes/voltage-drop";
import { Route as WireRouteImport } from "./routes/wire";

const IndexRoute = IndexRouteImport.update({ id: "/", path: "/", getParentRoute: () => rootRouteImport } as any);
const FeedbackRoute = FeedbackRouteImport.update({ id: "/feedback", path: "/feedback", getParentRoute: () => rootRouteImport } as any);
const HvacRoute = HvacRouteImport.update({ id: "/hvac", path: "/hvac", getParentRoute: () => rootRouteImport } as any);
const MotorRoute = MotorRouteImport.update({ id: "/motor", path: "/motor", getParentRoute: () => rootRouteImport } as any);
const ServiceRoute = ServiceRouteImport.update({ id: "/service", path: "/service", getParentRoute: () => rootRouteImport } as any);
const VoltageDropRoute = VoltageDropRouteImport.update({ id: "/voltage-drop", path: "/voltage-drop", getParentRoute: () => rootRouteImport } as any);
const WireRoute = WireRouteImport.update({ id: "/wire", path: "/wire", getParentRoute: () => rootRouteImport } as any);

export const routeTree = rootRouteImport._addFileChildren({
  IndexRoute,
  FeedbackRoute,
  HvacRoute,
  MotorRoute,
  ServiceRoute,
  VoltageDropRoute,
  WireRoute,
});
