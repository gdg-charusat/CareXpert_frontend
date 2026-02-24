import { useParams } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

export default function DoctorProfilePage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Doctor Profile</h1>
        <p>Doctor ID: {id}</p>
        {/* Add your doctor profile content here */}
      </div>
      <Footer />
    </div>
  );
}
