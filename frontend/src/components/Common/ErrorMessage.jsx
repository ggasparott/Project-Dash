function ErrorMessage({ message, onRetry }) {
  return (
    <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg backdrop-blur-sm flex items-center justify-between">
      <div className="flex items-center">
        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{message}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="ml-4 px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded text-sm transition-all"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
