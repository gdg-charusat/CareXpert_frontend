import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { MapPin, Phone, Clock, Star, Search, Navigation } from "lucide-react";

export default function PharmacyPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - replace with actual data from API
  const pharmacies = [
    {
      id: 1,
      name: "City Pharmacy",
      address: "123 Main Street, Downtown",
      distance: "0.5 km",
      rating: 4.5,
      phone: "(555) 123-4567",
      hours: "8:00 AM - 10:00 PM",
      isOpen: true,
      services: ["Prescription", "OTC", "Delivery"]
    },
    {
      id: 2,
      name: "Health Plus Pharmacy",
      address: "456 Oak Avenue, Midtown",
      distance: "1.2 km",
      rating: 4.2,
      phone: "(555) 234-5678",
      hours: "7:00 AM - 11:00 PM",
      isOpen: true,
      services: ["Prescription", "OTC", "Vaccination", "Delivery"]
    },
    {
      id: 3,
      name: "24/7 Medical Store",
      address: "789 Pine Street, Uptown",
      distance: "2.1 km",
      rating: 4.0,
      phone: "(555) 345-6789",
      hours: "24/7",
      isOpen: true,
      services: ["Prescription", "OTC", "Emergency"]
    },
    {
      id: 4,
      name: "Family Pharmacy",
      address: "321 Elm Street, Suburbs",
      distance: "3.5 km",
      rating: 4.7,
      phone: "(555) 456-7890",
      hours: "9:00 AM - 9:00 PM",
      isOpen: false,
      services: ["Prescription", "OTC", "Consultation", "Delivery"]
    }
  ];

  const filteredPharmacies = pharmacies.filter(pharmacy =>
    pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
  <div className="min-h-screen bg-slate-50 dark:bg-zinc-900">
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Find Nearby Pharmacies
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          Search trusted pharmacies and medical stores near your location for prescriptions and emergency medicines.
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by pharmacy name or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-11 rounded-xl"
          />
        </div>
      </div>

      {/* Pharmacy List */}
      <div className="grid gap-6">

        {filteredPharmacies.length === 0 ? (
          <Card className="border-0 shadow-sm rounded-2xl">
            <CardContent className="text-center py-16">
              <MapPin className="h-14 w-14 text-gray-400 mx-auto mb-5" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No pharmacies found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try searching with a different keyword.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredPharmacies.map((pharmacy) => (
            <Card
              key={pharmacy.id}
              className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl"
            >
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  
                  <div>
                    <CardTitle className="text-lg sm:text-xl">
                      {pharmacy.name}
                    </CardTitle>

                    <CardDescription className="flex items-center gap-2 mt-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      {pharmacy.address}
                    </CardDescription>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge
                      variant={pharmacy.isOpen ? "default" : "secondary"}
                      className="rounded-full"
                    >
                      {pharmacy.isOpen ? "Open Now" : "Closed"}
                    </Badge>

                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">
                        {pharmacy.rating}
                      </span>
                    </div>
                  </div>

                </div>
              </CardHeader>

              <CardContent>

                {/* Info Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Phone className="h-4 w-4" />
                    {pharmacy.phone}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    {pharmacy.hours}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Navigation className="h-4 w-4" />
                    {pharmacy.distance}
                  </div>
                </div>

                {/* Services */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {pharmacy.services.map((service, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="rounded-full text-xs px-3 py-1"
                    >
                      {service}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
                  <Button variant="outline" size="sm" className="rounded-xl">
                    Call
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    Directions
                  </Button>
                  <Button size="sm" className="rounded-xl">
                    View Details
                  </Button>
                </div>

              </CardContent>
            </Card>
          ))
        )}

      </div>
    </div>
  </div>
);
}
