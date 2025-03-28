const DotLoader = ({className ="size-3"} : {className?:string}) => {
    return (
      <div className="flex w-fit mx-auto space-x-2 py-1.5">
        <div className={`${className} bg-white rounded-full animate-bounce`}  style={{ animationDelay: '0s' }}></div>
        <div className={`${className} bg-white rounded-full animate-bounce`}  style={{ animationDelay: '0.15s' }}></div>
        <div className={`${className} bg-white rounded-full animate-bounce`}  style={{ animationDelay: '0.3' }}></div>
      </div>
    );
  };
  
  export default DotLoader;