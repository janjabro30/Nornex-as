// Shared form constants for service forms

export const DEVICE_TYPES = [
  { value: "laptop", label: "Laptop" },
  { value: "desktop", label: "Desktop" },
  { value: "tablet", label: "Nettbrett" },
  { value: "telefon", label: "Telefon" },
  { value: "skjerm", label: "Skjerm" },
  { value: "server", label: "Server" },
  { value: "nettverksutstyr", label: "Nettverksutstyr" },
  { value: "annet", label: "Annet" },
] as const;

export const BRANDS = [
  "Apple",
  "Dell",
  "HP",
  "Lenovo",
  "Samsung",
  "Cisco",
  "Asus",
  "Acer",
  "Microsoft",
  "Huawei",
  "Sony",
  "LG",
  "Annet",
] as const;

export const CONDITIONS = [
  { value: "perfekt", label: "Perfekt stand (ingen bruksspor)" },
  { value: "god", label: "God stand (små bruksspor)" },
  { value: "akseptabel", label: "Akseptabel stand (synlige bruksspor)" },
  { value: "defekt", label: "Defekt (har feil)" },
] as const;

export const REPAIR_TYPES = [
  { value: "skjermbytte", label: "Skjermbytte" },
  { value: "batteribytte", label: "Batteribytte" },
  { value: "vannskade", label: "Vannskade" },
  { value: "programvare", label: "Programvareproblemer" },
  { value: "tastaturbytte", label: "Tastaturbytte" },
  { value: "annet", label: "Annet" },
] as const;

export const ACCESSORY_OPTIONS = [
  { value: "emballasje", label: "Original emballasje" },
  { value: "lader", label: "Lader" },
  { value: "kabler", label: "Kabler" },
  { value: "mus", label: "Mus" },
  { value: "tastatur", label: "Tastatur" },
  { value: "dokkingstasjon", label: "Dokkingstasjon" },
  { value: "manualer", label: "Manualer/dokumentasjon" },
] as const;

export const AGE_OPTIONS = [
  { value: "under-1", label: "Mindre enn 1 år" },
  { value: "1-2", label: "1-2 år" },
  { value: "2-3", label: "2-3 år" },
  { value: "3-5", label: "3-5 år" },
  { value: "over-5", label: "Over 5 år" },
] as const;

// Trade-in specific conditions with descriptions
export const TRADE_IN_CONDITIONS = [
  {
    value: "perfekt",
    label: "Perfekt",
    description: "Fungerer perfekt, ingen skader",
  },
  {
    value: "god",
    label: "God",
    description: "Minimale bruksspor, fungerer perfekt",
  },
  {
    value: "akseptabel",
    label: "Akseptabel",
    description: "Synlige bruksspor, fungerer som den skal",
  },
  {
    value: "defekt",
    label: "Defekt",
    description: "Har funksjonsfeil",
  },
] as const;

// Trade-in value calculations
export const TRADE_IN_BASE_VALUES: Record<string, number> = {
  laptop: 3000,
  desktop: 2000,
  tablet: 1500,
  telefon: 2500,
  skjerm: 800,
  annet: 500,
};

export const CONDITION_MULTIPLIERS: Record<string, number> = {
  perfekt: 0.8,
  god: 0.6,
  akseptabel: 0.4,
  defekt: 0.15,
};

export const AGE_MULTIPLIERS: Record<string, number> = {
  "under-1": 1.0,
  "1-2": 0.8,
  "2-3": 0.6,
  "3-5": 0.4,
  "over-5": 0.2,
};
