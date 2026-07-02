import { useContext, useEffect } from "react";
import { fetchAPI } from "../apis/fetchAPI";
import AuthContext from "../context/AuthContext";
import Navigation from "../components/navigation/Navigation";
import Search from "../components/inputs/Search";
import TableHeader from "../components/table/TableHeader";
import Table from "../components/table/Table";
import PageSizeSelector from "../components/table_controls/PageSizeSelector";
import EntriesCounter from "../components/table_controls/EntriesCounter";
import Pager from "../components/table_controls/Pager";
import BarGraph from "../components/graphs/BarGraph";
import usePaging from "../hooks/usePaging";
import useTableControls from "../hooks/useTableControls";
import useCitizensCharterAnalytics from "../hooks/useCitizensCharterAnalytics";
import { createTotalTime } from "../utils/createTotalTime";
import { formatPrice } from "../utils/formatPrice";

export default function Analytics() {
  const { authTokens } = useContext(AuthContext);
  const {
    accessToken,
    setAccessToken,
    route,
    setRoute,
    items,
    search,
    setSearch,
    pageSize,
    setPageSize,
    setOrdering,
    prev,
    next,
    count,
    currentPage,
    setCurrentPage,
    total,
    handlePaging,
  } = usePaging(fetchAPI)
  const {
    pageSizeSelector, 
    togglePageSizeSelector,
    closeControls,
  } = useTableControls();

  const {
    serviceOrder,
    setServiceOrder,
    serviceAnalytics,
    requirementOrder,
    setRequirementOrder,
    requirementAnalytics,
    stepOrder,
    setStepOrder,
    stepAnalytics,
    priceOrder,
    setPriceOrder,
    priceAnalytics,
    timeOrder,
    setTimeOrder,
    timeAnalytics,
    toggleOrder,
  } = useCitizensCharterAnalytics(accessToken);

  useEffect(() => {
    setRoute("/api/citizens-charter-analytics");
    setAccessToken(authTokens.access);
    console.log(
      serviceAnalytics,
      requirementAnalytics,
      stepAnalytics,
      priceAnalytics,
      timeAnalytics,
    )
  }, [setRoute, setAccessToken, authTokens.access, serviceAnalytics])

  const tableItems = Object.fromEntries(
    Object.entries(items).map(([key, data]) => [
      key,
      {...Object.fromEntries(
        Object.entries(data).map(([field, value]) => [
          field,
          (field === "total_service" && value === 0) ? (
            <span>No Serbisyo</span>
          ) : (field === "total_requirement" && value === null) ? (
            <span>None</span>
          ) : (field === "total_step" && value === null) ? (
            <span>No Hakbang</span>
          ) : (field === "total_price" && value === null) ? (
            <span>No Presyo</span>
          ) : (field === "total_price" && value !== null) ? (
            formatPrice(value)
          ) : (field === "total_time" && value === null) ? (
            <span>No Oras</span>
          ) : (field === "total_time" && value !== null) ? (
            createTotalTime(value)
          ) : (
            value
          )
        ])
      )}
    ])
  )

  return (
    <>
      <Navigation />
      <div className="
        flex 
        flex-col 
        justify-center 
        items-center
        mt-16 
        md:mt-5 
        md:ml-22
      ">
        <div className="
          flex 
          flex-col 
          w-[98%]
          gap-2
        ">
          <div className="flex flex-col items-start gap-2">
            <h2 
              className="text-sm font-bold md:text-xl"
            >
              Analytics ng Serbisyo ng mga Opisina
            </h2>

            <div className="flex flex-col gap-3 w-full sm:flex-row">
              <Search 
                placeholder={"Ngalan ng opisina"} 
                value={search} 
                setValue={setSearch}
              />

              <PageSizeSelector 
                label={pageSize} 
                setPageSize={setPageSize} 
                isOpen={pageSizeSelector}
                toggle={togglePageSizeSelector}
              />
            </div>
          </div>

          <Table 
            headers={[
              <TableHeader
                label={"Ngalan"} 
                order={"name"}
                setOrdering={setOrdering}
                onClick={closeControls}
              />,
              <TableHeader
                label={"Serbisyo No."} 
                order={"total_service"}
                setOrdering={setOrdering}
                onClick={closeControls}
              />,
              <TableHeader
                label={"Kailangan No."} 
                order={"total_requirement"}
                setOrdering={setOrdering}
                onClick={closeControls}
              />,
              <TableHeader
                label={"Hakbang No."} 
                order={"total_step"}
                setOrdering={setOrdering}
                onClick={closeControls}
              />,
              <TableHeader
                label={"Presyo"} 
                order={"total_price"}
                setOrdering={setOrdering}
                onClick={closeControls}
              />,
              <TableHeader
                label={"Haba"} 
                order={"total_time"}
                setOrdering={setOrdering}
                onClick={closeControls}
              />,
            ]}
            body={tableItems}
            citizensCharterAnalytics={true}
          />

          <div className="
            flex 
            flex-col 
            justify-between 
            items-center 
            p-3 
            gap-3
            md:flex-row
          ">
            <EntriesCounter
              total={total}
              count={count}
            /> 
            <Pager
              count={count}
              next={next}
              prev={prev}
              search={search}
              pageSize={pageSize}
              fetchItems={handlePaging}
              accessToken={accessToken}
              route={route}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>

          <BarGraph 
            label={"Mga opisina na may pinakamarami serbisyo"}
            data={serviceAnalytics}
            dataName={"total_service"}
            toggleOrder={() => toggleOrder(serviceOrder, setServiceOrder)}
          />

          <BarGraph 
            label={"Mga opisina na may pinakamarami kailangan"}
            data={requirementAnalytics}
            dataName={"total_requirement"}
            toggleOrder={() => toggleOrder(
              requirementOrder, 
              setRequirementOrder,
            )}
          />

          <BarGraph 
            label={"Mga opisina na may pinakamarami hakbang"}
            data={stepAnalytics}
            dataName={"total_step"}
            toggleOrder={() => toggleOrder(stepOrder, setStepOrder)}
          />

          <BarGraph 
            label={"Mga opisina na may pinakamahal na serbisyo"}
            data={priceAnalytics}
            dataName={"total_price"}
            toggleOrder={() => toggleOrder(priceOrder, setPriceOrder)}
          />

          <BarGraph 
            label={"Mga opisina na may pinakamahaba na serbisyo"}
            data={timeAnalytics}
            dataName={"total_time"}
            toggleOrder={() => toggleOrder(timeOrder, setTimeOrder)}
          />
        </div>
      </div>
    </>
  );
}