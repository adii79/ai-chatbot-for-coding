import { useState } from 'react';
import Navbar from '../components/NavBar' 


export default function TestCasesPage() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('Python');
  const [testCases, setTestCases] = useState('');
  const [isTestCaseLoading, setIsTestCaseLoading] = useState(false);

  const generateTestCases = async () => {
    setIsTestCaseLoading(true);
    try {
      const res = await fetch('/api/generate-test-cases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });
      const data = await res.json();
      setTestCases(data.testCases);
    } catch (error) {
      setTestCases('Error generating test cases.');
    } finally {
      setIsTestCaseLoading(false);
    }
  };

  return (
    <>
     <Navbar selected="TestCases" ></Navbar> 
    <div className="max-w-4xl mx-auto my-10 p-4">
      <h1 className="text-xl font-semibold mb-4">Test Case Generation</h1>

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

      {/* Generate Test Cases Button */}
      <button
        onClick={generateTestCases}
        disabled={isTestCaseLoading}
        className="w-full p-2 bg-green-600 text-white rounded-lg mb-4"
        >
        {isTestCaseLoading ? 'Generating Test Cases...' : 'Generate Test Cases'}
      </button>

      {/* Test Case Response */}
      {testCases && (
        <div className="border p-4 rounded-lg bg-gray-100">
          <h2 className="font-semibold">Generated Test Cases:</h2>
          <pre className="whitespace-pre-wrap">{testCases}</pre>
        </div>
      )}
    </div>
      </>
  );
}
