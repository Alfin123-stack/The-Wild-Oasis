import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddCabin from "../features/cabins/AddCabin";

function Cabins() {
  
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <Heading as="h2">Filter/Sort</Heading>
      </Row>

      <Row type="vertical">
        <CabinTable />
        <AddCabin/>
      </Row>
    </>
  );
}

export default Cabins;
