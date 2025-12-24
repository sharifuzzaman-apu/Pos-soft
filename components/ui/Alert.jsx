'use client';

export default function Alert({
  type = 'info',
  title,
  message,
  onClose,
  className = '',
}) {
  const types = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      titleColor: 'text-green-900',
      messageColor: 'text-green-700',
      label: 'Success',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      titleColor: 'text-red-900',
      messageColor: 'text-red-700',
      label: 'Error',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      titleColor: 'text-yellow-900',
      messageColor: 'text-yellow-700',
      label: 'Warning',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      titleColor: 'text-blue-900',
      messageColor: 'text-blue-700',
      label: 'Information',
    },
  };

  const config = types[type];

  return (
    <div
      className={`${config.bg} border ${config.border} rounded-lg p-4 ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            {config.label}
          </p>
          {title && (
            <h4 className={`font-semibold ${config.titleColor} mb-1`}>
              {title}
            </h4>
          )}
          {message && (
            <p className={`text-sm ${config.messageColor}`}>{message}</p>
          )}
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-sm"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}
