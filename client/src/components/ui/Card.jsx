import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  onClick,
  ...props 
}) => {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6';
  const hoverClasses = hover ? 'hover:shadow-md cursor-pointer transition-shadow duration-200' : '';
  const classes = `${baseClasses} ${hoverClasses} ${className}`;

  const cardProps = {
    className: classes,
    onClick,
    ...props
  };

  if (hover) {
    return (
      <motion.div
        {...cardProps}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div {...cardProps}>
      {children}
    </div>
  );
};

export default Card;
