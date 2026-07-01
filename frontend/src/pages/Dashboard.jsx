import { useContext, useEffect, useState } from "react";
import { fetchAPI } from "../apis/fetchAPI";
import AuthContext from "../context/AuthContext";
import Navigation from "../components/navigation/Navigation"
import TableHeader from "../components/table/TableHeader";
import Table from "../components/table/Table";
import PageSizeSelector from "../components/table_controls/PageSizeSelector";
import EntriesCounter from "../components/table_controls/EntriesCounter";
import Pager from "../components/table_controls/Pager";
import TextArea from "../components/inputs/TextArea";
import usePaging from "../hooks/usePaging";
import useTableControls from "../hooks/useTableControls";
import { createTotalTime } from "../utils/createTotalTime";

export default function Dashboard() {
  const { authTokens } = useContext(AuthContext);
  const {
    accessToken,
    setAccessToken,
    route,
    setRoute,
    items,
    setItems,
    search,
    pageSize,
    setPageSize,
    ordering,
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

  useEffect(() => {
    setRoute("/api/office-analytics-list");
    setAccessToken(authTokens.access);
  }, [setRoute, setAccessToken, authTokens.access])

  const tableItems = Object.fromEntries(
    Object.entries(items).map(([key, data]) => [
      key,
      {...Object.fromEntries(
        Object.entries(data).map(([field, value]) => [
          field,
          (field === "number") ? (
            /\.00$/.test(value) ? 
              value.replace(/\.00$/, "") : 
              /\.([1-9])0$/.test(value) ? 
                value.replace(/\.([1-9])0$/, ".$1") : 
                value
          ) : (field === "name") ? (
            <TextArea 
              rowkey={key} 
              field={field} 
              value={value}
            />
          ) : (field === "total_requirement" && value === 0) ? (
            <span>None</span>
          ) : (field === "total_step" && value === null) ? (
            <span>No Hakbang</span>
          ) : (field === "total_price" && value === null) ? (
            <span>No Presyo</span>
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

  return(
    <div>
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
              Dashboard
            </h2>

            <div className="flex flex-col gap-3 w-full sm:flex-row">
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
                label={"#"} 
                order={"number"}
                setOrdering={setOrdering}
                onClick={closeControls}
              />,
              <TableHeader
                label={"Ngalan"} 
                order={"name"}
                setOrdering={setOrdering}
                onClick={closeControls}
              />,
              <TableHeader
                label={"Dami ng Kailangan"} 
                order={"total_requirement"}
                setOrdering={setOrdering}
                onClick={closeControls}
              />,
              <TableHeader
                label={"Dami ng Hakbang"} 
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
            analyticsList={true}
            hideID={true}
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
        </div>
      </div>
    </div>
  )
}