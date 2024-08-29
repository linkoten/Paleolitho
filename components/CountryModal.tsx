import React, { useState } from "react";

const CountryModal = ({ isOpen, onClose, onSelectCountry }: any) => {
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleCountryChange = (event: any) => {
    setSelectedCountry(event.target.value);
  };

  const handleSubmit = () => {
    onSelectCountry(selectedCountry);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl mb-4">Sélectionnez votre pays de résidence</h2>
        <select
          value={selectedCountry}
          onChange={handleCountryChange}
          className="mb-4 p-2 border"
        >
          <option value="">Sélectionnez un pays</option>
          <option value="FR">France</option>
          <option value="DE">Allemagne</option>
          <option value="ES">Espagne</option>
          {/* Ajoutez d'autres pays ici */}
        </select>
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 p-2 bg-gray-300 rounded">
            Annuler
          </button>
          <button onClick={handleSubmit} className="p-2 bg-blue-500 text-white rounded">
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountryModal;