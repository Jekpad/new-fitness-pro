import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Profile from "./index";
import { userContext } from "../../contexts/userContext";
import { vi } from "vitest";
import ButtonRegular from "@/components/UI/Buttons/ButtonRegular";

const mockedUsedNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedUsedNavigate,
  };
});

describe("<Profile/>", () => {
  it("should not redirect", () => {
    const mockUser = {
      uid: "12345",
      email: "daria@mail.ru",
      name: "Daria",
    };

    render(
      <MemoryRouter>
        <userContext.Provider value={{ user: mockUser, setUser: vi.fn() }}>
          <Profile />
        </userContext.Provider>
      </MemoryRouter>,
    );
    expect(mockedUsedNavigate).not.toHaveBeenCalled();
  });
  it("should redirect", () => {
    render(
      <MemoryRouter>
        <userContext.Provider value={{ user: null, setUser: vi.fn() }}>
          <Profile />
        </userContext.Provider>
      </MemoryRouter>,
    );

    expect(mockedUsedNavigate).toHaveBeenCalled();
  });
  it("should open modal", () => {
    const mockUser = {
      uid: "12345",
      email: "daria@mail.ru",
      name: "Daria",
    };

    render(
      <MemoryRouter>
        <userContext.Provider value={{ user: mockUser, setUser: vi.fn() }}>
          <Profile />
        </userContext.Provider>
      </MemoryRouter>,
    );
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId("modalChangeButton"));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });
});

const fn = vi.fn();
describe("ButtonRegular", () => {
  it("renders correctly", () => {
    render(<ButtonRegular onClick={fn}>Test</ButtonRegular>);
    fireEvent.click(screen.getByText("Test"));
    expect(fn).toHaveBeenCalled();
  });
});
