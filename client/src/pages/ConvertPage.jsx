import { useState } from 'react';
import Navbar from '../components/NavBar'; 

export default function ConvertCode() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('Python');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });
      const data = await res.json();
      setResponse(data.result);
    } catch (error) {
      setResponse('Error communicating with backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar selected="Convert"></Navbar>
    <div className="max-w-4xl my-10 mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Code Conversion</h1>

      {/* Code Input Area */}
      <textarea
        className="w-full p-2 border rounded-lg mb-4"
        rows={10}
        placeholder="Paste your code here"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        />

      {/* Language Selection */}
      <select
        className="w-full p-2 border rounded-lg mb-4"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        >
        <option value="Python">Python</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Java">Java</option>
        <option value="C++">C++</option>
        {/* Add more languages as needed */}
      </select>

      {/* Convert Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full p-2 bg-indigo-600 text-white rounded-lg mb-4"
        >
        {loading ? 'Converting...' : 'Convert Code'}
      </button>

      {/* Code Conversion Response */}
      {response && (
          <div className="border p-4 rounded-lg bg-gray-100">
          <h2 className="font-semibold">Converted Code:</h2>
          <pre className="whitespace-pre-wrap">{response}</pre>
        </div>
      )}
    </div>
      </>
  );
}
