import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-gentle-cool bg-pattern-subtle flex flex-col justify-center items-center gap-8 p-6">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
          Welcome to Mental Health Coach
        </h1>
        <p className="text-lg text-muted-foreground max-w-md">
          Choose your portal to access your personalized mental health coaching experience
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <Link href="/client">
          <button className="px-8 py-4 text-xl rounded-lg bg-gradient-gentle-primary text-white border-none cursor-pointer font-semibold shadow-soft hover:bg-gradient-gentle-secondary hover:shadow-medium transform hover:scale-105 transition-all duration-300 ease-in-out">
            Client Portal
          </button>
        </Link>
        <Link href="/coach/dashboard">
          <button className="px-8 py-4 text-xl rounded-lg bg-gradient-gentle-accent text-white border-none cursor-pointer font-semibold shadow-soft hover:bg-gradient-gentle-accent/90 hover:shadow-medium transform hover:scale-105 transition-all duration-300 ease-in-out">
            Coach Portal
          </button>
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        <div className="bg-gradient-card p-6 rounded-xl shadow-soft border-0">
          <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Professional Care
          </h3>
          <p className="text-sm text-muted-foreground">
            Access to certified mental health professionals and evidence-based coaching methods
          </p>
        </div>
        <div className="bg-gradient-card p-6 rounded-xl shadow-soft border-0">
          <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Gentle Support
          </h3>
          <p className="text-sm text-muted-foreground">
            A safe, nurturing environment designed to promote healing and personal growth
          </p>
        </div>
        <div className="bg-gradient-card p-6 rounded-xl shadow-soft border-0">
          <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Personalized Experience
          </h3>
          <p className="text-sm text-muted-foreground">
            Tailored coaching programs that adapt to your unique needs and goals
          </p>
        </div>
      </div>
    </div>
  );
}
