import HistoryItem from './HistoryItem';

export default function HistoryList({ items, onDelete }) {
  return (
    <div className="divide-y divide-gray-200">
      {items.length > 0 ? (
        items.map((item, index) => (
          <HistoryItem 
            key={index} 
            item={item} 
            onDelete={onDelete}
          />
        ))
      ) : (
        <p className="text-center text-gray-500 py-4">
          No history items found
        </p>
      )}
    </div>
  );
}