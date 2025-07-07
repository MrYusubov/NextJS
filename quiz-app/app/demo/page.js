// export default function Demo(){
//     return (
//         <div className="p-5">
//             <button className="bg-green-400 text-white px-4 py-2 m-5 rounded-xl hover:bg-green-600 focus:ring-1 focus:ring-green-300">Click Me</button>
//         </div>
//     )
// }

// export default function Demo(){
//     return (
//         <div className="max-w-lg mx-auto mt-10 bg-white rounded-xl shadow-sm hover:shadow-lg p-6">
//             <h2 className="text-xl font-bold mb-2">
//                 My Special Card
//             </h2>
//             <p className="text-gray-600">
//                 This is Card Component by Tailwind.css
//             </p>
//         </div>
//     )
// }

export default function Demo(){
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4" >
            <div className="bg-blue-200 p-4 rounded">Box 1</div>
            <div className="bg-blue-200 p-4 rounded">Box 2</div>
            <div className="bg-blue-200 p-4 rounded">Box 3</div>
        </div>
    )
}