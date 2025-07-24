import Navigation from './Navigation';
import TopHeader from './TopHeader';

const Layout = ({ children, showNavigation = true, useTopHeader = false }) => {
  if (useTopHeader) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <TopHeader />
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {showNavigation && <Navigation />}

      <div className={`${showNavigation ? 'md:pl-64' : ''} ${showNavigation ? 'pb-24 md:pb-0' : ''}`}>
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
