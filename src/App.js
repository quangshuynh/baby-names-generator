import React from 'react';
import Header from './components/Header';
import NameForm from './components/NameForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex justify-center py-10">
        <NameForm />
      </main>
    </div>
  );
}

export default App;
