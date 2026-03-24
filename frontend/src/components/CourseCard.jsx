export default function CourseCard({ course }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-bold">{course.title}</h3>

      <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">
        Enroll
      </button>
    </div>
  );
}