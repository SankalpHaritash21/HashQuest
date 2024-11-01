import { useState } from "react";
import CryptoJS from "crypto-js";

function HashGenerator() {
  const [targetPrefix, setTargetPrefix] = useState("00000"); // Target hash prefix
  const [userPrefix, setUserPrefix] = useState(""); // User-provided prefix string
  const [algorithm, setAlgorithm] = useState("SHA256"); // Selected algorithm
  const [input, setInput] = useState(null);
  const [hash, setHash] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  let secretKey = 5;

  // Function to get the hash based on selected algorithm
  const getHash = (inputStr) => {
    switch (algorithm) {
      case "SHA1":
        return CryptoJS.SHA1(inputStr).toString();
      case "MD5":
        return CryptoJS.MD5(inputStr).toString();
      case "SHA256":
        return CryptoJS.SHA256(inputStr).toString();
      case "SHA512":
        return CryptoJS.SHA512(inputStr).toString();
      case "SHA3":
        return CryptoJS.SHA3(inputStr).toString();
      case "HMACSHA256":
        return CryptoJS.HmacSHA256(inputStr, secretKey).toString(); // Replace secretKey with your key
      case "HMACSHA512":
        return CryptoJS.HmacSHA512(inputStr, secretKey).toString(); // Replace secretKey with your key
      default:
        return CryptoJS.SHA256(inputStr).toString();
    }
  };

  // Function to find a hash with the given target prefix
  const findHashWithPrefix = () => {
    setIsGenerating(true);
    setInput(null);
    setHash(null);
    let foundInput = 0;

    const generateHash = () => {
      while (true) {
        // Add user-provided prefix to inputStr if it exists
        const inputStr = userPrefix
          ? userPrefix + foundInput.toString()
          : foundInput.toString();
        const generatedHash = getHash(inputStr);

        if (generatedHash.startsWith(targetPrefix)) {
          setInput(inputStr);
          setHash(generatedHash);
          setIsGenerating(false);
          return;
        }
        foundInput++;

        // Avoid freezing the UI by pausing after 1000 iterations
        if (foundInput % 1000 === 0) {
          setTimeout(generateHash, 0);
          return;
        }
      }
    };

    generateHash();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Hash Generator
        </h2>

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Target Hash Prefix:
        </label>
        <input
          type="text"
          value={targetPrefix}
          onChange={(e) => setTargetPrefix(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter target prefix, e.g., 00000"
          disabled={isGenerating}
        />

        <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
          User Prefix (Optional):
        </label>
        <input
          type="text"
          value={userPrefix}
          onChange={(e) => setUserPrefix(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a string to prepend to each input (optional)"
          disabled={isGenerating}
        />

        <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
          Select Hashing Algorithm:
        </label>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isGenerating}
        >
          <option value="SHA256">SHA-256</option>
          <option value="SHA1">SHA-1</option>
          <option value="MD5">MD5</option>
          <option value="SHA512">SHA-512</option>
          <option value="SHA3">SHA3</option>
          <option value="HMACSHA256">HMAC SHA-256</option>
          <option value="HMACSHA512">HMAC SHA-512</option>
        </select>

        <button
          onClick={findHashWithPrefix}
          disabled={isGenerating}
          className={`mt-4 w-full py-2 rounded-lg text-white font-semibold ${
            isGenerating
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isGenerating ? "Generating..." : "Find Hash"}
        </button>

        {input && (
          <div className="mt-6 p-4 bg-gray-300 rounded-lg text-center">
            <h3 className="text-lg font-medium text-gray-800">Result</h3>
            <div className="w-full bg-gray-800 p-4 rounded-lg shadow-md text-white flex flex-col items-start">
              <p className="text-sm mb-2">
                <strong>Input:</strong> {input}
              </p>
              <strong>Hash:</strong>
              <div className="text-sm">
                <div className="overflow-x-auto w-full bg-gray-900 p-2 mt-1 rounded text-xs border border-gray-600 shadow-inner max-h-20">
                  <code className="block whitespace-pre-wrap break-all">
                    {hash}
                  </code>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HashGenerator;
