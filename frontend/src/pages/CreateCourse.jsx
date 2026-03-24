export default function CreateCourse() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Create Course</h2>

      <input
        className="border p-2 mt-4"
        placeholder="Course Title"
      />

      <button className="bg-blue-500 text-white px-4 py-2 mt-2">
        Create
      </button>
    </div>
  );
}