/* eslint-disable react/prop-types */
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins.js";

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

function CabinRow({ id, name, maxCapacity, regularPrice, discount, image }) {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      alert("cabin is succesfullu deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => alert(err.message),
  });

  return (
    <TableRow>
      <Img src={image} alt={name} />
      <Cabin>{name}</Cabin>
      <p>fits up to {maxCapacity} guests</p>
      <Price>{formatCurrency(regularPrice)} USD</Price>
      <Discount>{discount}% off</Discount>
      <button disabled={isPending} onClick={() => mutate(id)}>
        Delete
      </button>
      {/* <Price>{regularPrice - (regularPrice * discount / 100)} USD</Price>  Calculating discounted price */}
    </TableRow>
  );
}

export default CabinRow;
