import { useState } from 'react';
import Navbar from '../components/NavBar';
import SelectedFeature from '../components/SelectedFeature';

export default function TestCasesPage() {
  const [code, setCode] = useState('');
  const [testCases, setTestCases] = useState('');
  const [loading, setLoading] = useState(false);

  const generateTestCases = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          featureType: "generateTestCases",  // featureType for Test Cases
          userInput: code
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
        setTestCases(aiText);
      } else {
        setTestCases('No valid response from AI.');
      }
      
    } catch (error) {
      console.error(error);
      setTestCases('Error communicating with backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar selected="TestCases" />
    <SelectedFeature featureName="Test Cases" />
    <div className="max-w-4xl my-1 mx-auto p-4">

      <h1 className="text-xl font-semibold mb-4">Generate Test Cases</h1>

      <textarea
        className="w-full p-2 border rounded-lg mb-4"
        rows={10}
        placeholder="Paste your code here"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />


      <button
        onClick={generateTestCases}
        disabled={loading}
        className={`w-full p-2 rounded-lg text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
      >
        {loading ? 'Generating Test Cases...' : 'Generate Test Cases'}
      </button>

      <div className="mt-6">
        {loading && (
          <div className="flex justify-center mt-6">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-solid"></div>
          </div>
        )}
        {testCases && !loading && (
          <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">Generated Test Cases:</h2>
            <pre className="whitespace-pre-wrap">{testCases}</pre>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
