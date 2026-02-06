import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          About Poton
        </h1>
        <p className="text-muted-foreground">
          A quantum neural network simulator built with TypeScript and Next.js.
        </p>
      </div>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What is a Quantum Neural Network?</h2>
        <p className="text-muted-foreground leading-relaxed">
          A Quantum Neural Network (QNN) combines principles from quantum
          computing with the architecture of neural networks. Instead of
          classical bits that are either 0 or 1, QNNs operate on qubits that
          can exist in a superposition of both states simultaneously. This
          allows the network to explore multiple solutions in parallel during
          training.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          In Poton, each quantum neuron uses parameterized quantum gates
          (rotation gates RX, RY, RZ) to process information. The parameters
          of these gates are learned during training using the parameter-shift
          rule — a quantum analogue of backpropagation that estimates gradients
          by evaluating the circuit at shifted parameter values.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Architecture</h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Quantum Core</CardTitle>
              <CardDescription>Complex number math, qubits, gates, and circuits</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              The foundation layer implements complex arithmetic, qubit state
              representation (&#945;|0&#10217; + &#946;|1&#10217;), quantum gates (Hadamard, Pauli,
              CNOT, parameterized rotations), and a circuit execution engine
              that applies gate sequences to multi-qubit state vectors.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Neural Network Layer</CardTitle>
              <CardDescription>Quantum neurons, layers, and the full QNN</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Built on top of the quantum core, this layer provides quantum
              neurons with configurable qubit counts, quantum layers with shared
              and private memory modes, and a full network architecture
              supporting multi-layer configurations, Adam optimization, MSE and
              binary cross-entropy loss functions, and batch processing.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Demo Applications</CardTitle>
              <CardDescription>Maze solving and XOR classification</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              The maze solver uses quantum walks with superposition to explore
              multiple paths simultaneously, combined with a quantum memory
              system that stores and recalls promising states. The XOR demo
              demonstrates that QNNs can learn non-linearly separable patterns,
              visualizing the decision boundary as it evolves during training.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Key Concepts</h2>
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="font-medium">Superposition</dt>
            <dd className="text-muted-foreground">
              A qubit can be in a combination of |0&#10217; and |1&#10217; states, enabling
              parallel exploration of solution spaces.
            </dd>
          </div>
          <div>
            <dt className="font-medium">Entanglement</dt>
            <dd className="text-muted-foreground">
              Correlated quantum states between connected cells allow information
              to propagate non-locally through the maze.
            </dd>
          </div>
          <div>
            <dt className="font-medium">Quantum Walk</dt>
            <dd className="text-muted-foreground">
              The quantum analogue of a random walk, where the walker exists in
              superposition across multiple positions simultaneously.
            </dd>
          </div>
          <div>
            <dt className="font-medium">Parameter-Shift Rule</dt>
            <dd className="text-muted-foreground">
              A method for computing gradients of quantum circuits by evaluating
              the circuit at parameter values shifted by &#177;&#960;/2.
            </dd>
          </div>
          <div>
            <dt className="font-medium">Decoherence</dt>
            <dd className="text-muted-foreground">
              Simulated quantum noise that causes gradual loss of quantum
              coherence, modeling real-world quantum hardware behavior.
            </dd>
          </div>
        </dl>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Tech Stack</h2>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
          <li>TypeScript with strict mode</li>
          <li>Next.js 15 with App Router</li>
          <li>React 19</li>
          <li>Tailwind CSS with shadcn/ui components</li>
          <li>Canvas API for real-time visualizations</li>
        </ul>
      </section>
    </div>
  )
}
