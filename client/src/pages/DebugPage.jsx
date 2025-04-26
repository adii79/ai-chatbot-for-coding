import { useState } from 'react'
import Navbar from '../components/NavBar'; 


export default function DebugPage() {
    const [code, setCode] = useState('')
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/debug', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            })
            const data = await res.json()
            setResponse(data.result)
        } catch (error) {
            setResponse('Error communicating with backend.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Navbar selected="Debug"></Navbar>
        
            <div className="max-w-4xl my-10 mx-auto p-4">
                <h1 className="text-xl font-semibold mb-4">Code Debugging</h1>
                <textarea
                    className="w-full p-2 border rounded-lg mb-4"
                    rows={10}
                    placeholder="Paste your code here"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Submit'}
                </button>

                <div className="mt-4">
                    {response && (
                        <div className="border-t mt-4 pt-2">
                            <h2 className="text-lg font-semibold">AI Response:</h2>
                            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">{response}</pre>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
