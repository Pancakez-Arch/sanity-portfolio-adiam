export function Hero() {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4"> {/* Grid container for layout */}
        {/* Main content area with a background color, padding, and rounded corners */}
        <div className="col-span-1 lg:col-span-2 h-full bg-gray-100 min-h-[500px lg:min-h-[300px] rounded-2xl p-8">
          
          {/* Main title */}
          <h1 className="text-4xl lg:text-6xl font-medium">
            Hey I am Adiam Yonas Gidey👋
          </h1>
  
          {/* Subtitle */}
          <h1 className="text-4xl lg:text-6xl font-normal mt-3">
            I am a web developer working and living in Norway💫
          </h1>
  
          {/* Button styled as a link to email */}
          <a href="mailto:adiamyonas12@gmail.com" className="relative inline-block text-lg group mt-5">
            {/* Main button style */}
            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
              {/* Background effect on button */}
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50" />
              
              {/* Animation effect: background expansion on hover */}
              <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease" />
              
              {/* Button label */}
              <span className="relative">Get in Touch!</span>
            </span>
            
            {/* Bottom hover effect for the button */}
            <span
              className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
              data-rounded="rounded-lg"
            />
          </a>
        </div>      
      </div>
    );
  }
  