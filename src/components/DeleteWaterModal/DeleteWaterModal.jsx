import css from './DeleteWaterModal.module.css';
import { deleteWater, updateWaterData } from '../../redux/water/operations';

import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';


const DeleteWaterModal = ({onRequestClose, water}) => {
    const dispatch = useDispatch();   
      const onDelete = async ()=>{
        try{
            await dispatch(deleteWater(water._id)).unwrap();
            dispatch(updateWaterData());
            toast.success('The amount of water consumed has been successfully deleted.');
            onRequestClose();
      }catch (error) {
        toast.error(error.message || 'Something went wrong. Please try again.');
      }
};
return(
    <div className={css.deleteModal}>
    <h2 className={css.modalDeleteTitle}>Delete Water Entry</h2>
    <p className={css.modalDeleteText}>Are you sure you want to delete this entry?</p>
    <div className={css.box}>
      <button type="button" className={css.deleteBtn} onClick={onDelete}>Delete</button>
      <button type="button" className={css.cancelBtn} onClick={onRequestClose}>Cancel</button>
    </div>
  </div>
);
};


export default DeleteWaterModal;
