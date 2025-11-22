function Loading({ message = "Carregando..." }) {
  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #004C99 0%, #1B263B 50%, #004C99 100%)' }}
    >
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-fast-cyan mx-auto mb-4"></div>
        <p className="text-fast-ice text-lg">{message}</p>
      </div>
    </div>
  );
}

export default Loading;
