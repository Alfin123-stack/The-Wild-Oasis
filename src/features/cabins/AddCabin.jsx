import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CabinTable from '../cabins/CabinTable'

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="form-cabin">
          <Button>Add Cabin</Button>
        </Modal.Open>
        <Modal.Window names="form-cabin">
          <CreateCabinForm />
        </Modal.Window>

        <Modal.Open opens="table-cabin">
          <Button>Show Cabin</Button>
        </Modal.Open>
        <Modal.Window names="table-cabin">
           <CabinTable/>
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal(!isOpenModal)}>
//         {isOpenModal ? "Hide Form" : "Add Cabin"}
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onClose={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
