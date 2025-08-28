from qiskit_aer.noise import NoiseModel, depolarizing_error

def basic_depolarizing(p1: float = 0.001, p2: float = 0.01) -> NoiseModel:
    model = NoiseModel()
    model.add_all_qubit_quantum_error(depolarizing_error(p1, 1), ['x','y','z','h','s','t','id'])
    model.add_all_qubit_quantum_error(depolarizing_error(p2, 2), ['cx','cz'])
    return model
