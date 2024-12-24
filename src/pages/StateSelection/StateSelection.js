import React, { useState } from 'react';

const StateCard = ({ state, isSelected, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(state.code)}
      className={`w-full p-6 rounded-lg shadow-md transition-all duration-300 ${
        isSelected 
          ? 'bg-blue-600 text-white border-2 border-blue-700' 
          : 'bg-white hover:bg-gray-50 border border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold ${isSelected ? 'text-white' : 'text-gray-800'}`}>
            {state.name}
          </h3>
          <p className={`mt-2 ${isSelected ? 'text-blue-100' : 'text-gray-600'}`}>
            {state.isAvailable ? 'Available' : 'Coming Soon'}
          </p>
        </div>
        <div className="text-3xl font-bold">
          {state.code}
        </div>
      </div>
    </button>
  );
};

const StateSelection = () => {
  const [selectedState, setSelectedState] = useState('IL');
  const [searchTerm, setSearchTerm] = useState('');

  // Initial states data with Illinois as the primary state
  const states = [
    { code: 'IL', name: 'Illinois', isAvailable: true },
    { code: 'IN', name: 'Indiana', isAvailable: false },
    { code: 'WI', name: 'Wisconsin', isAvailable: false },
    { code: 'IA', name: 'Iowa', isAvailable: false },
    { code: 'MO', name: 'Missouri', isAvailable: false },
    // Additional states can be added here
  ];

  const filteredStates = states.filter(state =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    state.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStateSelect = (stateCode) => {
    const state = states.find(s => s.code === stateCode);
    if (state?.isAvailable) {
      setSelectedState(stateCode);
      // Here you would typically navigate to the next screen
      // navigation.navigate('TestSelection', { stateCode });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Select Your State
          </h1>
          <p className="text-lg text-gray-600">
            Choose your state to access CDL practice tests specific to your location
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search for your state..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* States grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStates.map((state) => (
            <StateCard
              key={state.code}
              state={state}
              isSelected={selectedState === state.code}
              onSelect={handleStateSelect}
            />
          ))}
        </div>

        {/* Info section */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Currently Available
          </h2>
          <p className="text-gray-600">
            Our platform currently offers comprehensive CDL test preparation for Illinois. 
            We're actively working on expanding to other states. Check back soon for updates!
          </p>
        </div>
      </div>
    </div>
  );
};

export default StateSelection;