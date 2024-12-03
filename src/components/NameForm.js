import React, { useState } from 'react';
import axios from 'axios';

function NameForm() {
  const [ethnicity, setEthnicity] = useState('');
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateNames = async () => {
    if (!ethnicity) return alert('Please enter an ethnicity');
    setLoading(true);
    console.log(process.env.REACT_APP_OPENAI_API_KEY);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that generates baby names.',
            },
            {
              role: 'user',
              content: `Generate 5 unique baby names based on the ethnicity "${ethnicity}".`,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      const generatedNames = response.data.choices[0].message.content.split('\n').filter(Boolean);
      setNames(generatedNames);
    } catch (error) {
      console.error('Error generating names:', error);
      alert('Failed to generate names. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Find the Perfect Baby Name
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          generateNames();
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="ethnicity" className="block text-sm font-medium">
            Ethnicity
          </label>
          <input
            type="text"
            id="ethnicity"
            value={ethnicity}
            onChange={(e) => setEthnicity(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g., Japanese, Indian, African"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {loading ? 'Generating...' : 'Generate Names'}
        </button>
      </form>
      {names.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Generated Names:</h3>
          <ul className="list-disc pl-5 space-y-1">
            {names.map((name, index) => (
              <li key={index} className="text-gray-700">
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NameForm;
