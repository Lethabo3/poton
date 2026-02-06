import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AtomIcon,
  BrainCircuitIcon,
  GridIcon,
  ArrowRightIcon,
  ZapIcon,
  LayersIcon,
  WaypointsIcon,
} from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center gap-6">
        <Badge variant="secondary" className="text-sm">
          Quantum Computing + Neural Networks
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
          Quantum Neural Network Simulator
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          Explore quantum computing concepts through interactive demos.
          Train quantum neural networks on maze solving and classification
          problems — all in your browser.
        </p>
        <div className="flex gap-3 mt-2">
          <Button asChild size="lg">
            <Link href="/maze">
              <GridIcon className="mr-2 h-5 w-5" />
              Try Maze Solver
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/xor">
              <BrainCircuitIcon className="mr-2 h-5 w-5" />
              XOR Demo
            </Link>
          </Button>
        </div>
      </section>

      {/* Demos */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">
          Interactive Demos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GridIcon className="h-5 w-5" />
                Quantum Maze Solver
              </CardTitle>
              <CardDescription>
                Watch a quantum-inspired neural network learn to navigate
                randomly generated mazes using superposition and entanglement.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <ul className="space-y-1">
                <li>Quantum walk exploration of multiple paths</li>
                <li>Parameter-shift rule for gradient estimation</li>
                <li>Quantum memory with probabilistic recall</li>
                <li>Real-time training visualization on canvas</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild variant="default" className="w-full">
                <Link href="/maze">
                  Launch Demo
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuitIcon className="h-5 w-5" />
                XOR Classification
              </CardTitle>
              <CardDescription>
                Train a quantum neural network on the classic XOR problem and
                watch the decision boundary evolve in real time.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <ul className="space-y-1">
                <li>Non-linearly separable classification</li>
                <li>Decision boundary visualization</li>
                <li>Live prediction accuracy tracking</li>
                <li>Comparison of quantum vs classical approaches</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild variant="default" className="w-full">
                <Link href="/xor">
                  Launch Demo
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12 border-t">
        <h2 className="text-2xl font-bold text-center mb-8">
          Quantum Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <FeatureCard
            icon={<AtomIcon className="h-6 w-6" />}
            title="Quantum Gates"
            description="Hadamard, Pauli X/Y/Z, CNOT, and parameterized rotation gates operating on complex-valued qubit states."
          />
          <FeatureCard
            icon={<WaypointsIcon className="h-6 w-6" />}
            title="Superposition"
            description="Explore multiple computational paths simultaneously using quantum superposition of states."
          />
          <FeatureCard
            icon={<ZapIcon className="h-6 w-6" />}
            title="Entanglement"
            description="Connected cells in the maze become entangled, enabling correlated quantum state exploration."
          />
          <FeatureCard
            icon={<LayersIcon className="h-6 w-6" />}
            title="Multi-Layer QNN"
            description="Configurable quantum neural network layers with quantum neurons, memory, and decoherence."
          />
          <FeatureCard
            icon={<BrainCircuitIcon className="h-6 w-6" />}
            title="Adam Optimizer"
            description="Adaptive learning rate optimization with momentum and RMSProp for stable training."
          />
          <FeatureCard
            icon={<GridIcon className="h-6 w-6" />}
            title="Quantum Memory"
            description="Stores and recalls promising quantum states using probability-weighted selection."
          />
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
