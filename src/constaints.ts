interface IChip {
  name: string;
  color:
    | "default"
    | "error"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | undefined;
  variant?: "outlined" | "filled" | undefined;
}

export const chip: IChip[] = [
  { name: "grass", color: "success" },
  { name: "poison", color: "secondary" },
  { name: "fighting", color: "primary" },
  { name: "flying", color: "primary" },
  { name: "fire", color: "error" },
  { name: "water", color: "info" },
  { name: "electric", color: "secondary" },
  { name: "psychic", color: "secondary" },
  { name: "ice", color: "info" },
  { name: "rock", color: "secondary" },
  { name: "bug", color: "success" },
  { name: "dragon", color: "warning" },
  { name: "dark", color: "error" },
  { name: "fairy", color: "secondary" },
  { name: "shadow", color: "secondary" },
  { name: "unknown", color: "secondary" },
  { name: "ghost", color: "default", variant: "outlined" },
  { name: "steel", color: "default" },
  { name: "ground", color: "default" },
  { name: "normal", color: "default" },
];
