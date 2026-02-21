import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Heart, Users, Shield, Award, Clock, Globe } from "lucide-react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

export default function AboutPage() {
  const stats = [
    { icon: Users, label: "Active Users", value: "10,000+" },
    { icon: Heart, label: "Doctors", value: "500+" },
    { icon: Clock, label: "Consultations", value: "50,000+" },
    { icon: Globe, label: "Cities", value: "25+" },
  ];

  const features = [
    {
      icon: Heart,
      title: "Expert Healthcare",
      description:
        "Connect with certified doctors and healthcare professionals",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Your health data is protected with enterprise-grade security",
    },
    {
      icon: Clock,
      title: "24/7 Available",
      description: "Access healthcare support anytime, anywhere",
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "All doctors are verified and maintain high standards",
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Chief Medical Officer",
      image: "/placeholder.svg",
      bio: "15+ years in digital healthcare innovation",
    },
    {
      name: "John Anderson",
      role: "CEO & Founder",
      image: "/placeholder.svg",
      bio: "Healthcare technology entrepreneur",
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Head of AI Development",
      image: "/placeholder.svg",
      bio: "AI researcher specializing in medical applications",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 pt-20 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About careXpert
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're revolutionizing healthcare by making quality medical care
            accessible to everyone, anywhere, anytime through cutting-edge
            technology and compassionate care.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              At careXpert, we believe that quality healthcare should be
              accessible to everyone. Our platform bridges the gap between
              patients and healthcare providers through innovative technology,
              making medical consultations more convenient, affordable, and
              effective.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We combine the expertise of certified medical professionals with
              the power of AI to provide comprehensive healthcare solutions that
              adapt to your needs.
            </p>
          </div>
          <div className="relative">
            <img
              src="/image.png"
              alt="Healthcare team"
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Why Choose careXpert?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="p-0">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <Badge className="mb-3">{member.role}</Badge>
                  <p className="text-gray-600 dark:text-gray-300">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Compassion</h3>
                <p className="opacity-90">
                  We put patients first and treat everyone with empathy and
                  respect
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="opacity-90">
                  We continuously improve our platform with cutting-edge
                  technology
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Trust</h3>
                <p className="opacity-90">
                  We maintain the highest standards of security and privacy
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
