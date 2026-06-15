import { useContext, useEffect } from "react";
import { genericAPI } from "../apis/genericAPI";
import AuthContext from "../context/AuthContext";
import Navigation from "../components/navigation/Navigation";
import Button from "../components/buttons/Button";
import Loader from "../components/modals/Loader";
import Alert from "../components/modals/Alert";
import Selectbox from "../components/inputs/Selectbox";
import useLoader from "../hooks/useLoader";
import useSelectItems from "../hooks/useSelectItems";
import { FaDownload } from "react-icons/fa";

export default function DataBackup() {
  const { authTokens } = useContext(AuthContext);
  const {
    toast, 
    setToast, 
    loading, 
    handleLoading,
    loadingMessage,
    setLoadingMessage,
  } = useLoader();
  const {
    setAccessToken, 
    setRoute, 
    selectionItems, 
    selected, 
    setSelected,
  } = useSelectItems();

  useEffect(() => {
    setAccessToken(authTokens.access);
    setRoute("/api/model-list");
  }, [selected]);

  return(
    <>
      <Loader show={loading} message={loadingMessage} />
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
              Backup ng Data
            </h2>


            <div className="flex flex-col gap-3 w-full sm:flex-row">
              <p>Pumili ng mga model na gusto i-backup.</p>
            </div>

            <Selectbox 
              items={selectionItems} 
              selected={selected} 
              setSelected={setSelected}
            />
            <Button 
              icon={<FaDownload />} 
              label={"I-download"} 
              onClick={() => {
                setLoadingMessage("Hinahanda ang iyong download");
                handleLoading({
                  api: genericAPI,
                  body: selected,
                  route: "/api/csv/multiple",
                  method: "POST",
                  authTokens: authTokens,
                  download: "citizens-charter-data-backup.zip",
                  messageSuccess: "CSV Backups nadownload",
                  messageFail: "CSV Backups di-nadownload",
                })
              }}
            />

            {toast && (
              <Alert 
                success={toast.success} 
                message={toast.message} 
                onClose={() => setToast(null)}
              />
            )}
          </div>
        </div>
      </div>
    </>    
  );
}