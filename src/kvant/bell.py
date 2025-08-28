from __future__ import annotations
import os
from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator
from qiskit.visualization import plot_histogram  # type: ignore
import matplotlib.pyplot as plt

DEFAULT_SHOTS = 2048
DEFAULT_SEED = 1234

def make_bell_circuit() -> QuantumCircuit:
    qc = QuantumCircuit(2, 2)
    qc.h(0)
    qc.cx(0, 1)
    qc.measure([0, 1], [0, 1])
    return qc

def run_bell(shots: int | None = None, seed: int | None = None) -> None:
    shots = shots or DEFAULT_SHOTS
    seed = seed or int(os.getenv("Q_SEED", DEFAULT_SEED))
    backend = AerSimulator(seed_simulator=seed)
    qc = make_bell_circuit()
    tqc = transpile(qc, backend=backend, optimization_level=3)
    job = backend.run(tqc, shots=shots)
    result = job.result()
    counts = result.get_counts()
    print("Counts:", counts)
    # Expect ~ 50/50 split between '00' and '11'
    fig = plot_histogram(counts, title=f"Bell state (shots={shots}, seed={seed})")
    plt.show()
