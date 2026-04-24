// Feature: green-tensor-website, Property 6: buildStructuredData round-trips and has required JSON-LD fields
import { describe, test, expect } from "vitest";
import {
  buildOrganizationSchema,
  buildSoftwareAppSchema,
} from "@/lib/seo/structured-data";

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("Property 6: Structured data round-trips as valid JSON-LD", () => {
  test("buildOrganizationSchema round-trips through JSON.parse(JSON.stringify())", () => {
    const schema = buildOrganizationSchema();
    const roundTripped = JSON.parse(JSON.stringify(schema));
    expect(roundTripped).toEqual(schema);
  });

  test("buildSoftwareAppSchema round-trips through JSON.parse(JSON.stringify())", () => {
    const schema = buildSoftwareAppSchema();
    const roundTripped = JSON.parse(JSON.stringify(schema));
    expect(roundTripped).toEqual(schema);
  });

  test("buildOrganizationSchema has required JSON-LD fields", () => {
    const schema = buildOrganizationSchema();
    expect(schema).toHaveProperty("@context", "https://schema.org");
    expect(schema).toHaveProperty("@type", "Organization");
    expect(schema).toHaveProperty("name");
    expect(schema).toHaveProperty("description");
    expect(typeof schema.name).toBe("string");
    expect(schema.name.length).toBeGreaterThan(0);
    expect(typeof schema.description).toBe("string");
    expect(schema.description.length).toBeGreaterThan(0);
  });

  test("buildSoftwareAppSchema has required JSON-LD fields", () => {
    const schema = buildSoftwareAppSchema();
    expect(schema).toHaveProperty("@context", "https://schema.org");
    expect(schema).toHaveProperty("@type", "SoftwareApplication");
    expect(schema).toHaveProperty("name");
    expect(schema).toHaveProperty("description");
    expect(typeof schema.name).toBe("string");
    expect(schema.name.length).toBeGreaterThan(0);
    expect(typeof schema.description).toBe("string");
    expect(schema.description.length).toBeGreaterThan(0);
  });

  test("buildOrganizationSchema produces valid JSON string", () => {
    const schema = buildOrganizationSchema();
    expect(() => JSON.stringify(schema)).not.toThrow();
    const json = JSON.stringify(schema);
    expect(() => JSON.parse(json)).not.toThrow();
  });

  test("buildSoftwareAppSchema produces valid JSON string", () => {
    const schema = buildSoftwareAppSchema();
    expect(() => JSON.stringify(schema)).not.toThrow();
    const json = JSON.stringify(schema);
    expect(() => JSON.parse(json)).not.toThrow();
  });

  test("both schemas have distinct @type values", () => {
    const org = buildOrganizationSchema();
    const app = buildSoftwareAppSchema();
    expect(org["@type"]).not.toBe(app["@type"]);
  });
});
