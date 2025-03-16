import { useState } from "react";
import AddWaterLink from "./AddWaterLink";
import WaterModal from "../../WaterModal/WaterModal";

const WaterTracker = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <AddWaterLink onClick={handleOpenModal} />
      {isModalOpen && (
        <WaterModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          operationType="add"
        />
      )}
    </div>
  );
};

export default WaterTracker;
