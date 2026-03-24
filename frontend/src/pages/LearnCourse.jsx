import Navbar from "../components/Navbar";

export default function LearnCourse() {
  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold">Learning Page</h2>

        <div className="bg-black h-60 mb-4"></div>

        <button className="bg-green-500 text-white px-4 py-2">
          Mark as Completed
        </button>
      </div>
    </>
  );
}