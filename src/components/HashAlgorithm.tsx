// HashGenerator.tsx
import CryptoJS from "crypto-js";
import { useState } from "react";
import { motion } from "framer-motion";
import { Hash, Activity } from "lucide-react";
import ResultItem from "./ResultItem";
import { toast } from "react-toastify";

// Define supported algorithms
type HashAlgorithm =
  | "SHA256"
  | "MD5"
  | "SHA1"
  | "SHA512"
  | "SHA3"
  | "HMAC-SHA256"
  | "HMAC-SHA512";

// Result type
interface HashResult {
  input: string;
  hash: string;
  attempts: number;
  timeElapsed: string;
}

// Available algorithms
const ALGORITHMS: HashAlgorithm[] = [
  "SHA256",
  "MD5",
  "SHA1",
  "SHA512",
  "SHA3",
  "HMAC-SHA256",
  "HMAC-SHA512",
];

export default function HashGenerator() {
  const [targetPrefix, setTargetPrefix] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>("SHA256");
  const [secretKey, setSecretKey] = useState<string>("");
  const [result, setResult] = useState<HashResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Generate hash based on the selected algorithm
  const generateHash = (
    inputStr: string,
    algorithm: HashAlgorithm,
    key = ""
  ): string => {
    const hashMethods: Record<HashAlgorithm, () => string> = {
      SHA1: () => CryptoJS.SHA1(inputStr).toString(CryptoJS.enc.Hex),
      MD5: () => CryptoJS.MD5(inputStr).toString(CryptoJS.enc.Hex),
      SHA256: () => CryptoJS.SHA256(inputStr).toString(CryptoJS.enc.Hex),
      SHA512: () => CryptoJS.SHA512(inputStr).toString(CryptoJS.enc.Hex),
      SHA3: () =>
        CryptoJS.SHA3(inputStr, { outputLength: 512 }).toString(
          CryptoJS.enc.Hex
        ),
      "HMAC-SHA256": () =>
        CryptoJS.HmacSHA256(inputStr, key).toString(CryptoJS.enc.Hex),
      "HMAC-SHA512": () =>
        CryptoJS.HmacSHA512(inputStr, key).toString(CryptoJS.enc.Hex),
    };
    return hashMethods[algorithm]();
  };

  // Main function to find a hash with the target prefix
  const findHashWithPrefix = () => {
    if (!targetPrefix || (algorithm.startsWith("HMAC-") && !secretKey)) {
      toast("❗️ Target prefix or secret key (for HMAC) is missing!");
      return;
    }

    setIsLoading(true);
    let attempts = 0;
    const startTime = performance.now();

    const processChunk = () => {
      for (; attempts < 10000; attempts++) {
        const inputString = `${userInput}${attempts}`;
        const hash = generateHash(inputString, algorithm, secretKey);

        if (hash.startsWith(targetPrefix.toLowerCase())) {
          setResult({
            input: inputString,
            hash,
            attempts,
            timeElapsed: ((performance.now() - startTime) / 1000).toFixed(2),
          });
          setIsLoading(false);
          return;
        }
      }

      setTimeout(processChunk, 0); // Continue processing in next event loop
    };

    processChunk();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Input Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
          <Hash className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          Hash Generator
        </h2>

        <Input
          label="Target Prefix"
          value={targetPrefix}
          onChange={setTargetPrefix}
          placeholder="Enter target prefix (e.g., 000)"
        />
        <Input
          label="Input String"
          value={userInput}
          onChange={setUserInput}
          placeholder="Enter your input string"
        />
        <Select
          label="Algorithm"
          value={algorithm}
          onChange={(value) => setAlgorithm(value as HashAlgorithm)}
          options={ALGORITHMS}
        />
        {algorithm.startsWith("HMAC-") && (
          <Input
            label="Secret Key"
            value={secretKey}
            onChange={setSecretKey}
            placeholder="Enter HMAC secret key"
          />
        )}

        {/* Button to start hash generation */}
        <button
          onClick={findHashWithPrefix}
          disabled={isLoading}
          className="z-[100] w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Activity className="w-5 h-5 animate-spin" />
              Searching...
            </>
          ) : (
            "Find Matching Hash"
          )}
        </button>
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center items-center">
          <Activity className="w-8 h-8 text-indigo-600 animate-spin" />
          <p className="ml-2 text-gray-700 dark:text-gray-300">
            Searching for hash...
          </p>
        </div>
      )}

      {/* Result Section */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            🎉 Result Found!
          </h3>
          <ResultItem label="Input" value={result.input} />
          <ResultItem label="Hash" value={result.hash} />
          <ResultItem
            label="Attempts"
            value={result.attempts.toLocaleString()}
          />
          <ResultItem label="Time" value={`${result.timeElapsed} seconds`} />
        </motion.div>
      )}
    </div>
  );
}

// =============================
// 🔥 Reusable Input Component
// =============================
interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function Input({ label, value, onChange, placeholder }: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
        placeholder={placeholder}
      />
    </div>
  );
}

// =============================
// 🔥 Reusable Select Component
// =============================
interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

function Select({ label, value, onChange, options }: SelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option.replace("SHA", "SHA-").replace("HMAC-", "HMAC ")}
          </option>
        ))}
      </select>
    </div>
  );
}
