const Skeleton = ({ 
  className = '', 
  width = 'w-full', 
  height = 'h-4',
  rounded = 'rounded',
  ...props 
}) => {
  const classes = `skeleton ${width} ${height} ${rounded} ${className}`;
  
  return <div className={classes} {...props} />;
};

// Predefined skeleton components
Skeleton.Card = ({ className = '' }) => (
  <div className={`card ${className}`}>
    <Skeleton height="h-6" width="w-3/4" className="mb-4" />
    <Skeleton height="h-4" width="w-full" className="mb-2" />
    <Skeleton height="h-4" width="w-2/3" className="mb-4" />
    <div className="flex space-x-2">
      <Skeleton height="h-8" width="w-20" rounded="rounded-lg" />
      <Skeleton height="h-8" width="w-16" rounded="rounded-lg" />
    </div>
  </div>
);

Skeleton.List = ({ items = 3, className = '' }) => (
  <div className={`space-y-4 ${className}`}>
    {Array.from({ length: items }).map((_, index) => (
      <div key={index} className="flex items-center space-x-4">
        <Skeleton height="h-12" width="w-12" rounded="rounded-full" />
        <div className="flex-1">
          <Skeleton height="h-4" width="w-3/4" className="mb-2" />
          <Skeleton height="h-3" width="w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export default Skeleton;
