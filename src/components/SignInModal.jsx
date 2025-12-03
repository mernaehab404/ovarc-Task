import { useState } from "react";
import Modal from "./Modal";

const SignInModal = ({ show, setShow, onSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await onSignIn(email, password);
    setIsLoading(false);

    if (result.success) {
      setShow(false);
      setEmail("");
      setPassword("");
      setError("");
    } else {
      setError(result.error || "Sign in failed. Please try again.");
    }
  };

  const handleCancel = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <Modal
      title="Sign In"
      show={show}
      setShow={setShow}
      save={handleSubmit}
      cancel={handleCancel}
      saveButtonText={isLoading ? "Signing In..." : "Sign In"}
      saveButtonDisabled={isLoading}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            placeholder="Enter your email"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            placeholder="Enter your password"
            required
            disabled={isLoading}
          />
        </div>

        <div className="text-sm text-gray-500">
          <p className="font-medium mb-1">Demo Credentials:</p>
          <p>Email: admin@example.com | Password: admin123</p>
          <p>Email: user@example.com | Password: user123</p>
        </div>
      </form>
    </Modal>
  );
};

export default SignInModal;

