import "@testing-library/jest-dom";
import { vi } from "vitest";
import React from "react";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next/image — render a plain img element
vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({
    src,
    alt,
    width,
    height,
    priority: _priority, // eslint-disable-line @typescript-eslint/no-unused-vars
    ...rest
  }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
    [key: string]: unknown;
  }) => React.createElement("img", { src, alt, width, height, ...rest }),
}));

// Mock next/script — render nothing
vi.mock("next/script", () => ({
  default: () => null,
}));

// Mock framer-motion — render children directly, skip animations
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>("framer-motion");
  const motionProxy = new Proxy(
    {},
    {
      get: (_target, tag: string) => {
        // eslint-disable-next-line react/display-name
        const Component = React.forwardRef(
          (
            { children, ...props }: { children?: React.ReactNode; [key: string]: unknown },
            ref: React.Ref<unknown>
          ) => React.createElement(tag, { ...props, ref }, children)
        );
        return Component;
      },
    }
  );
  return {
    ...actual,
    motion: motionProxy,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useReducedMotion: () => true,
    useAnimation: () => ({ start: vi.fn(), stop: vi.fn() }),
  };
});
