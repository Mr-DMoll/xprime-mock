import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 import useNavigate

function Settings() {
  const [adsEnabled, setAdsEnabled] = useState(true);
  const navigate = useNavigate(); // 👈 create navigate instance

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-8 md:p-16">
      {/* Back button */}
      <button 
        onClick={() => navigate(-1)} // 👈 go back to previous page
        className="mb-6 text-gray-400 hover:text-white flex items-center gap-2"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="space-y-8">
        {/* Account Preferences Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Account Preferences</h2>

          {/* Profile Picture */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-medium">Profile Picture</p>
              <p className="text-gray-400 text-sm">Update your profile picture using an Imgur link</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-700 flex items-center justify-center text-white text-lg">
                ^_^
              </div>
              <button className="px-4 py-1 border border-purple-700 text-purple-700 rounded hover:bg-purple-700 hover:text-white transition">
                Change
              </button>
            </div>
          </div>

          {/* Advertisements */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-medium">Advertisements</p>
              <p className="text-gray-400 text-sm">Toggle to disable all advertisements across the platform</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={adsEnabled}
                onChange={() => setAdsEnabled(!adsEnabled)}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-gray-700 rounded-full peer peer-checked:bg-purple-700 transition-all duration-300"></div>
              <div
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                  adsEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
              <span className="ml-3 text-sm">{adsEnabled ? 'On' : 'Off'}</span>
            </label>
          </div>

          {/* Watch History */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Watch History</p>
              <p className="text-gray-400 text-sm">Remove all watched content and reset your recommendations</p>
            </div>
            <button className="px-4 py-1 border border-purple-700 text-purple-700 rounded hover:bg-purple-700 hover:text-white transition">
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
