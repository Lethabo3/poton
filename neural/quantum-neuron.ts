import { QuantumCircuit } from "../quantum/quantum-circuit"
import { RX, RY, RZ, CNOT } from "../quantum/quantum-gates"
import { DataEncoding } from "../quantum/data-encoding"
import { type Complex, ZERO } from "../utils/complex-utils"

export interface QuantumNeuronConfig {
  inputSize: number
  numQubits?: number
  encodingMethod?: "angle" | "amplitude" | "basis"
  depth?: number
  entanglement?: "linear" | "circular" | "all"
  memoryQubits?: number // New: Number of memory qubits
  memoryPersistence?: number // New: Memory persistence factor (0-1)
  decoherenceRate?: number // New: Decoherence rate for quantum memory
}

export class QuantumNeuron {
  private _circuit: QuantumCircuit
  private _config: Required<QuantumNeuronConfig>
  private _parameters: number[]
  private _inputQubits: number[]
  private _outputQubit: number
  private _memoryQubits: number[]
  private _memoryState: Complex[]
  private _hasPreviousState = false

  constructor(config: QuantumNeuronConfig) {
    this._config = {
      inputSize: config.inputSize,
      numQubits: config.numQubits || config.inputSize + 1,
      encodingMethod: config.encodingMethod || "angle",
      depth: config.depth || 2,
      entanglement: config.entanglement || "linear",
      memoryQubits: config.memoryQubits || 0,
      memoryPersistence: config.memoryPersistence || 0.5,
      decoherenceRate: config.decoherenceRate || 0.01,
    }

    if (this._config.numQubits < this._config.inputSize) {
      throw new Error("Number of qubits must be at least equal to input size")
    }

    // Initialize circuit with additional qubits for memory
    const totalQubits = this._config.numQubits + this._config.memoryQubits
    this._circuit = new QuantumCircuit(totalQubits)

    // Assign qubits for input, output, and memory
    this._inputQubits = Array(this._config.inputSize)
      .fill(0)
      .map((_, i) => i)
    this._outputQubit = this._config.numQubits - 1
    this._memoryQubits = Array(this._config.memoryQubits)
      .fill(0)
      .map((_, i) => this._config.numQubits + i)

    // Initialize memory state to |0⟩ state
    this._memoryState = Array(this._config.memoryQubits)
      .fill(null)
      .map(() => ({ ...ZERO }))

    // Initialize parameters randomly
    const numParams = this._calculateNumParameters()
    this._parameters = Array(numParams)
      .fill(0)
      .map(() => (Math.random() * 2 - 1) * Math.PI)
  }

  get config(): Required<QuantumNeuronConfig> {
    return { ...this._config }
  }

  get parameters(): number[] {
    return [...this._parameters]
  }

  set parameters(params: number[]) {
    if (params.length !== this._parameters.length) {
      throw new Error(`Expected ${this._parameters.length} parameters, got ${params.length}`)
    }
    this._parameters = [...params]
  }

  get numParameters(): number {
    return this._parameters.length
  }

  get memoryState(): Complex[] {
    return [...this._memoryState]
  }

  get hasMemory(): boolean {
    return this._config.memoryQubits > 0
  }

  private _calculateNumParameters(): number {
    const computationalParams = this._config.numQubits * 3 * this._config.depth
    const memoryParams = this._config.memoryQubits * 2
    return computationalParams + memoryParams
  }

