import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import Select from "../../ui/Select";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          {
            value: "all",
            label: "All",
          },
          {
            value: "no-discount",
            label: "No discount",
          },
          {
            value: "with-discount",
            label: "With discount",
          },
        ]}
      />
      <Select
        options={[
          {
            value: "name-asc",
            label: "Sort by name (A-Z)",
          },
          {
            value: "name-desc",
            label: "Sort by name (Z-A)",
          },
          {
            value: "maxCapacity-asc",
            label: "Sort by max capacity (low to high)",
          },
          {
            value: "maxCapacity-desc",
            label: "Sort by max capacity (high to low)",
          },
          {
            value: "regularPrice-asc",
            label: "Sort by price (low to high)",
          },
          {
            value: "regularPrice-desc",
            label: "Sort by price (high to low)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
