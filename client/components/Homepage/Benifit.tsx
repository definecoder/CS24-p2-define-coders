import React from 'react'
import Image from "next/image";
const Benifit = () => {
  return (
    <section className="text-gray-600 body-font">
      
  <div className="container px-5 py-24 mx-auto flex flex-wrap">
    
    <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
    
    <div className="w-[616px] h-[616px]">
            {/* <Image
              src="/hero.png"
              width="616"
              height="617"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            /> */}
            <Image
                        src="/benifits.png"
                        alt="N"
                        width="616"
                        height="616"
                        
                      />
          </div>
    </div>
    <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
    <div className='text-4xl font-bold mb-12 text-black'>Key Features</div>
      <div className="flex flex-col mb-10 lg:items-start items-center">
        <div className='flex'>
        <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-black mb-5 mr-5">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        </div>
        <div className='mt-2'><h2 className="text-gray-900 text-lg title-font font-medium mb-3">Centralized Administration</h2></div>
        </div>
        <div className="flex-grow">
          
          <p className="leading-relaxed text-base">Empower system administrators to efficiently manage all aspects of waste management, including user creation, role assignment, and permissions. With a user-friendly interface, administrators can streamline operations and ensure accountability across the organization.</p>
         
        </div>
      </div>
      <div className="flex flex-col mb-10 lg:items-start items-center">
        <div className='flex'>
        <div className="w-12 h-12 p-2 inline-flex items-center justify-center rounded-full bg-indigo-100  mb-5">
        

<svg fill="#000000" xmlns="http://www.w3.org/2000/svg" 
	 width="800px" height="800px" viewBox="0 0 52 52"  >
<path d="M41.4,39.7l-0.9,0.9c-1,1-2.3,1.5-3.7,1.5h-2.6c-2.4,0-5-1.9-5-5.2v-2.5c0-2,0.9-3.2,1.4-3.9l10.8-11
	c0.3-0.3,0.6-1,0.6-1.4V9.8C42,7.2,39.8,5,37.2,5H11.6C9,5,6.8,7.4,6.8,9.8H5.2C3.4,9.8,2,11.3,2,13.1s1.4,3.2,3.2,3.2h1.6v6.5H5.2
	C3.4,22.8,2,24.2,2,26s1.4,3.2,3.2,3.2h1.6v6.5H5.2c-1.8,0-3.2,1.5-3.2,3.2c0,1.8,1.4,3.2,3.2,3.2h1.6c0,3.2,2.2,4.8,4.8,4.8H30h7.2
	c2.6,0,4.8-2.2,4.8-4.8V40C42,39.5,41.8,39.4,41.4,39.7z M33.2,17.1c0,0.9-0.7,1.6-1.6,1.6h-16c-0.9,0-1.6-0.7-1.6-1.6v-1.6
	c0-0.9,0.7-1.6,1.6-1.6h16c0.9,0,1.6,0.7,1.6,1.6V17.1z M26,36.5c0,0.9-0.7,1.6-1.6,1.6h-8.8c-0.9,0-1.6-0.7-1.6-1.6v-1.6
	c0-0.9,0.7-1.6,1.6-1.6h8.8c0.9,0,1.6,0.7,1.6,1.6V36.5z M28.4,26.8c0,0.9-0.7,1.6-1.6,1.6H15.6c-0.9,0-1.6-0.7-1.6-1.6v-1.6
	c0-0.9,0.7-1.6,1.6-1.6h11.2c0.9,0,1.6,0.7,1.6,1.6V26.8z"/>
<path d="M49.5,22.4l-1-1c-0.6-0.6-1.6-0.6-2.2,0L34.1,34C34,34,34,34.2,34,34.2v2.7c0,0.2,0,0.4,0.2,0.4h2.6
	c0.1,0,0.2-0.1,0.3-0.1l12.3-12.4C50.2,24.1,50.2,23.1,49.5,22.4z"/>
</svg>
        </div>
        <div> <h2 className="text-gray-900 text-lg title-font font-medium mb-3 mt-2 ml-5">Efficient Resource Allocation and Billing System</h2></div>
        </div>
        <div className="flex-grow">
         
          <p className="leading-relaxed text-base">Facilitate efficient resource allocation by providing tools for managing vehicle entry and release at STS and landfill sites. STS managers can oversee vehicle entry and release processes, while landfill managers can track vehicle entries, manage billing, and monitor STS status in real-time.</p>
        
        </div>
      </div>
      <div className="flex flex-col mb-10 lg:items-start items-center">
        <div className='flex'>
        <div className="w-12 h-12 p-2 inline-flex items-center justify-center rounded-full bg-indigo-100  mb-5">
        <svg width="800px" height="800px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M10 10C11.3807 10 12.5 8.88071 12.5 7.5C12.5 6.11929 11.3807 5 10 5C8.61929 5 7.5 6.11929 7.5 7.5C7.5 8.88071 8.61929 10 10 10ZM10 7C10.2761 7 10.5 7.22386 10.5 7.5C10.5 7.77614 10.2761 8 10 8C9.72386 8 9.5 7.77614 9.5 7.5C9.5 7.22386 9.72386 7 10 7Z" fill="#000000"/>
<path fillRule="evenodd" clipRule="evenodd" d="M5 7.28555C5 10.1987 7.80453 15 10 15C12.1955 15 15 10.1987 15 7.28555C15 4.38124 12.7774 2 10 2C7.22258 2 5 4.38124 5 7.28555ZM13 7.28555C13 9.2396 10.8035 13 10 13C9.19652 13 7 9.2396 7 7.28555C7 5.45617 8.35914 4 10 4C11.6409 4 13 5.45617 13 7.28555Z" fill="#000000"/>
<path d="M13.7298 10C13.1775 10 12.7298 9.55228 12.7298 9C12.7298 8.44772 13.1775 8 13.7298 8C15.0774 8 16.2597 8.89861 16.6204 10.1971L18.0093 15.1971C18.4527 16.7935 17.5181 18.4471 15.9216 18.8906C15.6602 18.9632 15.3901 19 15.1187 19H4.88128C3.22442 19 1.88128 17.6569 1.88128 16C1.88128 15.7286 1.9181 15.4585 1.99073 15.1971L3.37961 10.1971C3.7403 8.89861 4.92254 8 6.27017 8C6.82245 8 7.27017 8.44772 7.27017 9C7.27017 9.55228 6.82245 10 6.27017 10C5.82096 10 5.42688 10.2995 5.30665 10.7324L3.91776 15.7324C3.89355 15.8195 3.88128 15.9095 3.88128 16C3.88128 16.5523 4.32899 17 4.88128 17H15.1187C15.2092 17 15.2992 16.9877 15.3864 16.9635C15.9185 16.8157 16.23 16.2645 16.0822 15.7324L14.6933 10.7324C14.5731 10.2995 14.179 10 13.7298 10Z" fill="#000000"/>
</svg>
        </div>
            <div><h2 className="text-gray-900 text-lg title-font font-medium mb-3 ml-5 mt-2">Real-time Vehicle Tracking and Fleet Optimizations</h2></div>
        </div>
        <div className="flex-grow">
          
          <p className="leading-relaxed text-base">Enable STS and landfill managers to monitor vehicle movements in real-time using live Google Maps integration. With accurate vehicle location data, managers can optimize routes, track vehicle status, and ensure timely waste transfer between STS and landfills.</p>
         
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default Benifit