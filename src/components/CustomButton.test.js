import { render, screen } from "@testing-library/react";
import CustomButton from "./CustomButton";

describe("CustomButton", () => {
  it("affiche le texte du bouton", () => {
    render(<CustomButton href="/">Cliquer</CustomButton>);
    expect(screen.getByText("Cliquer")).toBeInTheDocument();
  });
});
