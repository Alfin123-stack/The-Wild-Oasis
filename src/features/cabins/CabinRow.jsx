/* eslint-disable react/prop-types */
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers.js";
import CreateCabinForm from "./CreateCabinForm.jsx";
import useDeleteCabin from "./useDeleteCabin.js";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  // custom hooks
  const { isPending, deleteCabin } = useDeleteCabin();
  const { addCabin, isAdding } = useCreateCabin();

  function handleDuplicateCabin() {
    addCabin({
      name: name + " (copy)",
      maxCapacity,
      regularPrice,
      discount,
      image,
      // other fields can be added here
    });
  }

  return (
    <>
      <TableRow>
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <p>fits up to {maxCapacity} guests</p>
        <Price>{formatCurrency(regularPrice)} USD</Price>
        <Discount>{formatCurrency(discount)}</Discount>

        <div>
          <Modal>
            <button disabled={isAdding} onClick={handleDuplicateCabin}>
              <HiSquare2Stack />
            </button>

            {/* modal delete cabin */}
            <Modal.Open opens="delete">
              <button>
                <HiTrash />
              </button>
            </Modal.Open>
            <Modal.Window names="delete">
              <ConfirmDelete resourceName="cabins" disabled={isPending} onConfirm={()=> deleteCabin(id)} />
            </Modal.Window>

            {/* modal edit cabin */}
            <Modal.Open opens="edit">
              <button
                disabled={isPending}>
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.Window names="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
          </Modal>
        </div>
        {/* <Price>{regularPrice - (regularPrice * discount / 100)} USD</Price>  Calculating discounted price */}
      </TableRow>
    </>
  );
}

export default CabinRow;
