export default function HistoryItem({ item, onDelete }) {
  return (
    <div className="flex items-center justify-between py-4 px-4 hover:bg-gray-50">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {item.userInput}
        </p>
        <div className="flex items-center mt-1 text-xs text-gray-500">
          <svg
            className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="mr-2 capitalize">{item.featureType}</span>
          <span>•</span>
          <span className="ml-2">
            {new Date(item.createdAt).toLocaleString()}
          </span>
        </div>
      </div>
      <button
        onClick={() => onDelete(item)}
        className="ml-4 text-red-600 hover:text-red-900 text-sm font-medium"
      >
        Delete
      </button>
    </div>
  );
}