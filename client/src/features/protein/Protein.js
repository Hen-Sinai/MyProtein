import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { useGetProteinQuery } from "./proteinApiSlice";
import Navigation from "../../components/Navigation";
import ProteinsGrid from "./proteinsGrid/ProteinsGrid";
import "./Protein.css";
import Button from "react-bootstrap/Button";

const Protein = () => {
  const navigate = useNavigate();
  const {
    data: protein,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProteinQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  
  let content;

  if (isLoading) content = <Spinner />;

  if (isError) {
    toast.error(error);
  }

  if (isSuccess) {
    const { ids } = protein;

    content = (
      <>
        <Navigation />
        {
          ids.length > 0 ? 
          <ProteinsGrid cardsId={ids} /> :
          <h2> No Protein </h2>
        }
        <Button
          className="add_btn"
          onClick={() => navigate(`newProtein`)}
        >
          Add Protein
        </Button>
      </>
    );
  }

  return content;
};

export default Protein;
