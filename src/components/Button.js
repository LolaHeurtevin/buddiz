export default function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button type={type} onClick={onClick} className={`px-4 py-2 rounded main_rose text-white ${className}`}>
      {children}
    </button>
  );
}