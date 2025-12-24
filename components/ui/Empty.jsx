'use client';

export default function Empty({
  icon = '📭',
  title = 'No data',
  message = 'There is no data to display',
  action,
  className = '',
}) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{message}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
