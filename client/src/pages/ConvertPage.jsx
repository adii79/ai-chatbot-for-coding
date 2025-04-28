import { useState } from 'react';
import Navbar from '../components/NavBar';
import SelectedFeature from "../components/SelectedFeature";

export default function ConvertCode() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          featureType: "convertCode",  // featureType for Convert
          userInput: code,
          extraInput: language
        }),
      });

      if (!res.ok) {
        console.log(res);
        throw new Error('Unauthorized or Server Error');
      }
      console.log(res);

      const data = await res.json();
      let aiText = data?.data?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (aiText) {
        aiText = aiText.replace(/\*\*(.*?)\*\*/g, '$1');
        setResponse(aiText);
      } else {
        setResponse('No valid response from AI.');
      }
      
    } catch (error) {
      console.error(error);
      setResponse('Error communicating with backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar selected="Convert" />
    <SelectedFeature featureName="Convert" />
    <div className="max-w-4xl my-1 mx-auto p-4">
      
      <h1 className="text-xl font-semibold mb-4">Code Conversion</h1>
      
      <textarea
        className="w-full p-2 border rounded-lg mb-4"
        rows={10}
        placeholder="Paste your code here"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <textarea
        className="w-full p-2 border rounded-lg mb-4"
        rows={2}
        placeholder="Enter the target language (e.g., Python, Java, C++)"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full p-2 rounded-lg text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
      >
        {loading ? 'Converting...' : 'Convert Code'}
      </button>

      <div className="mt-6">
        {loading && (
          <div className="flex justify-center mt-6">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500 border-solid"></div>
          </div>
        )}
        {response && !loading && (
          <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Converted Code:</h2>
            <pre className="whitespace-pre-wrap">{response}</pre>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
