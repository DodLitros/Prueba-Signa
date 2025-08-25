import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BrandWizard({ onConfirm }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");

  function handleNext(e) {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      onConfirm({ name, owner });
    }
  }

  function handleBack() {
    if (step > 1) setStep(step - 1);
  }

  return (
    <div className="wizard-container">
      {step > 1 && (
        <button type="button" className="btn-back" onClick={handleBack}>
          ↑
        </button>
      )}
      <motion.div
        key={`bg-${step}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="step-bg"
      >
        {step}
      </motion.div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="step"
          >
            <form onSubmit={handleNext} className="form-step">
              <h1 className="title">Nombre de la marca</h1>
              <input
                autoFocus
                className="input"
                placeholder="Ej: CocaCola"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span className="enter-hint">Enter ➔</span>
            </form>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="step"
          >
            <form onSubmit={handleNext} className="form-step">
              <h1 className="title">Titular</h1>
              <input
                autoFocus
                className="input"
                placeholder="Nombre del titular"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
              />
            </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="step"
          >
            <form onSubmit={handleNext} className="form-step">
              <h1 className="title">Confirmar Registro</h1>
              <p style={{ fontSize: "20px", marginBottom: "20px" }}>
                <strong>Marca:</strong> {name} <br />
                <strong>Titular:</strong> {owner}
              </p>
              <button type="submit" className="btn-confirm">
                Confirmar Registro
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