  private _buildCircuit(inputs: number[]): void {
    if (inputs.length !== this._config.inputSize) {
      throw new Error(`Expected ${this._config.inputSize} inputs, got ${inputs.length}`)
    }

    this._circuit.reset()

    // Encode inputs
    switch (this._config.encodingMethod) {
      case "angle":
        DataEncoding.angleEncoding(this._circuit, inputs, this._inputQubits)
        break
      case "amplitude":
        DataEncoding.amplitudeEncoding(this._circuit, inputs, this._inputQubits)
        break
      case "basis":
        DataEncoding.basisEncoding(this._circuit, inputs, this._inputQubits)
        break
    }

    // Initialize memory qubits if we have previous state
    if (this._hasPreviousState && this._config.memoryQubits > 0) {
      let memoryParamIndex = this._config.numQubits * 3 * this._config.depth

      for (let m = 0; m < this._config.memoryQubits; m++) {
        const memoryQubit = this._memoryQubits[m]
        this._circuit.initialize(memoryQubit, this._memoryState[m], { real: 0, imag: 0 })

        const targetQubit = m % this._inputQubits.length
        const theta1 = this._parameters[memoryParamIndex++]
        const theta2 = this._parameters[memoryParamIndex++]

        this._circuit.addGate(RY(theta1), [memoryQubit])
        this._circuit.addGate(CNOT, [memoryQubit, this._inputQubits[targetQubit]])
        this._circuit.addGate(RZ(theta2), [this._inputQubits[targetQubit]])
      }
    }

    // Apply parameterized layers
    let paramIndex = 0

    for (let layer = 0; layer < this._config.depth; layer++) {
      // Rotation gates for each qubit
      for (let q = 0; q < this._config.numQubits; q++) {
        this._circuit.addGate(RX(this._parameters[paramIndex++]), [q])
        this._circuit.addGate(RY(this._parameters[paramIndex++]), [q])
        this._circuit.addGate(RZ(this._parameters[paramIndex++]), [q])
      }

      // Entanglement
      switch (this._config.entanglement) {
        case "linear":
          for (let q = 0; q < this._config.numQubits - 1; q++) {
            this._circuit.addGate(CNOT, [q, q + 1])
          }
          break
        case "circular":
          for (let q = 0; q < this._config.numQubits; q++) {
            this._circuit.addGate(CNOT, [q, (q + 1) % this._config.numQubits])
          }
          break
        case "all":
          for (let q1 = 0; q1 < this._config.numQubits; q1++) {
            for (let q2 = q1 + 1; q2 < this._config.numQubits; q2++) {
              this._circuit.addGate(CNOT, [q1, q2])
            }
          }
          break
      }
    }

    // If using memory, add final entanglement from computation to memory qubits
    if (this._config.memoryQubits > 0) {
      for (let m = 0; m < this._config.memoryQubits; m++) {
        const sourceQubit = m % this._inputQubits.length
        this._circuit.addGate(CNOT, [this._inputQubits[sourceQubit], this._memoryQubits[m]])
      }
    }
  }

  forward(inputs: number[], numSamples = 100): number {
    this._buildCircuit(inputs)
    this._circuit.execute()

    let sum = 0
    for (let i = 0; i < numSamples; i++) {
      const circuitCopy = this._circuit.clone()
      sum += circuitCopy.measure(this._outputQubit)

      if (i === numSamples - 1 && this._config.memoryQubits > 0) {
        this._updateMemoryState(circuitCopy)
      }
    }

    return sum / numSamples
  }

  private _updateMemoryState(circuit: QuantumCircuit): void {
    const newMemoryState: Complex[] = []

    for (let m = 0; m < this._config.memoryQubits; m++) {
      const memoryQubit = this._memoryQubits[m]
      const newState = circuit.getAmplitude(memoryQubit)

      if (this._hasPreviousState) {
        const persistence = this._config.memoryPersistence
        const oldState = this._memoryState[m]

        const blendedState = {
          real: oldState.real * persistence + newState.real * (1 - persistence),
          imag: oldState.imag * persistence + newState.imag * (1 - persistence),
        }

        this._applyDecoherence(blendedState)
        newMemoryState.push(blendedState)
      } else {
        newMemoryState.push(newState)
      }
    }

    this._memoryState = newMemoryState
    this._hasPreviousState = true
  }

  private _applyDecoherence(state: Complex): void {
    const decoherence = this._config.decoherenceRate
    state.imag *= 1 - decoherence
  }

  calculateGradients(inputs: number[]): number[] {
    const gradients: number[] = []
    const baseOutput = this.forward(inputs)

    for (let i = 0; i < this._parameters.length; i++) {
      const originalValue = this._parameters[i]

      this._parameters[i] = originalValue + Math.PI / 2
      const forwardOutput = this.forward(inputs)

      this._parameters[i] = originalValue - Math.PI / 2
      const backwardOutput = this.forward(inputs)

      this._parameters[i] = originalValue

      gradients.push((forwardOutput - backwardOutput) / 2)
    }

    return gradients
  }

  updateParameters(gradients: number[], learningRate: number): void {
    if (gradients.length !== this._parameters.length) {
      throw new Error(`Expected ${this._parameters.length} gradients, got ${gradients.length}`)
    }

    for (let i = 0; i < this._parameters.length; i++) {
      this._parameters[i] -= learningRate * gradients[i]
    }
  }

  resetMemory(): void {
    if (!this.hasMemory) return

    this._memoryState = Array(this._config.memoryQubits)
      .fill(null)
      .map(() => ({ ...ZERO }))
    this._hasPreviousState = false
  }

  clone(): QuantumNeuron {
    const neuron = new QuantumNeuron(this._config)
    neuron.parameters = this._parameters

    if (this.hasMemory && this._hasPreviousState) {
      neuron._memoryState = this._memoryState.map((state) => ({ ...state }))
      neuron._hasPreviousState = true
    }

    return neuron
  }
}

