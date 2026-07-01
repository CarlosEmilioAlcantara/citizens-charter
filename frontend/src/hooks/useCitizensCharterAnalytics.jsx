import { useState } from "react";
import useAnalytics from "./useAnalytics";

export default function useCitizensCharterAnalytics(accessToken) {
  const [serviceOrder, setServiceOrder] = useState("most");
  const {serviceAnalytics} = useAnalytics({
    name: "serviceAnalytics",
    route: `/api/service-analytics/${serviceOrder}`,
    accessToken: accessToken,
  });

  const [requirementOrder, setRequirementOrder] = useState("most");
  const {requirementAnalytics} = useAnalytics({
    name: "requirementAnalytics",
    route: `/api/requirement-analytics/${requirementOrder}`,
    accessToken: accessToken,
  });

  const [stepOrder, setStepOrder] = useState("most");
  const {stepAnalytics} = useAnalytics({
    name: "stepAnalytics",
    route: `/api/step-analytics/${stepOrder}`,
    accessToken: accessToken,
  });

  const [priceOrder, setPriceOrder] = useState("most");
  const {priceAnalytics} = useAnalytics({
    name: "priceAnalytics",
    route: `/api/price-analytics/${priceOrder}`,
    accessToken: accessToken,
  });

  const [timeOrder, setTimeOrder] = useState("most");
  const {timeAnalytics} = useAnalytics({
    name: "timeAnalytics",
    route: `/api/time-analytics/${timeOrder}`,
    accessToken: accessToken,
  });

  return {
    setServiceOrder,
    serviceAnalytics,
    setRequirementOrder,
    requirementAnalytics,
    setStepOrder,
    stepAnalytics,
    setPriceOrder,
    priceAnalytics,
    setTimeOrder,
    timeAnalytics,
  }
}