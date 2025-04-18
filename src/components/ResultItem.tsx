interface ResultItemProps {
  label: string;
  value: string | number;
}

function ResultItem({ label, value }: ResultItemProps) {
  return (
    <p className="text-gray-700 dark:text-gray-300">
      <span className="font-medium">{label}:</span> {value}
    </p>
  );
}

export default ResultItem;
