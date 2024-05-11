"use client";

export default function CompanyDetails() {

    return (
        <div className="bg-gray-200 p-4 h-screen text-center flex flex-col justify-center">
    <h1 className="text-2xl font-bold mb-4">CONTRACTOR DETAILS</h1>
    <div className="mb-4">
        <h2 className="text-lg font-bold text-blue-800">Company Name</h2>
        <p className="text-gray-700">ABC Company</p>
    </div>
    <div className="mb-4">
        <h2 className="text-lg font-bold text-blue-800">Number of Employees</h2>
        <p className="text-gray-700">100</p>
    </div>
    <div className="mb-4">
        <h2 className="text-lg font-bold text-blue-800">Area</h2>
        <p className="text-gray-700">Software Development</p>
    </div>
    <div className="mb-4">
        <h2 className="text-lg font-bold text-blue-800">Phone</h2>
        <p className="text-gray-700">123-456-7890</p>
    </div>
    <div className="mb-4">
        <h2 className="text-lg font-bold text-blue-800">Address</h2>
        <p className="text-gray-700">123 Main Street, City, State, ZIP</p>
    </div>
</div>
    );
    
}
