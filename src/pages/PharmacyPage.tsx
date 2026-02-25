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
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Pharmacy Near Me
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Find nearby pharmacies and medical stores for your prescription needs.
        </p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search pharmacies by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {filteredPharmacies.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No pharmacies found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search criteria.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredPharmacies.map((pharmacy) => (
            <Card key={pharmacy.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{pharmacy.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <MapPin className="h-4 w-4" />
                      {pharmacy.address}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={pharmacy.isOpen ? "default" : "secondary"}>
                      {pharmacy.isOpen ? "Open" : "Closed"}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{pharmacy.rating}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {pharmacy.phone}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {pharmacy.hours}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Navigation className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {pharmacy.distance}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {pharmacy.services.map((service, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    Call
                  </Button>
                  <Button variant="outline" size="sm">
                    Directions
                  </Button>
                  <Button size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
