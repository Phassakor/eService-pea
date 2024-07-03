"use client";
import { lazy, LazyExoticComponent } from "react";
import { useParams } from "next/navigation";
import { useServiceFormList } from '@/hooks/api/useRequestApi';
import {ServiceFormProps} from '@/Interfaces/propsInterface'
type Components = {
  [key: string]: LazyExoticComponent<React.ComponentType<ServiceFormProps>>;
};
const components: Components = {
  S328: lazy(() => import(`../ServiceFormS328`)),
  S327: lazy(() => import(`../ServiceFormS327`)),
  S322: lazy(() => import(`../ServiceFormS322`)),
  S320: lazy(() => import(`../ServiceFormS320`)),
  S313: lazy(() => import(`../ServiceFormS313`)),
  S312: lazy(() => import(`../ServiceFormS312`)),
  S308: lazy(() => import(`../ServiceFormS308`)),
  S309: lazy(() => import(`../ServiceFormS309`)),
  S306: lazy(() => import(`../ServiceFormS306`)),
  S304: lazy(() => import(`../ServiceFormS304`)),
  S303: lazy(() => import(`../ServiceFormS303`)),
  S302: lazy(() => import(`../ServiceFormS302`)),
  S305: lazy(() => import(`../ServiceFormS305`)),
  S307: lazy(() => import(`../ServiceFormS307`)),
  S301: lazy(() => import(`../ServiceFormS301`)),
  S310: lazy(() => import(`../ServiceFormS310`)),
  S316: lazy(() => import(`../ServiceFormS316`)),
  S318: lazy(() => import(`../ServiceFormS318`)),
  S317: lazy(() => import(`../ServiceFormS317`)),
  S315: lazy(() => import(`../ServiceFormS315`)),
  S314: lazy(() => import(`../ServiceFormS314`)),
  S311: lazy(() => import(`../ServiceFormS311`)),
  S319: lazy(() => import(`../ServiceFormS319`)),
  S323: lazy(() => import(`../ServiceFormS323`)),
  S399: lazy(() => import(`../ServiceFormS399`)),
  S329: lazy(() => import(`../ServiceFormS329`)),
  S321: lazy(() => import(`../ServiceFormS321`)),
};

const NotFoundPage = () => {
  return <h3>404 Page not found</h3>;
};

const LayoutForm = () => {
  const params = useParams();
 const page = params.id.toString().toUpperCase()
  const excludedPages = ["S310", "S314", "S316", "S317", "S319", "S321", "S399"];
  let serviceFormId;
  if (!excludedPages.includes(page)) {
      serviceFormId = useServiceFormList(`${params.id}`);
  }
  const DynamicComponent = components[page] || NotFoundPage;
  return (
    <>
      <DynamicComponent serviceId={serviceFormId || ""} />
    </>
  );
};

export default LayoutForm;
